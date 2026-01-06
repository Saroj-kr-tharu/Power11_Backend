const express = require('express');

const router = express.Router();
const {gameCtrl, playerCtrl, teamMasterCtrl} = require('../../controllers/index')
const { internalTokenMw, gameMw, userMw} = require('../../middlewares/index')


router.get("/player/check", (req, res) => {
  return res.json({ message: "PlayerGame   Server is good to GO" });
});

// game 
router.post( "/game",internalTokenMw.checkInternalServiceToken,userMw.validateToken ,gameMw.addGame,  gameCtrl.addGame );
router.get( "/game/:gameId",internalTokenMw.checkInternalServiceToken,userMw.validateToken,   gameCtrl.getGame );
router.get( "/game",internalTokenMw.checkInternalServiceToken,   gameCtrl.getAllGame );
router.delete( "/game/:gameId",internalTokenMw.checkInternalServiceToken,gameMw.gameId  ,gameCtrl.deleteGame );
router.patch( "/game/:gameId",internalTokenMw.checkInternalServiceToken,gameMw.gameId,  gameCtrl.updateGame );

// player 
router.post( "/player",internalTokenMw.checkInternalServiceToken,gameMw.addPlayer,   playerCtrl.addPlayer );
router.get( "/player",internalTokenMw.checkInternalServiceToken,   playerCtrl.getAllPlayer );
router.get( "/player/:gameId",internalTokenMw.checkInternalServiceToken, userMw.verifyToken, gameMw.gameId, playerCtrl.getByGameId );
router.delete( "/player/:playerId",internalTokenMw.checkInternalServiceToken,gameMw.playerId,  playerCtrl.deletePlayer );
router.patch( "/player/:playerId",internalTokenMw.checkInternalServiceToken,gameMw.playerId,  playerCtrl.updatePlayer );

// team master
router.post( "/teammaster",internalTokenMw.checkInternalServiceToken, userMw.verifyToken, gameMw.addTeamMaster,   teamMasterCtrl.addTeamMaster );
router.get( "/teammaster",internalTokenMw.checkInternalServiceToken, userMw.verifyToken,  teamMasterCtrl.getAllTeamMaster );
router.get( "/teammaster/:gameId",internalTokenMw.checkInternalServiceToken, userMw.verifyToken, gameMw.gameId, teamMasterCtrl.getAllByGameId );
router.delete( "/teammaster/:teammasterId",internalTokenMw.checkInternalServiceToken, userMw.verifyToken, gameMw.teammasterId,  teamMasterCtrl.deleteTeamMaster );
router.patch( "/teammaster/:teammasterId",internalTokenMw.checkInternalServiceToken, userMw.verifyToken, gameMw.teammasterId,  teamMasterCtrl.updateTeamMaster );


 
module.exports = router;