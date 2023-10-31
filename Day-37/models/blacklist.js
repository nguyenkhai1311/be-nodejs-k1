"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class BlackList extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    BlackList.init(
        {
            id: {
                type: DataTypes.STRING,
                autoIncrement: true,
                primaryKey: true,
            },
            token: DataTypes.STRING,
            expire: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "BlackList",
        }
    );
    return BlackList;
};
