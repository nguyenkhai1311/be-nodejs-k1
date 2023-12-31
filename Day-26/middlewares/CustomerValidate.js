const { check, query } = require("express-validator");
const { Op } = require("sequelize");

const models = require("../models");
const Customer = models.customer;

module.exports = () => {
    // Validate password
    // - Nếu ở trang edit -> Không cần validate password
    // - Nếu ở trang create -> Validate password

    return [
        check("name", "Tên bắt buộc phải nhập").notEmpty(),
        check("name", "Tên phải từ 5 ký tự trở lên").isLength({ min: 5 }),
        check("email", "Email bắt buộc phải nhập").notEmpty(),
        check("email", "Email không đúng định dạng").isEmail(),
        check("email").custom(async (emailValue, { req }) => {
            const { id } = req.params;
            // Truy vấn dữ liệu database
            const customer = await Customer;
            const customerData = await customer.findOne({
                where: {
                    email: emailValue,
                    id: {
                        [Op.not]: id,
                    },
                },
            });
            if (customerData) {
                throw new Error("Email đã tồn tại");
            }
        }),
        check("password").custom(async (value, { req }) => {
            const { id } = req.params;
            if (!id && !value) {
                throw new Error("Mật khẩu bắt buộc phải nhập");
            }
        }),
    ];
};
