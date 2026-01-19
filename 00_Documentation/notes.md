# Fantasy Sports Platform Documentation

## 🔗 Service URLs

### Management Interfaces
- **Redis Insight**: `http://localhost:5540/`
- **RabbitMQ Management**: `http://localhost:15672/`
  - Username: `guest`
  - Password: `guest`

### Internal Services
- **Redis URL**: `redis://redis_service:6379`

---

## 👥 Test User Credentials

### Admin Account
- **Email**: `a@gmail.com`
- **Password**: `aaaaaa`
- **Role**: Admin

### Customer Accounts

#### Customer 1
- **Email**: `c1@gmail.com`
- **Password**: `aaaaaa`
- **Role**: Customer

#### Customer 2
- **Email**: `c2@gmail.com`
- **Password**: `aaaaaa`
- **Role**: Customer

---

## 💳 Payment Test Credentials

### Khalti (Mobile Payment)
- **Test IDs**: 9800000000, 9800000001, 9800000002, 9800000003, 9800000004, 9800000005
- **Test MPIN**: `1111`
- **Test OTP**: `987654`

### Stripe (Card Payment)
- **Test Card Number**: `4242 4242 4242 4242`
- **Expiry Date**: Use any valid future date (e.g., `12/34`)
- **CVC**: Any three-digit code (e.g., `111`, `222`)
- **Other Fields**: Use any value

---

## 🗄️ Database Commands

### Seed Data
```bash
# Player Game Service
docker exec -it player_game_service node src/seeders/index.js

# Match Service
docker exec -it match_service node src/seeders/match.seed.js

# Match Player Service
docker exec -it player_game_service node src/seeders/matchplayer.seed.js

# Contest Service
docker exec -it contest_service node src/seeders/index.js
```

### Database Access

#### MongoDB
```bash
docker exec -it mongodb_service mongosh -u admin -p 12345 --authenticationDatabase admin
```

#### PostgreSQL
```bash
docker exec -it postgres_db psql -U postgres
```

---

## 🏏 Team Data Structure

### Team Configuration 1
```json
{
  "matchId": "696dedb1d49b87ae8996c63f",
  "contestId": "696dedcfe50fbe5949d55538",
  "gameId": "696deda6c5c63a65ff6018a8",
  "totalCredits": 99.1,
  "players": [
    {
      "matchPlayerId": "696dedc3d1e2b3353663da2a",
      "role": "BATSMAN",
      "isCaptain": true,
      "isViceCaptain": false
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da2c",
      "role": "BATSMAN",
      "isCaptain": false,
      "isViceCaptain": false
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da2d",
      "role": "BATSMAN",
      "isCaptain": false,
      "isViceCaptain": false
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da32",
      "role": "BATSMAN",
      "isCaptain": false,
      "isViceCaptain": true
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da2e",
      "role": "ALL_ROUNDER",
      "isCaptain": false,
      "isViceCaptain": false
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da34",
      "role": "ALL_ROUNDER",
      "isCaptain": false,
      "isViceCaptain": false
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da2f",
      "role": "BOWLER",
      "isCaptain": false,
      "isViceCaptain": false
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da30",
      "role": "BOWLER",
      "isCaptain": false,
      "isViceCaptain": false
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da3c",
      "role": "BOWLER",
      "isCaptain": false,
      "isViceCaptain": false
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da2b",
      "role": "WICKET_KEEPER",
      "isCaptain": false,
      "isViceCaptain": false
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da31",
      "role": "WICKET_KEEPER",
      "isCaptain": false,
      "isViceCaptain": false
    }
  ]
}
```

### Team Configuration 2
```json
{
  "matchId": "696dedb1d49b87ae8996c63f",
  "contestId": "696dedcfe50fbe5949d55538",
  "gameId": "696deda6c5c63a65ff6018a8",
  "totalCredits": 99.3,
  "players": [
    {
      "matchPlayerId": "696dedc3d1e2b3353663da2a",
      "role": "BATSMAN",
      "isCaptain": false,
      "isViceCaptain": true
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da2c",
      "role": "BATSMAN",
      "isCaptain": false,
      "isViceCaptain": false
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da33",
      "role": "BATSMAN",
      "isCaptain": false,
      "isViceCaptain": false
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da32",
      "role": "BATSMAN",
      "isCaptain": false,
      "isViceCaptain": false
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da39",
      "role": "BATSMAN",
      "isCaptain": false,
      "isViceCaptain": false
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da2e",
      "role": "ALL_ROUNDER",
      "isCaptain": true,
      "isViceCaptain": false
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da3a",
      "role": "ALL_ROUNDER",
      "isCaptain": false,
      "isViceCaptain": false
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da2f",
      "role": "BOWLER",
      "isCaptain": false,
      "isViceCaptain": false
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da30",
      "role": "BOWLER",
      "isCaptain": false,
      "isViceCaptain": false
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da3e",
      "role": "BOWLER",
      "isCaptain": false,
      "isViceCaptain": false
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da3b",
      "role": "WICKET_KEEPER",
      "isCaptain": false,
      "isViceCaptain": false
    }
  ]
}
```

