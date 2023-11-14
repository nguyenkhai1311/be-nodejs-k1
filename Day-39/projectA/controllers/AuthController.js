const fs = require("fs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const md5 = require("md5");

module.exports = {
    login: (req, res) => {
        const { redirect } = req.query;
        res.render("auth/login", { redirect });
    },

    handleLogin: async (req, res) => {
        if (req.query.redirect) {
            return res.redirect("/auth/redirect?url=" + req.query.redirect);
        }
        res.redirect("/");
    },

    redirect: (req, res) => {
        const cookie = req.cookies["connect.sid"];
        console.log(req.query.url);
        res.redirect(req.query.url + `?cookie=${cookie}`);
    },

    logout: async (req, res) => {
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
            res.redirect("/auth/login");
        });
    },
};
