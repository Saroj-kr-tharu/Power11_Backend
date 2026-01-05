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
3. **Contest Microservice** (depends on Games and Matches)

## Running Seeders

### Option 1: Run All Seeders (Recommended)

From the root backend directory:

```bash
node seed-all.js
```

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

### Option 3: Run Specific Seed Files

```bash
# Seed only games
node 04_Player_Game_microservice/src/seeders/game.seed.js

# Seed only team masters
node 04_Player_Game_microservice/src/seeders/teammaster.seed.js

# Seed only players
node 04_Player_Game_microservice/src/seeders/player.seed.js

# Seed only matches
node 08_Match_microservice/src/seeders/match.seed.js

# Seed only contests
node 06_Contest_microservice/src/seeders/contest.seed.js
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

### Contests (65 total)
- 5 contest types per match
- Cricket Contests: ~30
- Football Contests: ~35

Contest types:
- Mega/Grand Prize Contest (high entry, high prize)
- Head to Head (2 participants)
- Winners Take All / Premium League
- Free Entry / Practice Contest
- Small/Mini League

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

### Connection Errors
Check your `MANGODB_URL` in each microservice's `server.config.js` file.
