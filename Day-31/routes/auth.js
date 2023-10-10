var express = require("express");
var router = express.Router();
const passport = require("passport");

const AuthController = require("../controllers/AuthController");

/* GET users listing. */

const isLogin = (req, res, next) => {
    if (req.user) {
        res.redirect("/");
    }
    next();
};

router.get("/login", isLogin, AuthController.login);
router.post(
    "/login",
    passport.authenticate("local", {
        failureRedirect: "/auth/login",
        failureFlash: true,
    }),

    AuthController.handleLogin
);
router.get("/register", isLogin, AuthController.register);
router.post("/register", AuthController.handleRegister);

router.get("/logout", AuthController.logout);

router.get(
    "/google/redirect",
    passport.authenticate("google", {
        prompt: "select_account",
    })
);
router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/auth/login",
        failureMessage: true,
    }),
    AuthController.loginGoogle
);

router.get("/facebook/redirect", passport.authenticate("facebook"));

router.get(
    "/facebook/callback",
    passport.authenticate("facebook", {
        failureRedirect: "/auth/login",
        failureMessage: true,
    }),
    AuthController.loginFacebook
);

router.get("/github/redirect", passport.authenticate("github"));

router.get(
    "/github/callback",
    passport.authenticate("github", {
        failureRedirect: "/auth/login",
        failureMessage: true,
    }),
    AuthController.loginGithub
);

module.exports = router;
