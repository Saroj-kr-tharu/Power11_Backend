const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const {userMw} = require("../middlewares/index");
const { INTERNAL_SERVER_TOKEN, PLAYER_GAME_BACKEND_URL } = require("../serverConfig/server.config");

const router = express.Router();

router.use((req, res, next) => {
  console.log('playerGame route hit:', req.method, req.path);
  console.log('PLAYER_GAME_BACKEND_URL:', PLAYER_GAME_BACKEND_URL);
  next();
});

const gamePlayerProxy = createProxyMiddleware({
  target: PLAYER_GAME_BACKEND_URL,
  changeOrigin: true,
  pathRewrite: { "^/gameplayer": "" },
  headers: { "x-internal-server-token": INTERNAL_SERVER_TOKEN },
  logLevel: "debug", 
});


router.get("/player/check",userMw.verifyAdmin, gamePlayerProxy);

// game 
router.post("/game", userMw.verifyAdmin , gamePlayerProxy);
router.get("/game", userMw.verifyToken , gamePlayerProxy);
router.get( "/game/:gameId",userMw.verifyToken,   gamePlayerProxy );
router.delete("/game/:gameId", userMw.verifyAdmin , gamePlayerProxy);
router.patch("/game/:gameId", userMw.verifyAdmin , gamePlayerProxy);

// player
router.post("/player", userMw.verifyAdmin , gamePlayerProxy);
router.get("/player", userMw.verifyToken , gamePlayerProxy);
router.delete("/player/:playerId", userMw.verifyAdmin , gamePlayerProxy);
router.patch("/player/:playerId", userMw.verifyAdmin , gamePlayerProxy);
router.get( "/player/:gameId",userMw.verifyUser,  gamePlayerProxy );


// team master
router.post( "/teammaster", userMw.verifyAdmin,   gamePlayerProxy);
router.get( "/teammaster", userMw.verifyUser,  gamePlayerProxy);
router.delete( "/teammaster/:teammasterId", userMw.verifyAdmin,  gamePlayerProxy);
router.patch( "/teammaster/:teammasterId", userMw.verifyAdmin,  gamePlayerProxy);
router.get( "/teammaster/:gameId",userMw.verifyUser,  gamePlayerProxy );


module.exports = router;
