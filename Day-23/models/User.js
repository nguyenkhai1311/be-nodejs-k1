const { DataTypes } = require("sequelize");

const User = async () => {
    const sequelize = await require("../utils/db");
    return sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.NUMBER,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING,
            },
            password: {
                type: DataTypes.STRING,
            },
        },
        {
            timestamps: false,
            tableName: "users",
        }
    );
};

module.exports = User();
