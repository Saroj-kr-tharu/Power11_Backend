<div align="center">

# 🏆 Contest Microservice

### Power11 Fantasy Sports Platform

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

*Contest creation, entry management, and prize distribution for fantasy gaming.*

</div>

---

## 📖 Overview

The Contest Microservice manages all **contest creation, user entries, and prize distribution** for the Power11 fantasy sports platform. It handles different contest types, entry fees, and winning calculations.

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎯 **Contest Creation** | Create various contest types |
| 📝 **Entry Management** | Handle user contest entries |
| 💰 **Prize Pool** | Dynamic prize pool calculation |
| 📊 **Contest Analytics** | Real-time contest statistics |
| 🎮 **Contest Types** | Free, paid, mega contests |
| ✅ **Entry Validation** | Validate entries and payments |

## 🏗️ Architecture

```
                              ┌─────────────────────┐
                              │   🌐 API Gateway    │
                              │      (:3000)        │
                              └──────────┬──────────┘
                                         │
                                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                  🏆 CONTEST MICROSERVICE (:3004)                   │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────┐   ┌─────────────┐   ┌─────────────┐               │
│  │ Routes  │──▶│ Controllers │──▶│  Services   │               │
│  │  Layer  │   │    Layer    │   │    Layer    │               │
│  └─────────┘   └─────────────┘   └──────┬──────┘               │
│                                       │                         │
│                              ┌────────┴────────┐                  │
│                              │   Repository   │                  │
│                              │     Layer      │                  │
│                              └────────┬────────┘                  │
└─────────────────────────────────┼──────────────────────────────┘
                                         │
        ┌─────────────────────────────┼─────────────────────────────┐
        ▼                             ▼                             ▼
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│  🗄️ MongoDB   │       │ 💳 Payment Svc │       │  👥 Team Svc   │
│   (Contests)   │       │   (:3006)     │       │    (:3003)    │
└─────────────────┘       └─────────────────┘       └─────────────────┘
```

## � Security & Service Communication

### Internal Service Token

This microservice uses **Internal Service Token** for secure service-to-service communication.

```
┌─────────────────┐     INTERNAL_SERVER_TOKEN      ┌─────────────────┐
│ Contest Service │ ─────────────────────────────▶ │ Payment Service │
│    (:3004)      │   Header: x-internal-token     │    (:3006)      │
└─────────────────┘                                └─────────────────┘
```

| Security Feature | Description |
|-----------------|-------------|
| 🔑 **Internal Token** | Shared secret for service-to-service auth |
| 🛡️ **JWT Validation** | User requests validated via API Gateway |
| 🔒 **Header Auth** | `x-internal-token` header for internal calls |

### Environment Variables for Security

```env
# Internal Service Communication
INTERNAL_SERVER_TOKEN=your_secure_internal_token

# Service URLs (for internal communication)
PAYMENT_SERVICE_URL=http://localhost:3006
TEAM_SERVICE_URL=http://localhost:3003
```

## �📁 Project Structure

```
06_Contest_microservice/
├── 📄 dockerfile                    # Docker configuration
├── 📄 package.json                  # Dependencies and scripts
├── 📄 README.md                     # This file
└── 📁 src/
    ├── 📄 index.js                  # Application entry point
    ├── 📁 config/
    │   ├── 📄 database.js           # MongoDB connection
    │   └── 📄 server.config.js      # Server settings
    ├── 📁 controllers/              # Request handlers
    ├── 📁 middlewares/              # Custom middleware
    ├── 📁 models/                   # Mongoose models
    ├── 📁 repository/               # Data access layer
    ├── 📁 Routes/                   # API routes
    ├── 📁 services/                 # Business logic
    └── 📁 utlis/                    # Utilities
```

## 🚀 Quick Start

### Prerequisites

- Node.js v18.x or higher
- MongoDB v7.x
- npm v9.x or higher

### Installation

1. **Navigate to the service directory**
   ```bash
   cd 06_Contest_microservice
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file:
   ```env
   PORT=3004
   NODE_ENV=development
   
   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/power11_contests
   
   # JWT Configuration
   PRIVATEJWT=your_jwt_secret_key
   ```

4. **Start the server**
   ```bash
   npm start
   ```

   The service will be running at `http://localhost:3004`

## 📡 API Endpoints

### Contests

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/v1/contests` | Get all contests | No |
| `GET` | `/api/v1/contests/:id` | Get contest by ID | No |
| `GET` | `/api/v1/contests/match/:matchId` | Get contests by match | No |
| `POST` | `/api/v1/contests` | Create contest (Admin) | Yes |
| `POST` | `/api/v1/contests/:id/join` | Join contest | Yes |
| `GET` | `/api/v1/contests/my-contests` | Get user's contests | Yes |

### Contest Types

| Type | Entry Fee | Prize Pool | Max Entries |
|------|-----------|------------|-------------|
| **Free** | ₹0 | Fixed | Unlimited |
| **Practice** | ₹0 | None | Unlimited |
| **Mega** | ₹49-499 | Variable | 10,000+ |
| **Head-to-Head** | ₹10-1000 | 2x Entry | 2 |
| **Private** | Custom | Custom | Custom |

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `express` | ^5.1.0 | Web framework |
| `mongoose` | ^9.1.1 | MongoDB ODM |
| `jsonwebtoken` | ^9.0.2 | JWT authentication |
| `axios` | ^1.13.2 | HTTP client |
| `uuid` | ^13.0.0 | UUID generation |
| `dotenv` | ^17.2.3 | Environment config |

## 🐳 Docker

```bash
# Build Image
docker build -t power11-contest-service .

# Run Container
docker run -d --name contest-service -p 3004:3004 --env-file .env power11-contest-service
```

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

**[⬆ Back to Main README](../README.md)**

</div>
