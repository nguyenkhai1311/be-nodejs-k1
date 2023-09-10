const http = require("http");
let url = require("url");
const fs = require("fs");
const Home = require("./module/Home");
const Session = require("./core/Session");

const hostname = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
    const session = new Session(req, res);
    session.start();

    req.session = {
        get: session.get,
        put: session.put,
        remove: session.remove,
        destroy: session.destroy,
    };

    res.statusCode = 200; // Status
    res.setHeader("Content-Type", "text/html; charset=utf-8");

    url = url.parse(req.url);
    const pathname = url.pathname;

    // Đọc file tĩnh
    if (pathname.indexOf("public") !== -1) {
        const ext = pathname.split(".").slice(-1).join();

        const contentTypes = {
            css: "text/css",
            js: "text/javascript",
            jpg: "image/jpeg",
            png: "image/png",
        };

        res.setHeader("Content-Type", contentTypes[ext]);

        if (contentTypes[ext]) {
            fs.readFile("." + req.url, (err, content) => {
                res.end(content);
            });
        } else {
            fs.readFile("." + req.url, "utf8", (err, content) => {
                if (err?.errno === -4058) {
                    res.statusCode(404);
                    res.end();
                }
                res.end(content);
            });
        }
    }

    if (pathname === "/") {
        Home.index(req, res);
    } else if (pathname === "/tutorial") {
        Home.tutorial(req, res);
    } else if (pathname === "/home") {
        if (req.method === "POST") {
            Home.add(req, res);
        } else {
            Home.home(req, res);
        }
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
