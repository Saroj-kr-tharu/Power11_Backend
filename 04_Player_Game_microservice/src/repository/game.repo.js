const CurdRepo = require("./curdRepo");
const  gameModel = require('../models/game')


class GameRepo extends CurdRepo { 
    constructor(){
        super(gameModel)
    }; 
 


}


const gameRepo = new GameRepo(); 

module.exports = gameRepo; 