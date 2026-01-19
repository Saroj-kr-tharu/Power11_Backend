const crypto = require("crypto")
const curdService = require("./curd.service");
const {matchRepo} = require('../repository')
const {InternalServiceClient} = require("../utlis/index")
const sendMessageToQueueService = require('./queue.service')

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

        calculateWiningPrice(rank, contest) {
                const name = contest.name.toLowerCase();
                const pool = contest.prizePool;

                // 1. "Winners Take All" or "Head to Head" logic
                if (name.includes("winners take all") || name.includes("head to head")) {
                        return rank === 1 ? pool : 0;
                }

                // 2. "Mega Contest" or "Free Entry" logic
                if (name.includes("mega") || name.includes("free") || name.includes("small")) {
                        
                        const totalWinners = Math.ceil(contest.joinedParticipants * 0.2); 
                        
                        if (rank > totalWinners) return 0;

                        if (rank === 1) return pool * 0.20; 
                        if (rank === 2) return pool * 0.10; 
                        if (rank === 3) return pool * 0.05; 
                        
                        
                        const remainingPool = pool * 0.65;
                        const otherWinnersCount = totalWinners - 3;
                        return otherWinnersCount > 0 ? (remainingPool / otherWinnersCount) : 0;
                }

                return 0;
                }

        async matchCompleted(matchId, token) {
                try {
                        // STEP 1: Validate match 
                        const match = await matchRepo.get(matchId);
                        // console.log('match => ', match) 
                        if(!match) throw new Error(" MATCH_IS_NOT_FOUND ");
                        if(match.status != "LIVE")  throw new Error("MATCH_IS_NOT_LIVE");

                       

                        // STEP 4: Fetch all LIVE contests
                        const contest = await InternalServiceClient.internalClient.get(
                                    `${InternalServiceClient.SERVICES.CONTEST}/contest/?matchId=${matchId}&status=LIVE`,
                                     { headers: { 'x-access-token': token } } 
                                )
                            if(!contest)  throw new Error("CONTEST_IS_NOT_FOUND")
                            console.log("contest => ", contest.data);
                        const contests = contest.data;

                        if (!contests || contests.length === 0) {
                                console.log("No live contests found for this match.");
                                return  "No contests to process." ;
                                }

                        
                        for (const contest of contests) {
                                console.log(`Processing Contest: ${contest._id}`);

                                // STEP 5: Fetch leaderboard for the specific contest
                                const leaderboardResponse = await InternalServiceClient.internalClient.get(
                                        `${InternalServiceClient.SERVICES.LEADERBOARD}/leaderboard/${contest._id}`,
                                        { headers: { 'x-access-token': token } }
                                );
                                const leaderboard = leaderboardResponse.data; // Array of user rankings

                                // STEP 7 & 8: Calculate Prizes and Update User Contest Records
                                for (const entry of leaderboard) {
                                        console.log("entry => ", entry)
                                        const userId = entry.userId;
                                        const rank = entry.rank;
                                        const points = entry.totalPoints;

                                        console.log(`User: ${userId}, Rank: ${rank}, Points: ${points}`);
                                
                                        
                                       const winningAmount = this.calculateWiningPrice(rank, contest);

                                        // Update userContest record
                                        await InternalServiceClient.internalClient.patch(
                                        `${InternalServiceClient.SERVICES.CONTEST}/contest/usercontest/${userId}/${contest._id}`,
                                                {       rank: rank,
                                                        finalPoint: points,
                                                        winningPoint: winningAmount,
                                                        status: "COMPLETED" 
                                                },
                                                { headers: { 'x-access-token': token } }
                                        );

                                        // STEP 9: Wallet credit (Only if they won money)
                                        if (winningAmount > 0) {
                                                await InternalServiceClient.internalClient.post(
                                                        `${InternalServiceClient.SERVICES.PAYMENT}/internal/wallet/match/execute`,
                                                        {
                                                         userId: userId,
                                                         amount: winningAmount,
                                                         idempotencyKey: crypto.randomUUID(),
                                                         referenceId: `WIN_${contest._id}_${userId}`, 
                                                         contestJoinFee: contest.entryFee
                                                        },
                                                        { headers: { 'x-access-token': token } }
                                                 );
                                        }

                                        //  STEP 10: Send notifications        
                                        let userData =  await InternalServiceClient.internalClient.get(
                                                `${InternalServiceClient.SERVICES.AUTH}/auth/email/${userId}`,
                                        );
                                       
                                        const userInfo = userData.data; 

                                        const payload = {
                                                userId: userId,
                                                email: userInfo.email,
                                                eventType: 'CONTEST_WON',
                                                channel: 'EMAIL',
                                                referenceType: "CREDIT_MONEY", 
                                                payload: {
                                                        amount: winningAmount,        
                                                        rank: rank,               
                                                        username: userInfo.username || email,
                                                        transaction_id: "IN_PROCESSING"
                                                },
                                                retryCount: 0,
                                                scheduledAt: new Date(Date.now() + 5 * 60 * 1000), 
                                        };

                                        await sendMessageToQueueService(payload, 'CREATE_NOTIFICATION');
                                }

                                // STEP 11: Update contest status to COMPLETED
                                await InternalServiceClient.internalClient.patch(
                                        `${InternalServiceClient.SERVICES.CONTEST}/contest/${contest._id}`,
                                        { 
                                           status: "COMPLETED",
                                           completedAt: new Date()
                                        },
                                        { headers: { 'x-access-token': token } }
                                );
                                
                                console.log(`Contest ${contest._id} finalized and paid out.`);
                                
                                // STEP 2: Update match status
                                await matchRepo.update(matchId, {status :  "COMPLETED" } ); 

                                return {
                                        matchId: matchId,
                                        status: "COMPLETED",
                                }
                                
                        }

                        
                       

                } catch (error) {
                        throw error;
                }
        }



}

const matchService = new MatchService()
module.exports = matchService;