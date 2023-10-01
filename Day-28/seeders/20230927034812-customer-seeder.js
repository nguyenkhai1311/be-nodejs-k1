"use strict";
const md5 = require("md5");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert("customers", [
            {
                name: "Nguyễn A",
                email: "nguyena123@gmail.com",
                password: md5("Kh@i123456"),
                status: 1,
                user_id: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Nguyễn B",
                email: "nguyenb123@gmail.com",
                password: md5("Kh@i123456"),
                status: 0,
                user_id: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Nguyễn Văn C",
                email: "nguyenc123@gmail.com",
                password: md5("Kh@i123456"),
                status: 1,
                user_id: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Nguyễn Văn D",
                email: "nguyend12345@gmail.com",
                password: md5("Kh@i123456"),
                status: 0,
                user_id: 4,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Nguyễn f",
                email: "nguyenf213231@gmail.com",
                password: md5("Kh@i123456"),
                status: 1,
                user_id: 3,
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
        await queryInterface.bulkDelete("customers", null, {});
    },
};
