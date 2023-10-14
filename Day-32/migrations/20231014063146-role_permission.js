"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("role_permission", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            RoleId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: "roles",
                    },
                    key: "id",
                },
            },
            PermissionId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: "permissions",
                    },
                    key: "id",
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("role_permission");
    },
};
