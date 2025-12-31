const paymentNotificationRepo = require("../Repository/payment.notification.repo");
const ticketconfirmsRepo = require("../Repository/ticket.confirm.repo");


// confirm ticket 
const createServiceTicketConfirm = async (data) => {
  try {

    // console.log(' CREATE_TICKET_CONFIRM data =>  ', data );
// 

    let finalData = {
        email: data.email, 
        customerName: data.customerName,

        orderItems: data.orderItems,  
        orderId: data.orderId,
        shipping_fee: data.shipping_fee,
        tax: data.tax,
        deliveryEstimatedDate: data.deliveryEstimatedDate,
        Subtotal: data.Subtotal ,  
        notificationTime: data.notificationTime,
        transactionId: data.transactionId,
        amount: data.amount,
        currency: data.currency,

    }
    // console.log('final data  => ', finalData);

    const res = await ticketconfirmsRepo.create(finalData);
    return res;


  } catch (error) {
    console.log("Something went wrong in service layer (create)");
    throw error;
  }
};

const getPendingMailServiceTicket = async () => {
  try {
    const res = await ticketconfirmsRepo.findPendingMail();
    return res;
  } catch (error) {
    console.log("Something went wrong in service layer (getByIdService)");
    throw error;
  }
};

const updateNotificationServiceTicket = async (id, data) => {
  try {
    // console.log(id, " data => ", data);

    const res = await ticketconfirmsRepo.updateNotification(id, data);
    return res;
  } catch (error) {
    console.log("Something went wrong in service layer (update)");
    throw error;
  }
}

const deleteDataByStatusRepoTicket = async (data) => {
  try {
    const res = await ticketconfirmsRepo.deleteDataByStatus(data);
    return res;
  } catch (error) {
    console.log("Something went wrong in service layer (deleteDataByStatusRepo)");
    throw error;
  }
};


// payment notification 
const createServicePayment = async (data) => {
  try {
    let finalData = {
      userEmail:data.email ,
      notificationTime:data.notificationTime ,
      transitionId:data.transactionId ,
      amount:data.amount ,
      gateway:data.gateway ,
      payment_status:data.status,
      currency: data.currency

    }
    // console.log('final data  => ', finalData);

    const res = await paymentNotificationRepo.create(finalData);
    return res;
  } catch (error) {
    console.log("Something went wrong in service layer (create)");
    throw error;
  }
};

const deleteServicePayment = async (id) => {
  try {
    const res = await paymentNotificationRepo.delete(id);
    return res;
  } catch (error) {
    console.log("Something went wrong in service layer (delete)");
    throw error;
  }
};

const updateServicePayment = async (id, data) => {
  try {
    // console.log(id, " data => ", data);

    const res = await paymentNotificationRepo.update(id, data);
    return res;
  } catch (error) {
    console.log("Something went wrong in service layer (update)");
    throw error;
  }
};

const updateNotificationServicePayment = async (id, data) => {
  try {
    // console.log(id, " data => ", data);

    const res = await paymentNotificationRepo.updateNotification(id, data);
    return res;
  } catch (error) {
    console.log("Something went wrong in service layer (update)");
    throw error;
  }
};

const getByIdServicePayment = async (data) => {
  try {
    const res = await paymentNotificationRepo.findById(data);
    return res;
  } catch (error) {
    console.log("Something went wrong in service layer (getByIdService)");
    throw error;
  }
};

const getPendingMailServicePayment = async () => {
  try {
    const res = await paymentNotificationRepo.findPendingMail();
    return res;
  } catch (error) {
    console.log("Something went wrong in service layer (getByIdService)");
    throw error;
  }
};

const deleteDataByStatusRepoPayment = async (data) => {
  try {
    const res = await paymentNotificationRepo.deleteDataByStatus(data);
    return res;
  } catch (error) {
    console.log("Something went wrong in service layer (deleteDataByStatusRepo)");
    throw error;
  }
};

const filterByDateServicePayment = async (data) => {
  try {
    // console.log(data.startDate, data.endDate);

    const res = await paymentNotificationRepo.filterByDateRange(
      data.startDate,
      data.endDate
    );
    return res;
  } catch (error) {
    console.log("Something went wrong in service layer (getByIdService)");
    throw error;
  }
};

module.exports = {
  updateServicePayment,
  createServicePayment,
  getByIdServicePayment,
  filterByDateServicePayment,
  deleteServicePayment,
  getPendingMailServicePayment,
  updateNotificationServicePayment,
  deleteDataByStatusRepoPayment,
  createServiceTicketConfirm,
  getPendingMailServiceTicket,
  updateNotificationServiceTicket,
  deleteDataByStatusRepoTicket
};
