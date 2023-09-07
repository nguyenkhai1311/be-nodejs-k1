const fs = require("fs");
const url = require("url");

class Base {
    render = (req, res, path, data = {}) => {
        if (req.method === "POST") {
            fs.readFile(`./views/${path}.html`, "utf-8", (err, viewContent) => {
                viewContent = viewContent
                    .replaceAll("number-phone", data["old.number"])
                    .replace("error.otp", data["error.otp"]);
                const result = viewContent.match(/{.+?}/g);
                if (result?.length) {
                    for (let i = 0; i < result.length; i++) {
                        const item = result[i];
                        const itemKey = item
                            .replaceAll("{", "")
                            .replaceAll("}", "");
                        viewContent = viewContent.replace(
                            item,
                            data[itemKey] ?? ""
                        );
                    }
                }
                res.end(viewContent);
            });
        } else if (req.method === "GET") {
            fs.readFile(`./views/${path}.html`, "utf-8", (err, viewContent) => {
                const result = viewContent.match(/{.+?}/g);
                if (result?.length) {
                    for (let i = 0; i < result.length; i++) {
                        const item = result[i];
                        const itemKey = item
                            .replaceAll("{", "")
                            .replaceAll("}", "");
                        viewContent = viewContent.replace(
                            item,
                            data[itemKey] ?? ""
                        );
                    }
                }
                res.end(viewContent);
            });
        }
    };
}

module.exports = Base;
