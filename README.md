# Tress Tech - Cloud Computing Documentation ☁️

## Cloud Architecture 🏗️
In our application we use Cloud Run, Cloud Storage, and Cloud SQL services to support our application to run. So, the frontend will consume the API from two servers; Backend and Machine Learning models. For the Backend, it will directly connect to Cloud SQL as a database. For the Machine Learning models, it will directly connect to Cloud Storage to store the analyzed images from the user and to Cloud SQL as a database. We put these services in asia-southeast2 region.

![cloud architecture](https://github.com/chisiliaamanda/project_hairstyle/assets/133761119/944add2c-b7e3-4074-a873-386bed52ea77)

## Tools - Framework 🔧
Our Cloud Computing project is created with:
* Express.js
* Flask
* Cloud SQL
* Cloud Run
* Cloud Storage

## The Steps 
1. Clone the GitHub repository in Cloud Shell and follow the steps below:
   ```
   git clone https://github.com/chisiliaamanda/project_hairstyle.git
   cd project_hairstyle
   ```
3. Deployment to Google Cloud using Cloud SQL, Cloud Storage, and Cloud Run
   - Set up Cloud SQL:
     * Create a Cloud SQL instance in Google Cloud Console.
     * Configure database and users.
     * Save connection details for use in the app.
   - Set Up Cloud Storage:
     * Create a bucket in Google Cloud Storage.
     * Configure the bucket to store the files the application needs.
   - Deployment with Cloud Run:
     * Dockerizing the Application
     * Build and Push Images
     * Deploy to Cloud Run
       
   Here is the code to deploy the backend into google cloud run:
   ```
   gcloud builds submit \
   --tag gcr.io/$GOOGLE_CLOUD_PROJECT/hair-project1234
   ```
   ```
   gcloud run deploy hair-project1234 \
   --image gcr.io/$GOOGLE_CLOUD_PROJECT/hair-project1234 \
   --platform managed \
   --region asia-southeast2 \
   --allow-unauthenticated \
   --max-instances=3 \
   --port=5000 \
   --service-account my-new-service-account@capstone-hairstyle.iam.gserviceaccount.com
   ```
