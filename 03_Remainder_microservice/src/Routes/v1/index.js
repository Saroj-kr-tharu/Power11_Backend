const express = require("express");
const router = express.Router();

const templateCtrl = require("../../Controllers/remainder.ctrl");
const userMw = require("../../Middlewares/user.middleware")
const internalServiceMw = require("../../Middlewares/internal.service.middleware")

router.post("/template", internalServiceMw.checkInternalServiceToken, userMw.validateToken,     templateCtrl.createCtrl);
router.delete("/template/:templateId",  internalServiceMw.checkInternalServiceToken,  userMw.validateToken,  templateCtrl.deleteCtrl);
router.patch("/template/:templateId", internalServiceMw.checkInternalServiceToken,  userMw.validateToken,    templateCtrl.updateCtrl);
router.get("/template", internalServiceMw.checkInternalServiceToken,  userMw.validateToken,  templateCtrl.getAll);



module.exports = router;
