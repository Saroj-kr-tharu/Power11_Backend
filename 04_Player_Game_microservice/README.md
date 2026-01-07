<div align="center">

# 🏏 Player & Game Microservice

<img src="https://img.shields.io/badge/Service-Player_&_Game-green?style=for-the-badge" alt="Service"/>
<img src="https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge" alt="Version"/>
<img src="https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge" alt="Status"/>

### ⚡ Battle11 Fantasy Sports Platform

<br/>

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.1.0-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-9.1.1-880000?style=for-the-badge)](https://mongoosejs.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

<br/>

**🎮 Games** · **👥 Players** · **🏆 Teams** · **📊 Match Players** · **🔐 Secure APIs**

*Comprehensive game configuration, player management, team master data, and match player allocation service for fantasy sports gaming with multi-game support (Cricket & Football).*

</div>

---

## 📖 Overview

The **Player & Game Microservice** is a core backend service that manages **game configurations, player data, team master information, and match-player relationships** for the Battle11 fantasy sports platform. It provides essential data infrastructure for fantasy team creation across multiple sports.

### 🎯 Key Responsibilities

| Responsibility | Description |
|:---------------|:------------|
| 🎮 **Game Configuration** | Manage game types (Cricket/Football), scoring rules, roles config |
| 👤 **Player Management** | CRUD operations for player profiles with team associations |
| 🏆 **Team Master** | Master data for teams including logos, countries, and metadata |
| 📊 **Match Players** | Match-specific player allocation with credits and playing status |
| 🔐 **Security** | Internal service token validation & JWT authentication |

---

## ✨ Features

<table>
<tr>
<td align="center">🎮</td>
<td><b>Multi-Game Support</b></td>
<td>Supports CRICKET and FOOTBALL with configurable rules</td>
</tr>
<tr>
<td align="center">👤</td>
<td><b>Player Management</b></td>
<td>Complete player profiles with roles, teams, and base credits</td>
</tr>
<tr>
<td align="center">🏆</td>
<td><b>Team Master Data</b></td>
<td>Teams with logos, short names, countries, and metadata</td>
</tr>
<tr>
<td align="center">📊</td>
<td><b>Match Player Allocation</b></td>
<td>Dynamic player credits, playing status per match</td>
</tr>
<tr>
<td align="center">⚙️</td>
<td><b>Scoring Rules Engine</b></td>
<td>Configurable scoring rules per game type</td>
</tr>
<tr>
<td align="center">🔄</td>
<td><b>Roles Configuration</b></td>
<td>Min/Max player limits per role for team building</td>
</tr>
<tr>
<td align="center">🔐</td>
<td><b>Secure APIs</b></td>
<td>Internal service token + JWT token authentication</td>
</tr>
<tr>
<td align="center">📨</td>
<td><b>Message Queue Ready</b></td>
<td>RabbitMQ/AMQP integration for async communication</td>
</tr>
</table>

---

## 🏗️ Architecture

```
                              ┌─────────────────────────┐
                              │     🌐 API Gateway      │
                              │        (:3000)          │
                              └───────────┬─────────────┘
                                          │
                                          ▼
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                    🏏 PLAYER & GAME MICROSERVICE (:PORT)                            │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│   ┌────────────┐    ┌────────────────┐    ┌────────────────┐                       │
│   │   Routes   │───▶│  Middlewares   │───▶│  Controllers   │                       │
│   │   /api/*   │    │ • Internal Auth│    │  • Game        │                       │
│   └────────────┘    │ • JWT Verify   │    │  • Player      │                       │
│                     │ • Validation   │    │  • TeamMaster  │                       │
│                     └────────────────┘    │  • MatchPlayer │                       │
│                                           └───────┬────────┘                       │
│                                                   │                                │
│                     ┌─────────────────────────────┼─────────────────────────────┐  │
│                     │                             ▼                             │  │
│                     │    ┌────────────────────────────────────────────┐         │  │
│                     │    │              Services Layer                │         │  │
│                     │    │  • game.service     • player.service       │         │  │
│                     │    │  • team.master.service • match.player.svc  │         │  │
│                     │    └────────────────────────┬───────────────────┘         │  │
│                     │                             │                             │  │
│                     │                             ▼                             │  │
│                     │    ┌────────────────────────────────────────────┐         │  │
│                     │    │            Repository Layer                │         │  │
│                     │    │  • game.repo   • player.repo               │         │  │
│                     │    │  • teamMaster.repo  • matchPlayer.repo     │         │  │
│                     │    └────────────────────────┬───────────────────┘         │  │
│                     │                             │                             │  │
│                     └─────────────────────────────┼─────────────────────────────┘  │
│                                                   │                                │
└───────────────────────────────────────────────────┼────────────────────────────────┘
                                                    │
                        ┌───────────────────────────┼───────────────────────────┐
                        │                           ▼                           │
                        │        ┌─────────────────────────────────┐            │
                        │        │         🗄️ MongoDB             │            │
                        │        ├─────────────────────────────────┤            │
                        │        │  📦 Games        📦 Players     │            │
                        │        │  📦 TeamMasters  📦 MatchPlayers│            │
                        │        └─────────────────────────────────┘            │
                        │                                                       │
                        │        ┌─────────────────────────────────┐            │
                        │        │       🐰 RabbitMQ (AMQP)        │            │
                        │        │    Async Message Processing     │            │
                        │        └─────────────────────────────────┘            │
                        └───────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
04_Player_Game_microservice/
│
├── 📄 dockerfile                    # Docker multi-stage build config
├── 📄 package.json                  # Dependencies & npm scripts
├── 📄 README.md                     # Documentation (this file)
│
└── 📁 src/
    ├── 📄 index.js                  # 🚀 Application entry point
    │
    ├── 📁 config/
    │   ├── 📄 database.js           # MongoDB connection setup
    │   └── 📄 server.config.js      # Environment configuration
    │
    ├── 📁 controllers/
    │   ├── 📄 game.controller.js    # Game CRUD handlers
    │   ├── 📄 player.controller.js  # Player CRUD handlers
    │   ├── 📄 teammaster.controller.js  # Team master handlers
    │   ├── 📄 match.player.controller.js # Match player handlers
    │   └── 📄 index.js              # Controllers barrel export
    │
    ├── 📁 middlewares/
    │   ├── 📄 internal.service.middleware.js  # Service-to-service auth
    │   ├── 📄 user.middleware.js    # JWT token validation
    │   ├── 📄 game.middleware.js    # Request validation
    │   └── 📄 index.js              # Middlewares barrel export
    │
    ├── 📁 models/
    │   ├── 📄 game.js               # Game schema (Cricket/Football)
    │   ├── 📄 player.js             # Player schema
    │   ├── 📄 teammaster.js         # Team master schema
    │   └── 📄 MatchPlayer.js        # Match-Player association schema
    │
    ├── 📁 repository/
    │   ├── 📄 curd.repo.js          # Generic CRUD repository
    │   ├── 📄 game.repo.js          # Game data access
    │   ├── 📄 player.repo.js        # Player data access
    │   ├── 📄 teamMater.repo.js     # Team master data access
    │   └── 📄 matchPlayer.repo.js   # Match player data access
    │
    ├── 📁 Routes/
    │   └── 📁 routes/
    │       └── 📄 index.js          # All API route definitions
    │
    ├── 📁 seeders/
    │   ├── 📄 game.seed.js          # Game seed data
    │   ├── 📄 player.seed.js        # Player seed data
    │   ├── 📄 teammaster.seed.js    # Team master seed data
    │   ├── 📄 matchplayer.seed.js   # Match player seed data
    │   └── 📄 index.js              # Master seeder
    │
    ├── 📁 services/
    │   ├── 📄 curd.service.js       # Generic CRUD service
    │   ├── 📄 game.service.js       # Game business logic
    │   ├── 📄 player.service.js     # Player business logic
    │   ├── 📄 team.master.service.js    # Team master logic
    │   └── 📄 match.player.service.js   # Match player logic
    │
    └── 📁 utlis/
        ├── 📄 jwtHelper.js          # JWT utilities
        └── 📁 Errors/
            └── 📄 https_codes.js    # HTTP status codes
```

---

## 🚀 Quick Start

### Prerequisites

| Requirement | Version | Description |
|-------------|---------|-------------|
| **Node.js** | v18.x+ | JavaScript runtime |
| **MongoDB** | v6.x+ | NoSQL database |
| **npm** | v9.x+ | Package manager |
| **Docker** | Latest | Container runtime (optional) |

### 📥 Installation

```bash
# 1️⃣ Navigate to the service directory
cd 04_Player_Game_microservice

# 2️⃣ Install dependencies
npm install

# 3️⃣ Configure environment variables
# Create .env file with required variables (see below)

# 4️⃣ Start the development server
npm start

# ✅ Server will start at configured PORT
```

### ⚙️ Environment Configuration

Create a `.env` file in the root directory:

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
MANGODB_URL=mongodb://localhost:27017/battle11_player_game

# ═══════════════════════════════════════════════════════════
# 🔐 SECURITY CONFIGURATION
# ═══════════════════════════════════════════════════════════
PRIVATEJWT=your_jwt_secret_key
RefreshPRIVATEJWT=your_refresh_jwt_secret
INTERNAL_SERVER_TOKEN=your_internal_service_token

# ═══════════════════════════════════════════════════════════
# 📨 MESSAGE BROKER (AMQP/RabbitMQ)
# ═══════════════════════════════════════════════════════════
MESSAGE_BROKER_URL=amqp://localhost:5672
CHANNEL_NAME=player_game_channel
EXCHANGE_NAME=battle11_exchange
REMINDER_BINDING_KEY=reminder_key
```

---

## 📡 API Endpoints

> **Base URL:** `/api/v1`  
> **Auth:** 🔐 = Internal Token + JWT Required | 🔑 = Internal Token Only

### 🎮 Games

| Method | Endpoint | Description | Auth |
|:------:|:---------|:------------|:----:|
| `POST` | `/api/v1/game` | Create new game (Cricket/Football) | 🔐 |
| `GET` | `/api/v1/game` | Get all games | 🔑 |
| `GET` | `/api/v1/game/:gameId` | Get game by ID | 🔐 |
| `PATCH` | `/api/v1/game/:gameId` | Update game configuration | 🔑 |
| `DELETE` | `/api/v1/game/:gameId` | Delete game | 🔑 |

### 👤 Players

| Method | Endpoint | Description | Auth |
|:------:|:---------|:------------|:----:|
| `POST` | `/api/v1/player` | Add new player | 🔑 |
| `GET` | `/api/v1/player` | Get all players | 🔑 |
| `GET` | `/api/v1/player/:gameId` | Get players by game | 🔐 |
| `PATCH` | `/api/v1/player/:playerId` | Update player | 🔑 |
| `DELETE` | `/api/v1/player/:playerId` | Delete player | 🔑 |

### 🏆 Team Master

| Method | Endpoint | Description | Auth |
|:------:|:---------|:------------|:----:|
| `POST` | `/api/v1/teammaster` | Create team master | 🔐 |
| `GET` | `/api/v1/teammaster` | Get all teams | 🔐 |
| `GET` | `/api/v1/teammaster/:gameId` | Get teams by game | 🔐 |
| `PATCH` | `/api/v1/teammaster/:teammasterId` | Update team | 🔐 |
| `DELETE` | `/api/v1/teammaster/:teammasterId` | Delete team | 🔐 |

### 📊 Match Players

| Method | Endpoint | Description | Auth |
|:------:|:---------|:------------|:----:|
| `POST` | `/api/v1/matchPlayer` | Get all match players | 🔐 |

### 🔍 Health Check

| Method | Endpoint | Description | Auth |
|:------:|:---------|:------------|:----:|
| `GET` | `/api/v1/player/check` | Service health check | ❌ |

---

## 📊 Data Models

### 🎮 Game Schema

```javascript
{
  name: String,              // Enum: ['CRICKET', 'FOOTBALL']
  maxPlayers: Number,        // Max players per team
  creditLimit: Number,       // Total credits allowed
  rolesConfig: Map,          // { role: { min: Number, max: Number } }
  scoringRules: Map,         // { action: points }
  status: String,            // Enum: ['ACTIVE', 'INACTIVE']
  rulesVersion: Number       // Version tracking
}
```

### 👤 Player Schema

```javascript
{
  name: String,              // Player full name
  gameId: ObjectId,          // Reference to Game
  roles: [String],           // Player roles array
  team: String,              // Team name
  baseCredits: Number        // Base fantasy credits
}
```

### 🏆 Team Master Schema

```javascript
{
  gameId: ObjectId,          // Reference to Game
  name: String,              // Team full name
  shortName: String,         // Team abbreviation (uppercase)
  logo: String,              // Team logo URL
  country: String,           // Team country
  homeCity: String,          // Home city
  status: String,            // Enum: ['ACTIVE', 'INACTIVE']
  metadata: Map,             // Additional data
  createdBy: String          // Creator reference
}
```

### 📊 Match Player Schema

```javascript
{
  matchId: ObjectId,         // Reference to Match
  playerId: ObjectId,        // Reference to Player
  gameId: ObjectId,          // Reference to Game
  credits: Number,           // Match-specific credits
  roles: [String],           // Roles for this match
  isPlaying: Boolean,        // In playing XI
  playingStatus: String,     // Enum: ['ANNOUNCED', 'UNANNOUNCED', 'BENCH']
  points: Number,            // Fantasy points scored
  isActive: Boolean          // Active status
}
```

---

## 📦 Dependencies

| Package | Version | Purpose |
|:--------|:--------|:--------|
| `express` | ^5.1.0 | Web framework |
| `mongoose` | ^9.1.1 | MongoDB ODM |
| `jsonwebtoken` | ^9.0.2 | JWT authentication |
| `axios` | ^1.13.2 | HTTP client for external calls |
| `amqplib` | ^0.10.9 | RabbitMQ/AMQP client |
| `uuid` | ^13.0.0 | UUID generation |
| `dotenv` | ^17.2.3 | Environment configuration |
| `body-parser` | ^2.2.0 | Request body parsing |
| `cookie-parser` | ^1.4.7 | Cookie parsing |
| `nodemon` | ^3.1.11 | Development hot reload |

---

## 🐳 Docker

### Dockerfile Overview

```dockerfile
# Base Image
FROM node:18-alpine

# Working Directory
WORKDIR /Battle11/backend/developer/backend

# Install dependencies
COPY package* ./
RUN npm ci

# Copy source code
COPY . .

# Start command
CMD ["npm", "start"]
```

### Docker Commands

```bash
# Build Image
docker build -t battle11-player-game-service .

# Run Container
docker run -d \
  --name player-game-service \
  -p 3002:3002 \
  --env-file .env \
  --network battle11-network \
  battle11-player-game-service

# View Logs
docker logs -f player-game-service

# Stop Container
docker stop player-game-service
```

---

## 🌱 Database Seeding

```bash
# Seed all data
npm run seed

# Seed specific collections
npm run seed:games          # Seed game configurations
npm run seed:teams          # Seed team master data
npm run seed:players        # Seed player data
npm run seed:matchplayer    # Seed match player data
```

---

## 🛠️ NPM Scripts

| Script | Command | Description |
|:-------|:--------|:------------|
| `start` | `npx nodemon src/index.js` | Start dev server with hot reload |
| `seed` | `node src/seeders/index.js` | Run all seeders |
| `seed:games` | `node src/seeders/game.seed.js` | Seed games only |
| `seed:teams` | `node src/seeders/teammaster.seed.js` | Seed teams only |
| `seed:players` | `node src/seeders/player.seed.js` | Seed players only |
| `seed:matchplayer` | `node src/seeders/matchplayer.seed.js` | Seed match players |

---

## 🔐 Authentication Flow

```
┌─────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Client    │────▶│   API Gateway   │────▶│  Microservice   │
└─────────────┘     └─────────────────┘     └─────────────────┘
                            │                        │
                            │  INTERNAL_SERVER_TOKEN │
                            │  ────────────────────▶ │
                            │                        │
                            │       JWT Token        │
                            │  ────────────────────▶ │
                            │                        │
                            │                   ┌────┴────┐
                            │                   │ Validate│
                            │                   │ Tokens  │
                            │                   └────┬────┘
                            │                        │
                            │      Response          │
                            │  ◀──────────────────── │
```

---

## 🧪 Health Check

```bash
# Check if service is running
curl http://localhost:3002/api/v1/player/check

# Expected Response
{
  "message": "PlayerGame Server is good to GO"
}
```

---

## 📝 Changelog

| Version | Date | Changes |
|:--------|:-----|:--------|
| 1.0.0 | 2026-01-07 | Initial release with full CRUD support |

---

## 📄 License

This project is licensed under the **ISC License**.

---

<div align="center">

**[⬆ Back to Main README](../README.md)**

<br/>

---

### 🔗 Related Services

| Service | Description |
|:--------|:------------|
| 🌐 API Gateway | Central routing & authentication |
| 👤 User Service | User management & auth |
| 🏆 Contest Service | Contest & match management |
| 💰 Wallet Service | Transactions & payments |

---

<br/>

<sub>🏏 Part of the Battle11 Fantasy Sports Platform • Built with ❤️ by Team 11</sub>

</div>
