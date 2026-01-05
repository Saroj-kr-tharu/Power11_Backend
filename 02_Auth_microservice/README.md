<div align="center">

# 🔐 Auth Microservice

<img src="https://img.shields.io/badge/Service-Authentication-red?style=for-the-badge" alt="Service"/>

### Power11 Fantasy Sports Platform

<br/>

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Sequelize](https://img.shields.io/badge/Sequelize-6.x-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)](https://sequelize.org/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

<br/>

**🔑 Secure** · **⚡ Fast** · **🛡️ Reliable** · **📧 Integrated**

*Enterprise-grade authentication service with JWT tokens, role-based access control, and seamless email integration.*

</div>

---

## 📖 Overview

The **Auth Microservice** handles all **authentication and authorization** operations for the Power11 fantasy sports platform. It provides secure user registration, login, JWT token management, password encryption, and role-based access control.

### 🎯 Key Capabilities

| Capability | Description |
|:-----------|:------------|
| 🔑 **Token Management** | Access & refresh token lifecycle management |
| 👤 **User Management** | Registration, profile updates, and account management |
| 🔒 **Password Security** | Industry-standard bcrypt hashing |
| 👑 **Role-Based Access** | Granular permission control (Admin, User) |
| 📧 **Email Integration** | Async notifications via RabbitMQ |

---

## ✨ Features

<table>
<tr>
<td align="center">🔑</td>
<td><b>JWT Authentication</b></td>
<td>Secure access tokens (15min) and refresh tokens (7 days)</td>
</tr>
<tr>
<td align="center">👤</td>
<td><b>User Registration</b></td>
<td>Complete signup flow with validation and email verification</td>
</tr>
<tr>
<td align="center">🔒</td>
<td><b>Password Security</b></td>
<td>Bcrypt hashing with configurable salt rounds (12+)</td>
</tr>
<tr>
<td align="center">👑</td>
<td><b>Role-Based Access</b></td>
<td>Admin and User role management with permissions</td>
</tr>
<tr>
<td align="center">📧</td>
<td><b>Email Integration</b></td>
<td>Async email notifications via RabbitMQ message queue</td>
</tr>
<tr>
<td align="center">🔄</td>
<td><b>Token Refresh</b></td>
<td>Seamless token renewal without re-authentication</td>
</tr>
<tr>
<td align="center">🔗</td>
<td><b>Internal Auth</b></td>
<td>Secure service-to-service authentication</td>
</tr>
<tr>
<td align="center">🍪</td>
<td><b>Secure Cookies</b></td>
<td>HTTP-only cookies for refresh token storage</td>
</tr>
</table>

---

## 🏗️ Architecture

```
                              ┌─────────────────────┐
                              │   🌐 API Gateway    │
                              │      (:3000)        │
                              └──────────┬──────────┘
                                         │
                                         ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                         🔐 AUTH MICROSERVICE (:3001)                             │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│   ┌───────────┐    ┌───────────────┐    ┌───────────────┐                       │
│   │  Routes   │───▶│  Controllers  │───▶│   Services    │                       │
│   │   Layer   │    │     Layer     │    │     Layer     │                       │
│   └───────────┘    └───────────────┘    └───────┬───────┘                       │
│                                                 │                                │
│                                        ┌────────┴────────┐                       │
│                                        │   Repository    │                       │
│                                        │     Layer       │                       │
│                                        └────────┬────────┘                       │
│                                                 │                                │
└─────────────────────────────────────────────────┼────────────────────────────────┘
                                                  │
          ┌───────────────────────────────────────┼───────────────────────┐
          ▼                                       ▼                       ▼
┌─────────────────────┐             ┌─────────────────────┐    ┌─────────────────┐
│   🗄️ PostgreSQL    │             │   🐰 RabbitMQ       │    │   🔑 JWT        │
│      Database       │             │     Message Queue   │    │    Tokens       │
│  ┌───────────────┐  │             │  ┌───────────────┐  │    │                 │
│  │    Users      │  │             │  │ Email Events  │  │    │ • Access Token  │
│  │    Roles      │  │             │  │ Login Alerts  │  │    │ • Refresh Token │
│  └───────────────┘  │             │  └───────────────┘  │    └─────────────────┘
└─────────────────────┘             └─────────────────────┘
```

---

## 📁 Project Structure

```
02_Auth_microservice/
│
├── 📄 dockerfile                    # Docker configuration
├── 📄 package.json                  # Dependencies and scripts
├── 📄 README.md                     # This documentation
│
└── 📁 src/
    ├── 📄 index.js                  # 🚀 Application entry point
    │
    ├── 📁 config/
    │   ├── 📄 config.json           # Database configuration
    │   ├── 📄 docker-config.json    # Docker DB configuration
    │   └── 📄 server.config.js      # Server settings
    │
    ├── 📁 controllers/
    │   ├── 📄 index.js              # Controller exports
    │   └── 📄 auth.controller.js    # Auth request handlers
    │
    ├── 📁 middlewares/
    │   ├── 📄 index.js              # Middleware exports
    │   ├── 📄 internal.service.middleware.js  # Service auth
    │   └── 📄 user.middleware.js    # User authentication
    │
    ├── 📁 migrations/
    │   └── 📄 *-create-user.js      # User table migration
    │
    ├── 📁 models/
    │   ├── 📄 index.js              # Sequelize initialization
    │   └── 📄 user.js               # User model definition
    │
    ├── 📁 repository/
    │   ├── 📄 curd.repo.js          # Generic CRUD repository
    │   └── 📄 user.repo.js          # User-specific repository
    │
    ├── 📁 services/
    │   ├── 📄 index.js              # Service exports
    │   ├── 📄 curdService.js        # Generic CRUD service
    │   ├── 📄 user.service.js       # User business logic
    │   └── 📄 queue.service.js      # Message queue service
    │
    ├── 📁 Routes/
    │   └── 📄 index.js              # Route definitions
    │
    └── 📁 utlis/
        ├── 📄 index.js              # Utility exports
        ├── 📄 bcryptHelper.js       # Password hashing utilities
        ├── 📄 jwtHelper.js          # JWT token utilities
        └── 📄 messageQueue.js       # RabbitMQ utilities
```

---

## 🚀 Quick Start

### Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | v18.x or higher |
| PostgreSQL | v15.x |
| RabbitMQ | v3.x |
| npm | v9.x or higher |

### 📥 Installation

```bash
# 1️⃣ Navigate to the service directory
cd 02_Auth_microservice

# 2️⃣ Install dependencies
npm install

# 3️⃣ Configure environment variables
cp .env.example .env

# 4️⃣ Run database migrations
npx sequelize-cli db:migrate

# 5️⃣ Start the server
npm start
```

### ⚙️ Environment Configuration

```env
# ═══════════════════════════════════════════════════════════
# 🔐 AUTH MICROSERVICE CONFIGURATION
# ═══════════════════════════════════════════════════════════

# Server Configuration
PORT=3001
NODE_ENV=development

# ═══════════════════════════════════════════════════════════
# 🔑 JWT CONFIGURATION
# ═══════════════════════════════════════════════════════════
PRIVATEJWT=your_super_secret_jwt_key_here
PRIVATEJWTRefersh=your_super_secret_refresh_key_here

# ═══════════════════════════════════════════════════════════
# 🔗 SERVICE COMMUNICATION
# ═══════════════════════════════════════════════════════════
INTERNAL_SERVER_TOKEN=your_internal_service_token
PAYMENT_BACKEND_URL=http://localhost:3006
FORTEND_SUCESS_URL=http://localhost:5173/success

# ═══════════════════════════════════════════════════════════
# 📧 EMAIL CONFIGURATION
# ═══════════════════════════════════════════════════════════
EMAIL_ID=your-email@gmail.com
EMAIL_PASS=your-app-password

# ═══════════════════════════════════════════════════════════
# 🐰 RABBITMQ CONFIGURATION
# ═══════════════════════════════════════════════════════════
MESSAGE_BROKER_URL=amqp://localhost
CHANNEL_NAME=AUTH_CHANNEL
EXCHANGE_NAME=AUTH_MICROSERVICE
REMINDER_BINDING_KEY=REMINDER_AUTH_SERVICE
```

### 🗄️ Database Configuration

Update `src/config/config.json`:

```json
{
  "development": {
    "username": "your_postgres_username",
    "password": "your_postgres_password",
    "database": "power11_auth",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "prod_user",
    "password": "prod_password",
    "database": "power11_auth_prod",
    "host": "your-db-host",
    "dialect": "postgres",
    "logging": false
  }
}
```

---

## 📡 API Endpoints

### 🔐 Authentication

| Method | Endpoint | Description | Auth |
|:------:|:---------|:------------|:----:|
| `POST` | `/api/v1/auth/register` | Register new user | ❌ |
| `POST` | `/api/v1/auth/login` | User login | ❌ |
| `POST` | `/api/v1/auth/refresh` | Refresh access token | 🔄 |
| `POST` | `/api/v1/auth/logout` | User logout | ✅ |
| `GET` | `/api/v1/auth/profile` | Get user profile | ✅ |
| `PATCH` | `/api/v1/auth/profile` | Update user profile | ✅ |

### 📝 Request/Response Examples

<details>
<summary><b>📥 Register User</b></summary>

**Request:**
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2026-01-05T10:00:00.000Z"
  }
}
```
</details>

<details>
<summary><b>🔑 Login</b></summary>

**Request:**
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```
</details>

