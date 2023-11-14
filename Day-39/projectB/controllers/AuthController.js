const apiAuth = `http://localhost:3000/api/auth/status`;

module.exports = {
    login: async (req, res) => {
        const currentUrl =
            req.protocol + "://" + req.get("host") + req.baseUrl + req.path;
        console.log(currentUrl);
        let authCode = "";
        if (req.query.cookie) {
            req.session.oauth_code = req.query.cookie;
            authCode = req.session.oauth_code;
        }

        console.log(authCode);
        const response = await fetch(apiAuth, {
            method: "POST",
            headers: {
                Cookie: "connect.sid=" + authCode,
            },
        });
        let msg;
        let user = null;
        await response;
        if (response.ok) {
            const data = await response.json();
            user = data.user;
            msg = `Đã đăng nhập`;
        } else {
            msg = `Chưa đăng nhập`;
        }

        const loginUrl = `http://localhost:3000/auth/login?redirect=${currentUrl}`;
        const logoutUrl = `http://localhost:3000/api/auth/logout?redirect=${currentUrl}`;
        res.render("auth/login", { msg, user, loginUrl, logoutUrl });
    },

    index: async (req, res) => {
        res.render("index");
    },
};
