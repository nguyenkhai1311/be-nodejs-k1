"use strict";
const bcrypt = require("bcrypt");
const saltRound = 10;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const data = [];

        data.push({
            name: `Nguyễn Khải`,
            email: `nguyenhuukhai1303@gmail.com`,
            password: bcrypt.hashSync("123456", saltRound),
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        await queryInterface.bulkInsert("users", data, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("users", null, {});
    },
};
