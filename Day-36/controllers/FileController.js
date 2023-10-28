const fs = require("fs");

const model = require("../models/index");
const File = model.File;

module.exports = {
    upload: async (req, res) => {
        const data_link = [];
        const user = req.flash("user");
        if (req.files) {
            for (let i = 0; i < req.files.length; i++) {
                const filename = req.files[i].filename;
                console.log(req.files);

                const file = await File.create({
                    name: filename,
                    link: `http://localhost:3000/files/${filename}`,
                    user_id: user[0].id,
                });
                data_link.push(file);
            }
            res.status(201).json({
                status: "success",
                data: {
                    link: data_link.map(({ link }) => link),
                },
            });
            return;
        }
    },

    getFile: (req, res) => {
        const { id } = req.params;
        fs.readFile(`./uploads/${id}`, function (err, data) {
            if (err) throw err;
            res.end(data);
        });
    },
};
