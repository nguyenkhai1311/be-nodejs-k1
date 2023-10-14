const model = require("../models/index");
const Role = model.Role;
const Permission = model.Permission;

module.exports = {
    index: async (req, res) => {
        const roles = await Role.findAll();
        const permissions = await Permission.findAll();

        res.render("role/index", { roles, permissions });
    },

    create: async (req, res) => {
        const { name_role } = req.body;
        const role = await Role.create({
            name: name_role,
        });
        res.redirect("/role");
    },

    edit: async (req, res) => {
        const { id } = req.params;
        const roles = await Role.findOne({
            where: {
                id,
            },
        });
        const result = await Role.findOne({
            where: { id },
            include: Permission,
        });
        const role = roles.dataValues;
        const permissions = await Permission.findAll();
        const permissions_role = result.dataValues.Permissions;
        // console.log(permissions_role);
        res.render("role/permission", { role, permissions, permissions_role });
    },

    update: async (req, res) => {
        const { id } = req.params;
        const role = await Role.findOne({
            where: {
                id,
            },
            include: Permission,
        });
        const { permission } = req.body;
        const permissions = await Permission.findAll();
        let array = [];
        permissions.forEach(async (value) => {
            array.push(value.dataValues.id);
        });
        await role.removePermission(array);
        await role.addPermission(permission);
        res.redirect(`/role/edit/${id}`);
    },

    destroy: async (req, res) => {
        const { id } = req.params;
        await Role.destroy({
            where: {
                id: id,
            },
            force: true, // Xóa vĩnh viễn
        });
        req.flash("success", "Xóa thành công");
        res.redirect("/role");
    },
};
