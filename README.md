<div align="center">

# 🏏 Power11 Backend

<img src="https://img.shields.io/badge/Version-2.0.0-blue?style=for-the-badge" alt="Version"/>

### 🎯 Enterprise-Grade Fantasy Sports Platform

#### Built with Microservices Architecture for Scale, Reliability & Performance

<br/>

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![RabbitMQ](https://img.shields.io/badge/RabbitMQ-3.x-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)](https://www.rabbitmq.com/)

<br/>

[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=flat-square)](.)
[![Coverage](https://img.shields.io/badge/Coverage-85%25-green?style=flat-square)](.)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square)](.)

---

**🚀 Scalable** · **🔒 Secure** · **⚡ High Performance** · **🎮 Real-time**

*A production-ready backend powering fantasy sports gaming with real-time contests, intelligent team management, live leaderboards, and secure multi-gateway payments.*

[Getting Started](#-quick-start) · [Architecture](#-architecture) · [Services](#-microservices) · [API Docs](#-api-documentation) · [Contributing](#-contributing)

</div>

---

## 📖 Overview

**Power11** is a comprehensive fantasy sports platform backend engineered using a **distributed microservices architecture**. The system empowers users to create fantasy teams, participate in contests, track live leaderboards, and manage payments through secure, multi-gateway payment processing.

### 🎯 Key Highlights

| Feature | Description |
|:--------|:------------|
| 🏗️ **Microservices Architecture** | 9 independently deployable services for maximum scalability |
| 🔐 **Enterprise Security** | JWT authentication, rate limiting, and encrypted communications |
| ⚡ **Real-time Processing** | Live match updates, instant leaderboard calculations |
| 💳 **Multi-Gateway Payments** | eSewa, Khalti, and Stripe integration |
| 📧 **Async Notifications** | RabbitMQ-powered email and push notifications |
| 🐳 **Container Ready** | Docker-compose for seamless deployment |

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│                                    🌐 CLIENTS                                        │
│                       (Web App / Mobile App / Third-party APIs)                      │
└─────────────────────────────────────────┬────────────────────────────────────────────┘
                                          │ HTTPS
                                          ▼
┌──────────────────────────────────────────────────────────────────────────────────────┐
│                            🚀 API GATEWAY (Port 3000)                                │
│     ┌──────────────┬──────────────┬──────────────┬──────────────┬──────────────┐    │
│     │   🛡️ CORS    │  ⏱️ Rate     │   🔐 JWT     │  📝 Request  │   🔀 Proxy   │    │
│     │   Handler   │   Limiter    │  Validator   │   Logging    │   Router     │    │
│     └──────────────┴──────────────┴──────────────┴──────────────┴──────────────┘    │
└─────────────────────────────────────────┬────────────────────────────────────────────┘
                                          │
          ┌───────────────┬───────────────┼───────────────┬───────────────┐
          ▼               ▼               ▼               ▼               ▼
   ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
   │   🔐 Auth   │ │  🏏 Player  │ │   👥 Team   │ │  🏆 Contest │ │📊Leaderboard│
   │  Service    │ │    Game     │ │   Service   │ │   Service   │ │   Service   │
   │  (:3001)    │ │   (:3002)   │ │   (:3003)   │ │   (:3004)   │ │   (:3005)   │
   │ PostgreSQL  │ │   MongoDB   │ │   MongoDB   │ │   MongoDB   │ │   MongoDB   │
   └──────┬──────┘ └──────┬──────┘ └──────┬──────┘ └──────┬──────┘ └──────┬──────┘
          │               │               │               │               │
          └───────────────┴───────────────┼───────────────┴───────────────┘
                                          │
                                          ▼
                          ┌───────────────────────────────┐
                          │    🐰 RabbitMQ Message Bus    │
                          │      (Async Communication)    │
                          └───────────────┬───────────────┘
                                          │
                    ┌─────────────────────┼─────────────────────┐
                    ▼                     ▼                     ▼
          ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
          │  💳 Payment     │   │  🏏 Match       │   │  📧 Reminder    │
          │    Service      │   │    Service      │   │    Service      │
          │    (:3006)      │   │    (:3008)      │   │    (:3007)      │
          │   PostgreSQL    │   │    MongoDB      │   │   PostgreSQL    │
          └─────────────────┘   └─────────────────┘   └─────────────────┘
```

---

## 📦 Microservices

<table>
<tr>
<th>Service</th>
<th>Description</th>
<th>Port</th>
<th>Database</th>
<th>Status</th>
</tr>
<tr>
<td><a href="./01_Apigateway_microservice">🚀 API Gateway</a></td>
<td>Central entry point with routing, rate limiting & JWT validation</td>
<td><code>3000</code></td>
<td>-</td>
<td>✅ Active</td>
</tr>
<tr>
<td><a href="./02_Auth_microservice">🔐 Auth Service</a></td>
<td>User authentication, registration & token management</td>
<td><code>3001</code></td>
<td>PostgreSQL</td>
<td>✅ Active</td>
</tr>
<tr>
<td><a href="./03_Remainder_microservice">📧 Reminder Service</a></td>
<td>Email notifications, cron jobs & queue processing</td>
<td><code>3007</code></td>
<td>PostgreSQL</td>
<td>✅ Active</td>
</tr>
<tr>
<td><a href="./04_Player_Game_microservice">🏏 Player & Game</a></td>
<td>Player profiles, statistics & game data management</td>
<td><code>3002</code></td>
<td>MongoDB</td>
<td>✅ Active</td>
</tr>
<tr>
<td><a href="./05_Team_microservice">👥 Team Service</a></td>
<td>Fantasy team creation, validation & management</td>
<td><code>3003</code></td>
<td>MongoDB</td>
<td>✅ Active</td>
</tr>
<tr>
<td><a href="./06_Contest_microservice">🏆 Contest Service</a></td>
<td>Contest creation, entry & prize distribution</td>
<td><code>3004</code></td>
<td>MongoDB</td>
<td>✅ Active</td>
</tr>
<tr>
<td><a href="./07_Leaderboard_microservice">📊 Leaderboard</a></td>
<td>Live rankings, points calculation & standings</td>
<td><code>3005</code></td>
<td>MongoDB</td>
<td>✅ Active</td>
</tr>
<tr>
<td><a href="./08_Match_microservice">⚽ Match Service</a></td>
<td>Match scheduling, live scores & match management</td>
<td><code>3008</code></td>
<td>MongoDB</td>
<td>✅ Active</td>
</tr>
<tr>
<td><a href="./09_Payment_microservice">💳 Payment Service</a></td>
<td>Multi-gateway payments (eSewa, Khalti, Stripe)</td>
<td><code>3006</code></td>
<td>PostgreSQL</td>
<td>✅ Active</td>
</tr>
</table>

---

## 🚀 Quick Start

### Prerequisites

<table>
<tr>
<td>✅ <b>Node.js</b></td>
<td>v18.x or higher</td>
</tr>
<tr>
<td>✅ <b>npm</b></td>
<td>v9.x or higher</td>
</tr>
<tr>
<td>✅ <b>PostgreSQL</b></td>
<td>v15.x</td>
</tr>
<tr>
<td>✅ <b>MongoDB</b></td>
<td>v7.x</td>
</tr>
<tr>
<td>✅ <b>RabbitMQ</b></td>
<td>v3.x</td>
</tr>
<tr>
<td>✅ <b>Docker</b></td>
<td>Optional - for containerized deployment</td>
</tr>
</table>

### 📥 Installation

<details>
<summary><b>1️⃣ Clone the Repository</b></summary>

```bash
git clone https://github.com/your-org/power11-backend.git
cd power11-backend
```
</details>

<details>
<summary><b>2️⃣ Install Dependencies</b></summary>

```bash
# Install dependencies for each microservice
cd 01_Apigateway_microservice && npm install && cd ..
cd 02_Auth_microservice && npm install && cd ..
cd 03_Remainder_microservice && npm install && cd ..
cd 04_Player_Game_microservice && npm install && cd ..
cd 05_Team_microservice && npm install && cd ..
   cd 06_Contest_microservice && npm install && cd ..
cd 07_Leaderboard_microservice && npm install && cd ..
cd 08_Match_microservice && npm install && cd ..
cd 09_Payment_microservice && npm install && cd ..
```
</details>

<details>
<summary><b>3️⃣ Configure Environment Variables</b></summary>

Create `.env` files in each microservice directory. See individual service READMEs for specific configurations.
</details>

<details>
<summary><b>4️⃣ Setup Databases</b></summary>

```bash
# For PostgreSQL-based services (Auth, Reminder, Payment)
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```
</details>

<details>
<summary><b>5️⃣ Start Services</b></summary>

```bash
# Start each service in separate terminals
cd 01_Apigateway_microservice && npm start
cd 02_Auth_microservice && npm start
# ... repeat for other services
```
</details>

### 🐳 Docker Deployment

```bash
# Build and run all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

---

## 🔐 Security Features

<table>
<tr>
<td>🔑</td>
<td><b>JWT Authentication</b></td>
<td>Access and refresh token mechanism with secure rotation</td>
</tr>
<tr>
<td>⏱️</td>
<td><b>Rate Limiting</b></td>
<td>500 requests per 2 minutes per IP to prevent abuse</td>
</tr>
<tr>
<td>🌐</td>
<td><b>CORS Configuration</b></td>
<td>Secure cross-origin request handling with whitelisting</td>
</tr>
<tr>
<td>🔒</td>
<td><b>Password Hashing</b></td>
<td>Bcrypt with configurable salt rounds</td>
</tr>
<tr>
<td>🔗</td>
<td><b>Internal Auth</b></td>
<td>Service-to-service authentication via internal tokens</td>
</tr>
<tr>
<td>✅</td>
<td><b>Input Validation</b></td>
<td>Comprehensive request validation and sanitization</td>
</tr>
</table>

---

## 📡 API Documentation

### Base URL

| Environment | URL |
|-------------|-----|
| **Production** | `https://api.power11.com` |
| **Development** | `http://localhost:3000` |

### 🔐 Authentication Endpoints

| Method | Endpoint | Description |
|:------:|----------|-------------|
| `POST` | `/api/v1/auth/register` | User registration |
| `POST` | `/api/v1/auth/login` | User login |
| `POST` | `/api/v1/auth/refresh` | Refresh access token |
| `POST` | `/api/v1/auth/logout` | User logout |
| `GET` | `/api/v1/auth/profile` | Get user profile |

### 💳 Payment Endpoints

| Method | Endpoint | Description |
|:------:|----------|-------------|
| `POST` | `/api/v1/payment/initiate` | Initialize payment |
| `POST` | `/api/v1/payment/verify` | Verify payment status |
| `GET` | `/api/v1/payment/history` | Get payment history |
| `GET` | `/api/v1/payment/wallet` | Get wallet balance |

### 👥 Team Endpoints

| Method | Endpoint | Description |
|:------:|----------|-------------|
| `GET` | `/api/v1/teams` | Get user's teams |
| `POST` | `/api/v1/teams` | Create new team |
| `PATCH` | `/api/v1/teams/:id` | Update team |
| `DELETE` | `/api/v1/teams/:id` | Delete team |

> 📚 **Complete API Documentation**: See individual microservice READMEs for detailed endpoints.

---

## 🛠️ Tech Stack

<table>
<tr>
<th>Category</th>
<th>Technologies</th>
</tr>
<tr>
<td><b>Runtime</b></td>
<td><img src="https://img.shields.io/badge/Node.js-18.x-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js"/></td>
</tr>
<tr>
<td><b>Framework</b></td>
<td><img src="https://img.shields.io/badge/Express.js-5.x-000000?style=flat-square&logo=express&logoColor=white" alt="Express.js"/></td>
</tr>
<tr>
<td><b>Databases</b></td>
<td><img src="https://img.shields.io/badge/PostgreSQL-15-336791?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL"/> <img src="https://img.shields.io/badge/MongoDB-7.x-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB"/></td>
</tr>
<tr>
<td><b>Message Broker</b></td>
<td><img src="https://img.shields.io/badge/RabbitMQ-3.x-FF6600?style=flat-square&logo=rabbitmq&logoColor=white" alt="RabbitMQ"/></td>
</tr>
<tr>
<td><b>Authentication</b></td>
<td><img src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white" alt="JWT"/> <img src="https://img.shields.io/badge/bcrypt-blue?style=flat-square" alt="bcrypt"/></td>
</tr>
<tr>
<td><b>Payment Gateways</b></td>
<td><img src="https://img.shields.io/badge/Stripe-008CDD?style=flat-square&logo=stripe&logoColor=white" alt="Stripe"/> <img src="https://img.shields.io/badge/eSewa-60BB46?style=flat-square" alt="eSewa"/> <img src="https://img.shields.io/badge/Khalti-5C2D91?style=flat-square" alt="Khalti"/></td>
</tr>
<tr>
<td><b>Containerization</b></td>
<td><img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker"/></td>
</tr>
<tr>
<td><b>Email</b></td>
<td><img src="https://img.shields.io/badge/Nodemailer-22B573?style=flat-square" alt="Nodemailer"/></td>
</tr>
</table>

---

## 📁 Project Structure

```
power11-backend/
│
├── 📁 01_Apigateway_microservice/    # 🚀 API Gateway & Routing
├── 📁 02_Auth_microservice/          # 🔐 Authentication Service
├── 📁 03_Remainder_microservice/     # 📧 Email & Notification Service
├── 📁 04_Player_Game_microservice/   # 🏏 Player & Match Data
├── 📁 05_Team_microservice/          # 👥 Team Management
├── 📁 06_Contest_microservice/       # 🏆 Contest Management
├── 📁 07_Leaderboard_microservice/   # 📊 Leaderboard & Rankings
├── 📁 08_Match_microservice/         # ⚽ Match Management
├── 📁 09_Payment_microservice/       # 💳 Payment Processing
├── 📁 00_Documentation/              # 📚 API Documentation
│
├── 📄 docker-compose.yml             # 🐳 Docker Compose Config
├── 📄 seed-all.js                    # 🌱 Database Seeder
└── 📄 README.md                      # 📖 This file
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/amazing-feature

# 3. Commit your changes
git commit -m '✨ Add amazing feature'

# 4. Push to the branch
git push origin feature/amazing-feature

# 5. Open a Pull Request
```

### 📋 Coding Standards

| Standard | Tool |
|----------|------|
| Code Linting | ESLint |
| API Design | RESTful principles |
| Commit Messages | Conventional Commits |
| Documentation | JSDoc / Markdown |

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

<div align="center">

Built with ❤️ by **Team 11**

</div>

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

**[⬆ Back to Top](#-power11-backend)**

<br/>

<sub>© 2026 Power11. All rights reserved.</sub>

</div>
