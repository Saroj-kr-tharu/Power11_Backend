const mongoose = require('mongoose');
const curdService = require("./curd.service");
const {usercontestRepo, contestRepo} = require('../repository')
const {InternalServiceClient, } = require('../utlis/index')
const { v4: uuidv4 } = require('uuid');


class UserContestService extends curdService{

    constructor(){
        super(usercontestRepo) 
    }

    async joinContest({userId, contestId, matchId, gameId, teamId, joinFee, token=null}){
        // const session = await mongoose.startSession();
        // session.startTransaction();

        let teamLocked = false;  
        
        try {
            // ========== STEP 1: Validate contest ==========
                const contestInfo = await contestRepo.get(contestId, 
                    // { session }
                );
                if(!contestInfo) throw new Error(" Contest is not Found ");
                console.log('contest ', contestInfo)
                if(matchId != contestInfo.matchId || gameId != contestInfo.gameId || joinFee< contestInfo.entryFee)
                    throw new Error(" Invalid Contest   ")
                
                const now = new Date();
                if (new Date(contestInfo.startTime) <= now) 
                    throw new Error("Contest has already started");
                
                
                if( joinFee != contestInfo.entryFee )
                    throw new Error(" Please Deposit  ")

            // ========== STEP 2: Validate user eligibility ==========
                const userInfo = await usercontestRepo.getByUser(userId, teamId, matchId, contestId, );
                if(userInfo && userInfo.length > 0)
                    throw new Error(" User is already join with same team  ")

            // ========== STEP 3: Check contest capacity ==========
                if(contestInfo.isFull)
                    throw new Error(" Contest is Full  ") 

            // ========== STEP 3.1: Check Wallet ==========
                const walletValidation = await InternalServiceClient.internalClient.post(
                    `${InternalServiceClient.SERVICES.PAYMENT}/internal/wallet/execute/`,
                    {   
                        amount: joinFee,
                        referenceId: contestId,
                        idempotencyKey:  uuidv4(),
                        // idempotencyKey:  "b6755fe8-e183-43dd-a963-79201f4164a7", 
                   
                    },
                     { headers: { 'x-access-token': token } }
                )
               
                console.log("walletValidation => ", walletValidation)

                

            // ========== STEP 4: Validate team ==========
                const team = await InternalServiceClient.internalClient.get(
                    `${InternalServiceClient.SERVICES.TEAM}/team/${teamId}`,
                     { headers: { 'x-access-token': token } }
                )
               
                const teamInfo = team?.data;
                if(!teamInfo) throw new Error(" Team is not found  ")
                
                if(userId != teamInfo.userId)
                    throw new Error(" Team is not Belongs to User ")
                
                if(matchId != teamInfo.matchId)
                    throw new Error(" Match is not Belongs to User ")

            // ========== STEP 8: Create contest entry ==========
                const createData = await usercontestRepo.create(
                    {userId, contestId, matchId, gameId, teamId, joinFee},
                    // { session }
                );

            // ========== STEP 9: Lock team ==========
                const updateData = {
                    lockStatus: 'soft',
                    lockedAt: new Date()
                };
                
                await InternalServiceClient.internalClient.patch(
                    `${InternalServiceClient.SERVICES.TEAM}/team/${teamId}`,
                    {...updateData},
                    { headers: { 'x-access-token': token } }
                );
                teamLocked = true; // Mark as locked 

            // ========== STEP 10: Update contest stats ==========
            
                await contestRepo.update(
                    contestId, 
                    { joinedParticipants: contestInfo.joinedParticipants + 1 },
                    // { session }
                );
            // Commit the transaction
            // await session.commitTransaction();

            // ========== STEP 11: Confirm join ==========
            return {
                    userContestId: createData._id,
                    userId,
                    contestId,
                    matchId,
                    gameId,
                    teamId,
                    joinFee,
                    joinedAt: createData.createdAt || new Date()
                }

        } catch (error) {
            // Abort MongoDB transaction
            // await session.abortTransaction();
            
            // ========== COMPENSATION: Unlock team if it was locked ==========
            // if (teamLocked) {
            //     try {
            //         await InternalServiceClient.internalClient.patch(
            //             `${InternalServiceClient.SERVICES.TEAM}/team/${teamId}`,
            //             { lockStatus: 'unlocked', lockedAt: null },
            //             { headers: { 'x-access-token': token } }
            //         );
            //     } catch (compensationError) {
            //         // Log compensation failure for manual intervention
            //         console.error("CRITICAL: Failed to unlock team during rollback", {
            //             teamId,
            //             originalError: error.message,
            //             compensationError: compensationError.message
            //         });
                    
            //     }
            // }
            
            console.log("something went wrong in service level (joinContest)")
            throw error;
        } finally {
            // session.endSession();
        }
    }


    async updateService(userId,contestId, data){
       
        try {
            // console.log("userId => ", userId, " data => ", data)
           const res = await  usercontestRepo.updateByUserId(userId,contestId, data);
           return res; 

        } catch (error) {
            console.log("something went wrong in service level (updateService)")
            throw error;
        } 
    }


}

const userContestService = new UserContestService()
module.exports = userContestService;