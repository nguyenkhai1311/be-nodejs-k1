const { DataTypes } = require("sequelize");

const sequelize = require("../utils/db");

const User = sequelize.define(
    "User",
    {
        // Model attributes are defined here
        name: {
            type: DataTypes.STRING(100),
        },
        email: {
            type: DataTypes.STRING(100),
            unique: true,
            // allowNull defaults to true
        },
        password: {
            type: DataTypes.STRING(100),
        },
        status: {
            type: DataTypes.TINYINT(1),
        },
    },
    {
        // Other model options go here
        timestamps: false,
    }
);

module.exports = User;
