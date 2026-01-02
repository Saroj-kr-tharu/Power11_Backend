
const {ClientErrorsCodes} = require('../utlis/Errors/https_codes')

class GameMiddleware {
    
   addGame  (req, res, next) {
    console.log(' userId = > ', req?.userId, " email => ", req?.email)
    const { name, maxPlayers, creditLimit, rolesConfig, scoringRules, status, rulesVersion } = req?.body;
    if ( !name || !maxPlayers || !creditLimit || !rolesConfig || !scoringRules || !status || !rulesVersion ) {
        console.log("Something went wrong in game middleware");

        return res.status(ClientErrorsCodes.BAD_REQUEST).json({
            data: {},
            message: "Required Field is missing",
            success: false,
        });
    }

      next();
    };
    
    addPlayer  (req, res, next) {
   
     const { name, roles, gameId, team,baseCredits,} = req.body;
     if ( !name || !roles || !gameId || !team || !baseCredits   ) {
         console.log("Something went wrong in game middleware");
 
         return res.status(ClientErrorsCodes.BAD_REQUEST).json({
             data: {},
             message: "Required Field is missing",
             success: false,
         });
     }
 
       next();
     };
   

}





const gameMiddleware = new  GameMiddleware()
module.exports = gameMiddleware; 
