const { v4: uuidv4 } = require("uuid");
const cookie = require("cookie");
const fs = require("fs");

class Session {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.pathSession = "./logs/sessions";
        const cookieHeader = this.req.headers.cookie;
        this.cookies = cookie.parse(cookieHeader ?? "");
    }

    start = () => {
        const sessionId = uuidv4();
        if (!this.cookies.sessionId) {
            fs.writeFileSync(this.pathSession + "/" + sessionId, "");
            this.res.setHeader("Set-Cookie", "sessionId=" + sessionId);
        } else {
            if (
                !fs.existsSync(this.pathSession + "/" + this.cookies.sessionId)
            ) {
                fs.writeFileSync(
                    this.pathSession + "/" + this.cookies.sessionId,
                    ""
                );
            }
        }
    };

    put = (key, value) => {
        if (this.cookies.sessionId) {
            const session = fs
                .readFileSync(this.pathSession + "/" + this.cookies.sessionId)
                .toString();
            let data;
            if (session) {
                data = JSON.parse(session);
            } else {
                data = {};
            }
            data[key] = value;

            fs.writeFileSync(
                this.pathSession + "/" + this.cookies.sessionId,
                JSON.stringify(data)
            );
        }
    };

    get = (key = null) => {
        if (this.cookies.sessionId) {
            const session = fs
                .readFileSync(this.pathSession + "/" + this.cookies.sessionId)
                .toString();
            if (session) {
                const data = JSON.parse(session);
                if (key) {
                    return data[key];
                } else {
                    return data;
                }
            }
        }
        return null;
    };

    remove = (key = null) => {
        if (this.cookies.sessionId) {
            const session = fs
                .readFileSync(this.pathSession + "/" + this.cookies.sessionId)
                .toString();
            if (session) {
                let data = JSON.parse(session);

                if (key) {
                    delete data[key];
                } else {
                    data = {};
                }

                fs.writeFileSync(
                    this.pathSession + "/" + this.cookies.sessionId,
                    JSON.stringify(data)
                );
            }
        }
    };

    destroy = () => {
        if (this.cookies.sessionId) {
            fs.unlinkSync(this.pathSession + "/" + this.cookies.sessionId);
        }
        this.cookies.sessionId = null;
        this.start();
    };
}

module.exports = Session;
