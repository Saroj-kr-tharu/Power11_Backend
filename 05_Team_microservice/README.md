<div align="center">

#  Team Microservice

### Power11 Fantasy Sports Platform

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

*Fantasy team creation and management service for competitive gaming.*

</div>

---

##  Overview

The Team Microservice handles all **fantasy team creation, management, and validation** for the Power11 platform. Users can create teams by selecting players, manage multiple teams, and participate in contests.

##  Features

| Feature | Description |
|---------|-------------|
|  **Team Creation** | Create fantasy teams with player selection |
|  **Team Management** | Edit and update existing teams |
|  **Team Validation** | Validate team composition rules |
|  **Captain Selection** | Captain and vice-captain assignment |
|  **Team Analytics** | Team performance tracking |
|  **Multi-Team Support** | Manage multiple teams per match |

##  Architecture

```
                      TEAM MICROSERVICE

     Routes         Controllers        Services                

                              
                              

                      Repository Layer                           

                              
         
                                                 
            
     MongoDB           Player           Contest    
    (Teams)            Service          Service    
            
```

##  Project Structure

```
05_Team_microservice/
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
   cd 05_Team_microservice
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file:
   ```env
   PORT=3003
   NODE_ENV=development
   
   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/power11_teams
   
   # JWT Configuration
   PRIVATEJWT=your_jwt_secret_key
   ```

4. **Start the server**
   ```bash
   npm start
   ```

   The service will be running at `http://localhost:3003`

##  API Endpoints

### Teams

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/v1/teams` | Get user's teams | Yes |
| `GET` | `/api/v1/teams/:id` | Get team by ID | Yes |
| `POST` | `/api/v1/teams` | Create new team | Yes |
| `PATCH` | `/api/v1/teams/:id` | Update team | Yes |
| `DELETE` | `/api/v1/teams/:id` | Delete team | Yes |
| `POST` | `/api/v1/teams/:id/captain` | Set captain | Yes |

### Team Composition Rules

- **Total Players**: 11 players per team
- **Batsmen**: 3-5 players
- **Bowlers**: 3-5 players
- **All-rounders**: 1-3 players
- **Wicket-keeper**: 1-2 players
- **Captain**: 2x points multiplier
- **Vice-Captain**: 1.5x points multiplier

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
docker build -t power11-team-service .

# Run Container
docker run -d --name team-service -p 3003:3003 --env-file .env power11-team-service
```

##  License

This project is licensed under the **MIT License**.

---

<div align="center">

**[ Back to Main README](../README.md)**

</div>
