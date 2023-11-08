module.exports = {
    login: async (req, res) => {
        res.render("auth/login");
    },

    index: (req, res) => {
        res.render("index");
    },
};
