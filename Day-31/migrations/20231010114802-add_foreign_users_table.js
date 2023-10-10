"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addConstraint("users", {
            type: "FOREIGN KEY",
            name: "fk_users_providers",
            fields: ["provider_id"],
            references: {
                table: "providers",
                field: "id",
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeConstraint("users", "fk_users_providers");
    },
};
