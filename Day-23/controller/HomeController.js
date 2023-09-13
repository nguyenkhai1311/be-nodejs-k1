const md5 = require("md5");

const User = require("../models/User");

module.exports = {
    index: (req, res) => {
        if (req.session.login === true) {
            return res.render("home/index");
        } else {
            res.redirect("/dang-nhap");
        }
    },

    login: (req, res) => {
        if (req.session.login === true) {
            res.redirect("/");
        } else {
            return res.render("home/login", {
                msg: req.flash("msg"),
                success: req.flash("success"),
            });
        }
    },

    handleLogin: async (req, res) => {
        const user = await User;
        const userList = await user.findAll();
        const { emailUser, passwordUser } = req.body;
        let email = [];
        let password = [];
        for (let index in userList) {
            email.push(userList[index]["dataValues"].email);
            password.push(userList[index]["dataValues"].password);
        }
        for (let i = 0; i < email.length; i++) {
            console.log(i);
            console.log(emailUser);
            console.log(email[i]);
            if (emailUser === email[i] && md5(passwordUser) === password[i]) {
                // Set session
                req.session.login = true;
                return res.redirect("/");
            } else {
                req.session.status = 1;
            }
        }

        if (req.session.status === 1) {
            req.session.login = false;
            for (let i = 0; i < email.length; i++) {
                if (emailUser === email[i]) {
                    req.session.status = 2;
                }
            }
            if (req.session.status === 2) {
                req.flash("msg", "Mật khẩu của bạn nhập sai!");
                return res.redirect("/dang-nhap");
            } else {
                req.flash("msg", "Tài khoản của bạn không tồn tại!");
                return res.redirect("/dang-nhap");
            }
        }
    },

    handleLogout: (req, res) => {
        req.session.login = false;
        req.flash("success", "Đăng xuất thành công");
        res.redirect("/dang-nhap");
    },
};
