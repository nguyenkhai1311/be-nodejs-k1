const { nanoid } = require("nanoid");
const model = require("../models/index");
const Link = model.Link;

module.exports = {
    index: async (req, res) => {
        const links = await Link.findAll();
        const short_url = req.flash("short_url");
        const url = req.flash("url");
        res.render("links/index", { links, short_url, url });
    },

    create: async (req, res) => {
        const { url } = req.body;
        const short_url = nanoid();
        await Link.create({
            name: url,
            short_url,
        });
        req.flash("url", url);
        req.flash("short_url", short_url);
        res.redirect("/links");
    },

    getLink: async (req, res) => {
        const { id } = req.params;
        const link = await Link.findOne({
            where: {
                short_url: id,
            },
        });
        const url = link.dataValues.name;
        if (url.includes("http")) {
            res.redirect(`${link.dataValues.name}`);
        } else {
            res.redirect(`http://${link.dataValues.name}`);
        }
    },

    manager: async (req, res) => {
        const links = await Link.findAll();
        res.render("links/manager", { links });
    },

    edit: async (req, res) => {
        const { id } = req.params;
        const link = await Link.findOne({
            where: { id },
        });
        res.render("links/update", { link });
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { url, short_url } = req.body;

        await Link.update(
            {
                name: url,
                short_url,
            },
            {
                where: { id },
            }
        );
        res.redirect("/links/update/" + id);
    },

    delete: async (req, res) => {
        const { id } = req.params;
        await Link.destroy({
            where: {
                id,
            },
        });
        res.redirect("/links/manager");
    },
};
