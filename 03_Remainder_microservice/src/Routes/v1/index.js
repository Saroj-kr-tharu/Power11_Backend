const express = require("express");
const router = express.Router();

const {
  createCtrl,
  updateCtrl,
  deleteCtrl,
  getByIdCtrl,
  getByDateRangeCtrl,
  getPendingMailCtrl,
  updateNotificationCtrl
} = require("../../Controllers/remainder.ctrl");

const {
  createValidator,
  getByIdValidator,
  deleteValidator,
  updateValidator,
  rangeValidator,
} = require("../../Middlewares/ticket.middleware");

router.post("/Ticket", createValidator, createCtrl);
router.delete("/Ticket", deleteValidator, deleteCtrl);
router.patch("/Ticket", updateValidator, updateCtrl);
router.patch("/NotificationTicket", updateNotificationCtrl);

router.get("/Ticket", getByIdValidator, getByIdCtrl);
router.get("/range", rangeValidator, getByDateRangeCtrl);
router.get("/mail", getPendingMailCtrl);

module.exports = router;
