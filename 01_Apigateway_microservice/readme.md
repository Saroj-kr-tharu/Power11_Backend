<div align="center">

# 🚀 API Gateway Microservice

<img src="https://img.shields.io/badge/Service-API_Gateway-blueviolet?style=for-the-badge" alt="Service"/>

### Power11 Fantasy Sports Platform

<br/>

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

<br/>

**🔀 Routing** · **🛡️ Security** · **⚡ Performance** · **📊 Monitoring**

*Central entry point for all client requests with intelligent routing, rate limiting, JWT validation, and cross-origin resource sharing.*

</div>

---

## 📖 Overview

The **API Gateway** serves as the **single entry point** for all client requests in the Power11 microservices ecosystem. It acts as a reverse proxy, routing requests to appropriate backend services while handling cross-cutting concerns like authentication, rate limiting, and logging.

### 🎯 Why API Gateway?

| Benefit | Description |
|:--------|:------------|
| 🔐 **Centralized Security** | Single point for JWT validation and authentication |
| 🚦 **Traffic Control** | Rate limiting and request throttling |
| 📍 **Single Entry Point** | Simplified client integration |
| 📝 **Unified Logging** | Centralized request/response logging |
| 🔄 **Request Transformation** | Header manipulation and request routing |

---

## ✨ Features

<table>
<tr>
<td align="center">🔄</td>
<td><b>Intelligent Routing</b></td>
<td>Smart proxy routing to appropriate microservices based on URL patterns</td>
</tr>
<tr>
<td align="center">🛡️</td>
<td><b>Rate Limiting</b></td>
<td>Protection against API abuse with 500 requests/2 min per IP</td>
</tr>
<tr>
<td align="center">🔐</td>
<td><b>JWT Validation</b></td>
<td>Token verification for all protected routes</td>
</tr>
<tr>
<td align="center">🌐</td>
<td><b>CORS Support</b></td>
<td>Secure cross-origin request handling with whitelisting</td>
</tr>
<tr>
<td align="center">📝</td>
<td><b>Request Logging</b></td>
<td>Comprehensive HTTP request logging with Morgan</td>
</tr>
<tr>
<td align="center">⚡</td>
<td><b>High Performance</b></td>
<td>Optimized proxy middleware for minimal latency</td>
</tr>
<tr>
<td align="center">🔌</td>
<td><b>Health Checks</b></td>
<td>Service health monitoring endpoints</td>
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
│                           🚀 API GATEWAY (:3000)                                 │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│   ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐       │
│   │  CORS   │───▶│  Rate   │───▶│ Morgan  │───▶│   JWT   │───▶│  Proxy  │       │
│   │ Handler │    │ Limiter │    │ Logger  │    │Validator│    │ Router  │       │
│   └─────────┘    └─────────┘    └─────────┘    └─────────┘    └────┬────┘       │
│                                                                     │            │
└─────────────────────────────────────────────────────────────────────┼────────────┘
                                                                      │
        ┌─────────────┬─────────────┬─────────────┬─────────────┬─────┴─────┐
        ▼             ▼             ▼             ▼             ▼           ▼
  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
  │ 🔐 Auth  │ │ 🏏 Player│ │ 👥 Team  │ │🏆 Contest│ │📊 Leader │ │💳 Payment│
  │  :3001   │ │  :3002   │ │  :3003   │ │  :3004   │ │  :3005   │ │  :3006   │
  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘
```

---

## 📁 Project Structure

```
01_Apigateway_microservice/
│
├── 📄 Dockerfile                    # Docker configuration
├── 📄 package.json                  # Dependencies and scripts
├── 📄 readme.md                     # This documentation
│
└── 📁 src/
    ├── 📄 index.js                  # 🚀 Application entry point
    │
    ├── 📁 middlewares/
    │   ├── 📄 index.js              # Middleware exports
    │   └── 📄 user.middleware.js    # User authentication middleware
    │
    ├── 📁 routes/
    │   ├── 📄 index.js              # Route aggregator
    │   ├── 📄 auth.routes.js        # Authentication route proxies
    │   ├── 📄 contest.routes.js     # Contest route proxies
    │   ├── 📄 gameplayer.routes.js  # Game player route proxies
    │   ├── 📄 leaderboard.routes.js # Leaderboard route proxies
    │   ├── 📄 match.routes.js       # Match route proxies
    │   ├── 📄 payment.routes.js     # Payment route proxies
    │   └── 📄 team.routes.js        # Team route proxies
    │
    ├── 📁 serverConfig/
    │   └── 📄 server.config.js      # Server configuration
    │
    └── 📁 utlis/
        ├── 📄 index.js              # Utility exports
        ├── 📄 jwtHelper.js          # JWT utility functions
        └── 📁 Errors/               # Error handling utilities
```

---

## 🚀 Quick Start

### Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | v18.x or higher |
| npm | v9.x or higher |

### 📥 Installation

```bash
# 1️⃣ Navigate to the service directory
cd 01_Apigateway_microservice

