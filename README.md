<div align="center">

# 🏏 Power11 Backend

### Fantasy Sports Platform - Microservices Architecture

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![RabbitMQ](https://img.shields.io/badge/RabbitMQ-3.x-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)](https://www.rabbitmq.com/)

*A scalable, production-ready backend for fantasy sports gaming with real-time contests, team management, and secure payments.*

</div>

---

## 📖 Overview

Power11 is a comprehensive fantasy sports platform backend built using a **microservices architecture**. The system enables users to create fantasy teams, participate in contests, track leaderboards, and manage payments through secure payment gateways.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                               🌐 CLIENTS                                       │
│                    (Web App / Mobile App / Third-party)                        │
└───────────────────────────────────────┬────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                       🚀 API GATEWAY (Port 3000)                               │
│          Rate Limiting │ JWT Validation │ Request Routing │ CORS                │
└───────────────────────────────────────┬────────────────────────────────────────┘
                                        │
        ┌────────────┬──────────────┼──────────────┬────────────┐
        ▼              ▼              ▼              ▼              ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│  🔐 Auth    │ │ 🏏 Player  │ │  👥 Team   │ │ 🏆 Contest │ │📊 Leaderboard│
│  Service   │ │   Game    │ │  Service  │ │  Service  │ │   Service           │
│ (Port 3001)│ │(Port 3002)│ │(Port 3003)│ │(Port 3004)│ │ (Port 3005)         │
└──────┬──────┘ └──────┬──────┘ └──────┬──────┘ └──────┬──────┘ └──────┬──────┘
        │              │               │                │                 │
        └───────--─────┴──────────────┼────────---──────┴────────────┘
                                        ▼
                         ┌─────────────────────────────┐
                         │  🐰 RabbitMQ Message Bus  │
                         └──────────────┬──────────────┘
                                        │
                     ┌──────────────────┴──────────────────┐
                     ▼                                     ▼
           ┌─────────────────┐                 ┌─────────────────┐
           │  💳 Payment    │                  │ 📧 Reminder    │
           │    Service      │                   │    Service      │
           │  (Port 3006)    │                   │  (Port 3007)    │
           └─────────────────┘                 └─────────────────┘
```

## 📦 Microservices

| Service | Description | Port | Database | Status |
|---------|-------------|------|----------|--------|
| [API Gateway](./01_Apigateway_microservice) | Central entry point, routing, rate limiting, JWT validation | 3000 | - | ✅ Active |
| [Auth Service](./02_Auth_microservice) | User authentication, registration, JWT tokens | 3001 | PostgreSQL | ✅ Active |
| [Reminder Service](./03_Remainder_microservice) | Email notifications, cron jobs, queue processing | 3007 | PostgreSQL | ✅ Active |
| [Player & Game Service](./04_Player_Game_microservice) | Player data, match info, game statistics | 3002 | MongoDB | ✅ Active |
| [Team Service](./05_Team_microservice) | Fantasy team creation and management | 3003 | MongoDB | ✅ Active |
| [Contest Service](./06_Contest_microservice) | Contest creation, entry, and management | 3004 | MongoDB | ✅ Active |
| [Leaderboard Service](./07_Leaderboard_microservice) | Rankings, points calculation, leaderboards | 3005 | MongoDB | ✅ Active |
| [Payment Service](./08_Payment_microservice) | Payment processing (eSewa, Khalti, Stripe) | 3006 | PostgreSQL | ✅ Active |

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18.x or higher
- **npm** v9.x or higher
- **PostgreSQL** v15.x
- **MongoDB** v7.x
- **RabbitMQ** v3.x
- **Docker** (optional, for containerized deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/power11-backend.git
   cd power11-backend
   ```

2. **Install dependencies for all microservices**
   ```bash
   # Install dependencies for each microservice
   cd 01_Apigateway_microservice && npm install && cd ..
   cd 02_Auth_microservice && npm install && cd ..
   cd 03_Remainder_microservice && npm install && cd ..
   cd 04_Player_Game_microservice && npm install && cd ..
   cd 05_Team_microservice && npm install && cd ..
   cd 06_Contest_microservice && npm install && cd ..
   cd 07_Leaderboard_microservice && npm install && cd ..
   cd 08_Payment_microservice && npm install && cd ..
   ```

3. **Configure environment variables**
   
   Create `.env` files in each microservice directory. See individual README files for specific configurations.

4. **Setup databases**
   ```bash
   # For PostgreSQL-based services (Auth, Reminder, Payment)
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```

5. **Start services**
   ```bash
   # Start each service in separate terminals
   cd 01_Apigateway_microservice && npm start
   cd 02_Auth_microservice && npm start
   # ... repeat for other services
   ```

### 🐳 Docker Deployment

```bash
# Build and run all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

## 🔐 Security Features

- **JWT Authentication** with access and refresh tokens
- **Rate Limiting** to prevent API abuse
- **CORS Configuration** for secure cross-origin requests
- **Password Hashing** using bcrypt
- **Internal Service Authentication** for microservice communication
- **Input Validation** and sanitization

## 📡 API Documentation

### Base URL
```
Production: https://api.power11.com
Development: http://localhost:3000
```

### Authentication Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | User registration |
| POST | `/api/v1/auth/login` | User login |
| POST | `/api/v1/auth/refresh` | Refresh access token |
| POST | `/api/v1/auth/logout` | User logout |

### Payment Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/payment/initiate` | Initialize payment |
| POST | `/api/v1/payment/verify` | Verify payment status |
| GET | `/api/v1/payment/history` | Get payment history |

> 📚 For complete API documentation, see individual microservice READMEs.

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Runtime** | Node.js 18.x |
| **Framework** | Express.js 5.x |
| **Databases** | PostgreSQL, MongoDB |
| **Message Broker** | RabbitMQ |
| **Authentication** | JWT, bcrypt |
| **Email** | Nodemailer |
| **Payment Gateways** | eSewa, Khalti, Stripe |
| **Containerization** | Docker |
| **Process Manager** | Nodemon (dev), PM2 (prod) |

## 📁 Project Structure

```
power11-backend/
├── 📁 01_Apigateway_microservice/   # API Gateway & Routing
├── 📁 02_Auth_microservice/         # Authentication Service
├── 📁 03_Remainder_microservice/    # Email & Notification Service
├── 📁 04_Player_Game_microservice/  # Player & Match Data
├── 📁 05_Team_microservice/         # Team Management
├── 📁 06_Contest_microservice/      # Contest Management
├── 📁 07_Leaderboard_microservice/  # Leaderboard & Rankings
├── 📁 08_Payment_microservice/      # Payment Processing
├── 📁 00_Documentation/             # API Documentation
├── 📄 docker-compose.yml            # Docker Compose Config
└── 📄 README.md                     # This file
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Standards
- Use ESLint for code linting
- Follow RESTful API design principles
- Write meaningful commit messages
- Add documentation for new features

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👥 Team

Built with ❤️ by **Team 11**

---

<div align="center">

**[⬆ Back to Top](#-power11-backend)**

</div>
