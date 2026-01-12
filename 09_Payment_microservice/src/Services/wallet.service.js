const { sequelize } = require('../models');
const Service = require('./curd.service');
const walletTransService = require("./wallet.transaction.service")
const idempotancyKeyService= require("./idempotancy.key.service")
const {WalletRepo} = require('../Repository/index');
const crypto = require("crypto")

class WalletService extends Service {
  constructor() {
    super(WalletRepo);
  }

  async getByData(data) {
    try {

      const res = await WalletRepo.getBydata(data);
      return res;
    } catch (error) {
      console.log("Something went wrong in service layer (updateByTransId)");
      throw error;
    }
  }


  async joinContestWalletOperation(userId, amount, referenceId, idempotencyKey) {
    const transaction = await sequelize.transaction();
    try {

      // 0 check the idempotancy 
        console.log("key => ", idempotencyKey)
        const requestHash = crypto.createHash('sha256').update(JSON.stringify({userId, amount, referenceId})).digest('hex');
        let key = null; 
        key = await idempotancyKeyService.getByData({key: idempotencyKey});
        
        if(key && requestHash == key?.requestHash) {
            if(key?.status == "IN_PROGRESS") throw new Error("PROCESSING_THIS_REQUEST")
            console.log("request dupplicated = hitted", )
            return key?.responseSnapshot;
        }
        await idempotancyKeyService.createService({
            key: idempotencyKey,
            userId: userId, 
            operation: 'JOIN_CONTEST',
            requestHash:requestHash ,
            responseSnapshot: {},
            status: 'IN_PROGRESS'
        })

      // STEP 1: Get wallet by userId
        let wallet = null; 
        wallet = await this.getByData({userId: userId});
        if(!wallet) throw new Error("WALLET_NOT_FOUND")
        wallet = wallet?.dataValues;
        console.log("wallet => ", wallet)
    
      // STEP 2: Validate wallet status
        if(wallet?.status != "ACTIVE") throw new Error("USER IS SUSPENDED")
        if(wallet?.balance < amount) throw new Error("INSUFFICIENT_AMOUNT")

      // STEP 3: Calculate available balance
        const newAvailableBalance = wallet?.balance - amount ; 
        const newLockedBalance = wallet?.lockedBalance + amount ;
      

      // STEP 4: update  wallet ( FOR UPDATE)
        await this.updateService(wallet?.id, {balance: newAvailableBalance, lockedBalance:newLockedBalance}, { transaction })

        
      // STEP 7: Create walletTransaction
        const balanceBefore = parseFloat(wallet.balance);
        const balanceAfter = newAvailableBalance;
        await walletTransService.createService({
          userId: userId,
          walletId: wallet.id,
          type: 'DEBIT', 
          status: 'LOCKED',
          amount: amount,
          balanceBefore: balanceBefore,
          balanceAfter: balanceAfter,
          reason: 'JOIN_CONTEST',
          referenceType: 'CONTEST', 
          referenceId: referenceId,
          paymentTransactionId: null, // idempotencyKey 
          status: 'SUCESS',
          
        }, { transaction });

      // update idempotencyKey 
        await idempotancyKeyService.updateByData(
            { key: idempotencyKey },
            { responseSnapshot: { walletId:  wallet?.id, lockedAmount: amount }, status: "SUCCESS" }
          );

      // STEP 8: Commit DB transaction
        await transaction.commit();
      // STEP 9: Return success response
       return { walletId:  wallet?.id, lockedAmount: amount }

    } catch (error) {
      // STEP 10: Rollback DB transaction
        await transaction.rollback();
        console.log('Something went wrong in service (joinContestWalletOperation)', error);
        throw error;
    }
}


  

}

const walletService = new WalletService();
module.exports = walletService;