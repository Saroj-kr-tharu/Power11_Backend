const CurdRepo = require("./curdRepo");
const  playerModel = require('../models/player')


class PlayerRepo extends CurdRepo { 
    constructor(){
        super(playerModel)
    }; 
 


}


const playerRepo = new PlayerRepo(); 
module.exports = playerRepo; 