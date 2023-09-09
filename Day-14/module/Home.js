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
            req.on("data", (buffer) => {
                const body = buffer.toString();
                const errors = {};
                let numberPhone = "";
                if (body) {
                    const bodyObj = new URLSearchParams(body);
                    numberPhone = bodyObj.get("numberPhone");
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
            req.on("data", (chunk) => {
                const body = chunk.toString();
                const bodyObj = new URLSearchParams(body);
                const numberOne = bodyObj.get("numberOne");
                const numberTwo = bodyObj.get("numberTwo");
                const numberThree = bodyObj.get("numberThree");
                const numberFour = bodyObj.get("numberFour");
                let number = `${numberOne}${numberTwo}${numberThree}${numberFour}`;
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
