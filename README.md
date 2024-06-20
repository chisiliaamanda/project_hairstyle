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
