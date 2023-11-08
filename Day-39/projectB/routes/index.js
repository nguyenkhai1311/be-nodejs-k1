var express = require("express");
var router = express.Router();

const AuthController = require("../controllers/AuthController");

const isLogin = (req, res, next) => {
    const user = req.flash("user");
    if (!user[0]) {
        res.redirect("/auth");
    }
    next();
};

/* GET home page. */
router.get("/", isLogin, AuthController.index);

module.exports = router;
