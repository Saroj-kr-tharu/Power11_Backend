const curdService = require("./curd.service");
const {matchRepo} = require('../repository')


class MatchLiveStateService extends curdService{

       constructor(){
                super(matchRepo) 
        }

        async getByData(data) {
                try {
                        const res = await IdempotancyKeyRepo.getBydata(data);
                        return res;
                } catch (error) {
                        console.log("Something went wrong in service layer (getByData)");
                        throw error;
                }
        }

        async updateByData(where, updateData,) {
                try {
                        const res = await IdempotancyKeyRepo.updateBydata(where, updateData);
                        return res;
                } catch (error) {
                        console.log("Something went wrong in service layer (updateByData)");
                        throw error;
                }
        }


}

const matchLiveStateService = new MatchLiveStateService()
module.exports = matchLiveStateService;