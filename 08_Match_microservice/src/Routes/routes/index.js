const express = require('express');

const router = express.Router();

const {userMw, internalTokenMw} = require('../../middlewares/index')
const {matchCtrl} = require("../../controllers/index")


router.get("/contest/check", (req, res) => {
  return res.json({ message: "match Server is good to GO" });
});


router.post( "/match",internalTokenMw.checkInternalServiceToken, userMw.validateToken,   matchCtrl.addMatch );
router.get( "/match",   matchCtrl.getAllMatch );
router.delete( "/match/:matchId",internalTokenMw.checkInternalServiceToken,userMw.validateToken,  matchCtrl.deleteMatch );
router.patch( "/match/:matchId",internalTokenMw.checkInternalServiceToken, userMw.validateToken, matchCtrl.updateMatch );

 
module.exports = router;