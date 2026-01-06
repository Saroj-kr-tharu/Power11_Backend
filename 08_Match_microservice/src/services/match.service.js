const curdService = require("./curd.service");
const {matchRepo} = require('../repository')


class MatchService extends curdService{

       constructor(){
                super(matchRepo) 
        }

        async getMatchByGame(gameId){
                try {
                        const res = await matchRepo.getByGame(gameId);
                        if(!res) throw new Error("Match not Available")
                        return res;

                } catch (error) {
                        console.log("something went wrong in service  level  (getMatchByGame) ")
                        throw error;
                }
        }
        
        async getMatchById(matchId){
                try {
                        const res = await matchRepo.getByGame(gameId);
                        if(!res) throw new Error("Match not Available")
                        return res;

                } catch (error) {
                        console.log("something went wrong in service  level  (getMatchByGame) ")
                        throw error;
                }
        }


}

const matchService = new MatchService()
module.exports = matchService;