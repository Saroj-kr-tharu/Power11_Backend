const curdService = require("./curd.service");
const {usercontestRepo} = require('../repository')


class UserContestService extends curdService{

    constructor(){
        super(usercontestRepo) 
    }

    

}

const userContestService = new UserContestService()
module.exports = userContestService;