### Team Configuration 3
```json
{
  "matchId": "696dedb1d49b87ae8996c63f",
  "contestId": "696dedcfe50fbe5949d55538",
  "gameId": "696deda6c5c63a65ff6018a8",
  "totalCredits": 98.8,
  "players": [
    {
      "matchPlayerId": "696dedc3d1e2b3353663da2a",
      "role": "BATSMAN",
      "isCaptain": false,
      "isViceCaptain": false
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da2d",
      "role": "BATSMAN",
      "isCaptain": false,
      "isViceCaptain": true
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da3f",
      "role": "BATSMAN",
      "isCaptain": false,
      "isViceCaptain": false
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da33",
      "role": "BATSMAN",
      "isCaptain": false,
      "isViceCaptain": false
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da2e",
      "role": "ALL_ROUNDER",
      "isCaptain": false,
      "isViceCaptain": false
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da34",
      "role": "ALL_ROUNDER",
      "isCaptain": false,
      "isViceCaptain": false
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da3a",
      "role": "ALL_ROUNDER",
      "isCaptain": true,
      "isViceCaptain": false
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da2f",
      "role": "BOWLER",
      "isCaptain": false,
      "isViceCaptain": false
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da3d",
      "role": "BOWLER",
      "isCaptain": false,
      "isViceCaptain": false
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da30",
      "role": "BOWLER",
      "isCaptain": false,
      "isViceCaptain": false
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da2b",
      "role": "WICKET_KEEPER",
      "isCaptain": false,
      "isViceCaptain": false
    }
  ]
}
```

### Team Configuration 4
```json
{
  "matchId": "696dedb1d49b87ae8996c63f",
  "contestId": "696dcd94a86abd262cc46dfb",
  "gameId": "696deda6c5c63a65ff6018a8",
  "totalCredits": 99.5,
  "players": [
    {
      "matchPlayerId": "696dedc3d1e2b3353663da2c",
      "role": "BATSMAN",
      "isCaptain": false,
      "isViceCaptain": false
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da32",
      "role": "BATSMAN",
      "isCaptain": false,
      "isViceCaptain": false
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da39",
      "role": "BATSMAN",
      "isCaptain": false,
      "isViceCaptain": false
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da3f",
      "role": "BATSMAN",
      "isCaptain": true,
      "isViceCaptain": false
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da34",
      "role": "ALL_ROUNDER",
      "isCaptain": false,
      "isViceCaptain": false
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da3a",
      "role": "ALL_ROUNDER",
      "isCaptain": false,
      "isViceCaptain": true
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da3d",
      "role": "BOWLER",
      "isCaptain": false,
      "isViceCaptain": false
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da2f",
      "role": "BOWLER",
      "isCaptain": false,
      "isViceCaptain": false
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da3c",
      "role": "BOWLER",
      "isCaptain": false,
      "isViceCaptain": false
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da3e",
      "role": "BOWLER",
      "isCaptain": false,
      "isViceCaptain": false
    },
    {
      "matchPlayerId": "696dedc3d1e2b3353663da31",
      "role": "WICKET_KEEPER",
      "isCaptain": false,
      "isViceCaptain": false
    }
  ]
}
```

---

## 🎯 Score Rules Configuration

### Six (Death Overs)
```json
{
  "gameId": "696deda6c5c63a65ff6018a8",
  "contestId": "696dedcfe50fbe5949d55538",
  "matchId": null,
  "eventType": "SIX",
  "points": 2,
  "conditions": {
    "minOver": 16,
    "maxOver": 20
  },
  "isActive": true
}
```

### Run
```json
{
  "gameId": "696deda6c5c63a65ff6018a8",
  "contestId": "696dedcfe50fbe5949d55538",
  "matchId": null,
  "eventType": "RUN",
  "points": 1,
  "conditions": null,
  "isActive": true
}
```

### Six (Standard)
```json
{
  "gameId": "696deda6c5c63a65ff6018a8",
  "contestId": "696dedcfe50fbe5949d55538",
  "matchId": null,
  "eventType": "SIX",
  "points": 2,
  "conditions": null,
  "isActive": true
}
```

### Wicket
```json
{
  "gameId": "696deda6c5c63a65ff6018a8",
  "contestId": "696dedcfe50fbe5949d55538",
  "matchId": null,
  "eventType": "WICKET",
  "points": 25,
  "conditions": null,
  "isActive": true
}
```

### Stumping
```json
{
  "gameId": "696deda6c5c63a65ff6018a8",
  "contestId": "696dedcfe50fbe5949d55538",
  "matchId": null,
  "eventType": "STUMPING",
  "points": 12,
  "conditions": null,
  "isActive": true
}
```

### Run Out
```json
{
  "gameId": "696deda6c5c63a65ff6018a8",
  "contestId": "696dedcfe50fbe5949d55538",
  "matchId": null,
  "eventType": "RUN_OUT",
  "points": 6,
  "conditions": null,
  "isActive": true
}
```

### Half Century
```json
{
  "gameId": "696deda6c5c63a65ff6018a8",
  "contestId": "696dedcfe50fbe5949d55538",
  "matchId": null,
  "eventType": "HALF_CENTURY",
  "points": 8,
  "conditions": {
    "minRuns": 50
  },
  "isActive": true
}
```

---

## 📝 Notes

- All IDs in the examples are specific to the seeded test data
- Ensure all services are running before executing seed commands
- Use the test credentials only in development/staging environments
- Maintain the exact JSON structure when creating new teams or score rules

---

**💾 To save this as a file:** Copy the content above and save it as `PROJECT_DOCUMENTATION.md`