# 2️⃣ Install dependencies
npm install

# 3️⃣ Create environment file
cp .env.example .env

# 4️⃣ Start the server
npm start
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

# Frontend URL (for CORS)
FORTEND_URL=http://localhost:5173

# ═══════════════════════════════════════════════════════════
# 🔗 BACKEND SERVICE URLs
# ═══════════════════════════════════════════════════════════
AUTH_BACKEND_URL=http://localhost:3001
PLAYER_BACKEND_URL=http://localhost:3002
TEAM_BACKEND_URL=http://localhost:3003
CONTEST_BACKEND_URL=http://localhost:3004
LEADERBOARD_BACKEND_URL=http://localhost:3005
PAYMENT_BACKEND_URL=http://localhost:3006
REMINDER_BACKEND_URL=http://localhost:3007
MATCH_BACKEND_URL=http://localhost:3008

# ═══════════════════════════════════════════════════════════
# 🔐 SECURITY CONFIGURATION
# ═══════════════════════════════════════════════════════════
PRIVATEJWT=your_jwt_secret_key
RefreshPRIVATEJWT=your_refresh_jwt_secret_key
INTERNAL_SERVER_TOKEN=your_internal_service_token
```

---

## ⚙️ Configuration Details

### 🛡️ Rate Limiting

```javascript
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,    // 2-minute window
  max: 500,                    // 500 requests per window
  standardHeaders: true,       // Return rate limit info in headers
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many requests, please try again later."
  }
});
```

### 🔄 Proxy Configuration

```javascript
const { createProxyMiddleware } = require("http-proxy-middleware");

const authProxy = createProxyMiddleware({
  target: process.env.AUTH_BACKEND_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/v1/auth': '/api/v1/auth' },
  onProxyRes: (proxyRes, req, res) => {
    proxyRes.headers["Access-Control-Allow-Origin"] = process.env.FORTEND_URL;
    proxyRes.headers["Access-Control-Allow-Credentials"] = "true";
  }
});
```

### 🌐 CORS Configuration

```javascript
const cors = require("cors");

app.use(cors({
  origin: process.env.FORTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-internal-token"]
}));
```

---

## 📡 Route Mapping

| Route Pattern | Target Service | Port | Description |
|:--------------|:---------------|:----:|:------------|
| `/api/v1/auth/*` | Auth Service | 3001 | Authentication & user management |
| `/api/v1/player/*` | Player Service | 3002 | Player data & statistics |
| `/api/v1/team/*` | Team Service | 3003 | Team management |
| `/api/v1/contest/*` | Contest Service | 3004 | Contest operations |
| `/api/v1/leaderboard/*` | Leaderboard Service | 3005 | Rankings & scores |
| `/api/v1/payment/*` | Payment Service | 3006 | Payment processing |
| `/api/v1/match/*` | Match Service | 3008 | Match management |

---

## 📦 Dependencies

| Package | Version | Purpose |
|:--------|:--------|:--------|
| `express` | ^5.2.1 | Web framework |
| `http-proxy-middleware` | ^3.0.5 | Request proxying |
| `express-rate-limit` | ^8.2.1 | Rate limiting |
| `cors` | ^2.8.5 | CORS middleware |
| `morgan` | ^1.10.0 | HTTP request logging |
| `jsonwebtoken` | ^9.0.3 | JWT utilities |
| `dotenv` | ^17.2.3 | Environment configuration |
| `body-parser` | ^2.2.1 | Request body parsing |
| `cookie-parser` | ^1.4.7 | Cookie handling |

---

## 🐳 Docker

### Build Image

```bash
docker build -t power11-api-gateway .
```

### Run Container

```bash
docker run -d \
  --name api-gateway \
  -p 3000:3000 \
  --env-file .env \
  --network power11-network \
  power11-api-gateway
```

### Docker Compose

```yaml
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
  networks:
    - power11-network
```

---

## 🔧 Development

```bash
# Start with hot reload
npm start

# Run linting
npm run lint

# Run tests
npm test
```

---

## 📊 Health Check

```bash
# Check gateway health
curl http://localhost:3000/health

# Response
{
  "status": "healthy",
  "service": "api-gateway",
  "timestamp": "2026-01-05T10:00:00.000Z"
}
```

---

## 🔐 Security Best Practices

| Practice | Implementation |
|:---------|:---------------|
| 🔒 HTTPS Only | Use TLS/SSL in production |
| 🎫 JWT Validation | Verify tokens before routing |
| ⏱️ Rate Limiting | Prevent DDoS and abuse |
| 🚫 CORS Whitelisting | Restrict allowed origins |
| 📝 Request Logging | Audit trail for all requests |
| 🔑 Token Rotation | Short-lived access tokens |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m '✨ Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

**[⬆ Back to Main README](../README.md)**

<br/>

<sub>Part of the Power11 Fantasy Sports Platform</sub>

</div>
