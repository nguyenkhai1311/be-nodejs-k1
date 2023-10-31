const nodemailer = require("nodemailer");

const model = require("../models/index");
const QueueJob = model.QueueJob;

class SendEmail {
    constructor(job) {
        this.job = job;
    }

    handle = async () => {
        const jobs = await QueueJob.findAll();
        console.log(123);
        // Logic gửi email
        if (jobs) {
            jobs.forEach(async ({ key, value }) => {
                const { name, email } = JSON.parse(value).data.job;
                console.log(name, email);
                const transporter = nodemailer.createTransport({
                    host: process.env.MAIL_HOST,
                    port: process.env.MAIL_PORT,
                    secure: process.env.MAIL_SECURE,
                    auth: {
                        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                        user: process.env.MAIL_USERNAME,
                        pass: process.env.MAIL_PASSWORD,
                    },
                });
                const info = await transporter.sendMail({
                    from: `"Nguyễn Khải 👻" <${process.env.MAIL_USERNAME}>`, // sender address
                    to: email, // list of receivers
                    subject: `Hello ${name}`, // Subject line
                    html: `<b>Xin chào ${name}</b>`, // html body
                });

                const status = await QueueJob.destroy({
                    where: {
                        key,
                    },
                });
                console.log(status);
            });
        }
    };
}

module.exports = SendEmail;
