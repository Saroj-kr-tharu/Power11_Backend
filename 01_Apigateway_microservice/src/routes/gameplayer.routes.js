const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const {userMw} = require("../middlewares/index");
const { INTERNAL_SERVER_TOKEN, PLAYER_GAME_BACKEND_URL } = require("../serverConfig/server.config");

const router = express.Router();

const gamePlayerProxy = createProxyMiddleware({
  target: PLAYER_GAME_BACKEND_URL,
  changeOrigin: true,
  pathRewrite: { "^/gameplayer": "" },
  headers: { "x-internal-server-token": INTERNAL_SERVER_TOKEN },
  logLevel: "debug", 
});



router.post("/game", userMw.verifyAdmin , gamePlayerProxy);
router.get("/game", userMw.verifyToken , gamePlayerProxy);
router.delete("/game/:gameId", userMw.verifyAdmin , gamePlayerProxy);
router.patch("/game/:gameId", userMw.verifyAdmin , gamePlayerProxy);



module.exports = router;
