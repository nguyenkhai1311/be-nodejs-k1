const Base = require("../core/Base");

const dataOtp = require("../data/data.json");

class Home extends Base {
    index = (req, res) => {
        const method = req.method;

        if (method === "GET") {
            this.render(req, res, "index", {
                "error.empty": "",
                "error.start": "",
                "error.long": "",
            });
        } else if (method === "POST") {
            console.log(`Đây là POSTTT111`);
            const chunks = [];
            req.on("data", (chunk) => {
                chunks.push(chunk);
            });
            req.on("end", () => {
                const data = Buffer.concat(chunks);
                const body = data.toString();
                console.log(body);
                const errors = {};
                let numberPhone = "";
                if (body) {
                    numberPhone = body.split("=").splice(-1).toString();
                    console.log(numberPhone);
                    dataOtp.focus.phone = numberPhone;
                    console.log(dataOtp.focus.phone);
                    if (numberPhone === "") {
                        errors.empty = "Phone number is required";
                    } else if (numberPhone.charAt(0) !== "0") {
                        errors.start =
                            "There should be a zero at the beginning";
                    } else if (
                        numberPhone.length < 9 ||
                        numberPhone.length > 11
                    ) {
                        errors.long = "Phone number must be 9-11 characters";
                    }
                }
                if (Object.keys(errors).length > 0) {
                    this.render(req, res, "index", {
                        "error.empty": errors.empty ?? "",
                        "error.start": errors.start ?? "",
                        "error.long": errors.long ?? "",
                        "old.number": numberPhone,
                    });
                } else {
                    this.render(req, res, "account", {
                        "old.number": numberPhone,
                        "error.otp": "",
                    });
                }
            });
        }
    };

    account = (req, res) => {
        const method = req.method;
        if (method === "GET") {
            console.log("Đây là GETTT");
            this.render(req, res, "account");
        } else {
            console.log("Đây là POSTTTT");
            const chunks = [];
            req.on("data", (chunk) => {
                chunks.push(chunk);
            });
            req.on("end", () => {
                const data = Buffer.concat(chunks);
                let body = data.toString();
                const keyword = "=";
                let position = body.indexOf(keyword);
                let number = "";
                while (position !== -1) {
                    number += body.slice(position + 1, position + 2);
                    body = body.slice(position + 2);
                    position = body.indexOf(keyword);
                }
                console.log(number);
                const otpLength = dataOtp.otp.length;
                for (let i = 0; i < otpLength; i++) {
                    if (parseInt(number) === parseInt(dataOtp.otp[i])) {
                        console.log("active thành công");
                        return this.render(req, res, "active", {
                            "old.number": dataOtp.focus.phone,
                        });
                    }
                }
                const errors = {};
                errors.otp = "WRONG OTP";
                this.render(req, res, "account", {
                    "error.otp": errors.otp ?? "",
                    "old.number": dataOtp.focus.phone,
                });
            });
        }
    };
}

module.exports = new Home();
