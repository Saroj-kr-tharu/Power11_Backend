const express = require('express');

const router = express.Router();

const {userMw, internalTokenMw} = require('../../middlewares/index')
const {matchCtrl, matchLiveStateCtrl} = require("../../controllers/index")


router.get("/contest/check", (req, res) => {
  return res.json({ message: "match Server is good to GO" });
});

// match 
router.post( "/match",internalTokenMw.checkInternalServiceToken, userMw.validateToken,   matchCtrl.addMatch );
router.get( "/match",internalTokenMw.checkInternalServiceToken,  matchCtrl.getAllMatch );
router.delete( "/match/:matchId",internalTokenMw.checkInternalServiceToken,userMw.validateToken,  matchCtrl.deleteMatch );
router.patch( "/match/:matchId",internalTokenMw.checkInternalServiceToken, userMw.validateToken, matchCtrl.updateMatch );

// matchlivestate
router.post( "/match/livestate",internalTokenMw.checkInternalServiceToken, userMw.validateToken,   matchLiveStateCtrl.addMatchLiveState );
router.get( "/match/livestate",internalTokenMw.checkInternalServiceToken,  matchLiveStateCtrl.getAllMatchLiveState );
router.delete( "/match/livestate/:liveStateId",internalTokenMw.checkInternalServiceToken,userMw.validateToken,  matchLiveStateCtrl.deleteMatchLiveState );


 
module.exports = router;