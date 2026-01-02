<div align="center">

# 🏏 Player & Game Microservice

### Power11 Fantasy Sports Platform

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

*Comprehensive player data and match information management for fantasy sports gaming.*

</div>

---

## 📖 Overview

The Player & Game Microservice manages all **player data, match information, and game statistics** for the Power11 fantasy sports platform. It provides real-time player stats, match schedules, and performance data for fantasy team creation.

## ✨ Features

| Feature | Description |
|---------|-------------|
| 👤 **Player Management** | Complete player profiles and statistics |
| 📅 **Match Data** | Live match schedules and results |
| 📈 **Performance Stats** | Real-time player performance tracking |
| ⭐ **Fantasy Points** | Points calculation for fantasy gaming |
| ⚡ **Live Updates** | Real-time data synchronization |
| 🔍 **Search & Filter** | Advanced player search capabilities |

## 🏗️ Architecture

```
                              ┌─────────────────────┐
                              │   🌐 API Gateway    │
                              │      (:3000)        │
                              └──────────┬──────────┘
                                         │
                                         ▼
┌───────────────────────────────────────────────────────────────┐
│               🏏 PLAYER & GAME MICROSERVICE (:3002)           │
├───────────────────────────────────────────────────────────────┤
│  ┌─────────┐   ┌─────────────┐   ┌─────────────┐              │
│  │ Routes  │──▶│ Controllers │──▶│  Services  │              │
│  │  Layer  │   │    Layer    │   │    Layer    │              │
│  └─────────┘   └─────────────┘   └──────┬──────┘              │
│                                       │                       │
│                              ┌────────┴────────┐              │
│                              │   Repository   │               │
│                              │     Layer      │               |
│                              └────────┬────────┘              │
└─────────────────────────────────┼─────────────────────────────┘
                                         │
                                         ▼
                              ┌─────────────────────┐
                              │   🗄️ MongoDB        │
                              ├─────────────────────┤
                              │ • Players           │
                              │ • Matches           │
                              │ • Statistics        │
                              └─────────────────────┘
```

## 📁 Project Structure

```
04_Player_Game_microservice/
├── 📄 dockerfile                    # Docker configuration
├── 📄 package.json                  # Dependencies and scripts
├── 📄 README.md                     # This file
└── 📁 src/
    ├── 📄 index.js                  # Application entry point
    ├── 📁 config/
    │   ├── 📄 database.js           # MongoDB connection
    │   └── 📄 server.config.js      # Server settings
    ├── 📁 controllers/              # Request handlers
    ├── 📁 middlewares/              # Custom middleware
    ├── 📁 models/                   # Mongoose models
    ├── 📁 repository/               # Data access layer
    ├── 📁 Routes/                   # API routes
    ├── 📁 services/                 # Business logic
    └── 📁 utlis/                    # Utilities
```

## 🚀 Quick Start

### Prerequisites

- Node.js v18.x or higher
- MongoDB v7.x
- npm v9.x or higher

### Installation

1. **Navigate to the service directory**
   ```bash
   cd 04_Player_Game_microservice
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file:
   ```env
   PORT=3002
   NODE_ENV=development
   
   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/power11_players
   
   # JWT Configuration
   PRIVATEJWT=your_jwt_secret_key
   ```

4. **Start the server**
   ```bash
   npm start
   ```

   The service will be running at `http://localhost:3002`

## 📡 API Endpoints

### Players

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/players` | Get all players |
| `GET` | `/api/v1/players/:id` | Get player by ID |
| `GET` | `/api/v1/players/search` | Search players |
| `POST` | `/api/v1/players` | Create player (Admin) |
| `PATCH` | `/api/v1/players/:id` | Update player (Admin) |

### Matches

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/matches` | Get all matches |
| `GET` | `/api/v1/matches/:id` | Get match by ID |
| `GET` | `/api/v1/matches/upcoming` | Get upcoming matches |
| `GET` | `/api/v1/matches/live` | Get live matches |

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `express` | ^5.1.0 | Web framework |
| `mongoose` | ^9.1.1 | MongoDB ODM |
| `jsonwebtoken` | ^9.0.2 | JWT authentication |
| `axios` | ^1.13.2 | HTTP client |
| `uuid` | ^13.0.0 | UUID generation |
| `dotenv` | ^17.2.3 | Environment config |

## 🐳 Docker

```bash
# Build Image
docker build -t power11-player-game-service .

# Run Container
docker run -d --name player-game-service -p 3002:3002 --env-file .env power11-player-game-service
```

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

**[⬆ Back to Main README](../README.md)**

</div>
