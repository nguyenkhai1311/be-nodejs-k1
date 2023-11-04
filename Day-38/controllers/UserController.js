const moment = require("moment");
const fs = require("fs");

const model = require("../models/index");
const User = model.User;
const cache = require("../utils/cache");

module.exports = {
    index: async (req, res) => {
        let cookie = req.headers["cookie"];

        if (!cookie) {
            const users = await User.findAll({
                attributes: ["id", "name", "email", "createdAt"],
            });
            const data = [];
            users.forEach(({ id, name, email, createdAt }) => {
                data.push({
                    id,
                    name,
                    email,
                    createdAt,
                });
            });
            cache.save(res, data);
            return res.render("users/index", { users, moment });
        }
        cookie = cookie.slice(cookie.indexOf("=") + 1);
        try {
            const fileExists = fs.existsSync(`./cache/${cookie}.json`);
            if (fileExists) {
                fs.readFile(`./cache/${cookie}.json`, (err, data) => {
                    if (err) throw err;
                    const userData = JSON.parse(data.toString());
                    const users = userData.data;
                    return res.render("users/index", { users, moment });
                });
            } else {
                const users = await User.findAll({
                    attributes: ["id", "name", "email", "createdAt"],
                });

                const data = [];
                users.forEach(({ id, name, email, createdAt }) => {
                    data.push({
                        id,
                        name,
                        email,
                        createdAt,
                    });
                });
                cache.save(res, data);
                return res.render("users/index", { users, moment });
            }
        } catch (e) {
            console.log(e.message);
            return;
        }
    },
};
