const apiAuth = `http://localhost:3000/api/auth/status`;
const model = require("../models/index");
const LoginToken = model.LoginToken;
const md5 = require("md5");

module.exports = {
    login: async (req, res) => {
        const currentUrl =
            req.protocol + "://" + req.get("host") + req.baseUrl + req.path;
        let authCode = "";
        if (req.query.cookie) {
            req.session.oauth_code = req.query.cookie;
            authCode = req.session.oauth_code;
        }

        const response = await fetch(apiAuth, {
            method: "POST",
            headers: {
                Cookie: "connect.sid=" + authCode,
            },
        });
        console.log(response.ok);
        let msg;
        let user = null;
        if (response.ok) {
            const data = await response.json();
            user = await data.user;
            const token = md5(new Date() + Math.random());
            const tokenUser = await LoginToken.findOne({
                where: {
                    email: user.email,
                },
            });

            if (tokenUser) {
                console.log(1234);
                await LoginToken.destroy({
                    where: {
                        email: user.email,
                    },
                });
            }
            await LoginToken.create({
                email: user.email,
                token: token,
            });
            res.cookie("token", token, {
                maxAge: 900000,
                httpOnly: true,
            });
            msg = `Đã đăng nhập`;
        } else {
            msg = `Chưa đăng nhập`;
        }

        const loginUrl = `http://localhost:3000/auth/login?redirect=http://localhost:3000/auth/identify?current=${currentUrl}`;
        const logoutUrl = `http://localhost:3000/api/auth/logout?redirect=${currentUrl}`;
        res.render("auth/login", { msg, user, loginUrl, logoutUrl });
    },

    index: async (req, res) => {
        res.render("index");
    },
};
