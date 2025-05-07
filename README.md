# K-club Assignment

## Description

This project implements a Node.js backend service to process jobs involving image perimeter calculations for visits to retail stores. Each job includes image URLs and a store_id. The service verifies store_ids using a CSV-based master store list, downloads each image, calculates the perimeter as 2 \* (height + width), simulates a GPU delay (random 0.1–0.4s), and returns the job status.

## Assumptions

- `store_master.csv` is available locally in the root directory and is well-formed.
- All images provided via URLs are in a readable format `jpg` , `png` , `webp` etc.
- The job queue is in-memory and suitable for development or testing purposes.
- Only a single instance of the server is running — no distributed job processing.
- Job processing is synchronous for simplicity.
- Image perimeter is calculated as `2 * (height + width)` using Sharp.
- Docker is optional, and the app is fully runnable without it.
- Failures include image download errors or invalid store IDs.

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/b-harsh/K-Club-Assignment.git
cd K-club Assignment
```

### 2. Install dependencies

```
npm install
```

### 3. Start the server

```
npm start
```

## API Usage

### 1. Submit Job

Endpoint: `POST /api/submit`

Payload:

```
{
  "count": 2,
  "visits": [
    {
      "store_id": "S00339218",
      "image_url": [
        "https://www.gstatic.com/webp/gallery/2.jpg",
        "https://www.gstatic.com/webp/gallery/3.jpg"
      ],
      "visit_time": "2025-05-07T10:00:00Z"
    },
    {
      "store_id": "S01408764",
      "image_url": [
        "https://www.gstatic.com/webp/gallery/3.jpg"
      ],
      "visit_time": "2025-05-07T11:00:00Z"
    }
  ]
}
```

Success Response:

```
{
  "job_id": 1
}
```

Error:

```
{
  "error": "Visit count mismatch"
}
```

### 2. Get Job Info

Endpoint: `GET /api/status?jobid=1`

Success: Completed

```
{
  "status": "completed",
  "job_id": "1"
}
```

Failed:

```
{
  "status": "failed",
  "job_id": "1",
  "error": [
    {
      "store_id": "S00339218",
      "error": "Image download failed"
    }
  ]
}
```

## Testing :

Use Postman or `curl` to test endpoints

```
curl -X POST http://localhost:3000/api/submit \
  -H "Content-Type: application/json" \
  -d @sample_payload.json
```

## Run:

### Without Docker:

#### 1. Node.js Installed

#### 2. Steps to run

<!-- # Navigate to your project folder -->

cd K-club Assignment

<!-- # Install dependencies -->

npm install

<!-- # Run the app -->

node src/index.js

Server will start on `http://localhost:3000`

### With Docker:

#### 1. Docker Desktop Installed and Running

#### 1. Build Docker Image

```
docker build -t K-club Assignment .
```

#### 2. Run Docker Image

```
docker run -p 3000:3000 K-club Assignment

This maps container port 3000 to your local machine’s `localhost:3000`.
```

## Work Environment
```
| Component       | Version / Tool                                 |
| --------------- | ---------------------------------------------- |
| OS              | windows 11                                     |
| Node.js         | v18+                                           |
| Package Manager | npm                                            |
| Libraries       | express, axios, csv-parser, sharp, body-parser |
| IDE             | Visual Studio Code (VSCode)                    |
```

##  Future Improvements

- Use a persistent database to store job and image-level results.
- Save calculated perimeters for detailed reporting and auditing.
- Add structured logging and monitoring for job tracking.
- Write comprehensive unit and integration tests.
- Add input validation and rate limiting for better API protection.
- Document APIs using Swagger or OpenAPI stansdards.
- Secure endpoints using JWT-based authentication.

---

## Author

**Harsh Bajaj**  
 Email: 21je0378@iitism.ac.in  
 Phone: +91-9258080924
