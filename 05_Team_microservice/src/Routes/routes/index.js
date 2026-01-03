const express = require('express');

const router = express.Router();

const {userMw, internalTokenMw} = require('../../middlewares/index')
const {teamCtrl} = require('../../controllers')

router.get("/team/check", (req, res) => {
  return res.json({ message: "PlayerGame   Server is good to GO" });
});



// team 
router.post( "/team",internalTokenMw.checkInternalServiceToken,userMw.validateToken,   teamCtrl.addTeam );
router.get( "/team",userMw.validateToken,   teamCtrl.getAllTeam );
router.delete( "/team/:teamId",internalTokenMw.checkInternalServiceToken,userMw.validateToken,  teamCtrl.deleteTeam );
router.patch( "/team/:teamId",internalTokenMw.checkInternalServiceToken,userMw.validateToken,  teamCtrl.updateTeam );

 
 
module.exports = router;