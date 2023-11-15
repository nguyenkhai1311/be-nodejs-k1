const nodemailer = require("nodemailer");
const md5 = require("md5");
const model = require("../models/index");
const LoginToken = model.LoginToken;
const User = model.User;

module.exports = {
    login: (req, res) => {
        const { redirect } = req.query;
        res.render("auth/login", { redirect });
    },

    handleLogin: async (req, res) => {
        const { email } = req.body;
        const codeVerification = Math.floor(Math.random() * 9000) + 1000;
        req.flash("code", codeVerification);

        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: process.env.MAIL_SECURE,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        const info = await transporter.sendMail({
            from: process.env.MAIL_USERNAME,
            to: email,
            subject: "Mã xác minh để đăng nhập",
            html: `<b>Mã xác minh của bạn là: ${codeVerification}</b>`,
        });
        if (req.query.redirect) {
            res.redirect("/auth/redirect?url=" + req.query.redirect);
            return;
        }

        res.redirect("/auth/identify");
    },

    redirect: (req, res) => {
        return res.redirect(req.query.url);
    },

    identify: (req, res) => {
        const linkRedirect = req.query.current;
        res.render("auth/identify", { linkRedirect });
    },

    verify: async (req, res) => {
        const codeVerification = req.flash("code");
        const { numberOne, numberTwo, numberThree, numberFour } = req.body;
        const number = `${numberOne}${numberTwo}${numberThree}${numberFour}`;
        if (Number(number) === codeVerification[0]) {
            const { id } = req.user;
            const token = md5(new Date() + Math.random());
            const tokenUser = await LoginToken.findOne({
                where: {
                    user_id: id,
                },
            });

            if (tokenUser) {
                await LoginToken.destroy({
                    where: {
                        user_id: id,
                    },
                });
            }
            await LoginToken.create({
                user_id: id,
                token: token,
            });
            res.cookie("token", token, {
                maxAge: 900000,
                httpOnly: true,
            });
            const cookie = req.cookies["connect.sid"];
            if (req.query.current) {
                res.redirect(req.query.current + `?cookie=${cookie}`);
                return;
            }

            res.redirect("/");
            return;
        }
        res.redirect("/auth/login");
    },

    logout: async (req, res) => {
        req.logout(async function (err) {
            if (err) {
                return next(err);
            }

            res.redirect("/auth/login");
            return;
        });
    },
};
