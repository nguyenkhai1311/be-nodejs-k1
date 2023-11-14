module.exports = {
    status: async (req, res) => {
        if (req.user) {
            console.log(req.user);
            res.json({
                status: "success",
                user: req.user,
            });
            return;
        }
        res.status(401).json({
            status: "error",
            message: "Unauthorize",
        });
    },

    logout: (req, res) => {
        req.logout((err) => {
            if (err) {
                return next(err);
            }
            if (req.query.redirect) {
                console.log(req.query.redirect);
                return res.redirect(req.query.redirect);
            }
            res.redirect("/");
        });
    },
};
