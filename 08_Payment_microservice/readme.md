<div align="center">

#  Payment Microservice

### Power11 Fantasy Sports Platform

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Stripe](https://img.shields.io/badge/Stripe-API-008CDD?style=flat-square&logo=stripe&logoColor=white)](https://stripe.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

*Secure payment processing with multiple gateway integrations for contest entries and withdrawals.*

</div>

---

##  Overview

The Payment Microservice handles all **payment transactions and gateway integrations** for the Power11 fantasy sports platform. It supports multiple payment providers including eSewa, Khalti, and Stripe for seamless transactions.

##  Features

| Feature | Description |
|---------|-------------|
|  **Multi-Gateway Support** | eSewa, Khalti, Stripe integration |
|  **Secure Transactions** | PCI-compliant payment processing |
|  **Transaction History** | Complete payment audit trail |
|  **Wallet System** | User wallet management |
|  **Refund Processing** | Automated refund handling |
|  **Payment Notifications** | Email confirmations via RabbitMQ |

##  Architecture

```
                      PAYMENT MICROSERVICE

     Routes         Controllers        Services                

                              
                              

                      Repository Layer                           

                              
         
                                                 
            
   PostgreSQL          Payment          RabbitMQ   
   (Payments)         Gateways           Queue     
            
                              
         
                                                 
                            
      eSewa            Khalti           Stripe
                            
```

##  Project Structure

```
08_Payment_microservice/
  Dockerfile              # Docker configuration
  package.json            # Dependencies and scripts
  readme.md               # This file
  src/
      index.js            # Application entry point
      config/
         config.json     # Database configuration
         esewa.config.js # eSewa gateway config
         khalti.config.js    # Khalti gateway config
         stripe.config.js    # Stripe gateway config
         stripe.connect.js   # Stripe connection
         server.config.js    # Server settings
      Controllers/        # Request handlers
      Middlewares/        # Custom middleware
      migrations/         # Database migrations
      models/             # Sequelize models
      Repository/         # Data access layer
      Route/              # API routes
      seeders/            # Database seeders
      Services/           # Business logic
      Utlis/              # Utilities
```

##  Quick Start

### Prerequisites

- Node.js v18.x or higher
- PostgreSQL v15.x
- RabbitMQ v3.x
- Payment gateway accounts (eSewa, Khalti, Stripe)
- npm v9.x or higher

### Installation

1. **Navigate to the service directory**
   ```bash
   cd 08_Payment_microservice
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file:
   ```env
   PORT=3006
   NODE_ENV=development
   
   # eSewa Configuration
   ESEWA_MERCHANT_ID=your_merchant_id
   ESEWA_SECRET_KEY=your_secret_key
   ESEWA_GATEWAY_URL=https://esewa.com.np/epay/main
   
   # Khalti Configuration
   KHALTI_PUBLIC_KEY=your_public_key
   KHALTI_SECRET_KEY=your_secret_key
   
   # Stripe Configuration
   STRIPE_SECRET_KEY=sk_test_xxxx
   STRIPE_PUBLISHABLE_KEY=pk_test_xxxx
   STRIPE_WEBHOOK_SECRET=whsec_xxxx
   
   # RabbitMQ Configuration
   MESSAGE_BROKER_URL=amqp://localhost
   EXCHANGE_NAME=PAYMENT_MICROSERVICE
   ```

4. **Run database migrations**
   ```bash
   npx sequelize-cli db:migrate
   ```

5. **Start the server**
   ```bash
   npm start
   ```

   The service will be running at `http://localhost:3006`

##  API Endpoints

### Payments

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/v1/payment/initiate` | Initialize payment | Yes |
| `POST` | `/api/v1/payment/verify` | Verify payment | Yes |
| `GET` | `/api/v1/payment/history` | Get payment history | Yes |
| `POST` | `/api/v1/payment/withdraw` | Request withdrawal | Yes |
| `GET` | `/api/v1/payment/wallet` | Get wallet balance | Yes |

### Supported Payment Gateways

| Gateway | Type | Currency | Status |
|---------|------|----------|--------|
| **eSewa** | Digital Wallet | NPR |  Active |
| **Khalti** | Digital Wallet | NPR |  Active |
| **Stripe** | Card Payment | USD/NPR |  Active |

### Payment Flow

```
1. User initiates payment  /api/v1/payment/initiate
2. Redirect to payment gateway
3. Gateway processes payment
4. Callback to verify  /api/v1/payment/verify
5. Update transaction status
6. Send confirmation email via RabbitMQ
```

##  Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `express` | ^5.2.1 | Web framework |
| `sequelize` | ^6.37.5 | PostgreSQL ORM |
| `pg` | ^8.16.3 | PostgreSQL driver |
| `stripe` | ^20.1.0 | Stripe SDK |
| `axios` | ^1.9.0 | HTTP client |
| `amqplib` | ^0.10.8 | RabbitMQ client |
| `crypto` | ^1.0.1 | Cryptographic functions |
| `dotenv` | ^17.2.3 | Environment config |

##  Security

- **PCI Compliance**: Secure payment data handling
- **HMAC Verification**: Signature validation for callbacks
- **Encryption**: Sensitive data encryption at rest
- **Audit Logging**: Complete transaction audit trail
- **Rate Limiting**: API abuse prevention

##  Docker

```bash
# Build Image
docker build -t power11-payment-service .

# Run Container
docker run -d --name payment-service -p 3006:3006 --env-file .env power11-payment-service
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
