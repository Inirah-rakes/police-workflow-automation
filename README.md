# **Police Workflow Automation System \- CSR Management**

This project is a full-stack application designed to automate the process of handling Customer Service Requests (CSRs) for mobile number data, streamlining the workflow between police stations, a central control room, and telecom service providers.

## **Project Overview**

The system replaces a manual, email-based process with a secure, automated, and trackable digital workflow. It is built to handle requests from multiple police stations, intelligently segregate mobile numbers by their service provider, manage communication with providers, and deliver responses back to the originating station.

### **Core Features**

* **Automated Email Ingestion:** The system monitors a control room inbox for new requests from trusted police station email addresses.  
* **Intelligent Data Parsing:** It automatically extracts all mobile numbers from incoming emails and identifies the station ID.  
* **Accurate Provider Segregation:** Each mobile number is automatically categorized by its current service provider (Jio, Airtel, VI, BSNL) using a professional API or a robust rule-based system.  
* **Interactive Dashboard:** A live dashboard allows control room operators to view all pending requests, grouped by provider, and select them for dispatch.  
* **Consolidated Provider Communication:** Operators can send a single, consolidated email request to each service provider containing all relevant pending numbers.  
* **End-to-End Status Tracking:** Every request is tracked through its entire lifecycle: Request Received \-\> Sent to Provider \-\> Response Received \-\> Completed.  
* **Response Handling:** The system monitors for replies from service providers, links them to the original request, and places them in a queue for review.  
* **Automated Final Reporting:** An operator can forward the provider's response back to the original police station with a single click.  
* **Live Analytics:** A dedicated dashboard provides visual insights into request volumes, provider distribution, and other key metrics.

## **The Workflow**

1. **Request:** An officer sends an email containing one or more mobile numbers to the central control room email.  
2. **Ingest & Segregate:** A backend script reads the email, extracts each number, identifies its service provider, and saves each number as a separate, trackable request in the database, linked to its station ID.  
3. **Dispatch:** A control room operator uses the web dashboard to select pending requests for a specific provider (e.g., all pending Jio numbers) and sends them as a single, consolidated email to the provider. The status of these requests is updated to "Sent to Provider".  
4. **Response:** The service provider replies to the control room. A separate backend script reads this response, finds the original request using a Reference ID, and updates its status to "Response Received".  
5. **Forward:** The operator sees the processed request in the "Response Handler" queue and forwards the complete details back to the original police station with one click. The status is updated to "Completed".

## **Technologies Used**

* **Frontend:** React.js, Material-UI, Recharts (for charts), Axios  
* **Backend:** Python, Django, Django REST Framework  
* **Database:** SQLite (for development), PostgreSQL (recommended for production)  
* **Email Automation:** Python's imaplib (for reading) and smtplib (for sending)  
* **Provider Verification (Optional):** Veriphone API for accurate carrier lookup.

## **How to Run This Project Locally**

Follow these steps to set up and run the application on your local machine.

### **Prerequisites**

* Python (3.8+)  
* Node.js and npm  
* Git

### **Step 1: Clone the Repository**

git clone \<your-repository-url\>  
cd police-automation-system

### **Step 2: Backend Setup**

1. **Navigate to the backend folder:**  
   cd backend

2. **Create and activate a virtual environment:**  
   \# Create the environment  
   python \-m venv venv

   \# Activate on Windows  
   .\\venv\\Scripts\\activate

   \# Activate on macOS/Linux  
   source venv/bin/activate

3. **Install Python dependencies:**  
   pip install \-r requirements.txt

4. **Set up the Environment File (.env):**  
   * Create a file named .env in the backend directory.  
   * Copy the content from .env.example and fill in your actual email credentials, station mappings, and API keys.  
5. **Create the Database:**  
   python manage.py makemigrations  
   python manage.py migrate

6. **Create an Admin Superuser:**  
   python manage.py createsuperuser

   (Follow the prompts to create a username and password for the admin panel).  
7. **Run the Backend Server:**  
   python manage.py runserver

   The backend will be running at http://127.0.0.1:8000/.

### **Step 3: Frontend Setup**

1. **Open a new terminal.**  
2. **Navigate to the frontend folder:**  
   cd frontend

3. **Install JavaScript dependencies:**  
   npm install

4. **Run the Frontend Application:**  
   npm start

   The application will open in your browser at http://localhost:3000.

### **Step 4: Running the Email Scripts**

1. **Open a third terminal.**  
2. **Navigate to the backend folder and activate the virtual environment.**  
3. **To check for new requests from stations:**  
   python manage.py check_emails

4. **To check for new responses from providers:**  
   python manage.py check_provider_responses  
