<div align="center">

#  Leaderboard Microservice

### Power11 Fantasy Sports Platform

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

*Real-time rankings, points calculation, and leaderboard management for fantasy contests.*

</div>

---

##  Overview

The Leaderboard Microservice handles all **rankings, points calculation, and leaderboard management** for the Power11 fantasy sports platform. It provides real-time score updates and contest standings.

##  Features

| Feature | Description |
|---------|-------------|
|  **Live Rankings** | Real-time leaderboard updates |
|  **Points Calculation** | Automated fantasy points scoring |
|  **Contest Standings** | Per-contest rankings |
|  **Performance Tracking** | Historical performance data |
|  **Real-time Updates** | Live score synchronization |
|  **Winner Declaration** | Automated winner calculation |

##  Architecture

```
                    LEADERBOARD MICROSERVICE

     Routes         Controllers        Services                
─
                              
                              

                      Repository Layer                           

                              
         
                                                 
            
     MongoDB           Contest           Player    
  (Leaderboard)        Service           Service   
            
```

##  Project Structure

```
07_Leaderboard_microservice/
  dockerfile              # Docker configuration
  package.json            # Dependencies and scripts
  README.md               # This file
  src/
      index.js            # Application entry point
      config/
         database.js     # MongoDB connection
         server.config.js    # Server settings
      controllers/        # Request handlers
      middlewares/        # Custom middleware
      models/             # Mongoose models
      repository/         # Data access layer
      Routes/             # API routes
      services/           # Business logic
      utlis/              # Utilities
```

##  Quick Start

### Prerequisites

- Node.js v18.x or higher
- MongoDB v7.x
- npm v9.x or higher

### Installation

1. **Navigate to the service directory**
   ```bash
   cd 07_Leaderboard_microservice
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file:
   ```env
   PORT=3005
   NODE_ENV=development
   
   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/power11_leaderboard
   
   # JWT Configuration
   PRIVATEJWT=your_jwt_secret_key
   ```

4. **Start the server**
   ```bash
   npm start
   ```

   The service will be running at `http://localhost:3005`

##  API Endpoints

### Leaderboard

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/v1/leaderboard/:contestId` | Get contest leaderboard | No |
| `GET` | `/api/v1/leaderboard/user/:userId` | Get user rankings | Yes |
| `GET` | `/api/v1/leaderboard/live/:matchId` | Get live rankings | No |
| `POST` | `/api/v1/leaderboard/calculate` | Calculate points (Internal) | Internal |

### Points System

| Action | Points |
|--------|--------|
| Run Scored | +1 |
| Boundary (4) | +1 |
| Six | +2 |
| Wicket | +25 |
| Catch | +8 |
| Stumping | +12 |
| Run Out | +6 |
| Economy Rate Bonus | Variable |
| Strike Rate Bonus | Variable |

##  Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `express` | ^5.1.0 | Web framework |
| `mongoose` | ^9.1.1 | MongoDB ODM |
| `jsonwebtoken` | ^9.0.2 | JWT authentication |
| `axios` | ^1.13.2 | HTTP client |
| `uuid` | ^13.0.0 | UUID generation |
| `dotenv` | ^17.2.3 | Environment config |

##  Docker

```bash
# Build Image
docker build -t power11-leaderboard-service .

# Run Container
docker run -d --name leaderboard-service -p 3005:3005 --env-file .env power11-leaderboard-service
```

##  License

This project is licensed under the **MIT License**.

---

<div align="center">

**[ Back to Main README](../README.md)**

</div>
