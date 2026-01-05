const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const {userMw} = require("../middlewares/index");
const { AUTH_BACKEND_URL, INTERNAL_SERVER_TOKEN } = require("../serverConfig/server.config");

const router = express.Router();

router.use((req, res, next) => {
  console.log('Auth route hit:', req.method, req.path);
  console.log('AUTH_BACKEND_URL:', AUTH_BACKEND_URL);
  next();
});

const authProxy = createProxyMiddleware({
    target: AUTH_BACKEND_URL,
    changeOrigin: true,
    pathRewrite: { "": "/auth" },
    headers: { "x-internal-server-token": INTERNAL_SERVER_TOKEN },
    logLevel: "debug",
    onProxyReq: (proxyReq, req, res) => {
      console.log('Proxying request to:', proxyReq.path);
      console.log('Original request path:', req.path);
    }

});


router.post( "/signup", authProxy);
router.post( "/login", authProxy);
router.get( "/veriyToken",userMw.verifyUser, authProxy);
router.post( "/refresh-token", authProxy);
router.post( "/logout", authProxy);
router.get( "/check", authProxy);

module.exports = router;