<details>
<summary><b>🔄 Refresh Token</b></summary>

**Request:**
```http
POST /api/v1/auth/refresh
Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```
</details>

---

## 🗃️ Database Schema

### User Model

| Column | Type | Constraints | Description |
|:-------|:-----|:------------|:------------|
| `id` | INTEGER | PK, Auto Increment | Unique identifier |
| `name` | STRING | NOT NULL | User's full name |
| `email` | STRING | NOT NULL, UNIQUE | Email address |
| `password` | STRING | NOT NULL | Bcrypt hashed password |
| `role` | ENUM | DEFAULT 'user' | 'admin' or 'user' |
| `createdAt` | TIMESTAMP | Auto-generated | Creation timestamp |
| `updatedAt` | TIMESTAMP | Auto-generated | Last update timestamp |

---

## 🔐 Security Implementation

### Token Strategy

```
┌─────────────────────────────────────────────────────────────────┐
│                      TOKEN LIFECYCLE                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  🔑 Access Token                    🔄 Refresh Token            │
│  ├── Lifetime: 15 minutes          ├── Lifetime: 7 days        │
│  ├── Storage: Memory/Header        ├── Storage: HTTP-only Cookie│
│  ├── Usage: API Authorization      ├── Usage: Token Renewal     │
│  └── Contains: userId, role        └── Contains: userId         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Password Hashing

```javascript
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 12;

