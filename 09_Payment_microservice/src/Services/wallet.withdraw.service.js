const Service = require('./curd.service');
const {WithdrawalRequestRepo} = require('../Repository/index');

const walletService = require('./wallet.service')
const walletTransService = require('./wallet.transaction.service')
const { sequelize } = require('../models');

class WalletWithDrawService extends Service {
  constructor() {
    super(WithdrawalRequestRepo);
  }

  async getByData(data) {
    try {

      const res = await WithdrawalRequestRepo.getBydata(data);
      return res;
    } catch (error) {
      console.log("Something went wrong in service layer (getByData)");
      throw error;
    }
  }

  async withdrawRequest(userId, amount, method , details) {
    const transaction = await sequelize.transaction();
    
    try {
      // 1. check the user wallet it is active or not and check the balance avaialble
      const validMethods = ['STRIPE', 'ESEWA', 'KHALTI', 'BANK_TRANSFER'];
      if(!validMethods.includes(method.toUpperCase()))
        throw new Error("Invalid withdrawal method");

      let wallet =  await walletService.getByData({userId: userId},);
      wallet = wallet?.dataValues;

      if(wallet.status != "ACTIVE")
        throw new Error("Wallet Suspended")

      if(wallet.balance < amount)
        throw new Error("Insufficient Balance")

      // 2. reduce the wallet into locked balance 
      const balance = wallet.balance - amount ; 
      const lockedBalance = Number(wallet.lockedBalance) + amount ;

      const lockedBalanceNum = parseFloat(lockedBalance);
      
      await walletService.updateService(wallet.id, {balance: balance, lockedBalance: lockedBalanceNum}, { transaction })

      // 3.  entry into the withdrawRequest
      const data = {
        userId: userId,
        walletId: wallet.id,
        amount: amount,
        currency: wallet.currency,
        method: method.toUpperCase(), 
        accountDetails: details, 
      }; 
     
      const res = await WithdrawalRequestRepo.create(data, { transaction })

      await transaction.commit();
      return res; 

     
    } catch (error) {
      await transaction.rollback();
      console.log("Something went wrong in service layer (updateByTransId)");
      throw error;
    }
  }

  async withdrawAction(requestId, status, ) {
        const transaction = await sequelize.transaction();
        try {
      
          // STEP 0: Update request status to PROCESSING
          let withdrawRequest = await WithdrawalRequestRepo.getByid( requestId );
          if (!withdrawRequest) 
            throw new Error("Withdrawal request not found");
          
          withdrawRequest= withdrawRequest?.dataValues; 
          
          if (withdrawRequest.status !="REQUESTED") 
            throw new Error("Withdrawal request is already Processing or Sucess ");

          // step 0.1: update the status to processing 
          await WithdrawalRequestRepo.update(requestId, {status: 'PROCESSING'}, { transaction })
          
          // STEP 1: Fetch user wallet
          let wallet = await walletService.getByData({ userId: withdrawRequest.userId });
          if (!wallet) 
            throw new Error("Wallet not found");
          
          wallet= wallet?.dataValues;

          // console.log(' wallet => ', wallet)


          // STEP 2: Verify wallet is active
          if (wallet.status !== "ACTIVE") 
            throw new Error("Wallet is suspended");
          

          // STEP 3: Confirm requested amount is in locked balance
          const requestedAmount = parseFloat(withdrawRequest.amount);
          if (parseFloat(wallet.lockedBalance) < requestedAmount) 
            throw new Error("Insufficient locked balance for withdrawal");
          

          // STEP 4: Verify payout details
          const accountDetails = withdrawRequest.accountDetails;
          if (!accountDetails) 
            throw new Error("Invalid payout account details");
          

          // STEP 5: Initiate payout by admin
          

          // STEP 6: Mark withdrawal request as SUCCESS
          await WithdrawalRequestRepo.update(requestId, { status: status }, { transaction });

          // STEP 7: Reduce locked balance from wallet
          const updatedLockedBalance = parseFloat(wallet.lockedBalance) - requestedAmount;

          // STEP 8: Final wallet update
          await walletService.updateService(wallet.id, { 
            lockedBalance: updatedLockedBalance 
          }, { transaction });

          // STEP 9: Create ledger entry (wallet transaction)
            const balanceBefore = parseFloat(wallet.lockedBalance);
            const balanceAfter = updatedLockedBalance;
            
            const  res=  await walletTransService.createService({
              walletId: wallet.id,
              type: 'DEBIT',
              reason: 'WITHDRAW',
              amount: requestedAmount,
              balanceBefore: balanceBefore,
              balanceAfter: balanceAfter,
              referenceType: 'WITHDRAW',
              referenceId: requestId,
              status: 'SUCESS',
              paymentTransactionId: null
            }, { transaction });

            



          // STEP 10: Notify user about successful withdrawal
          // TODO: Send notification to user

          await transaction.commit();
          return res;
            


        } catch (error) {
            await transaction.rollback();
            console.log('Something went wrong in service (PaymentIntialize)', error);
            throw error;
        }
  }



}

const walletWithDrawService = new WalletWithDrawService();
module.exports = walletWithDrawService;