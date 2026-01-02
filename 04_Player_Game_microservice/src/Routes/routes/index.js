const express = require('express');

const router = express.Router();
const {gameCtrl} = require('../../controllers/index')
const { internalTokenMw, gameMw} = require('../../middlewares/index')


router.get("/player/check", (req, res) => {
  return res.json({ message: "PlayerGame   Server is good to GO" });
});


router.post( "/game",internalTokenMw.checkInternalServiceToken, gameMw.addGame,  gameCtrl.addGame );
router.get( "/game",   gameCtrl.getAllGame );
router.delete( "/game/:gameId",internalTokenMw.checkInternalServiceToken,  gameCtrl.deleteGame );
router.patch( "/game/:gameId",internalTokenMw.checkInternalServiceToken,  gameCtrl.updateGame );

 
 
module.exports = router;