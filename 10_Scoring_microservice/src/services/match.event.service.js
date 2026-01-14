const curdService = require("./curd.service");
const {matchEventRepo} = require('../repository')

class MatchEventService extends curdService{

    constructor(){
        super(matchEventRepo) 
    }

    async addMatchEvent(data) {
        try {
            // STEP 1: Validate input payload
            // STEP 2: Verify match existence and ensure match is LIVE
            // STEP 3: Validate game / sport type
            // STEP 4: Validate player participation in the match
            // STEP 5: Validate event timing (over, minute, half, etc.)
            // STEP 6: Validate event type for the given game
            // STEP 7: Fetch active scoring rules
            // STEP 8: Calculate fantasy points based on rules & conditions
            // STEP 9: Store match event with calculated fantasy points
            // STEP 10: Update match-player statistics
            // STEP 11: Update leaderboard / contest rankings
            // STEP 12: Emit score update event (async)
        } catch (error) {
            console.log("Something went wrong in service layer (addMatchEvent)");
            throw error;
        }
        }
   

}

const matchEventService = new MatchEventService()
module.exports = matchEventService;