const fs = require("fs");
const jwt = require("jsonwebtoken");

module.exports = {
    handle: async (req, res, next) => {
        if (fs.existsSync("../data/data.json")) {
            const data = fs.readFileSync("../data/data.json");
            const token = JSON.parse(data.toString());
            const tokenUser = token.token;
            if (token) {
                const decoded = jwt.verify(tokenUser, "f8");
                req.flash("user", decoded);
                return res.redirect("/");
            }
        }

        next();
    },
};
