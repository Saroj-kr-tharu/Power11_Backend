const curdService = require("./curd.service");
const {matchPlayerRepo} = require('../repository')


class MatchPlayerService extends curdService{

    constructor(){
        super(matchPlayerRepo) 
    }

    async getMatchFilter(filter){
        try {
            const res = await matchPlayerRepo.getMatchByfilter(filter)
            return res;
        } catch (error) {
            console.log("something went wrong in service  level  (getMatchFilter) ")
             throw error;
        }
    }

    async updateByData(matchId,gameId,playerId ,fantasyPoint){
        try {
            const res = await matchPlayerRepo.updateBydata({matchId: matchId, gameId:gameId, playerId:playerId}, {points: fantasyPoint})
            return res;
        } catch (error) {
            console.log("something went wrong in service  level  (updateByData) ")
             throw error;
        }
    }

}

const matchPlayerService = new MatchPlayerService()
module.exports = matchPlayerService;