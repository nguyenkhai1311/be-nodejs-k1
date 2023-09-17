const { Sequelize } = require("sequelize");

const { DB_DRIVER, DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: DB_DRIVER,
    port: DB_PORT,
});

module.exports = sequelize;
