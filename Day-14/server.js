const http = require("http");
let url = require("url");
const fs = require("fs");

const Home = require("./module/Home");

const hostname = "localhost";
const port = 3001;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    url = url.parse(req.url);
    const path = req.url;
    console.log(path);
    const pattern = /\/*$/; // regex
    const pathname = url.pathname.replace(pattern, "");
    console.log(pathname);
    // Đọc file tĩnh
    if (pathname.indexOf("public") !== -1) {
        const ext = pathname.split(".").slice(-1).join();
        console.log(ext);
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

    if (path === "/") {
        Home.index(req, res);
    } else if (pathname.startsWith("/account")) {
        Home.account(req, res);
    } else if (pathname.startsWith("/success")) {
        Home.account(req, res);
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
