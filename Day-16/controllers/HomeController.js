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

    handleLogin: (req, res) => {
        const emailUser = "admin@gmail.com";
        const passwordUser = "123456";

        const { email, password } = req.body;

        if (email === emailUser && password === passwordUser) {
            // Set session
            req.session.login = true;
            res.redirect("/");
        } else if (email === "" && password === "") {
            // Set session
            req.session.login = false;
            req.flash("msg", "Vui lòng nhập đầy đủ thông tin");

            console.log(req.flash("msg"));
            res.redirect("/dang-nhap");
        } else {
            req.session.login = false;
            req.flash("msg", "Email hoặc mật khẩu không chính xác");
            res.redirect("/dang-nhap");
        }
    },

    handleLogout: (req, res) => {
        req.session.login = false;
        req.flash("success", "Đăng xuất thành công");
        res.redirect("/dang-nhap");
    },
};
