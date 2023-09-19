const connectDb = async () => {
    const { Sequelize } = require("sequelize");

    const { DB_DRIVER, DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT } =
        process.env;

    const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
        host: DB_HOST,
        dialect: DB_DRIVER,
        port: DB_PORT,
    });

    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
        return sequelize;
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

module.exports = connectDb();
