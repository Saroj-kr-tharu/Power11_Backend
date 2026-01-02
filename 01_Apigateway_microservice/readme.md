<div align="center">

# 🚀 API Gateway Microservice

### Power11 Fantasy Sports Platform

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

*Central entry point for all client requests with routing, rate limiting, and authentication.*

</div>

---

## 📖 Overview

The API Gateway serves as the **single entry point** for all client requests in the Power11 microservices ecosystem. It handles request routing, rate limiting, JWT validation, and cross-origin resource sharing (CORS) to ensure secure and efficient communication between clients and backend services.

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔄 **Request Routing** | Intelligent proxy routing to appropriate microservices |
| 🛡️ **Rate Limiting** | Protection against API abuse (500 requests/2 min per IP) |
| 🔐 **JWT Validation** | Token verification for protected routes |
| 🌐 **CORS Support** | Secure cross-origin request handling |
| 📝 **Request Logging** | Comprehensive HTTP request logging with Morgan |
| ⚡ **High Performance** | Optimized proxy middleware for low latency |

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT REQUEST                          │
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                        API GATEWAY (:3000)                       │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐    │
│  │   CORS    │→ │   Rate    │→ │    JWT    │→ │   Proxy   │    │
│  │ Middleware│  │  Limiter  │  │ Validator │  │  Router   │    │
│  └───────────┘  └───────────┘  └───────────┘  └───────────┘    │
└─────────────────────────────────────────────────────────────────┘
                                  │
        ┌─────────────┬───────────┼───────────┬─────────────┐
        ▼             ▼           ▼           ▼             ▼
   ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐
   │  Auth   │  │ Player  │  │  Team   │  │ Contest │  │ Payment │
   │ Service │  │  Game   │  │ Service │  │ Service │  │ Service │
   └─────────┘  └─────────┘  └─────────┘  └─────────┘  └─────────┘
```

## 📁 Project Structure

```
01_Apigateway_microservice/
├── 📄 Dockerfile              # Docker configuration
├── 📄 package.json            # Dependencies and scripts
├── 📄 readme.md               # This file
└── 📁 src/
    ├── 📄 index.js            # Application entry point
    ├── 📁 middlewares/
    │   ├── 📄 index.js        # Middleware exports
    │   └── 📄 user.middleware.js  # User authentication middleware
    ├── 📁 routes/
    │   ├── 📄 index.js        # Route aggregator
    │   ├── 📄 auth.routes.js  # Authentication routes
    │   └── 📄 payment.routes.js   # Payment routes
    ├── 📁 serverConfig/
    │   └── 📄 server.config.js    # Server configuration
    └── 📁 utlis/
        ├── 📄 index.js        # Utility exports
        ├── 📄 jwtHelper.js    # JWT utility functions
        └── 📁 Errors/         # Error handling utilities
```

## 🚀 Quick Start

### Prerequisites

- Node.js v18.x or higher
- npm v9.x or higher

### Installation

1. **Navigate to the service directory**
   ```bash
   cd 01_Apigateway_microservice
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   NODE_ENV=development
   
   # Frontend URL for CORS
   FORTEND_URL=http://localhost:5173
   
   # Backend Service URLs
   AUTH_BACKEND_URL=http://localhost:3001
   PAYMENT_BACKEND_URL=http://localhost:3006
   
   # JWT Configuration
   PRIVATEJWT=your_jwt_secret_key
   RefreshPRIVATEJWT=your_refresh_jwt_secret_key
   
   # Internal Service Communication
   INTERNAL_SERVER_TOKEN=your_internal_service_token
   ```

4. **Start the server**
   ```bash
   npm start
   ```

   The gateway will be running at `http://localhost:3000`

## ⚙️ Configuration

### Rate Limiting

```javascript
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,  // 2 minutes window
  max: 500,                  // 500 requests per window per IP
  message: {
    error: "Too many requests, please try again later."
  }
});
```

### Proxy Configuration

```javascript
const { createProxyMiddleware } = require("http-proxy-middleware");

const authProxy = createProxyMiddleware({
  target: process.env.AUTH_BACKEND_URL,
  changeOrigin: true,
  onProxyRes: (proxyRes, req, res) => {
    proxyRes.headers["Access-Control-Allow-Origin"] = process.env.FORTEND_URL;
    proxyRes.headers["Access-Control-Allow-Credentials"] = "true";
  }
});
```

### CORS Configuration

```javascript
const cors = require("cors");

app.use(cors({
  origin: process.env.FORTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
}));
```

## 📡 API Routes

| Route Pattern | Target Service | Description |
|---------------|----------------|-------------|
| `/api/v1/auth/*` | Auth Service | Authentication endpoints |
| `/api/v1/payment/*` | Payment Service | Payment processing |
| `/api/v1/player/*` | Player Game Service | Player data |
| `/api/v1/team/*` | Team Service | Team management |
| `/api/v1/contest/*` | Contest Service | Contest operations |
| `/api/v1/leaderboard/*` | Leaderboard Service | Rankings |

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `express` | ^5.2.1 | Web framework |
| `http-proxy-middleware` | ^3.0.5 | Request proxying |
| `express-rate-limit` | ^8.2.1 | Rate limiting |
| `cors` | ^2.8.5 | CORS middleware |
| `morgan` | ^1.10.0 | HTTP logging |
| `jsonwebtoken` | ^9.0.3 | JWT utilities |
| `dotenv` | ^17.2.3 | Environment config |
| `body-parser` | ^2.2.1 | Request parsing |

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
  power11-api-gateway
```

## 🔧 Development

```bash
# Start with hot reload
npm start

# Run tests
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

**[⬆ Back to Main README](../README.md)**

</div>

- Node.js: https://nodejs.org/
- Express: https://expressjs.com/
- Morgan: https://github.com/expressjs/morgan
- CORS: https://github.com/expressjs/cors
- HTTP Proxy Middleware: https://github.com/chimurai/http-proxy-middleware
- Express Rate Limit: https://github.com/nfriedly/express-rate-limit
- Nodemon: https://github.com/remy/nodemon