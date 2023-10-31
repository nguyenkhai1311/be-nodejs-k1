var express = require("express");
var router = express.Router();

const EmailController = require("../controllers/EmailController");

router.get("/send", EmailController.index);
router.post("/send", EmailController.send);

module.exports = router;
