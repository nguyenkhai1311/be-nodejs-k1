var express = require("express");
var router = express.Router();

const HomeController = require("../controller/HomeController");
/* GET home page. */
router.get("/", HomeController.index);
router.get("/dang-nhap", HomeController.login);
router.post("/dang-nhap", HomeController.handleLogin);
router.get("/dang-xuat", HomeController.handleLogout);

module.exports = router;
