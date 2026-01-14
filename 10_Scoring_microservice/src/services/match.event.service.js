const curdService = require("./curd.service");
const {matchEventRepo} = require('../repository')
const {InternalServiceClient, } = require('../utlis/index')
const {EVENT_MAP } = require('../utlis/index')

class MatchEventService extends curdService{

    constructor(){
        super(matchEventRepo) 
    }

    async addMatchEvent({ matchId, gameId, contestId, playerId, eventType, eventValue,  metadata, createdBy = "SYSTEM", token }) {
        try {
            
            // 1. check the gameId is validate and active   Validate game / sport type
                const game = await InternalServiceClient.internalClient.get(
                        `${InternalServiceClient.SERVICES.GAME}/game/${gameId}`,
                         { headers: { 'x-access-token': token } } 
                    )
                if(!game)  throw new Error("GAME_IS_NOT_FOUND")
                if (!game.data || !game.data.status) throw new Error("GAME_IS_INACTIVE");
                const sport = game.data.name;
                console.log("game => ", game.data)
             
            //2. check the matchId is validate  Verify match existence and ensure match is LIVE
                const match = await InternalServiceClient.internalClient.get(
                    `${InternalServiceClient.SERVICES.MATCH}/match/?matchId=${matchId}`,
                     { headers: { 'x-access-token': token } } 
                )
                if(!match)  throw new Error("MATCH_IS_NOT_FOUND")
                if (!match.data || match.data.gameId != gameId) throw new Error("MATCH_DOES_NOT_BELONG_TO_GAME");
                if (!match.data || match.data.status != "LIVE"  ) throw new Error("MATCH_IS_NOT_LIVE");
                console.log("match => ", match.data)
                
        
            // 3. Validate Contest 
                const contest = await InternalServiceClient.internalClient.get(
                    `${InternalServiceClient.SERVICES.CONTEST}/contest/?contestId=${contestId}`,
                     { headers: { 'x-access-token': token } } 
                )
                if(!contest)  throw new Error("CONTEST_IS_NOT_FOUND")
                if (!contest.data || contest.data.gameId != gameId  ) throw new Error("CONTEST_DOES_NOT_BELONG_TO_GAME");
                if (!contest.data || contest.data.status != "LIVE"  ) throw new Error("CONTEST_IS_NOT_LIVE");
                if ( contest.data.matchId != matchId ) throw new Error("CONTEST_DOES_NOT_BELONG_TO_MATCH");
                
                // console.log("contest => ", contest.data)
                
            // STEP 4: Validate player participation in the match “Is playerId part of match.players and status = PLAYING?”
                const player = await InternalServiceClient.internalClient.post(
                    `${InternalServiceClient.SERVICES.GAME}/matchPlayer`,
                        {
                            filter: {
                                matchId, 
                                isActive: true,
                                playingStatus: { "$ne": "BENCH" },
                                playerId
                            }
                        },
                    { headers: { 'x-access-token': token } }
                );
                if(!player)  throw new Error("PLAYER_IS_NOT_FOUND")
                console.log("player = > ", player.data, ' sports => ', sport)
                if (!player.data || player.data[0].gameId != gameId  ) throw new Error("PLAYER_DOES_NOT_BELONG_TO_GAME");
                if (!player.data || !player.data[0].isPlaying  ) throw new Error("PLAYER_IS_NOT_PALYING");
               

            // STEP 6: Validate event type for the given game
                if (!EVENT_MAP[sport]?.includes(eventType)) throw new Error(`INVALID_EVENT_TYPE_FOR_${sport}`);
            
            // STEP 5: Validate event timing (over, minute, half, etc.)
                if (sport === "CRICKET") {
                    const { innings, over, ball } = metadata.timing || {};

                    if (innings == null || over == null || ball == null) throw new Error("CRICKET_TIMING_REQUIRED"); 

                    const format = match.data.metadata?.format; // T20 / ODI
                    const maxOvers = format === "T20" ? 20 : 50;
                    
                    if (innings > match.data.currentInnings) throw new Error("FUTURE_INNINGS_EVENT");
                    if (over < 0 || over >= maxOvers) throw new Error("INVALID_OVER");
                    if (ball < 1 || ball > 6) throw new Error("INVALID_BALL");


                    const isFutureEvent = over > match.data.currentOver || (over === match.data.currentOver && ball > match.data.currentBall);
                    console.log("currentOver:", match.data.currentOver, "currentOver:", match.data.currentOver, "currentBall:", match.data.currentBall);
                    if (isFutureEvent) throw new Error("FUTURE_EVENT_NOT_ALLOWED");
                }

                if (sport === "FOOTBALL") {
                    const { minute, half } = metadata || {};

                    if (minute == null || half == null) throw new Error("FOOTBALL_TIMING_REQUIRED");

                    if (![1, 2].includes(half)) throw new Error("INVALID_HALF");

                    if (minute < 0 || minute > 110) throw new Error("INVALID_MINUTE");

                    const isFutureEvent = half > match.data.currentHalf || (half === match.data.currentHalf && minute > match.data.currentMinute);

                    if (isFutureEvent)throw new Error("FUTURE_EVENT_NOT_ALLOWED");
                }
            // STEP 7: Fetch active scoring rules
            // STEP 8: Calculate fantasy points based on rules & conditions
            // STEP 9: Store match event with calculated fantasy points
            // STEP 10: Update match-player statistics
            // STEP 11: Update leaderboard / contest rankings
            // STEP 12: Emit score update event (async)
            
        } catch (error) {
          console.log("Error in service layer (addMatchEvent):", );

            if (error.response && error.response.data) {
                console.error(error.response.data.message);
                throw error.response.data;
            } else {
                console.error(error.message);
                throw error;
             }
         
        }
        }
   

}

const matchEventService = new MatchEventService()
module.exports = matchEventService;