// Hash password
const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

// Verify password
const isValid = await bcrypt.compare(password, hashedPassword);
```

---

## 📦 Dependencies

| Package | Version | Purpose |
|:--------|:--------|:--------|
| `express` | ^5.1.0 | Web framework |
| `sequelize` | ^6.37.7 | PostgreSQL ORM |
| `pg` | ^8.16.3 | PostgreSQL driver |
| `bcrypt` | ^6.0.0 | Password hashing |
| `jsonwebtoken` | ^9.0.2 | JWT authentication |
| `amqplib` | ^0.10.9 | RabbitMQ client |
| `cookie-parser` | ^1.4.7 | Cookie handling |
| `dotenv` | ^17.2.3 | Environment configuration |
| `axios` | ^1.13.2 | HTTP client |

---

## 🐳 Docker

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
  --network power11-network \
  power11-auth-service
```

---

## 🔧 Development

```bash
# Start with hot reload
npm start

# Run migrations
npx sequelize-cli db:migrate

# Undo last migration
npx sequelize-cli db:migrate:undo

# Create new migration
npx sequelize-cli migration:generate --name migration-name

# Seed database
npx sequelize-cli db:seed:all
```

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

**[⬆ Back to Main README](../README.md)**

<br/>

<sub>Part of the Power11 Fantasy Sports Platform</sub>

</div>
