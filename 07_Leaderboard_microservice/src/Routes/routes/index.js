const express = require('express');

const router = express.Router();

const {userMw, internalTokenMw} = require('../../middlewares/index')
const {leaderboardCtrl} = require('../../controllers/index')


router.get("/leaderboard/check", (req, res) => {
  return res.json({ message: "Leaderboard   Server is good to GO" });
});


router.post( "/contest",internalTokenMw.checkInternalServiceToken, userMw.validateToken,   leaderboardCtrl.addLeaderboard );
router.get( "/contest",   leaderboardCtrl.getAllLeaderboard );
router.delete( "/contest/:leaderboardId",internalTokenMw.checkInternalServiceToken,userMw.validateToken,  leaderboardCtrl.deleteLeaderboard );
router.patch( "/contest/:leaderboardId",internalTokenMw.checkInternalServiceToken, userMw.validateToken, leaderboardCtrl.updateLeaderboard);

 

 
 
module.exports = router;