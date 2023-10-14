const model = require("../models/index");
const User = model.User;
module.exports = {
    index: async (req, res) => {
        const users = await User.findAll();
        res.render("users/index", { users });
    },
    permission: (req, res) => {
        res.render("users/permission");
    },
};
