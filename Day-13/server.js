const http = require("http");
const Home = require("./module/Home");

const hostname = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    let path = req.url;

    if (path === "/") {
        Home.index(req, res);
    } else if (path === "/assets/style.css") {
        res.setHeader("Content-Type", "text/css");
        Home.style(req, res);
    } else {
        res.end();
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
