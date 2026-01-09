const Service = require('./curd.service');
const paymentTransRepo = require('../Repository/payment.transtion.repo');

class PaymentTransactionService extends Service {
  constructor() {
    super(paymentTransRepo);
  }

  async updateByTransId(transId, data, ) {
    try {

      const res = await paymentTransRepo.updateByTrans(transId, data);
      return res;
    } catch (error) {
      console.log("Something went wrong in service layer (updateByTransId)");
      throw error;
    }
  }

  async updateByOrderId(orderId, data) {
    try {

      const res = await paymentTransRepo.updateByOrderId(orderId, data);
      return res;
    } catch (error) {
      console.log("Something went wrong in service layer (updateByTransId)");
      throw error;
    }
  }
  
  async getDetailsByTransid(transId) {
    try {

      const res = await paymentTransRepo.getDetailsByTransid(transId);
      return res;
    } catch (error) {
      console.log("Something went wrong in service layer (getDetailsByTransid)");
      throw error;
    }
  }
 

}

const paymentTransService = new PaymentTransactionService();
module.exports = paymentTransService;