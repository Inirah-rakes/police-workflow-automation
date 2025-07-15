from django.db import models
import uuid

class CSRRequest(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    # New Fields for better tracking
    station_id = models.CharField(max_length=10, blank=True, null= True) # e.g., 'E1', 'C1', 'B4'
    reference_id = models.CharField(max_length=20, unique=True, blank=True)
    
    station_email = models.EmailField(blank=True, null=True) 
    police_station_name = models.CharField(max_length=100, blank=True, null=True)
    mobile_number = models.CharField(max_length=15)
    provider = models.CharField(max_length=50)
    status = models.CharField(max_length=50, default='Request Received')
    timestamp = models.DateTimeField(auto_now_add=True)
    
    sent_to_provider_at = models.DateTimeField(null=True, blank=True)
    response_received_at = models.DateTimeField(null=True, blank=True)
    forwarded_to_station_at = models.DateTimeField(null=True, blank=True)
    raw_response_data = models.TextField(blank=True, null=True)

    def save(self, *args, **kwargs):
        # Auto-generate a unique reference ID if one doesn't exist
        if not self.reference_id:
            provider_prefix = self.provider[:3].upper()
            hex_id = uuid.uuid4().hex[:6].upper()
            self.reference_id = f"REF-{provider_prefix}-{hex_id}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Request {self.reference_id} from {self.station_id}"

    class Meta:
        ordering = ['-timestamp']
