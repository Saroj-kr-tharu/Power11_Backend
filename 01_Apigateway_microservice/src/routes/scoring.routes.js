const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const {userMw} = require("../middlewares/index");
const { SCORING_BACKEND_URL, INTERNAL_SERVER_TOKEN } = require("../serverConfig/server.config");

const router = express.Router();

const scoringProxy = createProxyMiddleware({
  target: SCORING_BACKEND_URL,
  changeOrigin: true,
  pathRewrite: { "^/matchevent": "" },
  headers: { "x-internal-server-token": INTERNAL_SERVER_TOKEN },
  logLevel: "debug",
});

 
// event 
router.get( "/event/check",userMw.verifyAdmin ,  scoringProxy );

router.post( "/scorerule",userMw.verifyAdmin,scoringProxy );
router.get( "/scorerule",userMw.verifyAdmin, scoringProxy );
router.delete( "/scorerule/:scoreruleId",userMw.verifyAdmin, scoringProxy)
router.patch( "/scorerule/:scoreruleId",userMw.verifyAdmin, scoringProxy );

// matchEvent 
router.post( "/event",  userMw.verifyAdmin, scoringProxy );
router.get( "/event", userMw.verifyAdmin, scoringProxy );
router.delete( "/event/:matcheventId", userMw.verifyAdmin, scoringProxy );
router.patch( "/event/:matcheventId",  userMw.verifyAdmin, scoringProxy );


module.exports = router;
