const curdService = require("./curd.service");
const {} = require('../repository')


class UserContestService extends curdService{

    constructor(){
        super(contestRepo) 
    }

    async getByMatch(matchId){
                    try {
                            const res = await contestRepo.getByMatch(matchId);
                            if(!res) throw new Error("contest not Available")
                            return res;
    
                    } catch (error) {
                            console.log("something went wrong in service  level  (getByMatch) ")
                            throw error;
                    }
    }

}

const userContestService = new UserContestService()
module.exports = userContestService;