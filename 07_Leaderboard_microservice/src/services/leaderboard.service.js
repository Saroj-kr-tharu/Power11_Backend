const curdService = require("./curd.service");
const {leaderboardRepo} = require('../repository')


class LeaderboardService extends curdService{
    constructor(){
        super(leaderboardRepo) 
    }

}

const leaderboardService = new LeaderboardService()
module.exports = leaderboardService;