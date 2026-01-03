const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const {userMw} = require("../middlewares/index");
const { CONTEST_BACKEND_URL, INTERNAL_SERVER_TOKEN } = require("../serverConfig/server.config");

const router = express.Router();

const contestProxy = createProxyMiddleware({
  target: CONTEST_BACKEND_URL,
  changeOrigin: true,
  pathRewrite: { "^/": "/contest" },
  headers: { "x-internal-server-token": INTERNAL_SERVER_TOKEN },
  logLevel: "debug",
});


// contest routes
router.post( "/", userMw.verifyAdmin,   contestProxy );
router.get( "/",  userMw.verifyToken,   contestProxy );
router.delete( "/:contestId",userMw.verifyAdmin,  contestProxy );
router.patch( "/:contestId", userMw.verifyAdmin, contestProxy );




module.exports = router;
