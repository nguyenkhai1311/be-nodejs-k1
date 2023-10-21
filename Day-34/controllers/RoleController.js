const model = require("../models/index");
const permissionUtil = require("../utils/permission");

const { getPermission } = require("../utils/permission");
const permissionUser = require("../utils/permissionUser");
const Role = model.Role;
const Permission = model.Permission;

module.exports = {
    index: async (req, res) => {
        const roles = await Role.findAll();
        const permissions = await permissionUser(req);
        res.render("roles/index", { roles, permissions, getPermission });
    },

    add: async (req, res) => {
        const permissions = await permissionUser(req);
        res.render("roles/add", { permissions, getPermission });
    },

    handleAdd: async (req, res) => {
        const { name, permission } = req.body;
        const role = await Role.create({ name });
        if (permission) {
            let dataPermission = [];
            if (typeof permission === "string") {
                dataPermission.push({
                    value: permission,
                });
            } else {
                dataPermission = permission.map((item) => ({ value: item }));
            }
            dataPermission.forEach(async (item) => {
                const permissionInstance = await Permission.findOne({
                    where: item,
                });
                if (!permissionInstance) {
                    await role.createPermission(item);
                } else {
                    await role.addPermission(permissionInstance);
                }
            });
        }
        res.redirect("/roles");
    },

    edit: async (req, res) => {
        const { id } = req.params;
        const role = await Role.findOne({
            where: {
                id,
            },
            include: {
                model: Permission,
            },
        });
        const roles = await Role.findAll();

        const { Permissions: permissions } = role;

        res.render("roles/edit", {
            role,
            roles,
            permissions,
            permissionUtil,
        });
    },

    handleEdit: async (req, res) => {
        const { id } = req.params;
        const { name, permission } = req.body;

        // Cập nhập bảng role
        await Role.update(
            { name },
            {
                where: { id },
            }
        );

        const role = await Role.findOne({
            where: {
                id,
            },
        });

        if (permission) {
            let dataPermission = [];
            if (typeof permission === "string") {
                dataPermission.push({
                    value: permission,
                });
            } else {
                dataPermission = permission.map((item) => ({ value: item }));
            }

            dataPermission.forEach(async (item) => {
                const permissionInstance = await Permission.findOne({
                    where: item,
                });

                if (!permissionInstance) {
                    await role.createPermission(item);
                }
            });

            const permissionsUpdate = await Promise.all(
                dataPermission.map((item) =>
                    Permission.findOne({
                        where: item,
                    })
                )
            );

            role.setPermissions(permissionsUpdate);
        } else {
            role.setPermissions(permission);
        }

        res.redirect("/roles/edit/" + id);
    },

    delete: async (req, res) => {
        const { id } = req.params;
        // Lấy role cần xóa
        const role = await Role.findOne({
            where: {
                id,
            },
        });

        // Xóa tất cả Permission liên quan đến Role cần xóa
        role.removePermissions(await Permission.findAll());

        await Role.destroy({
            where: {
                id,
            },
        });

        res.redirect("/roles");
    },
};
