const moment = require("moment");
const { Op } = require("sequelize");
const { PER_PAGE } = process.env;
const { validationResult } = require("express-validator");
const md5 = require("md5");
const createError = require("http-errors");

const models = require("../models");
const { getPaginateUrl } = require("../utils/url");
const validate = require("../utils/validate");
const Customer = models.customer;

module.exports = {
    // Get lists
    index: async (req, res) => {
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
            order: [["name", "ASC"]],
            where: filters,
            limit: +PER_PAGE,
            offset: offset,
        });

        const msg = req.flash("msg");
        const success = req.flash("success");

        res.render("customers/index", {
            customerList,
            moment,
            req,
            totalPage,
            page,
            getPaginateUrl,
            msg,
            success,
        });
    },

    // Get form
    create: async (req, res) => {
        const msg = req.flash("msg");
        const errors = req.flash("errors");
        console.log(validate.getError(errors, "name"));
        res.render("customers/create", { msg, errors, validate });
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
            req.flash("success", "Thêm khách hàng thành công");
            res.redirect("/customers");
        } else {
            req.flash("errors", errors.array());
            req.flash("msg", "Vui lòng nhập đầy đủ thông tin");
            res.redirect("/customers/create");
        }
    },

    edit: async (req, res, next) => {
        console.log(req.query);
        const { id } = req.params;
        const customer = await Customer;
        const customerDetail = await customer.findByPk(id);
        if (!customerDetail) {
            next(createError(404));
            return;
        }
        const msg = req.flash("msg");
        const errors = req.flash("errors");
        const success = req.flash("success");
        res.render("customers/edit", {
            customerDetail,
            msg,
            errors,
            validate,
            success,
        });
    },

    update: async (req, res) => {
        const { id } = req.params;
        const customer = await Customer;
        const customerDetail = await customer.findByPk(id);
        if (!customerDetail) {
            // Xử lý lỗi
            next(createError(404));
            return;
        }

        // Xử lý update
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const customerData = req.body;
            if (customerData.password) {
                customerData.password = md5(customerData.password);
            } else {
                delete customerData.password;
            }
            console.log(customerData);
            customer.update(customerData, {
                where: {
                    id: id,
                },
            });
            req.flash("success", "Cập nhập thành công");
        } else {
            req.flash("errors", errors.array());
            req.flash("msg", "Vui lòng nhập đầy đủ thông tin");
        }
        res.redirect("/customers/edit/" + id);
    },

    destroy: async (req, res) => {
        const { id } = req.params;
        console.log(id);
        const customer = await Customer;
        customer.destroy({
            where: {
                id: id,
            },
            force: true, // Xóa vĩnh viễn
        });
        req.flash("success", "Xóa thành công");
        res.redirect("/customers");
    },

    destroyMultiple: async (req, res) => {
        const { checkDelete } = req.body;
        const customer = await Customer;
        if (checkDelete) {
            const checkList = Array(checkDelete);
            for (let i = 0; i < checkList.length; i++) {
                customer.destroy({
                    where: {
                        id: checkList[i],
                    },
                    force: true,
                });
            }
            req.flash("success", "Xóa thành công");
            res.redirect("/customers");
        } else {
            req.flash("msg", "Bạn hãy chọn tích vào ô muốn xóa");
            res.redirect("/customers");
        }
    },
};
