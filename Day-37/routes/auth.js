var express = require("express");
var router = express.Router();

const AuthController = require("../controllers/AuthController");

/* GET home page. */
router.post("/login", AuthController.login);
router.get("/profile", AuthController.profile);
router.post("/refresh-token", AuthController.refresh);
router.get("/logout", AuthController.logout);

module.exports = router;
