const curdService = require("./curd.service");
const {contestRepo} = require('../repository')


class ContestService extends curdService{

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

const contestService = new ContestService()
module.exports = contestService;