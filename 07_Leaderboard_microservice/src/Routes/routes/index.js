const express = require('express');

const router = express.Router();

const {userMw, internalTokenMw} = require('../../middlewares/index')
const {leaderboardCtrl} = require('../../controllers/index')


router.get("/leaderboard/check", (req, res) => {
  return res.json({ message: "Leaderboard   Server is good to GO" });
});


router.post( "/leaderboard",internalTokenMw.checkInternalServiceToken, userMw.validateToken,   leaderboardCtrl.addLeaderboard );
router.get( "/leaderboard",   leaderboardCtrl.getAllLeaderboard );
router.delete( "/leaderboard/:leaderboardId",internalTokenMw.checkInternalServiceToken,userMw.validateToken,  leaderboardCtrl.deleteLeaderboard );
router.patch( "/leaderboard/:leaderboardId",internalTokenMw.checkInternalServiceToken, userMw.validateToken, leaderboardCtrl.updateLeaderboard);

 

 
 
module.exports = router;