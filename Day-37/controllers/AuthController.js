const bcrypt = require("bcrypt");

const jwt = require("../utils/jwt");
const formatDate = require("../utils/formatDate");
const model = require("../models/index");
const User = model.User;
const BlackList = model.BlackList;

module.exports = {
    login: async (req, res) => {
        const { email, password } = req.body;
        console.log(email, password);
        const user = await User.findOne({
            where: {
                email,
            },
        });
        if (!user) {
            res.status(400).json({
                status: "error",
                message: "Authentication failed",
            });
            return;
        }
        const { password: hash } = user;
        const status = bcrypt.compareSync(password, hash);
        if (!status) {
            res.status(400).json({
                status: "error",
                message: "Authentication failed",
            });
            return;
        }
        const token = jwt.createToken({ userId: user.id });
        const refreshToken = jwt.createRefresh();
        // Lưu refreshToken vào database
        const updateStatus = await User.update(
            {
                refresh_token: refreshToken,
            },
            {
                where: { id: user.id },
            }
        );
        if (!updateStatus) {
            res.json({
                status: "error",
                message: "Server Error",
            });
            return;
        }
        res.json({
            status: "success",
            accessToken: token,
            refreshToken: refreshToken,
        });
    },

    profile: async (req, res) => {
        const authorization = req.headers["authorization"];
        const token = authorization.replace("Bearer", "").trim();
        const tokenBlackList = await BlackList.findOne({
            where: {
                token,
            },
        });
        if (tokenBlackList) {
            res.status(401).json({
                status: "error",
                message: "Unauthorize",
            });
            return;
        }

        try {
            const decoded = jwt.decode(token);
            if (decoded) {
                const { userId } = decoded.data;
                const user = await User.findByPk(userId, {
                    attributes: [
                        "id",
                        "name",
                        "email",
                        "createdAt",
                        "updatedAt",
                    ],
                });
                if (!user) {
                    res.json({
                        status: "error",
                        message: "User not exists",
                    });
                    return;
                }
                res.json({ user });
            }
        } catch (e) {
            res.status(401).json({
                status: "error",
                message: "Unauthorize",
            });
            return;
        }
    },

    refresh: async (req, res) => {
        // Nhận: refresh
        const { refreshToken } = req.body;
        if (!refreshToken) {
            res.status(400).json({
                status: "error",
                message: "refreshToken required",
            });
            return;
        }

        try {
            const decoded = jwt.decode(refreshToken);
            if (decoded) {
                const user = await User.findOne({
                    where: {
                        refresh_token: refreshToken,
                    },
                });
                if (!user) {
                    res.json({
                        status: "error",
                        message: "Unauthorize",
                    });
                    return;
                }
                const token = jwt.createToken({ userId: user.id });
                const refreshTokenNew = jwt.createRefresh();
                const updateStatus = await User.update(
                    {
                        refresh_token: refreshToken,
                    },
                    {
                        where: { id: user.id },
                    }
                );
                if (!updateStatus) {
                    res.status(500).json({
                        status: "error",
                        message: "",
                    });
                }
                res.status(200).json({
                    status: "success",
                    token,
                    refreshTokenNew,
                });
            }
        } catch (e) {
            console.log(e.message);
            res.status(400).json({ status: "error" });
        }
    },

    logout: async (req, res) => {
        const authorization = req.headers["authorization"];
        const token = authorization.replace("Bearer", "").trim();

        try {
            const decoded = jwt.decode(token);
            if (decoded) {
                const date = new Date(decoded.exp * 1000);
                const expire = formatDate.formatDate(date);
                await BlackList.create({
                    token,
                    expire,
                });
                res.json({ status: "success", message: "Logout success" });
            }
        } catch (e) {
            res.status(401).json({
                status: "error",
                message: e.message,
            });
            return;
        }
    },
};
