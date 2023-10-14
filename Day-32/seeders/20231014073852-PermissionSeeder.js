"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "permissions",
            [
                {
                    value: "Xem",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    value: "Thêm",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    value: "Sửa",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    value: "Xóa",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("People", null, {});
    },
};
