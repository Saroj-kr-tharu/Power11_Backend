const curdService = require("./curd.service");
const {leaderboardRepo} = require('../repository')


class LeaderboardService extends curdService{
    constructor(){
        super(leaderboardRepo) 
    }

   
    async updateLeaderboard({matchId,contestId, gameId,playerId,fantasyPoint  }) {
        try {
 
      // 1. Validate event relevance
      //    - Check if the matchId exists in leaderboard records.
      //    - Check if there are active contests for this match.
      //    - If no active contests, ignore the event.
      // 
      // 2. Find contests affected
      //    - Fetch all LIVE or COMPLETED contests for the matchId.
      //    - One match can have many contests; the same event affects all contests.
      // 
      // 3. Find teams containing this player
      //    - For each contest, find all fantasy teams where:
      //      - team.matchId == matchId
      //      - team.players includes playerId
      //    - If no team has this player, skip.
      // 
      // 4. Calculate team-level points
      //    - For each matching team:
      //      - Start with base points (e.g., fantasyPoint = 2)
      //      - Apply multipliers:
      //          - If player is Captain → base × 2
      //          - If Vice-Captain → base × 1.5
      //          - Else → base × 1
      //      - FinalPoints = calculated value
      // 
      // 5. Update team score
      //    - Update team’s total fantasy score += FinalPoints
      //    - Usually stored in UserContest or LeaderboardEntry
      // 
      // 6. Update leaderboard ranking
      //    - Recalculate rank for this contest
      //    - Use incremental ranking (e.g., Redis sorted set)
      //    - Example: ZINCRBY contest:123:leaderboard FinalPoints userContestId
      // 
      // 7. Handle tie logic (if needed)
      //    - If scores tie, use predefined tie-breakers:
      //        - Earlier join time
      //        - Fewer teams
      //        - Same rank & split prize (handled during prize distribution)
      // 
      // 8. Cache / broadcast updates (optional)
      //    - Push live leaderboard updates to WebSocket, Redis cache, or notification service
      // 
      // 9. Mark event as processed (idempotency)
      //    - Store eventId or hash to prevent double counting if message is re-delivered
      // 
        } catch (error) {
            console.log("something went wrong in service level (updateLeaderboard)");
            throw error;
        }
    }

}

const leaderboardService = new LeaderboardService()
module.exports = leaderboardService;