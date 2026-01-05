const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const {userMw} = require("../middlewares/index");
const { MATCH_BACKEND_URL, INTERNAL_SERVER_TOKEN } = require("../serverConfig/server.config");

const router = express.Router();

router.use((req, res, next) => {
  console.log('matchRoutes route hit:', req.method, req.path);
  console.log('MATCH_BACKEND_URL:', MATCH_BACKEND_URL);
  next();
});

const matchProxy = createProxyMiddleware({
    target: MATCH_BACKEND_URL,
    changeOrigin: true,
    pathRewrite: { "^/": "/match" },
    headers: { "x-internal-server-token": INTERNAL_SERVER_TOKEN },
    logLevel: "debug",
    

});


router.post( "/",userMw.verifyAdmin, matchProxy );
router.get( "/",   matchProxy );
router.delete( "/:matchId",userMw.verifyAdmin, matchProxy );
router.patch( "/:matchId", userMw.verifyAdmin,matchProxy);


module.exports = router;
