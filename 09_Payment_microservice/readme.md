<div align="center">

<div align="center">

# 💳 Payment Microservice

<img src="https://img.shields.io/badge/Service-Payment_Processing-success?style=for-the-badge" alt="Service"/>

### Power11 Fantasy Sports Platform

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Sequelize](https://img.shields.io/badge/Sequelize-6.x-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)](https://sequelize.org/)
[![RabbitMQ](https://img.shields.io/badge/RabbitMQ-Message_Queue-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)](https://www.rabbitmq.com/)

<br/>

**💳 Payments** · **💰 Wallet** · **🔐 Secure** · **📊 Transactions**

*Secure payment processing, digital wallet management, and transaction handling with multi-gateway integration.*

</div>

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


---

## 📖 Overview

The **Payment Microservice** powers all payment, wallet, and transaction operations for the Power11 Fantasy Sports Platform. It supports multiple payment gateways (Khalti, Stripe, Esewa, Razorpay), digital wallet management, and secure transaction processing. Built with Node.js, Express, and PostgreSQL, it follows modern microservice and security best practices.

### 🎯 Key Responsibilities

| Responsibility | Description |
|:---------------|:------------|
| 💳 **Payment Processing** | Multi-gateway integration (Khalti, Stripe, Esewa, Razorpay) |
| 💰 **Wallet Management** | Add, withdraw, and track funds securely |
| 📊 **Transaction History** | Full audit trail and reporting |
| 🔐 **Security** | PCI-DSS compliant, JWT & signature verification |
| 🔔 **Notifications** | Real-time updates via RabbitMQ |

---


## ✨ Features

- **Multi-Gateway Payments:** Khalti, Stripe, Esewa, Razorpay
- **Digital Wallet:** Add, withdraw, and transfer funds
- **Transaction History:** Full audit trail and reporting
- **Webhook & Signature Verification:** Secure payment callbacks
- **Bonus & Rewards:** Promotional credits, contest winnings
- **Notifications:** Real-time updates via RabbitMQ
- **Modular Architecture:** Controllers, Services, Repositories, Middlewares

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
├── Dockerfile
├── package.json
├── readme.md
│
└── src/
  ├── index.js
  ├── config/
  │   ├── config.json
  │   ├── khalti.config.js
  │   ├── server.config.js
  │   ├── stripe.config.js
  │   └── stripe.connect.js
  ├── Controllers/
  │   ├── index.js
  │   ├── khalti.controller.js
  │   ├── payment.controller.js
  │   └── stripe.controller.js
  ├── Middlewares/
  │   ├── esewa.middleware.js
  │   ├── index.js
  │   ├── internal.service.middleware.js
  │   ├── khalti.middleware.js
  │   ├── payment.middleware.js
  │   ├── stripe.middleware.js
  │   └── user.middleware.js
  ├── migrations/
  │   ├── 20260107164640-create-payment-transaction.js
  │   ├── 20260107164925-create-wallet.js
  │   ├── 20260107165012-create-wallet-transaction.js
  │   └── 20260109053011-create-withdrawal-request.js
  ├── models/
  │   ├── index.js
  │   ├── paymenttransaction.js
  │   ├── wallet.js
  │   ├── wallettransaction.js
  │   └── withdrawalrequest.js
  ├── Repository/
  │   ├── curd.repo.js
  │   ├── index.js
  │   ├── payment.transtion.repo.js
  │   ├── wallet.repo.js
  │   ├── wallet.transaction.repo.js
  │   └── withdrawal.request.repo.js
  ├── Route/
  │   ├── index.js
  │   └── v1/
  │       └── index.js
  ├── seeders/
  ├── Services/
  │   ├── curd.service.js
  │   ├── index.js
  │   ├── khalti.service.js
  │   ├── payment.service.js
  │   ├── payment.transaction.service.js
  │   ├── queue.service.js
  │   ├── stripe.service.js
  │   ├── wallet.service.js
  │   ├── wallet.transaction.service.js
  │   └── wallet.withdraw.service.js
  └── utlis/
    ├── index.js
    ├── jwtHelper.js
    ├── messageQueue.js
    └── Errors/
      └── https_codes.js
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

| Package      | Purpose                      |
|:------------ |:----------------------------|
| express      | Web framework                |
| sequelize    | PostgreSQL ORM               |
| pg           | PostgreSQL driver            |
| razorpay     | Payment gateway SDK          |
| khalti       | Khalti payment integration   |
| stripe       | Stripe payment integration   |
| amqplib      | RabbitMQ client              |
| crypto       | Signature verification       |
| uuid         | Unique ID generation         |
| dotenv       | Environment configuration    |

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

We welcome contributions! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/payment-feature`)
3. Commit changes (`git commit -m 'Add payment feature'`)
4. Push to branch (`git push origin feature/payment-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

<sub>Part of the Power11 Fantasy Sports Platform</sub>

</div>
