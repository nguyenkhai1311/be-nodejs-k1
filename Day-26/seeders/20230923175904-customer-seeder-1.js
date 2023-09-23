"use strict";
const md5 = require("md5");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert("customers", [
            {
                name: "Nguyễn Khải",
                email: "nguyenkhai@gmail.com",
                password: md5("Kh@i123456"),
                status: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            },
            {
                name: "Nguyễn Văn A",
                email: "nguyena@gmail.com",
                password: md5("Kh@i123456"),
                status: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            },
            {
                name: "Nguyễn B",
                email: "nguyenb@gmail.com",
                password: md5("Kh@i123456"),
                status: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            },
            {
                name: "Nguyễn C",
                email: "nguyenc@gmail.com",
                password: md5("Kh@i123456"),
                status: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
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
        await queryInterface.bulkDelete("customers", null, {});
    },
};
