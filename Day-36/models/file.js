"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class File extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            File.belongsTo(models.User, { foreignKey: "user_id" });
        }
    }
    File.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            link: DataTypes.STRING,
            user_id: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "File",
            userId: "user_id",
        }
    );
    return File;
};
