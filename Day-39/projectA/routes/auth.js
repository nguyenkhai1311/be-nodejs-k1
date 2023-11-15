var express = require("express");
var router = express.Router();
const passport = require("passport");

const AuthController = require("../controllers/AuthController");
const GuestMiddleware = require("../middlewares/GuestMiddleware");

router.get("/login", GuestMiddleware, AuthController.login);
router.post(
    "/login",
    passport.authenticate("local", {
        failureRedirect: "/auth/login",
        failureFlash: true,
    }),
    AuthController.handleLogin
);

router.get("/redirect", AuthController.redirect);
router.get("/logout", AuthController.logout);

router.get("/identify", AuthController.identify);
router.post("/identify", AuthController.verify);

module.exports = router;
