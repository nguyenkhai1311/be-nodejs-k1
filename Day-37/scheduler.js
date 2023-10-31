var cron = require("node-cron");
const updateBlackList = require("./utils/updateBlackList");
const SendEmail = require("./jobs/SendEmail");

cron.schedule("*/20 * * * * *", () => {
    console.log("running a task every minute");
    updateBlackList.update();
    new SendEmail().handle();
});
