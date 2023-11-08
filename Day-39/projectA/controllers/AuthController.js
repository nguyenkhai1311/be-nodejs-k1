const fs = require("fs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

module.exports = {
    login: (req, res) => {
        res.render("auth/login");
    },

    handleLogin: async (req, res) => {
        const key = req.query;
        const { email, password } = req.body;
        const clientId = uuidv4();
        const token = jwt.sign({ email, password, clientId }, "f8");
        if (!fs.existsSync("../data")) {
            fs.mkdirSync("../data");
        }
        const data = {
            token: token,
        };
        try {
            fs.writeFileSync("../data/data.json", JSON.stringify(data));
        } catch (e) {
            console.log(e.message);
        }
        if (key.key) {
            return res.redirect(`http://localhost:3001/`);
        }
        res.redirect("/");
    },

    logout: async (req, res) => {
        if (fs.existsSync("../data/data.json")) {
            fs.unlinkSync("../data/data.json");
        }
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
            res.redirect("/auth/login");
        });
    },
};
