var express = require("express");
var router = express.Router();

const AuthController = require("../controllers/AuthController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

/* GET home page. */
router.get("/", AuthMiddleware.handle, AuthController.login);

module.exports = router;
