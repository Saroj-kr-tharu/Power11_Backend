const curdService = require("./curd.service");
const {teamRepo} = require('../repository')
const {InternalServiceClient} = require('../utlis/index')

class TeamService extends curdService{

    constructor(){
        super(teamRepo) 
    }

    async createTeam({userId, players, contestId,matchId ,gameId, totalCredits, token=null}){
        try {
                //1. check the game  
                const game = await InternalServiceClient.internalClient.get(
                    `${InternalServiceClient.SERVICES.GAME}/game/${gameId}`,
                   { headers: { 'x-access-token': token } }
                )                    
                const gameInfo = game?.data;
                if(!gameInfo || gameInfo.status!="ACTIVE") throw new Error(" Game  is not found  ")

                //2. check the match 
                const match = await InternalServiceClient.internalClient.get(
                    `${InternalServiceClient.SERVICES.MATCH}/match/?matchId=${matchId}`,
                   { headers: { 'x-access-token': token } }
                )
                const matchInfo = match?.data;
                if(!matchInfo || matchInfo.status != "UPCOMING") throw new Error(" Match  is not found  ")

                //3. check the contest
                const contest = await InternalServiceClient.internalClient.get(
                    `${InternalServiceClient.SERVICES.CONTEST}/contest/?contestId=${contestId}`,
                   { headers: { 'x-access-token': token } }
                )
                const contestInfo = contest?.data;
                if(!contestInfo) throw new Error(" Contest  is not found  ")
                    
                    
                //4. check the contest info and game and match is same & check the game rules 
                if(contestInfo.matchId != matchId || contestInfo.gameId != gameId || contestInfo.rulesVersion != gameInfo.rulesVersion  || contestInfo.isFull  )
                    throw new Error("Invalid contest info ")
                    
                   
                //5. check how many team is already created by users 
                const checkTeam = await teamRepo.getByUserId(userId)
                if(checkTeam.length > contestInfo.maxTeamsPerUser ) 
                    throw new Error(" Max Team is already created  ") 

                 console.log('checkTeam => ', checkTeam)
                //6. validate players MatchPlayer exists
                let filter = {
                    matchId: matchId,
                    isActive: true,
                    playingStatus: { $ne: 'BENCH' }
                }
                const matchPlayer = await InternalServiceClient.internalClient.post(
                    `${InternalServiceClient.SERVICES.GAME}/matchPlayer`,
                    { filter }, 
                    { headers: { 'x-access-token': token } }
                )

                const matchPlayerInfo = matchPlayer?.data;
                if(!matchPlayerInfo) throw new Error(" matchPlayer  is not found  ")
                
                // Create a Set of valid matchPlayer IDs for efficient lookup
                const validMatchPlayerIds = new Set(
                    matchPlayerInfo.map(mp => mp._id.toString())
                );

                // Create a map for quick lookup of player details
                const matchPlayerMap = new Map(
                    matchPlayerInfo.map(mp => [mp._id.toString(), mp])
                );

                // check the players is exist in matchPlayerinfo
                let calculatedCredits = 0; 
                let totalCaptain = 0; 
                let totalViceCaptain = 0; 
                const roleCounts = {};

                // 7. validate player count
                if (players.length !== gameInfo.maxPlayers) {
                    throw new Error(`Team must have exactly ${gameInfo.maxPlayers} players`);
                }

                players.forEach((item) => {
                    // Validate matchPlayerId exists in matchPlayerInfo
                    if (!validMatchPlayerIds.has(item.matchPlayerId.toString())) {
                        throw new Error(`Invalid matchPlayerId: ${item.matchPlayerId}`);
                    }

                    const playerDetails = matchPlayerMap.get(item.matchPlayerId.toString());
                    
                    // 8. validate roles - count players by role
                    const roles = playerDetails.roles;
                    // Count each role the player has
                    roles.forEach(role => {
                        roleCounts[role] = (roleCounts[role] || 0) + 1;
                    });

                    // 9. validate credits
                    calculatedCredits += playerDetails.credits || item.credits; 
                    
                    // 10. validate captain and vice captain
                    if (item.isCaptain) totalCaptain += 1; 
                    if (item.isViceCaptain) totalViceCaptain += 1; 
                });

                // 8. validate roles against game rules
                const roleRules = gameInfo.rolesConfig;
                
                console.log('rulescoutes => ', roleCounts);
                
                if (roleRules) {
                    // Validate each role defined in game rules (BATSMAN, BOWLER, ALL_ROUNDER, WICKET_KEEPER)
                    for (const [role, requirements] of Object.entries(roleRules)) {
                        const count = roleCounts[role] || 0;
                        
                        // Check minimum requirement
                        if (count < requirements.min) {
                            throw new Error(`Insufficient ${role} count: ${count}. Minimum required: ${requirements.min}`);
                        }
                        
                        // Check maximum requirement
                        if (count > requirements.max) {
                            throw new Error(`Too many ${role} count: ${count}. Maximum allowed: ${requirements.max}`);
                        }
                    }
                    
                    // Check if any player has an invalid role not defined in rules
                    for (const role of Object.keys(roleCounts)) {
                        if (!roleRules[role]) {
                            throw new Error(`Invalid player role: ${role}. Not defined in game rules.`);
                        }
                    }
                }



                // 9. Validate total credits
                if (calculatedCredits > totalCredits) throw new Error(`Total credits (${calculatedCredits}) exceeds limit (${totalCredits})`);

                // 10. Validate captain and vice captain count
                if (totalCaptain !== 1)  throw new Error("Team must have exactly 1 captain");

                if (totalViceCaptain !== 1)  throw new Error("Team must have exactly 1 vice captain");
                    
               
                // 11. lock final team snapshot 
                const lockedPlayers = players.map((item) => {
                    const playerDetails = matchPlayerMap.get(item.matchPlayerId.toString());
                    return {
                        matchPlayerId: item.matchPlayerId,
                        playerSnapshot: {
                            playerId: playerDetails.playerId,
                            name: playerDetails.name,
                            teamName: playerDetails.teamName,
                            image: playerDetails.image,
                            roles: playerDetails.roles
                        },
                        role: item.role,
                        credits: playerDetails.credits,
                        isCaptain: item.isCaptain,
                        isViceCaptain: item.isViceCaptain
                    };
                });

                // 12. team created 
                const team = await teamRepo.create({
                    userId,
                    matchId,
                    contestId,
                    gameId,
                    players: lockedPlayers,
                    totalCredits: calculatedCredits,
                    isLocked: true,
                    lockedAt: new Date()
                });
                return team; 

                // const data = {userId, contestId, matchId, gameId, teamId: team._id, joinFee}
                // // 13. join contest 
                // const contestData = await InternalServiceClient.internalClient.post(
                //     `${InternalServiceClient.SERVICES.CONTEST}/usercontest`,
                //     { data }, 
                //     { headers: { 'x-access-token': token } }
                // )

                // 13.1  create usercontest 

                // 14 increament contest joined coount 

        } catch (error) {
                console.log("something went wrong in service  level  (createTeam) ")
                throw error;
        }
    }

}

const teamService = new TeamService()
module.exports = teamService;