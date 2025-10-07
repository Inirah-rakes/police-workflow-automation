import imaplib
import email
from email.header import decode_header
import os
import re
import ssl 
from django.core.management.base import BaseCommand
from django.utils import timezone
from dotenv import load_dotenv
from api.models import CSRRequest

class Command(BaseCommand):
    """
    This command connects to the control room email, checks for replies from
    service providers, and updates the database with the response data.
    """
    help = 'Checks for response emails from providers and updates the database.'

    def handle(self, *args, **options):
        load_dotenv()
        
        # Load credentials from the .env file
        USERNAME = os.getenv('CONTROL_ROOM_EMAIL')
        PASSWORD = os.getenv('EMAIL_APP_PASSWORD')
        
        # Create a list of all known provider emails from the .env file
        PROVIDER_EMAILS = [
            os.getenv('PROVIDER_EMAIL_JIO'),
            os.getenv('PROVIDER_EMAIL_AIRTEL'),
            os.getenv('PROVIDER_EMAIL_VI'),
            os.getenv('PROVIDER_EMAIL_BSNL'),
        ]
        # Filter out any providers that are not configured in the .env file
        PROVIDER_EMAILS = [p_email for p_email in PROVIDER_EMAILS if p_email]

        IMAP_SERVER = "imap.gmail.com"

        self.stdout.write(self.style.SUCCESS("Connecting to Gmail to check for provider responses..."))
        
        try:
            # Use a default SSL context for a more robust and secure connection
            context = ssl.create_default_context()
            imap = imaplib.IMAP4_SSL(IMAP_SERVER, ssl_context=context)
            imap.login(USERNAME, PASSWORD)
            imap.select("INBOX")
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Failed to connect or login: {e}"))
            return

        # Loop through each configured provider email address
        for provider_email in PROVIDER_EMAILS:
            self.stdout.write(f"\nChecking for responses from: {provider_email}")
            search_criteria = f'(UNSEEN FROM "{provider_email}")'
            status, search_result = imap.search(None, search_criteria)
            
            if status != 'OK' or not search_result[0]:
                self.stdout.write(self.style.WARNING(f"No new responses from {provider_email}."))
                continue
                
            email_ids = search_result[0].split()
            self.stdout.write(self.style.SUCCESS(f"Found {len(email_ids)} new response(s) from {provider_email}."))

            for num in email_ids:
                status, data = imap.fetch(num, "(RFC822)")
                if status == "OK":
                    msg = email.message_from_bytes(data[0][1])
                    
                    body = ""
                    if msg.is_multipart():
                        for part in msg.walk():
                            if part.get_content_type() == "text/plain":
                                payload = part.get_payload(decode=True)
                                body = payload.decode(part.get_content_charset() or "utf-8")
                                break
                    else:
                        payload = msg.get_payload(decode=True)
                        body = payload.decode(msg.get_content_charset() or "utf-8")

                    # --- LOGIC TO LINK RESPONSE TO ORIGINAL REQUEST ---
                    ref_id_match = re.search(r'Ref ID: (REF-[A-Z]{3}-[A-F0-9]{6})', body, re.IGNORECASE)
                    
                    if ref_id_match:
                        reference_id = ref_id_match.group(1)
                        try:
                            # Find the original request in the database using the reference ID
                            csr_request = CSRRequest.objects.get(reference_id=reference_id, status='Sent to Provider')
                            
                            # Update the request with the response details
                            csr_request.status = 'Response Received'
                            csr_request.raw_response_data = body
                            csr_request.response_received_at = timezone.now()
                            csr_request.save()
                            
                            self.stdout.write(self.style.SUCCESS(f"Updated request {reference_id} with provider response."))
                        
                        except CSRRequest.DoesNotExist:
                            self.stdout.write(self.style.ERROR(f"Received response for an unknown or already processed request ID: {reference_id}"))
                        except Exception as e:
                            self.stdout.write(self.style.ERROR(f"DB Error while updating request {reference_id}: {e}"))
                    else:
                        self.stdout.write(self.style.WARNING(f"Could not find a valid Ref ID in response from {provider_email}. Manual review needed."))

        imap.close()
        imap.logout()