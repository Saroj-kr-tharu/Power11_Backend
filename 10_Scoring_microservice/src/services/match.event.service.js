const curdService = require("./curd.service");
const {matchEventRepo, scoringRepo} = require('../repository')
const {InternalServiceClient, } = require('../utlis/index')
const {EVENT_MAP } = require('../utlis/index')
const sendMessageToQueueService = require('./queue.service');

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

            // STEP 6.5: Get the match live Event 
                const matchLiveState = await InternalServiceClient.internalClient.get(
                    `${InternalServiceClient.SERVICES.MATCH}/match/livestate?matchId=${matchId}&gameId=${gameId}`,
                    { headers: { 'x-access-token': token } }
                );
                if(!matchLiveState) throw new Error("INVALID_MATCH_GAME_MATCHLIVE_STATE_NOT_FOUND")
                const matchLiveStateInfo = matchLiveState.data;
                if ( matchLiveStateInfo.gameId != gameId  ) throw new Error("MATCHLIVESTATE_DOES_NOT_BELONG_TO_GAME");
                if (matchLiveStateInfo.matchId != matchId  ) throw new Error("MATCHLIVESTAE_IS_NOT_BELONGS_TO_MATCH");

            // STEP 5: Validate event timing (over, minute, half, etc.)
                if (sport === "CRICKET") {
                    const { innings, over, ball } = metadata.timing || {};

                    if (innings == null || over == null || ball == null) throw new Error("CRICKET_TIMING_REQUIRED"); 

                    const format = match.data.metadata?.format; // T20 / ODI
                    const maxOvers = format === "T20" ? 20 : 50;
                    
                    if (innings > matchLiveStateInfo.progress) throw new Error("FUTURE_INNINGS_EVENT");
                    if (over < 0 || over >= maxOvers) throw new Error("INVALID_OVER");
                    if (ball < 1 || ball > 6) throw new Error("INVALID_BALL");


                    const isFutureEvent = over > matchLiveStateInfo.progress.over || (over ===  matchLiveStateInfo.progress.over && ball > matchLiveStateInfo.progress.ball);
                    console.log(
                        "currentOver:", matchLiveStateInfo.progress.over,
                        "currentBall:", matchLiveStateInfo.progress.ball,
                        "eventOver:", over,
                        "eventBall:", ball
                    );
                    if (isFutureEvent) throw new Error("FUTURE_EVENT_NOT_ALLOWED");
                }

                if (sport === "FOOTBALL") {
                    const { minute, half } = metadata || {};
 
                    if (minute == null || half == null) throw new Error("FOOTBALL_TIMING_REQUIRED");

                    if (![1, 2].includes(half)) throw new Error("INVALID_HALF");

                    if (minute < 0 || minute > 110) throw new Error("INVALID_MINUTE");

                    const isFutureEvent = half > matchLiveStateInfo.progress.currentHalf || (half === matchLiveStateInfo.progress.currentHalf && minute > matchLiveStateInfo.progress.currentMinute);

                    if (isFutureEvent)throw new Error("FUTURE_EVENT_NOT_ALLOWED");
                }
            // STEP 7: Fetch active scoring rules
                const scoreRules = await scoringRepo.getBydata({gameId: gameId, contestId:contestId})
                // console.log("scoreRules => ", scoreRules)
                
            // STEP 8: Calculate fantasy points based on rules & conditions
                let fantasyPoints = 0; 
                const rules = scoreRules.find( (item) => item.eventType === eventType )
                if(!rules ) throw new Error("RULES_NOT_FOUND")
                fantasyPoints+= rules.points;
                
                
            // STEP 9: Store match event with calculated fantasy points
                const res= await matchEventRepo.create({
                    matchId,
                    gameId,
                    contestId,
                    playerId,
                    eventType,
                    eventValue,
                    fantasyPoints,
                    metadata,
                    createdBy
                });
            // STEP 10: Update match-player statistics
                await InternalServiceClient.internalClient.patch(
                    `${InternalServiceClient.SERVICES.GAME}/matchPlayer`,
                    {matchId, gameId, playerId, fantasyPoint: fantasyPoints},
                    { headers: { 'x-access-token': token } }
                );
                
            // STEP 12: Emit score update event (async) to   Update leaderboard / contest rankings
                const payload = { matchId, gameId, playerId,contestId, fantasyPoint: fantasyPoints };
                await sendMessageToQueueService(payload, 'UPDATE_FANTASY_POINTS');
            return res; 
            
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