"use strict";

const md5 = require("md5");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert("users", [
            {
                name: "Admin",
                email: "admin@gmail.com",
                password: md5("Kh@i123456"),
                role: 1,
                status: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Nguyễn Khải",
                email: "nguyenkhai@gmail.com",
                password: md5("Kh@i123456"),
                role: 0,
                status: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Nguyễn Văn A",
                email: "nguyena@gmail.com",
                password: md5("Kh@i123456"),
                role: 0,
                status: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Nguyễn B",
                email: "nguyenb@gmail.com",
                password: md5("Kh@i123456"),
                role: 0,
                status: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Nguyễn C",
                email: "nguyenc@gmail.com",
                password: md5("Kh@i123456"),
                role: 0,
                status: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("users", null, {});
    },
};
