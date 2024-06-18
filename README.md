# AnswersAi Backend

AnswersAi Backend is a scalable and secure backend service built on Node.js and Express.js. It provides RESTful APIs for managing users, questions, and integrating with an AI service (OpenAI or VertexAI). This project is designed to be containerized with Docker for easy deployment.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Deployment](#deployment)
- [Architecture](#architecture)

## Features

- **User Management:** CRUD operations for user accounts.
- **Question Management:** Create, retrieve questions, and generate AI-powered answers.
- **Authentication and Authorization:** JWT-based authentication for secure API access.
- **Integration with AI Services:** Utilize OpenAI or VertexAI for generating answers.
- **Scalable Infrastructure:** Designed for scalability using AWS/GCP services.
- **Containerized Deployment:** Dockerized application for easy deployment.

## Prerequisites

Ensure you have the following installed on your system:

- Node.js (v14 or higher)
- npm (v6 or higher)
- Docker

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/answersai-backend.git
cd answersai-backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

- Create a `.env` file in the root directory and add the following variables:

```env
PORT=3000
MONGO_URI=mongodb://mongodb_host:27017/answers-ai
OPENAI_API_KEY=your_openai_api_key
# Other environment variables as needed
```

- Replace `mongodb_host` with your MongoDB host address.

## Usage

1. Start the server:

```bash
npm start
```

2. Access APIs:

- The server will start at `http://localhost:3000` by default.
- Use tools like Postman or curl to interact with the APIs.

## API Endpoints

This section outlines the available API endpoints and their functionalities, including request and response structures.

### Authentication

#### POST `/api/auth/register`

**Description:** Registers a new user with the system.

**Request Body:**

```json
{
"email": "john.doe@example.com",
"password": "securepassword123"
}
```

* **email (string, required):** User's email address.
* **password (string, required):** User's password.

**Response:**

```json
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
"user": {
"_id": "60d6e1d2bcf2e1410c118356",
"email": "john.doe@example.com"
}
}
```

* **token (string):** JWT token for authentication.
* **user (object):** User object with basic details.

#### POST `/api/auth/login`

**Description:** Logs in an existing user.

**Request Body:**

```json
{
"email": "john.doe@example.com",
"password": "securepassword123"
}
```

* **email (string, required):** User's email address.
* **password (string, required):** User's password.

**Response:**

```json
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
"user": {
"_id": "60d6e1d2bcf2e1410c118356",
"email": "john.doe@example.com"
}
}
```

* **token (string):** JWT token for authentication.
* **user (object):** User object with basic details.

#### POST `/api/auth/logout`

**Description:** Logs out the current user (token invalidation).

**Authorization:** Bearer token required.

**Response:**

```json
{
"message": "Logout successful"
}
```

* **message (string):** Logout successful confirmation.

#### POST `/api/auth/refresh`

**Description:** Refreshes the JWT access token.

**Request Body:**

```json
{
"refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

* **refreshToken (string, required):** Refresh token to obtain a new access token.

**Response:**

```json
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

* **token (string):** New JWT access token.

### Questions

#### POST `/api/questions`

**Description:** Creates a new question and retrieves an AI-generated answer.

**Authorization:** Bearer token required.

**Request Body:**

```json
{
"content": "What is the capital of France?"
}
```

* **content (string, required):** User's question content.

**Response:**

```json
{
"userId": "60d6e1d2bcf2e1410c118356",
"content": "What is the capital of France?",
"answer": "Paris"
}
```

* **userId (string):** ID of the user who asked the question.
* **content (string):** User's question content.
* **answer (string):** AI-generated answer to the question.

#### GET `/api/questions/{questionId}`

**Description:** Retrieves a specific question and its answer by question ID.

**Authorization:** Bearer token required.

**URL Parameters:**

* **questionId (string, required):** ID of the question to retrieve.

**Example:** `/api/questions/60d6e1d2bcf2e1410c118356`

**Response:**

```json
{
"userId": "60d6e1d2bcf2e1410c118356",
"content": "What is the capital of France?",
"answer": "Paris"
}
```

* **userId (string):** ID of the user who asked the question.
* **content (string):** User's question content.
* **answer (string):** AI-generated answer to the question.

### Users

#### POST `/api/users`

**Description:** Creates a new user account.

**Request Body:**

```json
{
"email": "jane.doe@example.com",
"password": "securepassword456"
}
```

* **email (string, required):** User's email address.
* **password (string, required):** User's password.

**Response:**

```json
{
"_id": "60d6e1d2bcf2e1410c118357",
"email": "jane.doe@example.com"
}
```

* **_id (string):** ID of the newly created user.
* **email (string):** User's email address.

#### GET `/api/users/{userId}`

**Description:** Retrieves a user profile by user ID.

**Authorization:** Bearer token required.

**URL Parameters:**

* **userId (string, required):** ID of the user to retrieve.

**Example:** `/api/users/60d6e1d2bcf2e1410c118357`

**Response:**

```json
{
"_id": "60d6e1d2bcf2e1410c118357",
"email": "jane.doe@example.com"
}
```

* **_id (string):** ID of the user.
* **email (string):** User's email address.

#### GET `/api/users/{userId}/questions`

**Description:** Retrieves all questions asked by a user.

**Authorization:** Bearer token required.

**URL Parameters:**

* **userId (string, required):** ID of the user to retrieve questions for.

**Example:** `/api/users/60d6e1d2bcf2e1410c118357/questions`

**Response:**

```json
[
{
"userId": "60d6e1d2bcf2e1410c118357",
"content": "What is the capital of France?",
"answer": "Paris"
},
{
"userId": "60d6e1d2bcf2e1410c118357",
"content": "Who is the president of the USA?",
"answer": "Joe Biden"
}
]
```

* **Array of question objects:** Each containing:
* **userId (string):** ID of the user who asked the question.
* **content (string):** User's question content.
* **answer (string):** AI-generated answer to the question.

## Testing

Run unit tests using Jest:

```bash
npm test
```

## Deployment

### Docker

1. Build and run the Docker container:

```bash
docker-compose up --build
```

### AWS/GCP Deployment

1. Deploy the application to AWS/GCP using ECS, EC2, RDS, and other managed services. Refer to the architecture diagram for details.

## Architecture

The architecture includes components like:
