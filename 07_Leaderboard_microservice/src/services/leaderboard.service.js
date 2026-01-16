const curdService = require("./curd.service");
const {leaderboardRepo} = require('../repository')
const {InternalServiceClient, } = require('../utlis/index')
const redisClient = require('../config/redis.config');

class LeaderboardService extends curdService{
    constructor(){
        super(leaderboardRepo) 
    }

    
    async updateLeaderboard({matchId,contestId, gameId,playerId,fantasyPoint  }) {
        try {
 
        // 1. Validate event relevance ||  2. Find contests affecte
                const contest = await InternalServiceClient.internalClient.get(
                    `${InternalServiceClient.SERVICES.CONTEST}/contest/?contestId=${contestId}`,
                )
                if(!contest)  throw new Error("CONTEST_IS_NOT_FOUND")
                if (!contest.data || contest.data.gameId != gameId  ) throw new Error("CONTEST_DOES_NOT_BELONG_TO_GAME");
                if (!contest.data || contest.data.status != "LIVE"  ) throw new Error("CONTEST_IS_NOT_LIVE");
                if ( contest.data.matchId != matchId ) throw new Error("CONTEST_DOES_NOT_BELONG_TO_MATCH");
                // console.log("contest => ", contest.data)  

        // 3. Find teams containing this player
                const teamResponse = await InternalServiceClient.internalClient.get(
                        `${InternalServiceClient.SERVICES.TEAM}/team/filter`, 
                        { 
                            data: {
                                matchId:matchId, 
                                contestId:contestId, 
                                gameId:gameId, 
                                "players.playerSnapshot.playerId": playerId 
                            }
                        }
                    );
                const teams = teamResponse?.data;
                if (!teams || !Array.isArray(teams) || teams.length === 0) return new Error("No teams found with this player in this contest."); 
              

        // 4. Calculate team-level points || 5  Update team score
            const updatePromises = teams.map(async (teamDoc) => {
                 let points = +fantasyPoint || 0;
                 // Find the player entry in this specific team's lineup
                 const playerInLineup = teamDoc.players.find(
                     (p) => p.playerSnapshot.playerId == playerId
                 );

                 if (playerInLineup) {
                     // Apply Multipliers
                    if (playerInLineup.isCaptain) 
                        points *= 2;
                    else if (playerInLineup.isViceCaptain) 
                         points *= 1.5;
                 }
                //  console.log('teams => ', teamDoc)
                 // Calculate New Total
                 const newTeamScore = (+teamDoc.teamScore || 0) + points;
                 // Update the Team Service
                 return InternalServiceClient.internalClient.patch(
                     `${InternalServiceClient.SERVICES.TEAM}/team/admin/${teamDoc._id}`,
                     { teamScore: newTeamScore }
                 );
             });

            // Execute all updates in parallel for better performance 
            await Promise.all(updatePromises);
        
        
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