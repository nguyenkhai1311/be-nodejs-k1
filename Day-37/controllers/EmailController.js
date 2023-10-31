const SendEmail = require("../jobs/SendEmail");
const Event = require("../core/Event");

module.exports = {
    index: (req, res) => {
        res.render("emails/send");
    },

    send: (req, res) => {
        const emails = [
            { name: "Khải", email: "nguyenhuukhai1303@gmail.com" },
            { name: "Nguyễn Khải", email: "nguyenhuukhai1303@gmail.com" },
        ];
        emails.forEach(({ name, email }) => {
            new Event(new SendEmail({ name, email }));
        });

        res.send("<h1>Gửi email thành công</h1>");
    },
};
