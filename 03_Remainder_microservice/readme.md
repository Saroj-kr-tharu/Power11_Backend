<div align="center">

# 📧 Reminder Microservice

### Power11 Fantasy Sports Platform

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![RabbitMQ](https://img.shields.io/badge/RabbitMQ-3.x-FF6600?style=flat-square&logo=rabbitmq&logoColor=white)](https://www.rabbitmq.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

*Automated email notifications and reminder service with cron job scheduling and message queue processing.*

</div>

---

## 📖 Overview

The Reminder Microservice handles all **email notifications and scheduled reminders** for the Power11 fantasy sports platform. It processes messages from RabbitMQ queues, sends transactional emails, and manages scheduled tasks using cron jobs.

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📬 **Email Notifications** | Transactional emails for login, payments, and orders |
| 🐰 **RabbitMQ Integration** | Asynchronous message processing from other services |
| ⏰ **Cron Job Scheduling** | Automated task execution at specified intervals |
| 📊 **Status Tracking** | Email delivery status management |
| 🧹 **Auto Cleanup** | Automatic deletion of processed emails |
| ✉️ **Nodemailer** | Reliable email delivery via SMTP |

## 🏗️ Architecture

```
                     ┌─────────────────────────┐
                     │  🐰 RabbitMQ Consumer   │
                     │  (Message from Auth/   │
                     │   Payment Services)    │
                     └────────────┬────────────┘
                                  │
                                  ▼
┌───────────────────────────────────────────────────────────┐
│                 📧 REMINDER MICROSERVICE (:3007)              │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  ┌─────────────────┐     ┌─────────────────────────┐         │
│  │ Message Consumer│────▶│  Email Service        │         │
│  └─────────────────┘     │     (Nodemailer)      │         │
│                          └────────────┬────────────┘         │
│                                       │                    │
│  ┌─────────────────┐            ┌──────┴───────┐            │
│  │ Cron Scheduler  │───────────▶│ Status Update│            │
│  │ (node-cron)     │            │  & Cleanup   │            │
│  └─────────────────┘            └──────┬───────┘            │
│                                       │                    │
└─────────────────────────────────────┬─────────────────────┘
                                        │
                  ┌─────────────────────┴─────────────────────┐
                  ▼                                           ▼
         ┌─────────────────┐                       ┌─────────────────┐
         │ 🗄️ PostgreSQL  │                       │  📤 SMTP Server │
         │    Database    │                       │  (Gmail/SMTP)  │
         └─────────────────┘                       └─────────────────┘
```

## 📁 Project Structure

```
03_Remainder_microservice/
├── 📄 Dockerfile                    # Docker configuration
├── 📄 package.json                  # Dependencies and scripts
├── 📄 readme.md                     # This file
└── 📁 src/
    ├── 📄 index.js                  # Application entry point
    ├── 📁 config/
    │   ├── 📄 config.json           # Database configuration
    │   ├── 📄 email.config.js       # Email service settings
    │   └── 📄 server.config.js      # Server settings
    ├── 📁 Controllers/              # Request handlers
    ├── 📁 Middlewares/              # Custom middleware
    ├── 📁 migrations/               # Database migrations
    ├── 📁 models/                   # Sequelize models
    ├── 📁 Repository/               # Data access layer
    ├── 📁 Routes/                   # API routes
    ├── 📁 seeders/                  # Database seeders
    ├── 📁 Services/                 # Business logic
    └── 📁 utlis/                    # Utilities
```

## 🚀 Quick Start

### Prerequisites

- Node.js v18.x or higher
- PostgreSQL v15.x
- RabbitMQ v3.x
- npm v9.x or higher

### Installation

1. **Navigate to the service directory**
   ```bash
   cd 03_Remainder_microservice
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file:
   ```env
   PORT=3007
   NODE_ENV=development
   
   # Email Configuration
   EMAIL_ID=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_SENDER=noreply@power11.com
   
   # RabbitMQ Configuration
   MESSAGE_BROKER_URL=amqp://localhost
   EXCHANGE_NAME=AUTH_MICROSERVICE
   REMINDER_BINDING_KEY=REMINDER_AUTH_SERVICE
   
   # Cron Job Schedule
   CRON_SEND_REMINDERS=*/5 * * * *
   CRON_UPDATE_STATUS=*/10 * * * *
   CRON_DELETE_SUCCESS=*/30 * * * *
   ```

4. **Run database migrations**
   ```bash
   npx sequelize-cli db:migrate
   ```

5. **Start the server**
   ```bash
   npm start
   ```

## ⏰ Cron Job Schedule

| Job | Schedule | Description |
|-----|----------|-------------|
| Send Reminders | Every 5 min | Process pending email queue |
| Update Status | Every 10 min | Update delivery status |
| Delete Success | Every 30 min | Clean up delivered emails |

## 📬 Email Types

| Type | Trigger | Description |
|------|---------|-------------|
| **Login Alert** | User login | Notify user of new login |
| **Payment Confirmation** | Payment success | Payment receipt |
| **Contest Entry** | Join contest | Contest entry confirmation |
| **Match Reminder** | Before match | Upcoming match notification |

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `express` | ^4.21.2 | Web framework |
| `sequelize` | ^6.37.5 | PostgreSQL ORM |
| `pg` | ^8.16.3 | PostgreSQL driver |
| `amqplib` | ^0.10.8 | RabbitMQ client |
| `nodemailer` | ^6.9.16 | Email sending |
| `node-cron` | ^3.0.3 | Job scheduling |
| `dotenv` | ^16.4.7 | Environment config |

## 🐳 Docker

```bash
# Build Image
docker build -t power11-reminder-service .

# Run Container
docker run -d --name reminder-service -p 3007:3007 --env-file .env power11-reminder-service
```

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

**[⬆ Back to Main README](../README.md)**

</div>
