const jwt = require("jsonwebtoken");

const model = require("../models/index");
const User = model.User;

module.exports = async (req, res, next) => {
    const { JWT_SECRET } = process.env;
    const authorization = req.headers["authorization"];
    if (authorization) {
        const token = authorization.replace("Bearer", "").trim();
        console.log(token);
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            if (decoded) {
                const { userId } = decoded.data;
                const user = await User.findByPk(userId);
                if (!user) {
                    res.json({
                        status: "error",
                        message: "User not exists",
                    });
                    return;
                }
                req.flash("user", user.dataValues);
                next();
            }
        } catch (e) {
            res.status(401).json({
                status: "error",
                message: "Unauthorize",
            });
            return;
        }
    } else {
        res.status(400).json({
            status: "error",
            message: "Authentication failed",
        });
    }
};
