from rest_framework import viewsets, status, views
from rest_framework.decorators import action
from rest_framework.response import Response
from django.core.mail import send_mail
from django.utils import timezone
from django.conf import settings
from django.db.models import Count
from django.db.models.functions import TruncDate
import os
from .models import CSRRequest
from .serializers import CSRRequestSerializer

class CSRRequestViewSet(viewsets.ModelViewSet):
    queryset = CSRRequest.objects.all()
    serializer_class = CSRRequestSerializer

    @action(detail=False, methods=['post'], url_path='send-to-provider')
    def send_to_provider(self, request):
        print(f"[DEBUG] Received data for 'send-to-provider': {request.data}") 

        request_ids = request.data.get('request_ids', [])
        if not request_ids:
            return Response({'error': 'No request IDs provided'}, status=status.HTTP_400_BAD_REQUEST)

        # Get the requests from the database
        pending_requests = CSRRequest.objects.filter(id__in=request_ids, status='Request Received')
        if not pending_requests.exists():
            return Response({'error': 'No valid pending requests found for the given IDs.'}, status=status.HTTP_400_BAD_REQUEST)

        # All requests in the batch should be for the same provider
        provider = pending_requests.first().provider
        provider_email_map = {
            'Jio': os.getenv('PROVIDER_EMAIL_JIO'),
            'Airtel': os.getenv('PROVIDER_EMAIL_AIRTEL'),
            'VI': os.getenv('PROVIDER_EMAIL_VI'),
            'BSNL': os.getenv('PROVIDER_EMAIL_BSNL'),
        }
        recipient_email = provider_email_map.get(provider)
        if not recipient_email:
             return Response({'error': f'Email for provider {provider} not configured.'}, status=status.HTTP_400_BAD_REQUEST)

        email_body = f"Sir/Madam,\n\nPlease provide Call Detail Records for the following numbers:\n\n"
        for req in pending_requests:
            email_body += f"- Mobile: {req.mobile_number} (Ref ID: {req.reference_id})\n"
        email_body += "\nThank you.\nCoimbatore City Police Control Room"

        try:
            send_mail(
                subject=f'Urgent CSR Request - {len(pending_requests)} Numbers',
                message=email_body,
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[recipient_email],
                fail_silently=False,
            )
            pending_requests.update(status='Sent to Provider', sent_to_provider_at=timezone.now())
            return Response({'message': f'Successfully sent {len(pending_requests)} requests to {provider}.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': f'Failed to send email: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=True, methods=['post'], url_path='forward-to-station')
    def forward_to_station(self, request, pk=None):
        try:
            csr_request = self.get_object()
        except CSRRequest.DoesNotExist:
            return Response({'error': 'Request not found.'}, status=status.HTTP_404_NOT_FOUND)

        if csr_request.status != 'Response Received':
            return Response({'error': 'No response received from provider yet.'}, status=status.HTTP_400_BAD_REQUEST)

        station_email = csr_request.station_email
        response_data = csr_request.raw_response_data

        email_body = f"Sir/Madam,\n\nPlease find the details for your request regarding mobile number {csr_request.mobile_number} (Ref ID: {csr_request.reference_id}).\n\n--- Provider Response ---\n\n{response_data}\n\n-----------------------\n\nRegards,\nControl Room"

        try:
            send_mail(
                subject=f'Response for CSR Request - {csr_request.mobile_number}',
                message=email_body,
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[station_email],
                fail_silently=False,
            )
            csr_request.status = 'Completed'
            csr_request.forwarded_to_station_at = timezone.now()
            csr_request.save()
            return Response({'message': f'Successfully forwarded response to {station_email}.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': f'Failed to send email to station: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# ---FOR ANALYTICS DATA ---
class AnalyticsDataView(views.APIView):
    """
    A dedicated view to provide aggregated data for the analytics dashboard.
    """
    def get(self, request, format=None):
        # Get total counts for KPI cards
        total_requests = CSRRequest.objects.count()
        sent_to_provider = CSRRequest.objects.exclude(status='Request Received').count()
        response_received = CSRRequest.objects.filter(status__in=['Response Received', 'Completed']).count()
        completed = CSRRequest.objects.filter(status='Completed').count()

        # Get counts per provider
        provider_stats = list(
            CSRRequest.objects.values('provider')
            .annotate(count=Count('provider'))
            .order_by('-count')
        )

        # Get top 5 stations by request volume
        station_stats = list(
            CSRRequest.objects.values('police_station_name')
            .annotate(count=Count('id'))
            .order_by('-count')[:5]
        )

        # Get daily request trends for the last 30 days
        daily_trends = list(
            CSRRequest.objects
            .annotate(date=TruncDate('timestamp'))
            .values('date')
            .annotate(count=Count('id'))
            .order_by('date')
        )

        # Prepare the data payload
        data = {
            'kpi': {
                'total_requests': total_requests,
                'sent_to_provider': sent_to_provider,
                'response_received': response_received,
                'completed': completed,
            },
            'provider_distribution': provider_stats,
            'top_stations': station_stats,
            'daily_trends': daily_trends,
        }
        return Response(data)

