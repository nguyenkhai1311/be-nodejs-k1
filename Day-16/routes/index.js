var express = require("express");
var router = express.Router();

// Import Controller
const HomeController = require("../controllers/HomeController");

// Khai báo route
router.get("/", HomeController.index);
router.get("/dang-nhap", HomeController.login);
router.post("/dang-nhap", HomeController.handleLogin);
router.get("/dang-xuat", HomeController.handleLogout);

module.exports = router;
