const curdService = require("./curdService");
const {leaderboardRepo} = require('../repository')


class LeaderboardService extends curdService{
    constructor(){
        super(leaderboardRepo) 
    }

}

const leaderboardService = new LeaderboardService()
module.exports = leaderboardService;