const express = require('express');

const router = express.Router();

const {userMw, internalTokenMw} = require('../../middlewares/index')
const {contestCtrl} = require("../../controllers/index")


router.get("/contest/check", (req, res) => {
  return res.json({ message: "contest   Server is good to GO" });
});


router.post( "/contest",internalTokenMw.checkInternalServiceToken, userMw.validateToken,   contestCtrl.addContest );
router.get( "/contest",   contestCtrl.getAllContest );
router.delete( "/contest/:contestId",internalTokenMw.checkInternalServiceToken,userMw.validateToken,  contestCtrl.deleteContest );
router.patch( "/contest/:contestId",internalTokenMw.checkInternalServiceToken, userMw.validateToken, contestCtrl.updateContest );

 
 
module.exports = router;