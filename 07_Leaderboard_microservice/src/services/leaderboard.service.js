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
                  await InternalServiceClient.internalClient.patch(
                     `${InternalServiceClient.SERVICES.TEAM}/team/admin/${teamDoc._id}`,
                     { teamScore: newTeamScore } 
                 );
                 // Update leaderboard points
                return await leaderboardRepo.findOrCreate(
                        { contestId, teamId: teamDoc._id },
                        { $set: { totalPoints: newTeamScore } },
                        { upsert: true, new: true }
                    );
                
             });

            // Execute all updates in parallel for better performance 
                await Promise.all(updatePromises);

            // 4. Rank the leaderboard
                const leaderboardContest =  await leaderboardRepo.findDataByContest(contestId)
                let currentRank = 1;
                let lastPoints = null;
                const bulkOps = [];

                leaderboardContest.forEach((team, index) => {
                    if (lastPoints !== null && team.totalPoints < lastPoints) currentRank = index + 1;
    
                    bulkOps.push({
                        updateOne: {
                            filter: { _id: team._id },
                            update: { $set: { rank: currentRank } }
                        }
                    });

                    lastPoints = team.totalPoints;
                });

                if (bulkOps.length) await leaderboardRepo.bulkWrite(bulkOps);
                
                
            const rankLeardboard = await leaderboardRepo.findDataByRank(contestId);
            console.log("rank Leaderboard => ", rankLeardboard)

            const cacheKey = `leaderboard:${contestId}`;
            await redisClient.set(
                cacheKey,
                JSON.stringify(rankLeardboard), 
                {'EX':300}
            )
        
    
        } catch (error) {
            console.log("something went wrong in service level (updateLeaderboard)");
            throw error;
        }
    }

    async getbyContestId(contestId) {
    try {
        
        const cacheKey = `leaderboard:${contestId}`;
        let response = null; 
        
        const cache = await redisClient.get(cacheKey); 
        if (cache) {
            response = JSON.parse(cache);
        }
        else {
            response = await leaderboardRepo.findDataByRank(contestId);
            await redisClient.set(
                cacheKey,
                JSON.stringify(response), 
                {'EX':300}
            )
        }
        
        
        return response; 
    } catch (error) {
        console.log("something went wrong in service level (getbyContestId)");
        throw error;
    }
}

}

const leaderboardService = new LeaderboardService()
module.exports = leaderboardService;