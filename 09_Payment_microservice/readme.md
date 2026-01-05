<div align="center">

# 💳 Payment Microservice

<img src="https://img.shields.io/badge/Service-Payment_Processing-success?style=for-the-badge" alt="Service"/>

### Power11 Fantasy Sports Platform

<br/>

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Razorpay](https://img.shields.io/badge/Razorpay-Integration-0066FF?style=for-the-badge&logo=razorpay&logoColor=white)](https://razorpay.com/)
[![Sequelize](https://img.shields.io/badge/Sequelize-6.x-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)](https://sequelize.org/)

<br/>

**💳 Payments** · **💰 Wallet** · **🔐 Secure** · **📊 Transactions**

*Secure payment processing, digital wallet management, and transaction handling with Razorpay integration.*

</div>

---

## 📖 Overview

The **Payment Microservice** handles all **payment processing, wallet management, and financial transactions** for the Power11 fantasy sports platform. It provides secure payment gateway integration, digital wallet functionality, and comprehensive transaction tracking.

### 🎯 Key Responsibilities

| Responsibility | Description |
|:---------------|:------------|
| 💳 **Payment Processing** | Secure payment gateway integration |
| 💰 **Wallet Management** | Digital wallet with add/withdraw funds |
| 📊 **Transaction History** | Complete transaction tracking |
| 🔐 **Security** | PCI-DSS compliant payment handling |
| 🔔 **Notifications** | Payment status updates via RabbitMQ |

---

## ✨ Features

<table>
<tr>
<td align="center">💳</td>
<td><b>Payment Gateway</b></td>
<td>Razorpay integration for secure payments</td>
</tr>
<tr>
<td align="center">💰</td>
<td><b>Digital Wallet</b></td>
<td>In-app wallet for quick transactions</td>
</tr>
<tr>
<td align="center">➕</td>
<td><b>Add Money</b></td>
<td>Multiple payment methods supported</td>
</tr>
<tr>
<td align="center">💸</td>
<td><b>Withdrawals</b></td>
<td>Secure fund withdrawal to bank accounts</td>
</tr>
<tr>
<td align="center">📊</td>
<td><b>Transaction History</b></td>
<td>Detailed payment and transaction records</td>
</tr>
<tr>
<td align="center">🔐</td>
<td><b>Secure Processing</b></td>
<td>Webhook verification and signature validation</td>
</tr>
<tr>
<td align="center">🎁</td>
<td><b>Bonus & Rewards</b></td>
<td>Promotional credits and bonus management</td>
</tr>
<tr>
<td align="center">📧</td>
<td><b>Email Notifications</b></td>
<td>Transaction receipts via RabbitMQ</td>
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
│                        💳 PAYMENT MICROSERVICE (:3006)                           │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│   ┌───────────┐    ┌───────────────┐    ┌───────────────┐                       │
│   │  Routes   │───▶│  Controllers  │───▶│   Services    │                       │
│   │   Layer   │    │     Layer     │    │     Layer     │                       │
│   └───────────┘    └───────────────┘    └───────┬───────┘                       │
│                                                 │                                │
│                                 ┌───────────────┴───────────────┐               │
│                                 ▼                               ▼               │
│                        ┌─────────────────┐           ┌─────────────────┐        │
│                        │   Repository    │           │    Razorpay     │        │
│                        │     Layer       │           │   Integration   │        │
│                        └────────┬────────┘           └────────┬────────┘        │
│                                 │                             │                 │
└─────────────────────────────────┼─────────────────────────────┼─────────────────┘
                                  │                             │
          ┌───────────────────────┼───────────────────┐         │
          ▼                       ▼                   ▼         ▼
┌─────────────────────┐ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│   🗄️ PostgreSQL    │ │   🐰 RabbitMQ   │ │  🔗 Contest     │ │   💳 Razorpay   │
│      Database       │ │  Message Queue  │ │    Service      │ │     Gateway     │
│  ┌───────────────┐  │ │  ┌───────────┐  │ │    (:3004)      │ │                 │
│  │    Wallets    │  │ │  │ Payment   │  │ │                 │ │ • UPI           │
│  │  Transactions │  │ │  │  Events   │  │ │ Entry Payments  │ │ • Cards         │
│  │    Payments   │  │ │  └───────────┘  │ │ Prize Payouts   │ │ • Net Banking   │
│  └───────────────┘  │ └─────────────────┘ └─────────────────┘ └─────────────────┘
└─────────────────────┘
```

---

## 💰 Wallet System

### Wallet Types

```
┌─────────────────────────────────────────────────────────────┐
│                    💰 USER WALLET                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────────┐   ┌─────────────────┐                │
│   │  💵 Cash        │   │  🎁 Bonus       │                │
│   │   Balance       │   │   Balance       │                │
│   │                 │   │                 │                │
│   │ • Add Money     │   │ • Promotions    │                │
│   │ • Withdrawable  │   │ • Rewards       │                │
│   │ • Contest Entry │   │ • Non-withdraw  │                │
│   └─────────────────┘   └─────────────────┘                │
│                                                             │
│   ┌─────────────────┐                                      │
│   │  🏆 Winnings    │                                      │
│   │   Balance       │                                      │
│   │                 │                                      │
│   │ • Prize Money   │                                      │
│   │ • Withdrawable  │                                      │
│   │ • Tax Deducted  │                                      │
│   └─────────────────┘                                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Balance Priority for Contest Entry

| Priority | Balance Type | Withdrawable |
|:--------:|:-------------|:------------:|
| 1️⃣ | Bonus Balance | ❌ |
| 2️⃣ | Cash Balance | ✅ |
| 3️⃣ | Winnings Balance | ✅ |

---

## 📁 Project Structure

```
09_Payment_microservice/
│
├── 📄 Dockerfile                    # Docker configuration
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
    ├── 📁 Controllers/
    │   ├── 📄 index.js              # Controller exports
    │   └── 📄 payment.controller.js # Payment request handlers
    │
    ├── 📁 Middlewares/
    │   ├── 📄 index.js              # Middleware exports
    │   └── 📄 auth.middleware.js    # Authentication middleware
    │
    ├── 📁 migrations/               # Database migrations
    │
    ├── 📁 models/
    │   ├── 📄 index.js              # Model exports
    │   ├── 📄 wallet.model.js       # Wallet model
    │   ├── 📄 transaction.model.js  # Transaction model
    │   └── 📄 payment.model.js      # Payment model
    │
    ├── 📁 Repository/
    │   ├── 📄 index.js              # Repository exports
    │   └── 📄 payment.repository.js # Payment data access
    │
    ├── 📁 Route/
    │   └── 📄 payment.routes.js     # Payment API routes
    │
    ├── 📁 seeders/                  # Database seeders
    │
    ├── 📁 Services/
    │   ├── 📄 index.js              # Service exports
    │   ├── 📄 payment.service.js    # Payment business logic
    │   ├── 📄 wallet.service.js     # Wallet operations
    │   └── 📄 razorpay.service.js   # Razorpay integration
    │
    └── 📁 Utlis/
        ├── 📄 index.js              # Utility exports
        └── 📄 constants.js          # Constants and enums
```

---

## 🚀 Quick Start

### Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | v18.x or higher |
| npm | v9.x or higher |
| PostgreSQL | v15.x or higher |
| Razorpay Account | API Keys |

### 📥 Installation

```bash
# 1️⃣ Navigate to the service directory
cd 09_Payment_microservice

# 2️⃣ Install dependencies
npm install

# 3️⃣ Create environment file
cp .env.example .env

# 4️⃣ Run database migrations
npx sequelize-cli db:migrate

# 5️⃣ Start the server
npm start
```

### ⚙️ Environment Configuration

Create a `.env` file in the root directory:

```env
# ═══════════════════════════════════════════════════════════
# 💳 PAYMENT MICROSERVICE CONFIGURATION
# ═══════════════════════════════════════════════════════════

# Server Configuration
PORT=3006
NODE_ENV=development

# ═══════════════════════════════════════════════════════════
# 🗄️ DATABASE CONFIGURATION
# ═══════════════════════════════════════════════════════════
DB_HOST=localhost
DB_PORT=5432
DB_NAME=power11_payment
DB_USER=postgres
DB_PASSWORD=your_password

# ═══════════════════════════════════════════════════════════
# 💳 RAZORPAY CONFIGURATION
# ═══════════════════════════════════════════════════════════
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# ═══════════════════════════════════════════════════════════
# 🐰 RABBITMQ CONFIGURATION
# ═══════════════════════════════════════════════════════════
RABBITMQ_URL=amqp://localhost:5672
PAYMENT_QUEUE=payment_notifications

# ═══════════════════════════════════════════════════════════
# 🔐 SECURITY CONFIGURATION
# ═══════════════════════════════════════════════════════════
INTERNAL_SERVER_TOKEN=your_internal_service_token
JWT_SECRET=your_jwt_secret

# ═══════════════════════════════════════════════════════════
# 🔗 SERVICE URLs
# ═══════════════════════════════════════════════════════════
CONTEST_SERVICE_URL=http://localhost:3004
AUTH_SERVICE_URL=http://localhost:3001
```

---

## 📡 API Endpoints

### 💰 Wallet Operations

| Method | Endpoint | Description | Auth |
|:------:|:---------|:------------|:----:|
| `GET` | `/api/v1/payment/wallet` | Get wallet balance | 🔐 |
| `GET` | `/api/v1/payment/wallet/history` | Get transaction history | 🔐 |

### 💳 Payment Operations

| Method | Endpoint | Description | Auth |
|:------:|:---------|:------------|:----:|
| `POST` | `/api/v1/payment/create-order` | Create Razorpay order | 🔐 |
| `POST` | `/api/v1/payment/verify` | Verify payment signature | 🔐 |
| `POST` | `/api/v1/payment/webhook` | Razorpay webhook handler | ⚡ |

### 💸 Withdrawal Operations

| Method | Endpoint | Description | Auth |
|:------:|:---------|:------------|:----:|
| `POST` | `/api/v1/payment/withdraw` | Request withdrawal | 🔐 |
| `GET` | `/api/v1/payment/withdraw/status/:id` | Check withdrawal status | 🔐 |

### 🎁 Bonus Operations

| Method | Endpoint | Description | Auth |
|:------:|:---------|:------------|:----:|
| `POST` | `/api/v1/payment/bonus/apply` | Apply bonus code | 🔐 |
| `GET` | `/api/v1/payment/bonus/available` | Get available bonuses | 🔐 |

---

## 💳 Razorpay Integration

### Payment Flow

```
┌──────────┐     ┌────────────┐     ┌─────────────┐     ┌───────────┐
│  Client  │────▶│ Create     │────▶│  Razorpay   │────▶│  Payment  │
│          │     │  Order     │     │  Checkout   │     │  Success  │
└──────────┘     └────────────┘     └─────────────┘     └───────────┘
                                           │
                                           ▼
┌──────────┐     ┌────────────┐     ┌─────────────┐
│  Wallet  │◀────│  Verify    │◀────│  Webhook    │
│ Updated  │     │  Signature │     │  Callback   │
└──────────┘     └────────────┘     └─────────────┘
```

### Webhook Verification

```javascript
const crypto = require('crypto');

const verifyWebhookSignature = (body, signature, secret) => {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(body))
    .digest('hex');
  
  return signature === expectedSignature;
};
```

---

## 📊 Database Schema

### Wallet Table

| Column | Type | Description |
|:-------|:-----|:------------|
| `id` | UUID | Primary key |
| `user_id` | UUID | Foreign key to users |
| `cash_balance` | DECIMAL | Deposited amount |
| `bonus_balance` | DECIMAL | Promotional credits |
| `winnings_balance` | DECIMAL | Prize money |
| `created_at` | TIMESTAMP | Creation time |
| `updated_at` | TIMESTAMP | Last update |

### Transaction Table

| Column | Type | Description |
|:-------|:-----|:------------|
| `id` | UUID | Primary key |
| `wallet_id` | UUID | Foreign key to wallet |
| `type` | ENUM | credit/debit |
| `category` | ENUM | deposit/withdrawal/entry/winning |
| `amount` | DECIMAL | Transaction amount |
| `status` | ENUM | pending/completed/failed |
| `reference_id` | STRING | External reference |
| `created_at` | TIMESTAMP | Transaction time |

---

## 📦 Dependencies

| Package | Version | Purpose |
|:--------|:--------|:--------|
| `express` | ^5.2.1 | Web framework |
| `sequelize` | ^6.37.3 | PostgreSQL ORM |
| `pg` | ^8.11.3 | PostgreSQL driver |
| `razorpay` | ^2.9.2 | Payment gateway SDK |
| `amqplib` | ^0.10.3 | RabbitMQ client |
| `crypto` | built-in | Signature verification |
| `uuid` | ^9.0.0 | Unique ID generation |
| `dotenv` | ^17.2.3 | Environment configuration |

---

## 🐳 Docker

### Build Image

```bash
docker build -t power11-payment-service .
```

### Run Container

```bash
docker run -d \
  --name payment-service \
  -p 3006:3006 \
  --env-file .env \
  --network power11-network \
  power11-payment-service
```

### Docker Compose

```yaml
payment-service:
  build: ./09_Payment_microservice
  container_name: power11-payment
  ports:
    - "3006:3006"
  environment:
    - NODE_ENV=production
  env_file:
    - .env
  depends_on:
    - postgres
    - rabbitmq
  networks:
    - power11-network
```

---

## 🔐 Security Best Practices

| Practice | Implementation |
|:---------|:---------------|
| 🔐 HTTPS Only | All payment requests over TLS |
| ✅ Signature Verification | Verify all Razorpay webhooks |
| 🔑 Secret Management | Environment variables for keys |
| 📝 Transaction Logging | Complete audit trail |
| 🛡️ Input Validation | Sanitize all payment inputs |
| ⏱️ Idempotency | Prevent duplicate transactions |
| 🔒 PCI Compliance | Never store card details |

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Test specific module
npm test -- --grep "Wallet"
```

---

## 📈 Monitoring

### Health Check

```bash
# Check service health
curl http://localhost:3006/health

# Response
{
  "status": "healthy",
  "service": "payment-service",
  "database": "connected",
  "razorpay": "connected",
  "timestamp": "2026-01-05T10:00:00.000Z"
}
```

### Metrics Tracked

- 📊 Transaction success rate
- ⏱️ Payment processing time
- 💰 Daily transaction volume
- ❌ Failed payment count
- 🔄 Webhook processing rate

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/payment-feature`)
3. Commit changes (`git commit -m '💳 Add payment feature'`)
4. Push to branch (`git push origin feature/payment-feature`)
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
