<div align="center">

# 🏏 Player & Game Microservice

<img src="https://img.shields.io/badge/Service-Player_&_Game-green?style=for-the-badge" alt="Service"/>

### Power11 Fantasy Sports Platform

<br/>

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-ODM-880000?style=for-the-badge)](https://mongoosejs.com/)

<br/>

**🏏 Players** · **📊 Statistics** · **⚡ Real-time** · **🔍 Search**

*Comprehensive player data and game information management for fantasy sports gaming with real-time statistics and performance tracking.*

</div>

---

## 📖 Overview

The **Player & Game Microservice** manages all **player data, match information, and game statistics** for the Power11 fantasy sports platform. It provides real-time player stats, match schedules, and performance data essential for fantasy team creation.

### 🎯 Key Responsibilities

| Responsibility | Description |
|:---------------|:------------|
| 👤 **Player Management** | CRUD operations for player profiles |
| 📊 **Statistics** | Real-time performance statistics |
| ⭐ **Fantasy Points** | Points calculation system |
| 🔍 **Search & Filter** | Advanced player search capabilities |
| 📅 **Game Data** | Match schedules and game information |

---

## ✨ Features

<table>
<tr>
<td align="center">👤</td>
<td><b>Player Management</b></td>
<td>Complete player profiles with bio, stats, and history</td>
</tr>
<tr>
<td align="center">📊</td>
<td><b>Performance Stats</b></td>
<td>Real-time player performance tracking and analytics</td>
</tr>
<tr>
<td align="center">⭐</td>
<td><b>Fantasy Points</b></td>
<td>Automated fantasy points calculation system</td>
</tr>
<tr>
<td align="center">🔍</td>
<td><b>Advanced Search</b></td>
<td>Filter players by team, role, form, and price</td>
</tr>
<tr>
<td align="center">📅</td>
<td><b>Game Information</b></td>
<td>Match schedules, venues, and game details</td>
</tr>
<tr>
<td align="center">⚡</td>
<td><b>Live Updates</b></td>
<td>Real-time data synchronization</td>
</tr>
<tr>
<td align="center">🏏</td>
<td><b>Role Classification</b></td>
<td>Batsman, Bowler, All-rounder, Wicket-keeper</td>
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
│                    🏏 PLAYER & GAME MICROSERVICE (:3002)                         │
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
                                   │  │      Players        │  │
                                   │  │  • Profile Info     │  │
                                   │  │  • Statistics       │  │
                                   │  │  • Fantasy Points   │  │
                                   │  └─────────────────────┘  │
                                   │  ┌─────────────────────┐  │
                                   │  │       Games         │  │
                                   │  │  • Schedules        │  │
                                   │  │  • Venues           │  │
                                   │  └─────────────────────┘  │
                                   └───────────────────────────┘
```

---

## 📁 Project Structure

```
04_Player_Game_microservice/
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
cd 04_Player_Game_microservice

# 2️⃣ Install dependencies
npm install

# 3️⃣ Configure environment variables
cp .env.example .env

# 4️⃣ Seed initial data (optional)
npm run seed

# 5️⃣ Start the server
npm start
```

### ⚙️ Environment Configuration

```env
# ═══════════════════════════════════════════════════════════
# 🏏 PLAYER & GAME MICROSERVICE CONFIGURATION
# ═══════════════════════════════════════════════════════════

# Server Configuration
PORT=3002
NODE_ENV=development

# ═══════════════════════════════════════════════════════════
# 🗄️ MONGODB CONFIGURATION
# ═══════════════════════════════════════════════════════════
MONGODB_URI=mongodb://localhost:27017/power11_players

# ═══════════════════════════════════════════════════════════
# 🔐 SECURITY CONFIGURATION
# ═══════════════════════════════════════════════════════════
PRIVATEJWT=your_jwt_secret_key
INTERNAL_SERVER_TOKEN=your_internal_service_token
```

---

## 📡 API Endpoints

### 👤 Players

| Method | Endpoint | Description | Auth |
|:------:|:---------|:------------|:----:|
| `GET` | `/api/v1/players` | Get all players | ❌ |
| `GET` | `/api/v1/players/:id` | Get player by ID | ❌ |
| `GET` | `/api/v1/players/search` | Search players | ❌ |
| `GET` | `/api/v1/players/team/:teamId` | Get players by team | ❌ |
| `POST` | `/api/v1/players` | Create player | 🔐 Admin |
| `PATCH` | `/api/v1/players/:id` | Update player | 🔐 Admin |
| `DELETE` | `/api/v1/players/:id` | Delete player | 🔐 Admin |

### 📅 Games

| Method | Endpoint | Description | Auth |
|:------:|:---------|:------------|:----:|
| `GET` | `/api/v1/games` | Get all games | ❌ |
| `GET` | `/api/v1/games/:id` | Get game by ID | ❌ |
| `GET` | `/api/v1/games/upcoming` | Get upcoming games | ❌ |
| `POST` | `/api/v1/games` | Create game | 🔐 Admin |

---

## 🏏 Player Roles

| Role | Icon | Description |
|:-----|:----:|:------------|
| **Batsman** | 🏏 | Primary run scorers |
| **Bowler** | 🎯 | Primary wicket takers |
| **All-rounder** | ⚡ | Both batting and bowling |
| **Wicket-keeper** | 🧤 | Keeper + potential batsman |

---

## 📊 Player Schema

```javascript
{
  playerId: String,        // Unique player ID
  name: String,            // Full name
  team: String,            // Team name
  role: String,            // BAT, BOWL, AR, WK
  battingStyle: String,    // Right/Left handed
  bowlingStyle: String,    // Fast/Spin
  credits: Number,         // Fantasy price (8.0 - 11.0)
  stats: {
    matches: Number,
    runs: Number,
    wickets: Number,
    average: Number,
    strikeRate: Number
  },
  fantasyPoints: Number,
  isActive: Boolean
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
| `nodemon` | ^3.1.11 | Development hot reload |

---

## 🐳 Docker

```bash
# Build Image
docker build -t power11-player-game-service .

# Run Container
docker run -d \
  --name player-game-service \
  -p 3002:3002 \
  --env-file .env \
  --network power11-network \
  power11-player-game-service
```

---

## 🌱 Seeding Data

```bash
# Seed all player data
npm run seed

# Seed specific data
npm run seed:players
npm run seed:games
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
