const curdService = require("./curd.service");
const {scoringRepo} = require('../repository');
const {InternalServiceClient, } = require('../utlis/index')

 
class ScoringRulesService extends curdService{

    constructor(){ 
        super(scoringRepo) 
    }

    async addScore({gameId, contestId, matchId, eventType, points, conditions, token}) {
        try {
            // 1. check the gameId is validate and active 
                const game = await InternalServiceClient.internalClient.get(
                        `${InternalServiceClient.SERVICES.GAME}/game/${gameId}`,
                         { headers: { 'x-access-token': token } } 
                    )
                if(!game)  throw new Error("GAME_IS_NOT_FOUND")
                if (!game.data || !game.data.status) throw new Error("GAME_IS_INACTIVE");

            //2. check the matchId is validate 
                if(matchId){
                     const match = await InternalServiceClient.internalClient.get(
                        `${InternalServiceClient.SERVICES.MATCH}/match/?matchId=${matchId}`,
                         { headers: { 'x-access-token': token } } 
                    )
                    if(!match)  throw new Error("MATCH_IS_NOT_FOUND")
                    if (!match.data || match.data.gameId != gameId) throw new Error("MATCH_DOES_NOT_BELONG_TO_GAME");
                    console.log("match => ", match.data)
                }

            //3. check the contestId is validate and active
                if(contestId){
                     const contest = await InternalServiceClient.internalClient.get(
                        `${InternalServiceClient.SERVICES.CONTEST}/contest/?contestId=${contestId}`,
                         { headers: { 'x-access-token': token } } 
                    )
                    if(!contest)  throw new Error("CONTEST_IS_NOT_FOUND")
                    if (!contest.data || contest.data.gameId != gameId  ) throw new Error("CONTEST_DOES_NOT_BELONG_TO_GAME");
                    if (!contest.data || contest.data.status != "SCHEDULED"  ) throw new Error("CONTEST_IS_NOT_SCHEDULED");
                    if(matchId)
                        if ( contest.data.matchId != matchId ) throw new Error("CONTEST_DOES_NOT_BELONG_TO_MATCH");
                   
                    console.log("contest => ", contest.data)
                }
            

            const res = await scoringRepo.create({gameId, contestId, matchId, eventType, points, conditions});
            return res;
        } catch (error) {
            console.log("Error in service layer (addScore):", );

            if (error.response && error.response.data) {
                console.error(error.response.data.message);
                throw error.response.data;
            } else {
                console.error(error.message);
                throw error;
             }
          
            
        }
    }

    async getByData(data) {
        try {
            const res = await scoringRepo.getBydata(data);
            return res;
        } catch (error) {
            console.log("Something went wrong in service layer (updateByTransId)");
            throw error;
        }
    }


    async updateBydata({where, updatedData}) {
        try {
            const res = await scoringRepo.updateBydata(where, updatedData);
            return res;
        } catch (error) {
            console.log("Something went wrong in service layer (updateByTransId)");
            throw error;
        }
    }


    

    



}

const scoringRulesService = new ScoringRulesService()
module.exports = scoringRulesService;