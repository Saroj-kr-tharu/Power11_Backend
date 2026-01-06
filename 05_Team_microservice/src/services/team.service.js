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
                //6. validate players MatchPlayer exists
                    // Belongs to same match
                    // isActive = true
                    // isSelectable = true
                    // playingStatus != BENCH (optional rule)

                // 7. validate player count 
                // 8. validate roles 
                // 9. validate credits 
                // 10. valiate  captain and vice captain 
                // 11. lock final team snapshot 
                // 12  team created 
                // 13. join contest 
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