const express = require('express');

const router = express.Router();

const {userMw, internalTokenMw, teamMw} = require('../../middlewares/index')
const {teamCtrl} = require('../../controllers')

router.get("/team/check", (req, res) => {
  return res.json({ message: "Team Server is good to GO" });
});


// team 
router.post( "/team",internalTokenMw.checkInternalServiceToken,userMw.validateToken, teamMw.addTeam,  teamCtrl.addTeam );
router.get( "/team",internalTokenMw.checkInternalServiceToken,userMw.validateToken,   teamCtrl.getAllTeam );
router.get( "/team/:teamId",internalTokenMw.checkInternalServiceToken,userMw.validateToken,   teamCtrl.getTeamById );
router.delete( "/team/:teamId",internalTokenMw.checkInternalServiceToken,userMw.validateToken,  teamCtrl.deleteTeam );
router.patch( "/team/:teamId",internalTokenMw.checkInternalServiceToken,userMw.validateToken,  teamCtrl.updateTeam );

 
 
module.exports = router;