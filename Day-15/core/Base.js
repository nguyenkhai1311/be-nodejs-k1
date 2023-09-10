const fs = require("fs");
const cookie = require("cookie");

class Base {
    render = (req, res, path, data = {}) => {
        if (req.method === "GET") {
            fs.readFile(`./views/${path}.html`, "utf8", (err, viewContent) => {
                res.end(viewContent);
            });
        } else {
            const cookieHeader = req.headers.cookie;
            this.cookies = cookie.parse(cookieHeader ?? "");
            fs.readFile(`./views/${path}.html`, "utf8", (err, viewContent) => {
                const result = `<tr>
                <th>${data.id}</th>
                <th>${data.title}</th>
                <th>${data.complete}</th>
                </tr>`;
                const position = viewContent.indexOf("</tbody>");
                console.log(position);
                const firstContent = viewContent.slice(0, position);
                viewContent = viewContent.slice(position);

                viewContent = firstContent + result + viewContent;
                res.end(viewContent);
            });
        }
    };
}

module.exports = Base;
