const Base = require("../core/Base");

class Home extends Base {
    index = (req, res) => {
        if (req.session.get("login") === true) {
            this.render(req, res, "tutorial");
        } else {
            this.render(req, res, "index");
        }
    };

    tutorial = (req, res) => {
        req.session.put("login", true);
        this.render(req, res, "tutorial");
    };

    home = (req, res) => {
        req.session.put("login", true);
        this.render(req, res, "home");
    };

    add = (req, res) => {
        if (req.method === "POST") {
            req.on("data", (buffer) => {
                const body = buffer.toString();
                console.log(body);
                if (body) {
                    const bodyObj = new URLSearchParams(body);
                    console.log(bodyObj);
                    const title = bodyObj.get("title");
                    let id;
                    if (title !== "") {
                        id = Math.floor(Math.random() * 90000) + 10000;
                    } else {
                        id = `${Math.floor(Math.random() * 100)}-Empty`;
                    }
                    let complete = false;
                    req.session.put("id", id);
                    req.session.put("title", title);
                    req.session.put("status", complete);
                    this.render(req, res, "home", { id, title, complete });
                } else {
                    this.render(req, res, "home");
                }
            });
        }
    };
}

module.exports = new Home();
