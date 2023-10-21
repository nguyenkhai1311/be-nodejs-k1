const permissionUser = require("../utils/permissionUser");

module.exports = {
    read: async function (req, res, next) {
        // const permissions = await permissionUser(req);
        // if (!permissions.includes("users.read")) {
        //     res.redirect("/");
        //     return;
        // }
        next();
    },

    add: async function (req, res, next) {
        const permissions = await permissionUser(req);
        if (!permissions.includes("users.add")) {
            res.redirect("/users");
            return;
        }
        next();
    },

    edit: async function (req, res, next) {
        const permissions = await permissionUser(req);
        if (!permissions.includes("users.update")) {
            res.redirect("/users");
            return;
        }
        next();
    },

    delete: async function (req, res, next) {
        const permissions = await permissionUser(req);
        if (!permissions.includes("users.delete")) {
            res.redirect("/users");
            return;
        }
        next();
    },
};
