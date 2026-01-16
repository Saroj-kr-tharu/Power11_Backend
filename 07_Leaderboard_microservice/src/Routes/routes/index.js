const express = require('express');

const router = express.Router();

const {userMw, internalTokenMw} = require('../../middlewares/index')
const {leaderboardCtrl} = require('../../controllers/index')


router.get("/leaderboard/check", (req, res) => {
  return res.json({ message: "Leaderboard   Server is good to GO" });
});


router.get( "/leaderboard/:contestId",internalTokenMw.checkInternalServiceToken,   leaderboardCtrl.getAllLeaderboard );

 
  
module.exports = router;