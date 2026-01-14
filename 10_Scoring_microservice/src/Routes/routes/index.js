const express = require('express');
const router = express.Router();
const {scoringCtrl, matchEventCtrl } = require('../../controllers/index')
const { internalTokenMw,  userMw, scoreMw} = require('../../middlewares/index')

router.get("/event/check", (req, res) => {
  return res.json({ message: "PlayerGame   Server is good to GO" });
});

// scoreRules
router.post( "/scorerule",internalTokenMw.checkInternalServiceToken,userMw.validateToken, scoreMw.addScoreRule ,scoringCtrl.addScoreRules );
router.get( "/scorerule",internalTokenMw.checkInternalServiceToken, userMw.validateToken,   scoringCtrl.getScoreRules );
router.delete( "/scorerule/:scoreruleId",internalTokenMw.checkInternalServiceToken, userMw.validateToken ,scoringCtrl.deleteScoreRules );
router.patch( "/scorerule/:scoreruleId",internalTokenMw.checkInternalServiceToken,userMw.validateToken ,  scoringCtrl.deleteScoreRules );

// matchEvent 
router.post( "/event",internalTokenMw.checkInternalServiceToken,userMw.validateToken, scoreMw.addMatchEvent,matchEventCtrl.addMatchEvent );
router.get( "/event",internalTokenMw.checkInternalServiceToken, userMw.validateToken,   matchEventCtrl.getMatchEvent );
router.delete( "/event/:matcheventId",internalTokenMw.checkInternalServiceToken, userMw.validateToken ,matchEventCtrl.deleteMatchEvent );
router.patch( "/event/:matcheventId",internalTokenMw.checkInternalServiceToken,userMw.validateToken ,  matchEventCtrl.updateMatchEvent );

 
module.exports = router;