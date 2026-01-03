const CurdRepo = require("./curd.repo");
const  leaderboardModel = require('../models/leaderboard')


class LeaderboardRepo extends CurdRepo { 
    constructor(){
        super(leaderboardModel)
    }; 
 


}


const leaderboardRepo = new LeaderboardRepo(); 
module.exports = leaderboardRepo; 