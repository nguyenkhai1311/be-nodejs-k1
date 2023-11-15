const model = require("../models/index");
const LoginToken = model.LoginToken;

module.exports = async (req, res, next) => {
    if (!req.user) {
        res.redirect("/auth/login");
        return;
    }
    const tokenDevice = req.cookies["token"];
    if (tokenDevice) {
        const status = await LoginToken.findOne({
            where: {
                token: tokenDevice,
            },
        });
        if (status) {
            next();
        } else {
            req.logout(function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect("/auth/login");
            });
        }
    } else {
        res.redirect("/auth/login");
    }
};
