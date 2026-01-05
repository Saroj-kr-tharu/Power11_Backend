<div align="center">

# 👥 Team Microservice

<img src="https://img.shields.io/badge/Service-Team_Management-purple?style=for-the-badge" alt="Service"/>

### Power11 Fantasy Sports Platform

<br/>

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-ODM-880000?style=for-the-badge)](https://mongoosejs.com/)

<br/>

**👥 Teams** · **✅ Validation** · **👑 Captain** · **🔗 Integration**

*Fantasy team creation and management service with intelligent validation, captain selection, and seamless service integration.*

</div>

---

## 📖 Overview

The **Team Microservice** handles all **fantasy team creation, management, and validation** for the Power11 platform. Users can create teams by selecting players, manage multiple teams, set captains, and participate in contests with validated team compositions.

### 🎯 Key Responsibilities

| Responsibility | Description |
|:---------------|:------------|
| ➕ **Team Creation** | Create fantasy teams with player selection |
| ✅ **Validation** | Enforce team composition rules |
| 👑 **Captain System** | Captain (2x) and Vice-captain (1.5x) selection |
| 🔄 **Team Updates** | Edit and update existing teams |
| 🔗 **Service Integration** | Communicate with Player & Contest services |

---

## ✨ Features

<table>
<tr>
<td align="center">➕</td>
<td><b>Team Creation</b></td>
<td>Create fantasy teams with 11-player selection</td>
</tr>
<tr>
<td align="center">✏️</td>
<td><b>Team Management</b></td>
<td>Edit, update, and delete existing teams</td>
</tr>
<tr>
<td align="center">✅</td>
<td><b>Rule Validation</b></td>
<td>Automatic validation of team composition rules</td>
</tr>
<tr>
<td align="center">👑</td>
<td><b>Captain Selection</b></td>
<td>Captain (2x) and Vice-captain (1.5x) point multipliers</td>
</tr>
<tr>
<td align="center">📊</td>
<td><b>Team Analytics</b></td>
<td>Performance tracking and historical data</td>
</tr>
<tr>
<td align="center">📋</td>
<td><b>Multi-Team Support</b></td>
<td>Manage multiple teams per match</td>
</tr>
<tr>
<td align="center">🔗</td>
<td><b>Service Integration</b></td>
<td>Secure communication with other microservices</td>
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
│                         👥 TEAM MICROSERVICE (:3003)                             │
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
                   │       (Teams)         │     │  ┌────────────────────────┐  │
                   │  ┌─────────────────┐  │     │  │ 🏏 Player Service     │  │
                   │  │    Teams        │  │     │  │     (:3002)           │  │
                   │  │    Entries      │  │     │  └────────────────────────┘  │
                   │  └─────────────────┘  │     │  ┌────────────────────────┐  │
                   └───────────────────────┘     │  │ 🏆 Contest Service    │  │
                                                 │  │     (:3004)           │  │
                                                 │  └────────────────────────┘  │
                                                 └──────────────────────────────┘
```

---

## 🔐 Service-to-Service Communication

### Internal Service Token

This microservice uses **Internal Service Token** authentication for secure service-to-service communication.

```
┌─────────────────┐    x-internal-token     ┌─────────────────┐
│  Team Service   │ ──────────────────────▶ │  Player Service │
│    (:3003)      │                         │    (:3002)      │
└─────────────────┘                         └─────────────────┘
```

| Security Feature | Description |
|:-----------------|:------------|
| 🔑 **Internal Token** | Shared secret for service-to-service auth |
| 🛡️ **JWT Validation** | User requests validated via API Gateway |
| 🔒 **Header Auth** | `x-internal-token` header for internal calls |
| ✅ **Token Verification** | Middleware validates token before processing |

---

## 📁 Project Structure

```
05_Team_microservice/
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
cd 05_Team_microservice

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
# 👥 TEAM MICROSERVICE CONFIGURATION
# ═══════════════════════════════════════════════════════════

# Server Configuration
PORT=3003
NODE_ENV=development

# ═══════════════════════════════════════════════════════════
# 🗄️ MONGODB CONFIGURATION
# ═══════════════════════════════════════════════════════════
MONGODB_URI=mongodb://localhost:27017/power11_teams

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
```

---

## 📡 API Endpoints

### 👥 Teams

| Method | Endpoint | Description | Auth |
|:------:|:---------|:------------|:----:|
| `GET` | `/api/v1/teams` | Get user's teams | ✅ |
| `GET` | `/api/v1/teams/:id` | Get team by ID | ✅ |
| `GET` | `/api/v1/teams/match/:matchId` | Get teams by match | ✅ |
| `POST` | `/api/v1/teams` | Create new team | ✅ |
| `PATCH` | `/api/v1/teams/:id` | Update team | ✅ |
| `DELETE` | `/api/v1/teams/:id` | Delete team | ✅ |
| `POST` | `/api/v1/teams/:id/captain` | Set captain/VC | ✅ |

---

## 🏏 Team Composition Rules

### Player Requirements

| Role | Minimum | Maximum | Icon |
|:-----|:-------:|:-------:|:----:|
| **Batsmen** | 3 | 5 | 🏏 |
| **Bowlers** | 3 | 5 | 🎯 |
| **All-rounders** | 1 | 3 | ⚡ |
| **Wicket-keepers** | 1 | 2 | 🧤 |
| **Total Players** | 11 | 11 | 👥 |

### Point Multipliers

| Role | Multiplier | Description |
|:-----|:----------:|:------------|
| 👑 **Captain** | 2x | Double points for captain |
| 🥈 **Vice-Captain** | 1.5x | 1.5x points for vice-captain |
| 👤 **Regular** | 1x | Standard points |

### Credit System

- **Total Credits**: 100 credits per team
- **Player Credits**: 7.0 - 11.0 credits per player
- **Budget Management**: Smart selection within limits

---

## 📊 Team Schema

```javascript
{
  teamId: String,           // Unique team ID
  userId: String,           // Owner user ID
  matchId: String,          // Associated match
  teamName: String,         // Team display name
  players: [{
    playerId: String,
    role: String,           // Captain/VC/Player
  }],
  captain: String,          // Captain player ID
  viceCaptain: String,      // Vice-captain player ID
  totalCredits: Number,     // Credits used
  totalPoints: Number,      // Fantasy points earned
  createdAt: Date,
  updatedAt: Date
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
docker build -t power11-team-service .

# Run Container
docker run -d \
  --name team-service \
  -p 3003:3003 \
  --env-file .env \
  --network power11-network \
  power11-team-service
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
