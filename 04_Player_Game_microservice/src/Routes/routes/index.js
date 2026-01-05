const express = require('express');

const router = express.Router();
const {gameCtrl, playerCtrl, teamMasterCtrl} = require('../../controllers/index')
const { internalTokenMw, gameMw, userMw} = require('../../middlewares/index')


router.get("/player/check", (req, res) => {
  return res.json({ message: "PlayerGame   Server is good to GO" });
});

// game 
router.post( "/game",internalTokenMw.checkInternalServiceToken,userMw.validateToken ,gameMw.addGame,  gameCtrl.addGame );
router.get( "/game",internalTokenMw.checkInternalServiceToken,   gameCtrl.getAllGame );
router.delete( "/game/:gameId",internalTokenMw.checkInternalServiceToken,  gameCtrl.deleteGame );
router.patch( "/game/:gameId",internalTokenMw.checkInternalServiceToken,  gameCtrl.updateGame );

// player 
router.post( "/player",internalTokenMw.checkInternalServiceToken,gameMw.addPlayer,   playerCtrl.addPlayer );
router.get( "/player",internalTokenMw.checkInternalServiceToken,   playerCtrl.getAllPlayer );
router.delete( "/player/:playerId",internalTokenMw.checkInternalServiceToken,  playerCtrl.deletePlayer );
router.patch( "/player/:playerId",internalTokenMw.checkInternalServiceToken,  playerCtrl.updatePlayer );

// team master
router.post( "/teammaster",internalTokenMw.checkInternalServiceToken, userMw.verifyToken,   teamMasterCtrl.addTeamMaster );
router.get( "/teammaster",internalTokenMw.checkInternalServiceToken, userMw.verifyToken,  teamMasterCtrl.getAllTeamMaster );
router.delete( "/teammaster/:teammasterId",internalTokenMw.checkInternalServiceToken, userMw.verifyToken,  teamMasterCtrl.deleteTeamMaster );
router.patch( "/teammaster/:teammasterId",internalTokenMw.checkInternalServiceToken, userMw.verifyToken,  teamMasterCtrl.updateTeamMaster );

 
 
 
module.exports = router;