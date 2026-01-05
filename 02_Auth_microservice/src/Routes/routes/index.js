const express = require('express');
const router = express.Router();

const {authCtrl } = require('../../controllers/index')
const {userMw, internalTokenMw} = require('../../middlewares/index')


router.get("/auth/check", (req, res) => {
  return res.json({ message: "Auth Server is good to GO" });
});


// user 
router.post( "/auth/signup",internalTokenMw.checkInternalServiceToken, userMw.signupAndLogin, authCtrl.signup );
router.post( "/auth/login",internalTokenMw.checkInternalServiceToken, userMw.signupAndLogin, authCtrl.signin );
router.get( "/auth/veriyToken",internalTokenMw.checkInternalServiceToken, userMw.verifyToken, authCtrl.veriyToken );
router.post( "/auth/refresh-token",internalTokenMw.checkInternalServiceToken, userMw.verifyRefreshToken, authCtrl.refreshToken );
router.post( "/auth/login/otp",internalTokenMw.checkInternalServiceToken, authCtrl.loginByOTP );
router.post( "/auth/login/otp-verify",internalTokenMw.checkInternalServiceToken, userMw.verifyOTP, authCtrl.VerifyOTP );
router.post( "/auth/logout", internalTokenMw.checkInternalServiceToken, authCtrl.logout );

 
 
module.exports = router;