const curdService = require("./curd.service");
const {usercontestRepo, contestRepo} = require('../repository')
const {InternalServiceClient, } = require('../utlis/index')


class UserContestService extends curdService{

    constructor(){
        super(usercontestRepo) 
    }

    async joinContest({userId, contestId, matchId, gameId, teamId, joinFee, token=null}){
        try {
            // ========== STEP 1: Validate contest ==========
                // 1.1 - Check if contest exists
                const contestInfo = await  contestRepo.get(contestId);
                if(!contestInfo) throw new Error(" Contest is not Found ");
                
                // 1.2 - Verify contest belongs to the given match & game
                if(matchId != contestInfo.matchId || gameId != contestInfo.gameId || joinFee< contestInfo.entryFee   )
                    throw new Error(" Invalid Contest  ")
                
                // 1.3 - Ensure contest status is OPEN
                const now = new Date();
                if (new Date(contestInfo.startTime) <= now) {
                    throw new Error("Contest has already started");
                }
                
                // 1.4 - Ensure contest entry fee 
                if( joinFee != contestInfo.entryFee )
                    throw new Error(" Please Deposit  ")


            // ========== STEP 2: Validate user eligibility ==========
                // 2.3 - Ensure user has not already joined this contest with the same team
                const userInfo = await usercontestRepo.getByUser(userId, teamId, matchId, contestId);
                if(userInfo && userInfo.length > 0)
                    throw new Error(" User is already join with same team  ")

            // ========== STEP 3: Check contest capacity ==========
                // 3.2 - Confirm contest is not full
                    if(contestInfo.isFull)
                        throw new Error(" Contest is Full  ")

            // ========== STEP 4: Validate team ==========
                // 4.1 - Check if team exists
                const team = await InternalServiceClient.internalClient.get(
                    `${InternalServiceClient.SERVICES.TEAM}/team/${teamId}`,
                    { headers: { 'x-access-token': token } }
                )
                const teamInfo = team?.data;
                if(!teamInfo) throw new Error(" Team is not found  ")
                    
                
                // 4.2 - Verify team belongs to the user
                if(userId != teamInfo.userId)
                    throw new Error(" Team is not Belongs to User ")
                
                // 4.3 - Ensure team belongs to the same match
                if(matchId != teamInfo.matchId)
                    throw new Error(" Match is not Belongs to User ")

            // ========== STEP 6: Check wallet balance ==========
            // 6.1 - Verify user wallet exists
            // 6.2 - Confirm wallet balance ≥ contest.entryFee

            // ========== STEP 7: Deduct entry fee ==========
            // 7.1 - Deduct entry fee from wallet
            // 7.2 - Record wallet transaction (DEBIT) with reference to contest

            // ========== STEP 8: Create contest entry ==========
                const createData = await usercontestRepo.create({userId, contestId, matchId, gameId, teamId, joinFee,});
                

            // ========== STEP 9: Lock team ==========
                // 9.1 - Mark team as locked (isLocked = true)
                const updateData = {
                    lockStatus: 'soft',
                    lockedAt: new Date()
                };
                // 9.2 - Team becomes read-only, no edits allowed after joining
                await InternalServiceClient.internalClient.patch(
                        `${InternalServiceClient.SERVICES.TEAM}/team/${teamId}`,
                        {...updateData},
                        { headers: { 'x-access-token': token } }
                    )
           

            // ========== STEP 10: Update contest stats ==========
                // 10.1 - Increase participant count (contest.currentParticipants++)
                await contestRepo.update(contestId, { joinedParticipants: contestInfo.joinedParticipants + 1 })

            // ========== STEP 11: Confirm join ==========
            return {
                    userContestId: createData._id ,
                    userId,
                    contestId,
                    matchId,
                    gameId,
                    teamId,
                    joinFee,
                    joinedAt: createData.createdAt || new Date()
            }

        } catch (error) {
            console.log("something went wrong in service level (joinContest)")
            throw error;
        }
    }
}

const userContestService = new UserContestService()
module.exports = userContestService;