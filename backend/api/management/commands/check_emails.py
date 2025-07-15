import imaplib
import email
from email.header import decode_header
import os
import re
import ssl
import requests 
import time
from django.core.management.base import BaseCommand
from dotenv import load_dotenv
from api.models import CSRRequest

# Mapping of Veriphone carrier names to our simplified provider names
CARRIER_TO_PROVIDER_MAP = {
    "Airtel": "Airtel",
    "Jio": "Jio",
    "Vodafone": "VI",
    "Idea": "VI",
    "BSNL": "BSNL",
}

# --- MAPPING OF EMAIL ADDRESSES TO UNIQUE STATION IDs ---
STATION_ID_MAP = {
    'harini178.ssnc@gmail.com': 'E1',   # Singanallur
    'prema8malaiyappan@gmail.com': 'C1', # Katoor
    'deepanroshini05@gmail.com': 'B4'    # Ukkadam
}

def get_provider_from_api(phone_number, api_key):
    """
    Calls the Veriphone API to get the carrier for a given phone number.
    """
    if not api_key:
        print("Veriphone API key is missing from .env file. Cannot verify provider.")
        return "Unknown" # Return None to indicate API call should be skipped
        
    full_number = f"+91{phone_number}"
    params = {'phone': full_number, 'key': api_key}
    
    try:
        response = requests.get('https://api.veriphone.io/v2/verify', params=params)
        response.raise_for_status()
        data = response.json()
        
        if data.get("phone_valid"):
            carrier = data.get("carrier", "Unknown")
            for key, value in CARRIER_TO_PROVIDER_MAP.items():
                if key.lower() in carrier.lower():
                    return value
            return "Other"
        else:
            return "Invalid Number"
            
    except requests.exceptions.RequestException as e:
        print(f"API request failed: {e}")
        return "Unknown" # Return None on API failure to trigger fallback


class Command(BaseCommand):
    help = 'Checks for new emails and uses Veriphone API to determine provider.'

    def handle(self, *args, **options):
        load_dotenv()
        
        USERNAME = os.getenv('CONTROL_ROOM_EMAIL')
        PASSWORD = os.getenv('EMAIL_APP_PASSWORD')
        VERIPHONE_API_KEY = os.getenv('VERIPHONE_API_KEY')
        TRUSTED_EMAILS = list(STATION_ID_MAP.keys())
        IMAP_SERVER = "imap.gmail.com"

        self.stdout.write(self.style.SUCCESS("Connecting to Gmail server..."))
         
        try:
            context = ssl.create_default_context()
            imap = imaplib.IMAP4_SSL(IMAP_SERVER, ssl_context=context)
            imap.login(USERNAME, PASSWORD)
            imap.select("INBOX")
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Failed to connect or login: {e}"))
            return

        for station_email in TRUSTED_EMAILS:
            self.stdout.write(f"\nChecking for emails from: {station_email} ({STATION_ID_MAP[station_email]})")
            search_criteria = f'(UNSEEN FROM "{station_email}")'
            status, search_result = imap.search(None, search_criteria)
            
            if status != 'OK' or not search_result[0]:
                self.stdout.write(self.style.WARNING(f"No new emails from {station_email}."))
                continue
                
            email_ids = search_result[0].split()
            self.stdout.write(self.style.SUCCESS(f"Found {len(email_ids)} new email(s)."))

            for num in email_ids:
                status, data = imap.fetch(num, "(RFC822)")
                if status == "OK":
                    msg = email.message_from_bytes(data[0][1])
                    
                    subject, encoding = decode_header(msg["Subject"])[0]
                    if isinstance(subject, bytes):
                        subject = subject.decode(encoding or "utf-8")
                    
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

                    # --- NEW: Find ALL 10-digit numbers in the email body ---
                    mobile_numbers = re.findall(r'\b\d{10}\b', body)
                    
                    if not mobile_numbers:
                        self.stdout.write(self.style.ERROR(f"No mobile numbers found in email with subject: {subject}"))
                        continue

                    self.stdout.write(self.style.NOTICE(f"Found numbers: {', '.join(mobile_numbers)}"))
                    
                    # Create a separate database record for EACH number
                    for number in mobile_numbers:
                        self.stdout.write(f"  > Verifying provider for {number}...")
                        # --- API CALL INSTEAD OF MANUAL LOGIC ---
                        provider = get_provider_from_api(number, VERIPHONE_API_KEY)
                        self.stdout.write(f"  > API Result: {provider}")
                        
                        try:
                            CSRRequest.objects.create(
                                station_id=STATION_ID_MAP[station_email],
                                station_email=station_email,
                                police_station_name=subject,
                                mobile_number=number,
                                provider=provider,
                            )
                            self.stdout.write(self.style.SUCCESS(f"  > Saved request for {number} as {provider}"))
                        except Exception as e:
                            self.stdout.write(self.style.ERROR(f"  > DB Error for {number}: {e}"))
                         
                        time.sleep(1) 
                        
        imap.close()
        imap.logout()

