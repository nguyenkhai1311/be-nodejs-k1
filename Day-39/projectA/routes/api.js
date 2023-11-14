var express = require("express");
var router = express.Router();

const ApiAuthController = require("../controllers/ApiAuthController");

router.post("/auth/status", ApiAuthController.status);

router.get("/auth/logout", ApiAuthController.logout);

module.exports = router;
