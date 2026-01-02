<div align="center">

#  Auth Microservice

### Power11 Fantasy Sports Platform

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Sequelize](https://img.shields.io/badge/Sequelize-6.x-52B0E7?style=flat-square&logo=sequelize&logoColor=white)](https://sequelize.org/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

*Secure user authentication and authorization service with JWT tokens and role-based access control.*

</div>

---

##  Overview

The Auth Microservice handles all **authentication and authorization** operations for the Power11 fantasy sports platform. It provides secure user registration, login, JWT token management, and role-based access control.

##  Features

| Feature | Description |
|---------|-------------|
|  **JWT Authentication** | Secure access and refresh token management |
|  **User Registration** | Complete user signup with email verification |
|  **Password Security** | Bcrypt hashing with configurable salt rounds |
|  **Role-Based Access** | Admin, User role management |
|  **Email Integration** | Email notifications via RabbitMQ |
|  **Token Refresh** | Seamless token renewal mechanism |
|  **Internal Auth** | Service-to-service authentication |

##  Architecture

```

                        AUTH MICROSERVICE                        

                   
     Routes        Controllers      Services            
                   
                                                                 
                                                                 
                          
                                  Repository                   
                          
                                                                 
              
                                                              
                        
   PostgreSQL                        RabbitMQ      JWT     
    Database                          Queue       Tokens   
                        

```

##  Project Structure

```
02_Auth_microservice/
  dockerfile              # Docker configuration
  package.json            # Dependencies and scripts
  README.md               # This file
  src/
      index.js            # Application entry point
      config/
         config.json     # Database configuration
         docker-config.json  # Docker DB config
         server.config.js    # Server settings
      controllers/
         index.js        # Controller exports
         auth.controller.js  # Auth request handlers
      middlewares/
         index.js        # Middleware exports
         internal.service.middleware.js  # Service auth
         user.middleware.js  # User authentication
      migrations/
         20251117070636-create-user.js  # User table migration
      models/
         index.js        # Sequelize initialization
         user.js         # User model definition
      repository/
         curd.repo.js    # Generic CRUD repository
         user.repo.js    # User-specific repository
      services/
         index.js        # Service exports
         curdService.js  # Generic CRUD service
         user.service.js # User business logic
         queue.service.js    # Message queue service
      Routes/
         index.js        # Route definitions
      utlis/
          index.js        # Utility exports
          bcryptHelper.js # Password hashing utilities
          jwtHelper.js    # JWT token utilities
          messageQueue.js # RabbitMQ utilities
```

##  Quick Start

### Prerequisites

- Node.js v18.x or higher
- PostgreSQL v15.x
- RabbitMQ v3.x (for email notifications)
- npm v9.x or higher

### Installation

1. **Navigate to the service directory**
   ```bash
   cd 02_Auth_microservice
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=3001
   NODE_ENV=development
   
   # JWT Configuration
   PRIVATEJWT=your_jwt_secret_key
   PRIVATEJWTRefersh=your_refresh_jwt_secret_key
   
   # Internal Service Communication
   INTERNAL_SERVER_TOKEN=your_internal_service_token
   
   # Email Configuration
   EMAIL_ID=your-email@gmail.com
   EMAIL_PASS=your-app-password
   
   # Payment Service URL
   PAYMENT_BACKEND_URL=http://localhost:3006
   FORTEND_SUCESS_URL=http://localhost:5173/success
   
   # RabbitMQ Configuration
   MESSAGE_BROKER_URL=amqp://localhost
   CHANNEL_NAME=AUTH_CHANNEL
   EXCHANGE_NAME=AUTH_MICROSERVICE
   REMINDER_BINDING_KEY=REMINDER_AUTH_SERVICE
   ```

4. **Configure database**
   
   Update `src/config/config.json`:
   ```json
   {
     "development": {
       "username": "your_postgres_username",
       "password": "your_postgres_password",
       "database": "power11_auth",
       "host": "127.0.0.1",
       "dialect": "postgres"
     }
   }
   ```

5. **Run database migrations**
   ```bash
   npx sequelize-cli db:migrate
   ```

6. **Start the server**
   ```bash
   npm start
   ```

   The service will be running at `http://localhost:3001`

##  API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/v1/auth/register` | Register new user | No |
| `POST` | `/api/v1/auth/login` | User login | No |
| `POST` | `/api/v1/auth/refresh` | Refresh access token | Refresh Token |
| `POST` | `/api/v1/auth/logout` | User logout | Yes |
| `GET` | `/api/v1/auth/profile` | Get user profile | Yes |
| `PATCH` | `/api/v1/auth/profile` | Update user profile | Yes |

### Request/Response Examples

#### Register User
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

##  Database Schema

### User Model

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | INTEGER | Primary Key, Auto Increment |
| `name` | STRING | Required |
| `email` | STRING | Required, Unique |
| `password` | STRING | Required, Encrypted |
| `role` | ENUM | 'admin', 'user' (Default: 'user') |
| `createdAt` | TIMESTAMP | Auto-generated |
| `updatedAt` | TIMESTAMP | Auto-generated |

##  Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `express` | ^5.1.0 | Web framework |
| `sequelize` | ^6.37.7 | PostgreSQL ORM |
| `pg` | ^8.16.3 | PostgreSQL driver |
| `bcrypt` | ^6.0.0 | Password hashing |
| `jsonwebtoken` | ^9.0.2 | JWT authentication |
| `amqplib` | ^0.10.9 | RabbitMQ client |
| `nodemailer` | ^7.0.10 | Email sending |
| `cookie-parser` | ^1.4.7 | Cookie handling |
| `dotenv` | ^17.2.3 | Environment config |
| `axios` | ^1.13.2 | HTTP client |

##  Security

- **Password Hashing**: Bcrypt with salt rounds
- **JWT Tokens**: Access (15min) + Refresh (7d) tokens
- **Token Storage**: HTTP-only cookies for refresh tokens
- **Input Validation**: Request body validation
- **Rate Limiting**: Applied via API Gateway

##  Docker

### Build Image
```bash
docker build -t power11-auth-service .
```

### Run Container
```bash
docker run -d \
  --name auth-service \
  -p 3001:3001 \
  --env-file .env \
  power11-auth-service
```

##  Development

```bash
# Start with hot reload
npm start

# Run migrations
npx sequelize-cli db:migrate

# Create new migration
npx sequelize-cli migration:generate --name migration-name

# Undo last migration
npx sequelize-cli db:migrate:undo
```

##  Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Open a Pull Request

##  License

This project is licensed under the **MIT License**.

---

<div align="center">

**[ Back to Main README](../README.md)**

</div>
