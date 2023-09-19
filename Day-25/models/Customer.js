const { DataTypes } = require("sequelize");

const Customer = async () => {
    const sequelize = await require("../utils/db");

    return sequelize.define(
        "Customer",
        {
            id: {
                type: DataTypes.NUMBER,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING,
            },
            password: {
                type: DataTypes.STRING,
            },
            status: {
                type: DataTypes.NUMBER,
            },
            province_id: {
                type: DataTypes.NUMBER,
            },
        },
        {
            timestamps: false,
            tableName: "customers",
        }
    );
};

module.exports = Customer();
