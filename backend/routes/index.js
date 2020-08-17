const express = require('express'),
      router = express.Router();

const User = require("../models/schema/user");

/* GET home page. */
router.get('/', function(req, res, next) {
  User.find({}, (err, docs) => {
    if (err) console.log(err);
    res.json(docs);
  })
  // res.send("Hello World!");
});

module.exports = router;
