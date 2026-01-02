const express = require('express');

const router = express.Router();

const {userMw, internalTokenMw} = require('../../middlewares/index')



router.get("/player/check", (req, res) => {
  return res.json({ message: "PlayerGame   Server is good to GO" });
});



 
 
module.exports = router;