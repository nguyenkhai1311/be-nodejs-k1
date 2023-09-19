const moment = require("moment");
const { Op } = require("sequelize");
const { PER_PAGE } = process.env;
const { validationResult } = require("express-validator");
const md5 = require("md5");

const Customer = require("../models/Customer");
const Province = require("../models/Province");
const { getPaginateUrl } = require("../utils/url");
const validate = require("../utils/validate");

module.exports = {
    // Get lists
    index: async (req, res) => {
        const sequelize = await require("../utils/db");
        await sequelize.query("SET FOREIGN_KEY_CHECKS=1;");
        const { keyword, status } = req.query;
        const customer = await Customer;
        const filters = {};
        if (status === "active" || status === "inactive") {
            filters.status = status === "active" ? 1 : 0;
        }
        if (keyword) {
            filters[Op.or] = [
                {
                    name: {
                        [Op.like]: `%${keyword}%`,
                    },
                },
                {
                    email: {
                        [Op.like]: `%${keyword}%`,
                    },
                },
            ];
        }
        // Lấy tổng số bản ghi
        const totalCountObj = await customer.findAndCountAll({
            where: filters,
        });
        const totalCount = totalCountObj.count;
        // Lấy tổng số trang
        const totalPage = Math.ceil(totalCount / PER_PAGE);
        // Lấy trang hiện tại
        let { page } = req.query;
        if (!page || page < 1 || page > totalPage) {
            page = 1;
        }

        // Tính offset
        const offset = (page - 1) * PER_PAGE;

        const customerList = await customer.findAll({
            // attributes: ["id", "name", "email", "status"],
            order: [["name", "DESC"]],
            where: filters,
            limit: +PER_PAGE,
            offset: offset,
        });

        const msg = req.flash("msg");

        res.render("customers/index", {
            customerList,
            moment,
            req,
            totalPage,
            page,
            getPaginateUrl,
            msg,
        });
    },

    // Get form create
    create: async (req, res) => {
        const province = await Province;
        const provinceList = await province.findAll();
        const msg = req.flash("msg");
        const errors = req.flash("errors");
        console.log(validate.getError(errors, "name"));
        res.render("customers/create", { provinceList, msg, errors, validate });
    },

    // Post Create
    store: async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            // Không có lỗi
            // console.log("Không có lỗi");
            const customer = await Customer;
            req.body.password = md5(req.body.password);
            customer.create(req.body);
            req.flash("msg", "Thêm khách hàng thành công");
            res.redirect("/customers");
        } else {
            req.flash("errors", errors.array());
            req.flash("msg", "Vui lòng nhập đầy đủ thông tin");
            res.redirect("/customers/create");
        }
    },

    // Get form update
    update: async (req, res) => {
        const customerId = req.path.split("/").splice(-1).toString();
        const province = await Province;
        const provinceList = await province.findAll();
        const customer = await Customer;
        const msg = req.flash("msg");
        const errors = req.flash("errors");
        const success = req.flash("success");
        const infoCustomer = await customer.findOne({
            where: {
                id: customerId,
            },
        });
        console.log(validate.getError(errors, "name"));
        res.render("customers/update", {
            provinceList,
            infoCustomer,
            msg,
            success,
            validate,
            errors,
        });
    },

    // Post Update
    handleUpdate: async (req, res) => {
        const errors = validationResult(req);
        const customerId = req.path.split("/").splice(-1).toString();
        if (errors.isEmpty()) {
            const customer = await Customer;
            const infoCustomer = await customer.findOne({
                where: {
                    id: customerId,
                },
            });
            console.log(
                req.body.province_id === infoCustomer.dataValues.province_id
            );
            if (
                req.body.name === infoCustomer.dataValues.name &&
                req.body.password === infoCustomer.dataValues.password &&
                req.body.email === infoCustomer.dataValues.email &&
                req.body.status === infoCustomer.dataValues.status.toString() &&
                req.body.province_id ===
                    infoCustomer.dataValues.province_id.toString()
            ) {
                req.flash("msg", "Vui lòng chọn trường để cập nhập");
                res.redirect(`/customers/update/${customerId}`);
            } else {
                req.body.password = md5(req.body.password);
                customer.update(req.body, {
                    where: {
                        id: customerId,
                    },
                });
                req.flash("success", "Cập nhập thành công");
                res.redirect(`/customers/update/${customerId}`);
            }
        } else {
            req.flash("errors", errors.array());
            req.flash("msg", "Vui lòng nhập đầy đủ thông tin");
            res.redirect(`/customers/update/${customerId}`);
        }
    },

    // Post Delete
    delete: async (req, res) => {
        const sequelize = await require("../utils/db");
        const customerId = req.path.split("/").splice(-1).toString();
        const customer = await Customer;
        await sequelize.query("SET FOREIGN_KEY_CHECKS=0;");
        customer.destroy({
            where: {
                id: customerId,
            },
        });
        req.flash("msg", "Xóa khách hàng thành công");
        res.redirect("/customers");
    },
};
