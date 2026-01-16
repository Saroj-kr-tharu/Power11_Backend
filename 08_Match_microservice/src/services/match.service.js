const curdService = require("./curd.service");
const {matchRepo} = require('../repository')
const {InternalServiceClient} = require("../utlis/index")

class MatchService extends curdService{

       constructor(){
                super(matchRepo) 
        }

        async getMatchByGame(gameId){
                try {
                        const res = await matchRepo.getByGame(gameId);
                        if(!res) throw new Error("Match not Available")
                        return res;

                } catch (error) {
                        console.log("something went wrong in service  level  (getMatchByGame) ")
                        throw error;
                }
        }
        
        async getMatchById(matchId){
                try {
                        const res = await matchRepo.getByGame(matchId);
                        if(!res) throw new Error("Match not Available")
                        return res;

                } catch (error) {
                        console.log("something went wrong in service  level  (getMatchByGame) ")
                        throw error;
                }
        }

        async matchCompleted(matchId) {
                try {
                        // ================= STEP 1: Validate match =================
                        // - Check match exists
                        const match = await matchRepo.get(matchId);
                        console.log('match => ', match) 
                        if(!match) throw new Error(" MATCH_IS_NOT_FOUND ");
                        if(match.status != "LIVE")  throw new Error("MATCH_IS_NOT_LIVE");

                        // ================= STEP 3: Update match status =================
                        // - Mark match as COMPLETED
                        await matchRepo.update(matchId, {status :  "COMPLETED" } ); 

                        // ================= STEP 4: Fetch all LIVE contests =================
                        // - Get contests linked to this match
                        // - Only contests with status LIVE are eligible

                        const game = await InternalServiceClient.internalClient.get(
                                    `${InternalServiceClient.SERVICES.GAME}/game/${gameId}`,
                                     { headers: { 'x-access-token': token } } 
                                )
                            if(!game)  throw new Error("GAME_IS_NOT_FOUND")
                            if (!game.data || !game.data.status) throw new Error("GAME_IS_INACTIVE");

                        // ================= STEP 5: Finalize leaderboard =================
                        // - Read final scores from Redis (or live store)
                        // - Sort teams by totalPoints
                        // - Assign ranks
                        // - Persist leaderboard to DB

                        // ================= STEP 6: Update userContest =================
                        // - Update rank per user
                        // - Store final points
                        // - Mark userContest status as COMPLETED

                        // ================= STEP 7: Handle tie-breakers =================
                        // - Detect equal scores
                        // - Apply tie rules (same rank / split prize / join time)

                        // ================= STEP 8: Prize calculation =================
                        // - Calculate winnings based on contest prize structure
                        // - Determine winning users and amounts

                        // ================= STEP 9: Wallet credit =================
                        // - Create paymentTransaction (SUCCESS)
                        // - Create walletTransaction (CREDIT)
                        // - Update wallet balance
                        // - Ensure idempotency (no double credit)

                        // ================= STEP 10: Update contest status =================
                        // - Mark contest as COMPLETED
                        // - Store payout summary

                        // ================= STEP 11: Send notifications =================
                        //   - Notify users about:
                        //   - Match completion
                        //   - Rank achieved
                        //   - Winnings credited

                        // ================= STEP 12: Cleanup live data =================
                        // - Remove Redis leaderboard keys
                        // - Remove match live state data

                        // ================= STEP 13: Emit match completed event =================
                        // - Publish MATCH_COMPLETED event
                        // - Used by analytics, audit, notifications

                        // ================= STEP 14: Return success response =================
                        // - Match finalized successfully

                } catch (error) {
                        // ================= ERROR HANDLING =================
                        // - Log error
                        // - Ensure partial failures are recoverable
                        // - Do not double-process payouts
                        throw error;
                }
        }



}

const matchService = new MatchService()
module.exports = matchService;