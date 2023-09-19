const { check } = require("express-validator");

const Customer = require("../models/Customer");

module.exports = () => {
    return [
        check("name", "Tên bắt buộc phải nhập").notEmpty(),
        check("name", "Tên phải từ 5 ký tự trở lên").isLength({ min: 5 }),
        check("password", "Mật khẩu bắt buộc phải nhập").notEmpty(),
        check("password", "Mật khẩu không đủ mạnh").isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 0,
            minNumbers: 1,
            minSymbols: 0,
        }),
        check("province_id").custom(async (provinceValue) => {
            // Truy vấn dữ liệu database
            if (Number(provinceValue) === 0) {
                throw new Error("Vui lòng chọn tỉnh thành");
            }
        }),
    ];
};
