const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const {userMw} = require("../middlewares/index");
const { TEAM_BACKEND_URL, INTERNAL_SERVER_TOKEN } = require("../serverConfig/server.config");

const router = express.Router();

const teamProxy = createProxyMiddleware({
  target: TEAM_BACKEND_URL,
  changeOrigin: true,
  pathRewrite: { "^/teamservice": "" }, 
  headers: { "x-internal-server-token": INTERNAL_SERVER_TOKEN },
  logLevel: "debug",
});


// team 
router.post( "/team",userMw.verifyUser,   teamProxy);
router.get( "/team",userMw.verifyUser,   teamProxy );
router.delete( "/team/:teamId",userMw.verifyUser,  teamProxy );
router.patch( "/team/:teamId",userMw.verifyUser,  teamProxy );



module.exports = router;
