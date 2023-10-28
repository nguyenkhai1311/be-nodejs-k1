const model = require("../models/index");
const User = model.User;
const File = model.File;

module.exports = {
    index: async (req, res) => {
        const { id } = req.params;
        const user = await User.findOne({
            where: {
                id,
            },
            include: File,
        });
        if (!user) {
            res.status(400).json({
                status: "error",
                message: "Authentication failed",
            });
            return;
        }
        const files = user.Files;
        const data = files.map(({ name, link }) => {
            return { name, link };
        });
        res.status(200).json({
            status: "success",
            data,
        });
    },
};
