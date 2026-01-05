<div align="center">

# ⚽ Match Microservice

<img src="https://img.shields.io/badge/Service-Match_Management-teal?style=for-the-badge" alt="Service"/>

### Power11 Fantasy Sports Platform

<br/>

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-ODM-880000?style=for-the-badge)](https://mongoosejs.com/)

<br/>

**⚽ Matches** · **📅 Scheduling** · **🔴 Live** · **📊 Scores**

*Comprehensive match scheduling, live score management, and match data operations for fantasy sports gaming.*

</div>

---

## 📖 Overview

The **Match Microservice** manages all **match scheduling, live scores, and match-related data** for the Power11 fantasy sports platform. It provides match schedules, venues, live updates, and historical match information essential for fantasy gaming.

### 🎯 Key Responsibilities

| Responsibility | Description |
|:---------------|:------------|
| 📅 **Match Scheduling** | Create and manage match schedules |
| 🔴 **Live Scores** | Real-time score updates during matches |
| 📊 **Match Data** | Store and retrieve match statistics |
| 🏟️ **Venue Management** | Match venue and location information |
| ⚡ **Status Updates** | Match status tracking (upcoming, live, completed) |

---

## ✨ Features

<table>
<tr>
<td align="center">📅</td>
<td><b>Match Scheduling</b></td>
<td>Create and manage upcoming match schedules</td>
</tr>
<tr>
<td align="center">🔴</td>
<td><b>Live Matches</b></td>
<td>Real-time match status and score updates</td>
</tr>
<tr>
<td align="center">📊</td>
<td><b>Match Statistics</b></td>
<td>Comprehensive match data and analytics</td>
</tr>
<tr>
<td align="center">🏟️</td>
<td><b>Venue Information</b></td>
<td>Match venue details and conditions</td>
</tr>
<tr>
<td align="center">👥</td>
<td><b>Team Lineups</b></td>
<td>Playing XI and squad information</td>
</tr>
<tr>
<td align="center">🔔</td>
<td><b>Match Notifications</b></td>
<td>Event triggers for match status changes</td>
</tr>
<tr>
<td align="center">📈</td>
<td><b>Historical Data</b></td>
<td>Past match records and statistics</td>
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
│                         ⚽ MATCH MICROSERVICE (:3008)                            │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│   ┌───────────┐    ┌───────────────┐    ┌───────────────┐                       │
│   │  Routes   │───▶│  Controllers  │───▶│   Services    │                       │
│   │   Layer   │    │     Layer     │    │     Layer     │                       │
│   └───────────┘    └───────────────┘    └───────┬───────┘                       │
│                                                 │                                │
│                                        ┌────────┴────────┐                       │
│                                        │   Repository    │                       │
│                                        │     Layer       │                       │
│                                        └────────┬────────┘                       │
│                                                 │                                │
└─────────────────────────────────────────────────┼────────────────────────────────┘
                                                  │
                                                  ▼
                                   ┌───────────────────────────┐
                                   │      🗄️ MongoDB          │
                                   ├───────────────────────────┤
                                   │  ┌─────────────────────┐  │
                                   │  │      Matches        │  │
                                   │  │  • Schedule         │  │
                                   │  │  • Scores           │  │
                                   │  │  • Venues           │  │
                                   │  │  • Teams            │  │
                                   │  └─────────────────────┘  │
                                   └───────────────────────────┘
```

---

## 📁 Project Structure

```
08_Match_microservice/
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
cd 08_Match_microservice

# 2️⃣ Install dependencies
npm install

# 3️⃣ Configure environment variables
cp .env.example .env

# 4️⃣ Seed match data (optional)
npm run seed:matches

# 5️⃣ Start the server
npm start
```

### ⚙️ Environment Configuration

```env
# ═══════════════════════════════════════════════════════════
# ⚽ MATCH MICROSERVICE CONFIGURATION
# ═══════════════════════════════════════════════════════════

# Server Configuration
PORT=3008
NODE_ENV=development

# ═══════════════════════════════════════════════════════════
# 🗄️ MONGODB CONFIGURATION
# ═══════════════════════════════════════════════════════════
MONGODB_URI=mongodb://localhost:27017/power11_matches

# ═══════════════════════════════════════════════════════════
# 🔐 SECURITY CONFIGURATION
# ═══════════════════════════════════════════════════════════
PRIVATEJWT=your_jwt_secret_key
INTERNAL_SERVER_TOKEN=your_internal_service_token

# ═══════════════════════════════════════════════════════════
# 🔗 SERVICE URLs
# ═══════════════════════════════════════════════════════════
PLAYER_SERVICE_URL=http://localhost:3002
CONTEST_SERVICE_URL=http://localhost:3004

# ═══════════════════════════════════════════════════════════
# 🐰 RABBITMQ CONFIGURATION (Optional)
# ═══════════════════════════════════════════════════════════
MESSAGE_BROKER_URL=amqp://localhost
EXCHANGE_NAME=MATCH_MICROSERVICE
```

---

## 📡 API Endpoints

### ⚽ Matches

| Method | Endpoint | Description | Auth |
|:------:|:---------|:------------|:----:|
| `GET` | `/api/v1/matches` | Get all matches | ❌ |
| `GET` | `/api/v1/matches/:id` | Get match by ID | ❌ |
| `GET` | `/api/v1/matches/upcoming` | Get upcoming matches | ❌ |
| `GET` | `/api/v1/matches/live` | Get live matches | ❌ |
| `GET` | `/api/v1/matches/completed` | Get completed matches | ❌ |
| `POST` | `/api/v1/matches` | Create match | 🔐 Admin |
| `PATCH` | `/api/v1/matches/:id` | Update match | 🔐 Admin |
| `PATCH` | `/api/v1/matches/:id/score` | Update score | 🔐 Admin |
| `GET` | `/api/v1/matches/:id/lineup` | Get playing XI | ❌ |

---

## 🔴 Match Status Flow

```
┌───────────┐     ┌───────────┐     ┌───────────┐     ┌───────────┐
│  UPCOMING │────▶│   LIVE    │────▶│ COMPLETED │────▶│ ARCHIVED  │
└───────────┘     └───────────┘     └───────────┘     └───────────┘
     │                 │                  │
     │                 │                  │
     ▼                 ▼                  ▼
  Scheduled       In Progress         Results
  • Date/Time     • Live Scores       • Final Score
  • Venue         • Ball-by-ball      • Statistics
  • Teams         • Commentary        • Awards
```

---

## 📊 Match Schema

```javascript
{
  matchId: String,           // Unique match ID
  matchType: String,         // T20, ODI, TEST, IPL
  status: String,            // UPCOMING, LIVE, COMPLETED
  
  teams: {
    home: {
      teamId: String,
      name: String,
      shortName: String,
      logo: String
    },
    away: {
      teamId: String,
      name: String,
      shortName: String,
      logo: String
    }
  },
  
  schedule: {
    startTime: Date,
    endTime: Date,
    timezone: String
  },
  
  venue: {
    name: String,
    city: String,
    country: String,
    capacity: Number
  },
  
  score: {
    home: { runs: Number, wickets: Number, overs: Number },
    away: { runs: Number, wickets: Number, overs: Number }
  },
  
  result: {
    winner: String,
    margin: String,
    summary: String
  },
  
  lineup: {
    home: [{ playerId: String, isCaptain: Boolean }],
    away: [{ playerId: String, isCaptain: Boolean }]
  },
  
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🏏 Match Types

| Type | Icon | Duration | Format |
|:-----|:----:|:--------:|:-------|
| **T20** | 🏏 | ~3 hours | 20 overs per side |
| **ODI** | ⚪ | ~8 hours | 50 overs per side |
| **Test** | 🔴 | 5 days | Unlimited overs |
| **IPL** | 🏆 | ~3 hours | T20 franchise |
| **International** | 🌍 | Various | National teams |

---

## 📦 Dependencies

| Package | Version | Purpose |
|:--------|:--------|:--------|
| `express` | ^5.1.0 | Web framework |
| `mongoose` | ^9.1.1 | MongoDB ODM |
| `jsonwebtoken` | ^9.0.2 | JWT authentication |
| `axios` | ^1.13.2 | HTTP client |
| `amqplib` | ^0.10.9 | RabbitMQ client |
| `uuid` | ^13.0.0 | UUID generation |
| `dotenv` | ^17.2.3 | Environment configuration |
| `nodemon` | ^3.1.11 | Development hot reload |

---

## 🌱 Seeding Data

```bash
# Seed all data
npm run seed

# Seed matches only
npm run seed:matches
```

---

## 🐳 Docker

```bash
# Build Image
docker build -t power11-match-service .

# Run Container
docker run -d \
  --name match-service \
  -p 3008:3008 \
  --env-file .env \
  --network power11-network \
  power11-match-service
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
