
module.exports = {
   eSewaMw : require("./esewa.middleware"),
   khaltiMw : require("./khalti.middleware"),
   stripeMw: require("./stripe.middleware"),
   internalMw: require("./internal.service.middleware"),
   paymentMw: require("./payment.middleware"),
   userMw: require("./user.middleware"),
}