const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const {userMw} = require("../middlewares/index");
const { LEADERBOARD_BACKEND_URL, INTERNAL_SERVER_TOKEN } = require("../serverConfig/server.config");

const router = express.Router();

const leaderboardProxy = createProxyMiddleware({ 
  target: LEADERBOARD_BACKEND_URL,
  changeOrigin: true,
  pathRewrite: { "^/": "/leaderboard/" },
  headers: { "x-internal-server-token": INTERNAL_SERVER_TOKEN },
  logLevel: "debug",
});


// contest routes
router.post( "/", userMw.verifyAdmin,   leaderboardProxy );
router.get( "/",  userMw.verifyToken,   leaderboardProxy );
router.delete( "/:leaderboardId",userMw.verifyAdmin,  leaderboardProxy );
router.patch( "/:leaderboardId", userMw.verifyAdmin, leaderboardProxy );




module.exports = router;
