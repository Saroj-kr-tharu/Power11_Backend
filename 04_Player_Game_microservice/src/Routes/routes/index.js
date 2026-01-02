const express = require('express');

const router = express.Router();
const {gameCtrl, playerCtrl} = require('../../controllers/index')
const { internalTokenMw, gameMw} = require('../../middlewares/index')


router.get("/player/check", (req, res) => {
  return res.json({ message: "PlayerGame   Server is good to GO" });
});


router.post( "/game",internalTokenMw.checkInternalServiceToken, gameMw.addGame,  gameCtrl.addGame );
router.get( "/game",   gameCtrl.getAllGame );
router.delete( "/game/:gameId",internalTokenMw.checkInternalServiceToken,  gameCtrl.deleteGame );
router.patch( "/game/:gameId",internalTokenMw.checkInternalServiceToken,  gameCtrl.updateGame );

router.post( "/player",internalTokenMw.checkInternalServiceToken,gameMw.addPlayer,   playerCtrl.addPlayer );
router.get( "/player",   playerCtrl.getAllPlayer );
router.delete( "/player/:playerId",internalTokenMw.checkInternalServiceToken,  playerCtrl.deletePlayer );
router.patch( "/player/:playerId",internalTokenMw.checkInternalServiceToken,  playerCtrl.updatePlayer );

 
 
 
module.exports = router;