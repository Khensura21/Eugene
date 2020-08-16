//creating a handler folder, helps files clean!
 // are util directories the same as handlers???

const express = require('express');
const router = express.Router();
const { signup, signin } = require("../auth/strategies/jwt");
 
router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;