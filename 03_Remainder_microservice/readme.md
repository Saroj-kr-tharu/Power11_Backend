<div align="center">

# 📧 Reminder Microservice

<img src="https://img.shields.io/badge/Service-Notifications-orange?style=for-the-badge" alt="Service"/>

### Power11 Fantasy Sports Platform

<br/>

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![RabbitMQ](https://img.shields.io/badge/RabbitMQ-3.x-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)](https://www.rabbitmq.com/)
[![Cron](https://img.shields.io/badge/Node--Cron-Scheduler-blue?style=for-the-badge)](https://www.npmjs.com/package/node-cron)

<br/>

**📬 Email** · **⏰ Scheduling** · **🔄 Async** · **🧹 Auto-Cleanup**

*Automated email notifications and reminder service with cron job scheduling and RabbitMQ message queue processing.*

</div>

---

## 📖 Overview

The **Reminder Microservice** handles all **email notifications and scheduled reminders** for the Power11 fantasy sports platform. It consumes messages from RabbitMQ queues, sends transactional emails, and manages scheduled tasks using cron jobs for automatic cleanup and status updates.

### 🎯 Key Responsibilities

| Responsibility | Description |
|:---------------|:------------|
| 📬 **Email Delivery** | Send transactional emails via SMTP |
| 🐰 **Queue Processing** | Consume messages from RabbitMQ |
| ⏰ **Job Scheduling** | Automated cron-based task execution |
| 📊 **Status Tracking** | Monitor email delivery status |
| 🧹 **Auto Cleanup** | Remove successfully delivered emails |

---

## ✨ Features

<table>
<tr>
<td align="center">📬</td>
<td><b>Email Notifications</b></td>
<td>Transactional emails for login, payments, and contest alerts</td>
</tr>
<tr>
<td align="center">🐰</td>
<td><b>RabbitMQ Integration</b></td>
<td>Asynchronous message processing from other services</td>
</tr>
<tr>
<td align="center">⏰</td>
<td><b>Cron Job Scheduling</b></td>
<td>Automated task execution at configurable intervals</td>
</tr>
<tr>
<td align="center">📊</td>
<td><b>Status Tracking</b></td>
<td>Real-time email delivery status management</td>
</tr>
<tr>
<td align="center">🧹</td>
<td><b>Auto Cleanup</b></td>
<td>Automatic deletion of processed emails</td>
</tr>
<tr>
<td align="center">✉️</td>
<td><b>Nodemailer</b></td>
<td>Reliable email delivery via SMTP/Gmail</td>
</tr>
<tr>
<td align="center">📝</td>
<td><b>Template Engine</b></td>
<td>Beautiful HTML email templates</td>
</tr>
</table>

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           MESSAGE PRODUCERS                                     │
├─────────────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                      │
│  │  🔐 Auth     │    │  💳 Payment  │    │  🏆 Contest  │                      │
│  │   Service    │    │   Service    │    │   Service    │                      │
│  └──────┬───────┘    └──────┬───────┘    └──────┬───────┘                      │
│         │                   │                   │                               │
│         └───────────────────┼───────────────────┘                               │
│                             ▼                                                   │
│                    ┌─────────────────┐                                          │
│                    │  🐰 RabbitMQ   │                                          │
│                    │  Message Queue  │                                          │
│                    └────────┬────────┘                                          │
└─────────────────────────────┼───────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                      📧 REMINDER MICROSERVICE (:3007)                           │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│   ┌──────────────────┐         ┌──────────────────────────┐                    │
│   │ 🐰 Message       │────────▶│   📧 Email Service       │                    │
│   │    Consumer      │         │      (Nodemailer)        │                    │
│   └──────────────────┘         └────────────┬─────────────┘                    │
│                                             │                                   │
│   ┌──────────────────┐              ┌───────┴───────┐                          │
│   │ ⏰ Cron          │─────────────▶│ 📊 Status     │                          │
│   │    Scheduler     │              │    Manager    │                          │
│   └──────────────────┘              └───────┬───────┘                          │
│                                             │                                   │
└─────────────────────────────────────────────┼───────────────────────────────────┘
                                              │
                    ┌─────────────────────────┴─────────────────────────┐
                    ▼                                                   ▼
          ┌─────────────────────┐                          ┌─────────────────────┐
          │   🗄️ PostgreSQL    │                          │   📤 SMTP Server    │
          │      Database       │                          │   (Gmail/Custom)    │
          │  ┌───────────────┐  │                          │                     │
          │  │   Reminders   │  │                          │  📧 Email Delivery  │
          │  │   EmailLogs   │  │                          │                     │
          │  └───────────────┘  │                          └─────────────────────┘
          └─────────────────────┘
```

---

## 📁 Project Structure

```
03_Remainder_microservice/
│
├── 📄 Dockerfile                    # Docker configuration
├── 📄 package.json                  # Dependencies and scripts
├── 📄 readme.md                     # This documentation
│
└── 📁 src/
    ├── 📄 index.js                  # 🚀 Application entry point
    │
    ├── 📁 config/
    │   ├── 📄 config.json           # Database configuration
    │   ├── 📄 email.config.js       # Email service settings
    │   └── 📄 server.config.js      # Server settings
    │
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

---

## 🚀 Quick Start

### Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | v18.x or higher |
| PostgreSQL | v15.x |
| RabbitMQ | v3.x |
| npm | v9.x or higher |

### 📥 Installation

```bash
# 1️⃣ Navigate to the service directory
cd 03_Remainder_microservice

# 2️⃣ Install dependencies
npm install

# 3️⃣ Configure environment variables
cp .env.example .env

# 4️⃣ Run database migrations
npx sequelize-cli db:migrate

# 5️⃣ Start the server
npm start
```

### ⚙️ Environment Configuration

```env
# ═══════════════════════════════════════════════════════════
# 📧 REMINDER MICROSERVICE CONFIGURATION
# ═══════════════════════════════════════════════════════════

# Server Configuration
PORT=3007
NODE_ENV=development

# ═══════════════════════════════════════════════════════════
# 📧 EMAIL CONFIGURATION
# ═══════════════════════════════════════════════════════════
EMAIL_ID=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_SENDER=Power11 <noreply@power11.com>

# ═══════════════════════════════════════════════════════════
# 🐰 RABBITMQ CONFIGURATION
# ═══════════════════════════════════════════════════════════
MESSAGE_BROKER_URL=amqp://localhost
EXCHANGE_NAME=AUTH_MICROSERVICE
REMINDER_BINDING_KEY=REMINDER_AUTH_SERVICE

# ═══════════════════════════════════════════════════════════
# ⏰ CRON JOB SCHEDULE
# ═══════════════════════════════════════════════════════════
CRON_SEND_REMINDERS=*/5 * * * *
CRON_UPDATE_STATUS=*/10 * * * *
CRON_DELETE_SUCCESS=*/30 * * * *
```

---

## ⏰ Cron Job Schedule

| Job | Schedule | Description |
|:----|:---------|:------------|
| 📬 **Send Reminders** | Every 5 minutes | Process pending email queue |
| 📊 **Update Status** | Every 10 minutes | Update delivery status |
| 🧹 **Delete Success** | Every 30 minutes | Clean up delivered emails |

### Cron Expression Reference

```
┌───────────── minute (0 - 59)
│ ┌───────────── hour (0 - 23)
│ │ ┌───────────── day of month (1 - 31)
│ │ │ ┌───────────── month (1 - 12)
│ │ │ │ ┌───────────── day of week (0 - 6)
│ │ │ │ │
* * * * *
```

---

## 📬 Email Types

| Type | Trigger | Template | Description |
|:-----|:--------|:---------|:------------|
| 🔐 **Login Alert** | User login | `login-alert.html` | Notify user of new login |
| 💳 **Payment Confirmation** | Payment success | `payment-success.html` | Payment receipt |
| 🏆 **Contest Entry** | Join contest | `contest-entry.html` | Contest confirmation |
| ⏰ **Match Reminder** | Before match | `match-reminder.html` | Upcoming match notification |
| 🎉 **Welcome Email** | Registration | `welcome.html` | Welcome new users |
| 🏅 **Winner Notification** | Contest end | `winner.html` | Prize winning notification |

---

## 📡 API Endpoints

| Method | Endpoint | Description | Auth |
|:------:|:---------|:------------|:----:|
| `GET` | `/api/v1/reminders` | Get all reminders | ✅ |
| `POST` | `/api/v1/reminders` | Create reminder | ✅ |
| `GET` | `/api/v1/reminders/status` | Get email status | ✅ |
| `DELETE` | `/api/v1/reminders/:id` | Delete reminder | ✅ |

---

## 📦 Dependencies

| Package | Version | Purpose |
|:--------|:--------|:--------|
| `express` | ^4.21.2 | Web framework |
| `sequelize` | ^6.37.5 | PostgreSQL ORM |
| `pg` | ^8.16.3 | PostgreSQL driver |
| `amqplib` | ^0.10.8 | RabbitMQ client |
| `nodemailer` | ^6.9.16 | Email sending |
| `node-cron` | ^3.0.3 | Job scheduling |
| `dotenv` | ^16.4.7 | Environment configuration |

---

## 🐳 Docker

### Build Image

```bash
docker build -t power11-reminder-service .
```

### Run Container

```bash
docker run -d \
  --name reminder-service \
  -p 3007:3007 \
  --env-file .env \
  --network power11-network \
  power11-reminder-service
```

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

**[⬆ Back to Main README](../README.md)**

<br/>

<sub>Part of the Power11 Fantasy Sports Platform</sub>

</div>
