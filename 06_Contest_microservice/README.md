<div align="center">

# 🏆 Contest Microservice

<img src="https://img.shields.io/badge/Service-Contest_Management-gold?style=for-the-badge" alt="Service"/>

### Power11 Fantasy Sports Platform

<br/>

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-ODM-880000?style=for-the-badge)](https://mongoosejs.com/)

<br/>

**🏆 Contests** · **💰 Prizes** · **📝 Entries** · **🎮 Gaming**

*Contest creation, entry management, and prize distribution system for competitive fantasy gaming.*

</div>

---

## 📖 Overview

The **Contest Microservice** manages all **contest creation, user entries, and prize distribution** for the Power11 fantasy sports platform. It handles different contest types, entry fees, validation, and winning calculations.

### 🎯 Key Responsibilities

| Responsibility | Description |
|:---------------|:------------|
| 🏆 **Contest Management** | CRUD operations for contests |
| 📝 **Entry Processing** | Handle user contest entries |
| 💰 **Prize Distribution** | Calculate and distribute winnings |
| ✅ **Validation** | Validate entries and payments |
| 📊 **Analytics** | Real-time contest statistics |

---

## ✨ Features

<table>
<tr>
<td align="center">🎯</td>
<td><b>Contest Creation</b></td>
<td>Create various contest types with custom rules</td>
</tr>
<tr>
<td align="center">📝</td>
<td><b>Entry Management</b></td>
<td>Handle user contest entries and validations</td>
</tr>
<tr>
<td align="center">💰</td>
<td><b>Prize Pool</b></td>
<td>Dynamic prize pool calculation and distribution</td>
</tr>
<tr>
<td align="center">📊</td>
<td><b>Contest Analytics</b></td>
<td>Real-time statistics and participation tracking</td>
</tr>
<tr>
<td align="center">🎮</td>
<td><b>Contest Types</b></td>
<td>Free, paid, mega, head-to-head contests</td>
</tr>
<tr>
<td align="center">✅</td>
<td><b>Entry Validation</b></td>
<td>Payment and team validation before entry</td>
</tr>
<tr>
<td align="center">🔒</td>
<td><b>Secure Processing</b></td>
<td>Transaction-safe entry and payment processing</td>
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
│                        🏆 CONTEST MICROSERVICE (:3004)                           │
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
│                        │   Repository    │           │ External Service│        │
│                        │     Layer       │           │     Calls       │        │
│                        └────────┬────────┘           └────────┬────────┘        │
│                                 │                             │                 │
└─────────────────────────────────┼─────────────────────────────┼─────────────────┘
                                  │                             │
                                  ▼                             ▼
                   ┌───────────────────────┐     ┌──────────────────────────────┐
                   │      🗄️ MongoDB      │     │   🔗 External Services       │
                   │      (Contests)       │     │  ┌────────────────────────┐  │
                   │  ┌─────────────────┐  │     │  │ 💳 Payment Service    │  │
                   │  │    Contests     │  │     │  │     (:3006)           │  │
                   │  │    Entries      │  │     │  └────────────────────────┘  │
                   │  │    Prizes       │  │     │  ┌────────────────────────┐  │
                   │  └─────────────────┘  │     │  │ 👥 Team Service       │  │
                   └───────────────────────┘     │  │     (:3003)           │  │
                                                 │  └────────────────────────┘  │
                                                 └──────────────────────────────┘
```

---

## 🔐 Service-to-Service Communication

```
┌─────────────────┐    x-internal-token     ┌─────────────────┐
│ Contest Service │ ──────────────────────▶ │ Payment Service │
│    (:3004)      │                         │    (:3006)      │
└─────────────────┘                         └─────────────────┘
```

---

## 📁 Project Structure

```
06_Contest_microservice/
│
├── 📄 dockerfile                    # Docker configuration
├── 📄 package.json                  # Dependencies and scripts
├── 📄 README.md                     # This documentation
│
└── 📁 src/
    ├── 📄 index.js                  # 🚀 Application entry point
    │
    ├── 📁 config/
    │   ├── 📄 database.js           # MongoDB connection
    │   └── 📄 server.config.js      # Server settings
    │
    ├── 📁 controllers/              # Request handlers
    ├── 📁 middlewares/              # Custom middleware
    ├── 📁 models/                   # Mongoose models
    ├── 📁 repository/               # Data access layer
    ├── 📁 Routes/                   # API routes
    ├── 📁 seeders/                  # Database seeders
    ├── 📁 services/                 # Business logic
    └── 📁 utlis/                    # Utilities
```

---

## 🚀 Quick Start

### Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | v18.x or higher |
| MongoDB | v7.x |
| npm | v9.x or higher |

### 📥 Installation

```bash
# 1️⃣ Navigate to the service directory
cd 06_Contest_microservice

# 2️⃣ Install dependencies
npm install

# 3️⃣ Configure environment variables
cp .env.example .env

# 4️⃣ Start the server
npm start
```

### ⚙️ Environment Configuration

```env
# ═══════════════════════════════════════════════════════════
# 🏆 CONTEST MICROSERVICE CONFIGURATION
# ═══════════════════════════════════════════════════════════

# Server Configuration
PORT=3004
NODE_ENV=development

# ═══════════════════════════════════════════════════════════
# 🗄️ MONGODB CONFIGURATION
# ═══════════════════════════════════════════════════════════
MONGODB_URI=mongodb://localhost:27017/power11_contests

# ═══════════════════════════════════════════════════════════
# 🔐 SECURITY CONFIGURATION
# ═══════════════════════════════════════════════════════════
PRIVATEJWT=your_jwt_secret_key
INTERNAL_SERVER_TOKEN=your_internal_service_token

# ═══════════════════════════════════════════════════════════
# 🔗 SERVICE URLs
# ═══════════════════════════════════════════════════════════
PAYMENT_SERVICE_URL=http://localhost:3006
TEAM_SERVICE_URL=http://localhost:3003
```

---

## 📡 API Endpoints

### 🏆 Contests

| Method | Endpoint | Description | Auth |
|:------:|:---------|:------------|:----:|
| `GET` | `/api/v1/contests` | Get all contests | ❌ |
| `GET` | `/api/v1/contests/:id` | Get contest by ID | ❌ |
| `GET` | `/api/v1/contests/match/:matchId` | Get contests by match | ❌ |
| `POST` | `/api/v1/contests` | Create contest | 🔐 Admin |
| `POST` | `/api/v1/contests/:id/join` | Join contest | ✅ |
| `GET` | `/api/v1/contests/my-contests` | Get user's contests | ✅ |
| `GET` | `/api/v1/contests/:id/leaderboard` | Get contest standings | ❌ |

---

## 🎮 Contest Types

| Type | Icon | Entry Fee | Prize Pool | Max Entries |
|:-----|:----:|:---------:|:----------:|:-----------:|
| **Free** | 🆓 | ₹0 | Fixed | Unlimited |
| **Practice** | 📝 | ₹0 | None | Unlimited |
| **Mega** | 🏆 | ₹49-499 | Variable | 10,000+ |
| **Head-to-Head** | ⚔️ | ₹10-1000 | 2x Entry | 2 |
| **Private** | 🔒 | Custom | Custom | Custom |
| **Winner Takes All** | 👑 | Variable | 100% | Variable |

---

## 💰 Prize Distribution

### Prize Breakdown Structure

| Rank | Percentage | Example (₹10,000 Pool) |
|:----:|:----------:|:----------------------:|
| 1st | 50% | ₹5,000 |
| 2nd | 25% | ₹2,500 |
| 3rd | 15% | ₹1,500 |
| 4th-10th | 10% | ₹143 each |

### Contest Schema

```javascript
{
  contestId: String,        // Unique contest ID
  matchId: String,          // Associated match
  contestName: String,      // Display name
  contestType: String,      // FREE, PAID, MEGA, H2H
  entryFee: Number,         // Entry fee amount
  prizePool: Number,        // Total prize pool
  maxEntries: Number,       // Maximum participants
  currentEntries: Number,   // Current count
  prizeBreakup: [{
    rank: Number,
    prize: Number
  }],
  status: String,           // UPCOMING, LIVE, COMPLETED
  startTime: Date,
  endTime: Date
}
```

---

## 📦 Dependencies

| Package | Version | Purpose |
|:--------|:--------|:--------|
| `express` | ^5.1.0 | Web framework |
| `mongoose` | ^9.1.1 | MongoDB ODM |
| `jsonwebtoken` | ^9.0.2 | JWT authentication |
| `axios` | ^1.13.2 | HTTP client |
| `uuid` | ^13.0.0 | UUID generation |
| `dotenv` | ^17.2.3 | Environment configuration |

---

## 🐳 Docker

```bash
# Build Image
docker build -t power11-contest-service .

# Run Container
docker run -d \
  --name contest-service \
  -p 3004:3004 \
  --env-file .env \
  --network power11-network \
  power11-contest-service
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
