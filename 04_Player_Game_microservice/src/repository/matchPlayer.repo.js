const CurdRepo = require("./curdRepo");
const  matchPlayerModel = require('../models/MatchPlayer')


class MatchPlayerRepo extends CurdRepo { 
    constructor(){
        super(matchPlayerModel)
    }; 
 

}


const matchPlayerRepo = new MatchPlayerRepo(); 
module.exports = matchPlayerRepo; 