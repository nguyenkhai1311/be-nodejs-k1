const model = require("../models/index");
const LoginToken = model.LoginToken;

module.exports = async (req, res, next) => {
    if (!req.user) {
        res.redirect("/auth/login");
    }
    // const tokenDevice = req.cookies["token"];
    // if (tokenDevice) {
    //     const status = await LoginToken.findOne({
    //         where: {
    //             token: tokenDevice,
    //         },
    //     });
    //     if (status) {
    //         next();
    //     } else {
    //         const currentUrl =
    //             req.protocol + "://" + req.get("host") + req.baseUrl + req.path;
    //         res.redirect(
    //             `http://localhost:3000/api/auth/logout?redirect=${currentUrl}`
    //         );
    //         return;
    //     }
    // } else {
    //     res.redirect("/auth/login");
    // }
    next();
};
