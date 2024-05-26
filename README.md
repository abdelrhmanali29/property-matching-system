# Property Matching System

## Introduction

The Property Matching System is a platform that connects clients looking to rent or buy properties with relevant ads created by real estate agents. It supports user roles of clients, agents, and admins, providing endpoints for property requests, ads, matching requests with ads, and admin statistics.

## Features

- Create and update property requests
- Create ads
- Match property requests with relevant ads
- Admin statistics endpoint for user ads and requests
- Authentication and authorization with JWT tokens
- Comprehensive API documentation using Swagger
- Integration tests for admin stats endpoint

## Tech Stack

- Node.js
- MongoDB (mongoose)
- Mocha (testing)
- JWT (authentication)
- Docker (containerization)

## Installation

### Prerequisites

- Docker and Docker Compose
- Node.js
- MongoDB

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/property-matching-system.git
   cd property-matching-system
   ```

2. **Install dependencies:**

   ```
   npm install
   ```

3. **Environment variables:**

   Create a .env file in the /app directory and add the necessary environment variables. Here is an example:

   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/property-matching-system
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the application:**

   To start the application in development mode, use:

   ```
   npm run dev
   ```

   This will start the server with hot-reloading enabled.

5. **Seed the database:**

   ```
   npm run seed
   ```

   This command will populate your database with some sample data for testing purposes.

6. **Run Docker (Optional):**

   ```
   docker-compose build
   docker-compose up
   ```

7. **Running Tests:**

   ```
   npm test
   ```

   This will execute the test suite using Mocha.

   ```
   npm run coverage
   ```

   This will check test coverage for this app.

8. **API Documentation:**

   API documentation is available via Swagger. Once the server is running, you can access it at:

   ```
   http://localhost:3000/api-docs
   ```

   This will provide comprehensive documentation of all available endpoints, including request and response formats.

## Conclusion

You should now have the Property Matching System up and running on your local machine. You can start creating property requests, ads, and exploring the various features of the platform. If you encounter any issues, please refer to the project's repository or open an issue for assistance.
