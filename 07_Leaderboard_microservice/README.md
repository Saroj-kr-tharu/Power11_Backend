<div align="center">

# 📊 Leaderboard Microservice

<img src="https://img.shields.io/badge/Service-Leaderboard-blue?style=for-the-badge" alt="Service"/>

### Power11 Fantasy Sports Platform

<br/>

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-ODM-880000?style=for-the-badge)](https://mongoosejs.com/)

<br/>

**📊 Rankings** · **🧮 Points** · **⚡ Real-time** · **🏆 Winners**

*Real-time rankings, automated points calculation, and leaderboard management for fantasy contests.*

</div>

---

## 📖 Overview

The **Leaderboard Microservice** handles all **rankings, points calculation, and leaderboard management** for the Power11 fantasy sports platform. It provides real-time score updates, contest standings, and automated winner calculation.

### 🎯 Key Responsibilities

| Responsibility | Description |
|:---------------|:------------|
| 🏅 **Live Rankings** | Real-time leaderboard updates |
| 🧮 **Points Calculation** | Automated fantasy points scoring |
| 📋 **Contest Standings** | Per-contest rankings and positions |
| 🏆 **Winner Declaration** | Automated winner calculation |
| 📈 **Performance Tracking** | Historical performance analytics |

---

## ✨ Features

<table>
<tr>
<td align="center">🏅</td>
<td><b>Live Rankings</b></td>
<td>Real-time leaderboard updates during matches</td>
</tr>
<tr>
<td align="center">🧮</td>
<td><b>Points Calculation</b></td>
<td>Automated fantasy points based on player performance</td>
</tr>
<tr>
<td align="center">📋</td>
<td><b>Contest Standings</b></td>
<td>Detailed per-contest rankings and positions</td>
</tr>
<tr>
<td align="center">📈</td>
<td><b>Performance Tracking</b></td>
<td>Historical performance data and trends</td>
</tr>
<tr>
<td align="center">⚡</td>
<td><b>Real-time Updates</b></td>
<td>Live score synchronization with matches</td>
</tr>
<tr>
<td align="center">🏆</td>
<td><b>Winner Declaration</b></td>
<td>Automated winner calculation and ranking</td>
</tr>
<tr>
<td align="center">📊</td>
<td><b>Analytics</b></td>
<td>Comprehensive statistics and insights</td>
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
│                      📊 LEADERBOARD MICROSERVICE (:3005)                         │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│   ┌───────────┐    ┌───────────────┐    ┌───────────────┐                       │
│   │  Routes   │───▶│  Controllers  │───▶│   Services    │                       │
│   │   Layer   │    │     Layer     │    │     Layer     │                       │
│   └───────────┘    └───────────────┘    └───────┬───────┘                       │
│                                                 │                                │
│                        ┌────────────────────────┴─────────────────┐             │
│                        ▼                                          ▼             │
│               ┌─────────────────┐                      ┌─────────────────┐      │
│               │   Repository    │                      │  Points Engine  │      │
│               │     Layer       │                      │  (Calculator)   │      │
│               └────────┬────────┘                      └────────┬────────┘      │
│                        │                                        │               │
└────────────────────────┼────────────────────────────────────────┼───────────────┘
                         │                                        │
                         ▼                                        ▼
          ┌───────────────────────┐              ┌──────────────────────────────┐
          │      🗄️ MongoDB      │              │   🔗 External Services       │
          │     (Leaderboard)     │              │  ┌────────────────────────┐  │
          │  ┌─────────────────┐  │              │  │ 🏆 Contest Service    │  │
          │  │   Rankings      │  │              │  │     (:3004)           │  │
          │  │   Points        │  │              │  └────────────────────────┘  │
          │  │   History       │  │              │  ┌────────────────────────┐  │
          │  └─────────────────┘  │              │  │ 🏏 Player Service     │  │
          └───────────────────────┘              │  │     (:3002)           │  │
                                                 │  └────────────────────────┘  │
                                                 └──────────────────────────────┘
```

---

## 📁 Project Structure

```
07_Leaderboard_microservice/
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
cd 07_Leaderboard_microservice

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
# 📊 LEADERBOARD MICROSERVICE CONFIGURATION
# ═══════════════════════════════════════════════════════════

# Server Configuration
PORT=3005
NODE_ENV=development

# ═══════════════════════════════════════════════════════════
# 🗄️ MONGODB CONFIGURATION
# ═══════════════════════════════════════════════════════════
MONGODB_URI=mongodb://localhost:27017/power11_leaderboard

# ═══════════════════════════════════════════════════════════
# 🔐 SECURITY CONFIGURATION
# ═══════════════════════════════════════════════════════════
PRIVATEJWT=your_jwt_secret_key
INTERNAL_SERVER_TOKEN=your_internal_service_token

# ═══════════════════════════════════════════════════════════
# 🔗 SERVICE URLs
# ═══════════════════════════════════════════════════════════
CONTEST_SERVICE_URL=http://localhost:3004
PLAYER_SERVICE_URL=http://localhost:3002
```

---

## 📡 API Endpoints

### 📊 Leaderboard

| Method | Endpoint | Description | Auth |
|:------:|:---------|:------------|:----:|
| `GET` | `/api/v1/leaderboard/:contestId` | Get contest leaderboard | ❌ |
| `GET` | `/api/v1/leaderboard/user/:userId` | Get user rankings | ✅ |
| `GET` | `/api/v1/leaderboard/live/:matchId` | Get live rankings | ❌ |
| `POST` | `/api/v1/leaderboard/calculate` | Calculate points | 🔗 Internal |
| `GET` | `/api/v1/leaderboard/history` | Get historical rankings | ✅ |

---

## 🏏 Fantasy Points System

### Batting Points

| Action | Points | Icon |
|:-------|:------:|:----:|
| Run Scored | +1 | 🏏 |
| Boundary (4) | +1 | 4️⃣ |
| Six | +2 | 6️⃣ |
| Half Century (50) | +8 | 🎯 |
| Century (100) | +16 | 💯 |
| Duck | -2 | 🦆 |

### Bowling Points

| Action | Points | Icon |
|:-------|:------:|:----:|
| Wicket | +25 | 🎳 |
| 3 Wicket Haul | +4 | 🔥 |
| 5 Wicket Haul | +8 | ⭐ |
| Maiden Over | +8 | 🎯 |
| Economy <5 (min 2 overs) | +6 | 📉 |
| Economy 5-6 | +4 | 📊 |
| Economy 10-11 | -2 | ⬆️ |
| Economy >12 | -4 | ❌ |

### Fielding Points

| Action | Points | Icon |
|:-------|:------:|:----:|
| Catch | +8 | 🧤 |
| Stumping | +12 | 🏏 |
| Run Out (Direct) | +12 | 🎯 |
| Run Out (Indirect) | +6 | 👥 |

### Bonus Points

| Condition | Points |
|:----------|:------:|
| Captain (C) | 2x |
| Vice-Captain (VC) | 1.5x |
| Man of the Match | +25 |

---

## 📊 Leaderboard Schema

```javascript
{
  leaderboardId: String,    // Unique leaderboard ID
  contestId: String,        // Associated contest
  matchId: String,          // Associated match
  entries: [{
    userId: String,
    teamId: String,
    rank: Number,
    points: Number,
    prize: Number
  }],
  lastUpdated: Date,
  status: String            // LIVE, FINAL
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
docker build -t power11-leaderboard-service .

# Run Container
docker run -d \
  --name leaderboard-service \
  -p 3005:3005 \
  --env-file .env \
  --network power11-network \
  power11-leaderboard-service
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
