const curdService = require("./curd.service");
const {matchRepo, matchLiveStateRepo} = require('../repository')
const {InternalServiceClient} = require("../utlis/index")

class MatchLiveStateService extends curdService{

       constructor(){
            super(matchLiveStateRepo) 
        }

        async UpdateLiveState({matchId, gameId, progress , token }) {  
          try {   
                    // 1. validate the game and game should be active 
                    const game = await InternalServiceClient.internalClient.get(
                            `${InternalServiceClient.SERVICES.GAME}/game/${gameId}`,
                             { headers: { 'x-access-token': token } } 
                        )
                    if(!game)  throw new Error("GAME_IS_NOT_FOUND")
                    if (!game.data || !game.data.status) throw new Error("GAME_IS_INACTIVE");
                    
                //     console.log("game => ", game.data)
                                 
                    //2. check the matchId is validate  Verify match existence and ensure match is LIVE
                        const match = await matchRepo.get(matchId)
                        if ( !match )  throw new Error("MATCH_IS_NOT_FOUND")
                        if ( match.gameId != gameId  ) throw new Error("MATCH_DOES_NOT_BELONG_TO_GAME");
                        if ( match.status != "LIVE"  ) throw new Error("MATCH_IS_NOT_LIVE");
                       
                    // 3. check the matchLiveState is exist or not 
                    // 4. if not then create 
                    // 5. if yes then udpate 
                       const res = await matchLiveStateRepo.FindAndUpdate(
                            { matchId, gameId },
                            { progress },
                            { upsert: true, new: true, runValidators: true }
                        );
                        return res; 
                        
                } catch (error) {
                        console.log("Something went wrong in service layer (getByData)");
                        throw error;
                }
        }

        async getByData(data) {
                try {  
                     const res = await matchLiveStateRepo.getBydata(data);
                     return res;
                } catch (error) {
                     console.log("Something went wrong in service layer (getByData)");
                     throw error;
                }
        }

        

        


}

const matchLiveStateService = new MatchLiveStateService()
module.exports = matchLiveStateService;