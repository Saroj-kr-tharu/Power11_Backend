const CurdRepo = require("./curd.repo");
const  matchModel = require('../models/match')


class MatchRepo extends CurdRepo { 
    constructor(){
        super(matchModel)
    }; 
 


}


const matchRepo = new MatchRepo(); 
module.exports = matchRepo; 