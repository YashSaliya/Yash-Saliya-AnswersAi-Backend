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
- [Contributing](#contributing)
- [License](#license)

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

- **POST /api/auth/register:** Register a new user.
- **POST /api/auth/login:** Login user and get JWT token.
- **POST /api/auth/logout:** Logout user (token invalidation).
- **POST /api/auth/refresh:** Refresh access token.
- **POST /api/questions:** Create a new question and get AI-generated answer.
- **GET /api/questions/:id:** Retrieve a specific question and answer.
- **POST /api/users:** Create a new user account.
- **GET /api/users/:id:** Retrieve a user profile by ID.
- **GET /api/users/:id/questions:** Retrieve all questions asked by a user.

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

- EC2 Instances
- ECS Clusters
- RDS Database (MySQL/PostgreSQL)
- Load Balancer (ELB/ALB)
- Auto Scaling Groups
- CloudWatch for monitoring
- SNS for notifications
