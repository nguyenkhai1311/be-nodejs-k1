const Base = require("../core/Base");

class Home extends Base {
    index = (req, res) => {
        const title = "F8 - Fullstack";
        const desc = "Học lập trình";
        this.render(req, res, "index", { title, desc });
    };

    style = (req, res) => {
        this.shape(req, res, "style");
    };
}

module.exports = new Home();
