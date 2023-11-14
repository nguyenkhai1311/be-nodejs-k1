var express = require("express");
var router = express.Router();

const AuthController = require("../controllers/AuthController");

/* GET home page. */
router.get("/", AuthController.index);

module.exports = router;
