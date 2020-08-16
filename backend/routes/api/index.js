const router = require("express").Router();

const {
  stockCurrentAPI,
  stockOpenAPI
} = require("./api");


router.get("/open", stockOpenAPI);
router.get("/current", stockCurrentAPI);


module.exports = router;