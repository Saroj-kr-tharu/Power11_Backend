<div align="center">

# 🚀 API Gateway Microservice

<img src="https://img.shields.io/badge/Service-API_Gateway-blueviolet?style=for-the-badge" alt="Service"/>

### Power11 Fantasy Sports Platform

<br/>

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-ISC-green?style=for-the-badge)](LICENSE)

<br/>

**🔀 Routing** · **🛡️ Security** · **⚡ Performance** · **📊 Monitoring**

*Central entry point for all client requests with intelligent routing, rate limiting, JWT validation, and cross-origin resource sharing.*

---

![Version](https://img.shields.io/badge/version-1.0.0-blue?style=flat-square)
![Status](https://img.shields.io/badge/status-active-success?style=flat-square)
![Last Updated](https://img.shields.io/badge/last%20updated-January%202026-informational?style=flat-square)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#️-architecture)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Configuration](#️-configuration-details)
- [API Routes](#-route-mapping)
- [Dependencies](#-dependencies)
- [Docker](#-docker)
- [Development](#-development)
- [Health Check](#-health-check)
- [Security](#-security-best-practices)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📖 Overview

The **API Gateway** serves as the **single entry point** for all client requests in the Power11 microservices ecosystem. It acts as a reverse proxy, routing requests to appropriate backend services while handling cross-cutting concerns like authentication, rate limiting, and logging.

### 🎯 Why API Gateway?

| Benefit | Description |
|:--------|:------------|
| 🔐 **Centralized Security** | Single point for JWT validation and authentication |
| 🚦 **Traffic Control** | Rate limiting and request throttling |
| 📍 **Single Entry Point** | Simplified client integration |
| 📝 **Unified Logging** | Centralized request/response logging with Morgan |
| 🔄 **Request Transformation** | Header manipulation and request routing |
| 👤 **Role-Based Access** | Admin and User middleware verification |

---

## ✨ Features

<table>
<tr>
<td align="center">🔄</td>
<td><b>Intelligent Routing</b></td>
<td>Smart proxy routing to 7+ microservices based on URL patterns</td>
</tr>
<tr>
<td align="center">🛡️</td>
<td><b>Rate Limiting</b></td>
<td>Protection against API abuse with <b>50 requests per 2 minutes</b> per IP</td>
</tr>
<tr>
<td align="center">🔐</td>
<td><b>JWT Validation</b></td>
<td>Token verification for all protected routes via <code>x-access-token</code> header</td>
</tr>
<tr>
<td align="center">🌐</td>
<td><b>CORS Support</b></td>
<td>Secure cross-origin request handling with origin whitelisting</td>
</tr>
<tr>
<td align="center">📝</td>
<td><b>Request Logging</b></td>
<td>Comprehensive HTTP request logging with Morgan (combined format)</td>
</tr>
<tr>
<td align="center">⚡</td>
<td><b>High Performance</b></td>
<td>Optimized http-proxy-middleware for minimal latency</td>
</tr>
<tr>
<td align="center">🔌</td>
<td><b>Health Checks</b></td>
<td>Service health monitoring via <code>/ping</code> endpoint</td>
</tr>
<tr>
<td align="center">💳</td>
<td><b>Multi-Payment</b></td>
<td>Support for eSewa, Khalti, Stripe, and COD payment gateways</td>
</tr>
</table>

---

## 🏗️ Architecture

```
                                    ┌─────────────────────┐
                                    │   🌐 Client Apps    │
                                    │  (Web/Mobile/API)   │
                                    └──────────┬──────────┘
                                               │ HTTPS
                                               ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                           🚀 API GATEWAY (PORT: 3000)                            │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│   ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐       │
│   │  CORS   │───▶│  Rate   │───▶│ Morgan  │───▶│   JWT   │───▶│  Proxy  │       │
│   │ Handler │    │ Limiter │    │ Logger  │    │Validator│    │ Router  │       │
│   │         │    │50/2min  │    │Combined │    │         │    │         │       │
│   └─────────┘    └─────────┘    └─────────┘    └─────────┘    └────┬────┘       │
│                                                                     │            │
└─────────────────────────────────────────────────────────────────────┼────────────┘
                                                                      │
        ┌─────────────┬─────────────┬─────────────┬─────────────┬─────┴─────┐
        ▼             ▼             ▼             ▼             ▼           ▼
  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
  │ 🔐 Auth  │ │ 🏏 Player│ │ 👥 Team  │ │🏆 Contest│ │📊 Leader │ │💳 Payment│
  │ Service  │ │ Service  │ │ Service  │ │ Service  │ │  board   │ │ Service  │
  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘
              
                              ┌──────────┐
                              │ ⚽ Match │
                              │ Service  │
                              └──────────┘
```

### 🔄 Request Flow

```
Client Request → CORS Check → Rate Limit → Morgan Log → JWT Verify* → Proxy → Microservice
                                                           ↑
                                              *Protected routes only
```

---

## 📁 Project Structure

```
01_Apigateway_microservice/
│
├── 📄 Dockerfile                    # Docker container configuration
├── 📄 package.json                  # Dependencies & npm scripts
├── 📄 readme.md                     # Documentation (this file)
├── 📄 .env                          # Environment variables (not tracked)
│
└── 📁 src/
    │
    ├── 📄 index.js                  # 🚀 Application entry point
    │                                 # - Express server setup
    │                                 # - CORS, Rate limiting, Morgan
    │                                 # - Route mounting
    │
    ├── 📁 middlewares/
    │   ├── 📄 index.js              # Middleware barrel exports
    │   └── 📄 user.middleware.js    # 🔐 JWT verification middleware
    │                                 # - verifyUser(): Validates user tokens
    │                                 # - verifyAdmin(): Admin role checking
    │
    ├── 📁 routes/
    │   ├── 📄 index.js              # Route aggregator/barrel exports
    │   ├── 📄 auth.routes.js        # 🔐 /auth/* - Authentication endpoints
    │   ├── 📄 payment.routes.js     # 💳 /payment/* - Payment processing
    │   ├── 📄 gameplayer.routes.js  # 🏏 /gameplayer/* - Player data
    │   ├── 📄 team.routes.js        # 👥 /team/* - Team management
    │   ├── 📄 contest.routes.js     # 🏆 /contest/* - Contest operations
    │   ├── 📄 leaderboard.routes.js # 📊 /leaderboard/* - Rankings
    │   └── 📄 match.routes.js       # ⚽ /match/* - Match management
    │
    ├── 📁 serverConfig/
    │   └── 📄 server.config.js      # ⚙️ Environment configuration loader
    │
    └── 📁 utlis/
        ├── 📄 index.js              # Utility barrel exports
        ├── 📄 jwtHelper.js          # 🔑 JWT sign/verify utilities
        └── 📁 Errors/
            └── 📄 https_codes.js    # HTTP status code constants
```

---

## 🚀 Quick Start

### Prerequisites

| Requirement | Version | Notes |
|-------------|---------|-------|
| Node.js | v18.x or higher | LTS recommended |
| npm | v9.x or higher | Comes with Node.js |
| Docker | Latest | Optional, for containerization |

### 📥 Installation

```bash
# 1️⃣ Clone the repository (if not already done)
git clone <repository-url>

# 2️⃣ Navigate to the service directory
cd 01_Apigateway_microservice

# 3️⃣ Install dependencies
npm install

# 4️⃣ Create environment file
cp .env.example .env
# Then edit .env with your configuration

# 5️⃣ Start the development server
npm start
```

### ✅ Verify Installation

```bash
# Test if the gateway is running
curl http://localhost:3000/ping

# Expected response:
# {"message":"api gateway is good to go"}
```

### ⚙️ Environment Configuration

Create a `.env` file in the root directory:

```env
# ═══════════════════════════════════════════════════════════
# 🚀 API GATEWAY CONFIGURATION
# ═══════════════════════════════════════════════════════════

# Server Configuration
PORT=3000
NODE_ENV=development

# Frontend URL (for CORS whitelist)
FORTEND_URL=http://localhost:4200

# ═══════════════════════════════════════════════════════════
# 🔗 BACKEND MICROSERVICE URLs
# ═══════════════════════════════════════════════════════════
AUTH_BACKEND_URL=http://localhost:3001
PLAYER_GAME_BACKEND_URL=http://localhost:3002
TEAM_BACKEND_URL=http://localhost:3003
CONTEST_BACKEND_URL=http://localhost:3004
LEADERBOARD_BACKEND_URL=http://localhost:3005
PAYMENT_BACKEND_URL=http://localhost:3006
MATCH_BACKEND_URL=http://localhost:3008

# ═══════════════════════════════════════════════════════════
# 🔐 SECURITY CONFIGURATION
# ═══════════════════════════════════════════════════════════
PRIVATEJWT=your_jwt_access_token_secret
RefreshPRIVATEJWT=your_jwt_refresh_token_secret
INTERNAL_SERVER_TOKEN=your_internal_service_communication_token
```

> ⚠️ **Security Note**: Never commit `.env` files to version control. Add `.env` to your `.gitignore`.

---

## ⚙️ Configuration Details

### 🛡️ Rate Limiting

The gateway uses `express-rate-limit` to prevent API abuse:

```javascript
const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,    // 2-minute sliding window
  max: 50,                     // Maximum 50 requests per window per IP
});
```

| Setting | Value | Description |
|---------|-------|-------------|
| Window | 2 minutes | Time frame for counting requests |
| Max Requests | 50 | Requests allowed per window |
| Response | 429 | Too Many Requests status code |

### 🔄 Proxy Configuration

Each microservice route uses `http-proxy-middleware`:

```javascript
const { createProxyMiddleware } = require("http-proxy-middleware");

const authProxy = createProxyMiddleware({
  target: process.env.AUTH_BACKEND_URL,      // Target microservice URL
  changeOrigin: true,                         // Changes host header to target
  pathRewrite: { "": "/auth" },              // Path transformation
  headers: { "x-internal-server-token": INTERNAL_SERVER_TOKEN },
  logLevel: "debug",                          // Logging level
});
```

### 🌐 CORS Configuration

Cross-Origin Resource Sharing is configured with strict whitelisting:

```javascript
const allowedOrigins = ['http://localhost:4200'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,                                    // Allow cookies
  methods: ['GET', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token'],
  maxAge: 86400,                                        // Preflight cache: 24 hours
  optionsSuccessStatus: 204
}));
```

---

## 📡 Route Mapping

### Core API Routes

| Route Pattern | Target Service | Description | Auth Required |
|:--------------|:---------------|:------------|:-------------:|
| `/auth/*` | Auth Service | Authentication & user management | Partial |
| `/gameplayer/*` | Player Service | Player data & statistics | ✅ |
| `/team/*` | Team Service | Fantasy team management | ✅ |
| `/contest/*` | Contest Service | Contest operations | ✅ |
| `/leaderboard/*` | Leaderboard Service | Rankings & scores | ✅ |
| `/payment/*` | Payment Service | Payment processing | ✅ |
| `/match/*` | Match Service | Match management | ✅ |
| `/ping` | Gateway | Health check endpoint | ❌ |

### 🔐 Authentication Routes (`/auth`)

| Method | Endpoint | Auth | Description |
|:------:|:---------|:----:|:------------|
| POST | `/auth/signup` | ❌ | User registration |
| POST | `/auth/login` | ❌ | User login |
| GET | `/auth/veriyToken` | ✅ | Token verification |
| POST | `/auth/refresh-token` | ❌ | Refresh access token |
| POST | `/auth/logout` | ❌ | User logout |
| GET | `/auth/check` | ❌ | Auth service health |

### 💳 Payment Routes (`/payment`)

| Method | Endpoint | Auth | Description |
|:------:|:---------|:----:|:------------|
| POST | `/payment/initialize-esewa` | ✅ | Initialize eSewa payment |
| GET | `/payment/complete-payment` | ❌ | eSewa callback handler |
| POST | `/payment/epayment/initiate/` | ✅ | Initialize Khalti payment |
| GET | `/payment/khalti/complete/payment` | ❌ | Khalti callback handler |
| POST | `/payment/stripe-initiate/` | ✅ | Initialize Stripe payment |
| GET | `/payment/stripe-complete-payment` | ❌ | Stripe success callback |
| GET | `/payment/stripe-failed-payment` | ❌ | Stripe failure callback |
| POST | `/payment/cod-initiate` | ✅ | Cash on Delivery initiation |

### 👥 Team Routes (`/team`)

| Method | Endpoint | Auth | Description |
|:------:|:---------|:----:|:------------|
| POST | `/team/` | ✅ | Create new team |
| GET | `/team/` | ✅ | Get user's teams |
| PATCH | `/team/:teamId` | ✅ | Update team |
| DELETE | `/team/:teamId` | ✅ | Delete team |

---

## 📦 Dependencies

### Production Dependencies

| Package | Version | Purpose |
|:--------|:--------|:--------|
| `express` | ^5.2.1 | 🌐 Fast, minimalist web framework |
| `http-proxy-middleware` | ^3.0.5 | 🔄 HTTP proxy for request forwarding |
| `express-rate-limit` | ^8.2.1 | 🛡️ Rate limiting middleware |
| `cors` | ^2.8.5 | 🌍 Cross-Origin Resource Sharing |
| `morgan` | ^1.10.0 | 📝 HTTP request logger |
| `jsonwebtoken` | ^9.0.3 | 🔐 JWT token handling |
| `dotenv` | ^17.2.3 | ⚙️ Environment variable loader |
| `body-parser` | ^2.2.1 | 📄 Request body parsing |

### Development Dependencies

| Package | Version | Purpose |
|:--------|:--------|:--------|
| `nodemon` | ^3.1.7 | 🔁 Auto-restart on file changes |

---

## 🐳 Docker

### Dockerfile Overview

```dockerfile
FROM node:18-alpine

WORKDIR /app/apigateway

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
```

### Build Image

```bash
# Build the Docker image
docker build -t power11-api-gateway .

# Verify the image was created
docker images | grep power11-api-gateway
```

### Run Container

```bash
# Run with environment file
docker run -d \
  --name api-gateway \
  -p 3000:3000 \
  --env-file .env \
  --network power11-network \
  power11-api-gateway

# Check container logs
docker logs -f api-gateway
```

### Docker Compose (Recommended)

```yaml
version: '3.8'

services:
  api-gateway:
    build: ./01_Apigateway_microservice
    container_name: power11-api-gateway
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    env_file:
      - .env
    depends_on:
      - auth-service
      - payment-service
      - player-service
      - team-service
    networks:
      - power11-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/ping"]
      interval: 30s
      timeout: 10s
      retries: 3

networks:
  power11-network:
    driver: bridge
```

---

## 🔧 Development

### Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Start** | `npm start` | Start server with nodemon (hot reload) |
| **Test** | `npm test` | Run test suite (to be implemented) |

```bash
# Start development server with hot reload
npm start

# The server will restart automatically when files change
# Watch for: "Api Gateway started At :- 3000" message
```


### Adding New Routes

1. Create new route file in `src/routes/` (e.g., `newservice.routes.js`)
2. Configure proxy middleware with target service URL
3. Export from `src/routes/index.js`
4. Mount in `src/index.js` with `app.use("/newservice", newServiceRoutes)`

---

## 📊 Health Check

The gateway exposes a `/ping` endpoint for health monitoring:

```bash
# Check gateway health
curl http://localhost:3000/ping
```

### Expected Response

```json
{
  "message": "api gateway is good to go"
}
```

### HTTP Status Codes

| Status | Meaning |
|:------:|:--------|
| `200` | Gateway is healthy and operational |
| `429` | Rate limit exceeded |
| `502` | Backend service unavailable |
| `503` | Gateway service unavailable |



---

## 🔐 Security Best Practices

### Implemented Security Measures

| Practice | Implementation | Status |
|:---------|:---------------|:------:|
| 🔒 **JWT Validation** | Verify tokens via `x-access-token` header | ✅ |
| ⏱️ **Rate Limiting** | 50 requests/2 min per IP | ✅ |
| 🚫 **CORS Whitelisting** | Strict origin validation | ✅ |
| 📝 **Request Logging** | Morgan combined format logging | ✅ |
| 🔑 **Internal Tokens** | Service-to-service authentication | ✅ |
| 👤 **Role Verification** | Admin/User middleware checks | ✅ |

### Authentication Header

```bash
# Protected routes require x-access-token header
curl -H "x-access-token: <your-jwt-token>" http://localhost:3000/team/
```

### Recommended Production Security

| Practice | Recommendation |
|:---------|:---------------|
| 🔒 **HTTPS Only** | Use TLS/SSL termination at load balancer |
| 🔑 **Token Rotation** | Implement short-lived access tokens (15-30 min) |
| 📊 **Rate Limiting** | Consider Redis-backed distributed rate limiting |
| 🛡️ **Helmet.js** | Add security headers middleware |
| 🔐 **API Keys** | Implement API key authentication for external clients |
| 📝 **Audit Logs** | Store logs in centralized logging system (ELK, CloudWatch) |

### Error Response Format

```json
{
  "data": {},
  "message": "Error description",
  "success": false
}
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

### Getting Started

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a feature branch

```bash
git checkout -b feature/amazing-feature
```

### Making Changes

4. **Make** your changes
5. **Test** thoroughly
6. **Commit** with conventional commits

```bash
git commit -m '✨ feat: add amazing feature'
```

### Commit Message Format

| Prefix | Type | Example |
|:------:|:-----|:--------|
| ✨ | Feature | `✨ feat: add new payment gateway` |
| 🐛 | Bug Fix | `🐛 fix: resolve rate limit issue` |
| 📝 | Docs | `📝 docs: update API documentation` |
| ♻️ | Refactor | `♻️ refactor: optimize proxy middleware` |
| 🔧 | Config | `🔧 chore: update dependencies` |

### Submitting

7. **Push** to your fork
8. **Open** a Pull Request

```bash
git push origin feature/amazing-feature
```

---

## 📄 License

This project is licensed under the **ISC License**.

```
ISC License

Copyright (c) 2026 Power11 Team

Permission to use, copy, modify, and/or distribute this software...
```

---

## 📞 Support & Contact

| Channel | Link |
|:--------|:-----|
| 🐛 Issues | [GitHub Issues](../../issues) |
| 💬 Discussions | [GitHub Discussions](../../discussions) |
| 📧 Email | team@power11.com |

---

<div align="center">

**[⬆ Back to Top](#-api-gateway-microservice)**

<br/>

---

<sub>🏏 Part of the <b>Power11 Fantasy Sports Platform</b></sub>

<sub>Built with ❤️ by Team 11</sub>

<br/>

![Node.js](https://img.shields.io/badge/Powered%20by-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Built%20with-Express-000000?style=flat-square&logo=express&logoColor=white)

</div>
