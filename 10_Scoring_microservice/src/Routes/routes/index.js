const express = require('express');
const router = express.Router();
const {scoringCtrl } = require('../../controllers/index')
const { internalTokenMw,  userMw, scoreMw} = require('../../middlewares/index')


router.get("/event/check", (req, res) => {
  return res.json({ message: "PlayerGame   Server is good to GO" });
});

// scoreRules
router.post( "/scorerule",internalTokenMw.checkInternalServiceToken,userMw.validateToken, scoreMw.addScoreRule ,scoringCtrl.addScoreRules );
router.get( "/scorerule",internalTokenMw.checkInternalServiceToken, userMw.validateToken,   scoringCtrl.getScoreRules );
router.delete( "/scorerule/:scoreruleId",internalTokenMw.checkInternalServiceToken, userMw.validateToken ,scoringCtrl.deleteScoreRules );
router.patch( "/scorerule/:scoreruleId",internalTokenMw.checkInternalServiceToken,userMw.validateToken ,  scoringCtrl.deleteScoreRules );


 
module.exports = router;