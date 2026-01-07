# Database Seeder Scripts

This document describes how to seed the database with initial data for Cricket and Football games.

## Prerequisites

1. Ensure MongoDB is running
2. Ensure all microservices have their environment variables configured (especially `MANGODB_URL`)
3. Install dependencies in each microservice: `npm install`

## Seeding Order

The seeders must be run in a specific order due to data dependencies:

1. **Player_Game Microservice** (Games → TeamMasters → Players)
2. **Match Microservice** (depends on Games and TeamMasters)
3. **Player_Game Microservice** (MatchPlayers - depends on Matches and Players)
4. **Contest Microservice** (depends on Games and Matches)
5. **Leaderboard Microservice** (depends on Contests)

## Running Seeders

### Option 1: Run All Seeders (Recommended)

From the root backend directory:

```bash
node seed-all.js
```

This will seed all data in the correct order:
- Games (Cricket & Football)
- Team Masters (IPL & EPL teams)
- Players (Cricket & Football players)
- Matches (Upcoming, Live, Completed)
- Match Players (Player assignments per match)
- Contests (Various contest types per match)
- Leaderboards (Rankings for completed/live contests)

### Option 2: Run Individual Seeders

#### 1. Player_Game Microservice (Run First)
```bash   
cd 04_Player_Game_microservice
npm run seed
# OR
node src/seeders/index.js
```

#### 2. Match Microservice (Run Second)
```bash
cd 08_Match_microservice
npm run seed
# OR
node src/seeders/index.js
```

#### 3. Contest Microservice (Run Third)
```bash
cd 06_Contest_microservice
npm run seed
# OR
node src/seeders/index.js
```

#### 4. Leaderboard Microservice (Run Fourth)
```bash
cd 07_Leaderboard_microservice
npm run seed
# OR
node src/seeders/index.js
```

### Option 3: Run Specific Seed Files

```bash
# Seed only games
node 04_Player_Game_microservice/src/seeders/game.seed.js

# Seed only team masters
node 04_Player_Game_microservice/src/seeders/teammaster.seed.js

# Seed only players
node 04_Player_Game_microservice/src/seeders/player.seed.js

# Seed only match players (requires matches to be seeded first)
node 04_Player_Game_microservice/src/seeders/matchplayer.seed.js

# Seed only matches
node 08_Match_microservice/src/seeders/match.seed.js

# Seed only contests
node 06_Contest_microservice/src/seeders/contest.seed.js

# Seed only leaderboards (requires contests to be seeded first)
node 07_Leaderboard_microservice/src/seeders/leaderboard.seed.js
```

## Seeded Data Overview

### Games (2 total)
- **CRICKET**: 11 players, 100 credit limit, roles: BATSMAN, BOWLER, ALL_ROUNDER, WICKET_KEEPER
- **FOOTBALL**: 11 players, 100 credit limit, roles: GOALKEEPER, DEFENDER, MIDFIELDER, FORWARD

### Team Masters (20 total)
- **Cricket Teams (10)**: MI, CSK, RCB, KKR, DC, RR, PBKS, SRH, GT, LSG
- **Football Teams (10)**: MUN, MCI, LIV, CHE, ARS, TOT, NEW, AVL, BHA, WHU

### Players (108 total)
- **Cricket Players**: ~42 players across 6 IPL teams
- **Football Players**: ~66 players across 6 EPL teams

### Matches (13 total)
- **Cricket Matches**: 6 matches (5 upcoming, 1 completed)
- **Football Matches**: 7 matches (5 upcoming, 1 completed, 1 live)

### Match Players
- Links players to specific matches with:
  - Match-specific credits
  - Playing status (ANNOUNCED, UNANNOUNCED, BENCH)
  - Points (for completed matches)
  - Active status

### Contests (65 total)
- 5 contest types per match
- Cricket Contests: ~30
- Football Contests: ~35
- Each contest includes:
  - `rulesVersion`: Version of scoring rules
  - `maxTeamsPerUser`: Max teams allowed per user (1-5)

Contest types:
- Mega/Grand Prize Contest (high entry, high prize)
- Head to Head (2 participants)
- Winners Take All / Premium League
- Free Entry / Practice Contest
- Small/Mini League

### Leaderboards
- Generated for completed and live contests
- Includes:
  - `contestId`: Reference to contest
  - `teamId`: User's fantasy team
  - `userId`: User identifier
  - `totalPoints`: Accumulated points
  - `rank`: Position in leaderboard (for completed contests)

## Schema Validation

All seed data is validated against the following schemas:

### Contest Schema Fields (Required)
- `name`: String
- `matchId`: ObjectId (ref: Match)
- `gameId`: ObjectId (ref: Game)
- `rulesVersion`: Number (required)
- `maxTeamsPerUser`: Number (default: 1)
- `entryFee`: Number (min: 0)
- `prizePool`: Number (min: 0)
- `maxParticipants`: Number
- `startTime`: Date
- `endTime`: Date
- `status`: SCHEDULED | LIVE | COMPLETED | CANCELLED

### MatchPlayer Schema Fields (Required)
- `matchId`: ObjectId (ref: Match)
- `playerId`: ObjectId (ref: Player)
- `gameId`: ObjectId (ref: Game)
- `credits`: Number
- `roles`: Array of Strings (min 1 role)
- `playingStatus`: ANNOUNCED | UNANNOUNCED | BENCH
- `points`: Number (default: 0)
- `isActive`: Boolean (default: true)

### Leaderboard Schema Fields (Required)
- `contestId`: ObjectId (ref: Contest)
- `teamId`: ObjectId (ref: Team)
- `userId`: String
- `totalPoints`: Number (default: 0)
- `rank`: Number (nullable)

## Troubleshooting

### "Games not found" Error
Run the game seeder first:
```bash
node 04_Player_Game_microservice/src/seeders/game.seed.js
```

### "Matches not found" Error
Run the match seeder first:
```bash
node 08_Match_microservice/src/seeders/match.seed.js
```

### "Contests not found" Error
Run the contest seeder first:
```bash
node 06_Contest_microservice/src/seeders/contest.seed.js
```

### Connection Errors
Check your `MANGODB_URL` in each microservice's `server.config.js` file.
