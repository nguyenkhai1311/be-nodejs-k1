const model = require("../models/index");
const BlackList = model.BlackList;

module.exports = {
    update: async () => {
        const blacklists = await BlackList.findAll();
        blacklists.forEach(async ({ token, expire }) => {
            const timeNow = new Date().getTime();
            if (expire.getTime() <= timeNow) {
                const status = await BlackList.destroy({
                    where: {
                        token,
                    },
                });
                console.log(status);
            }
        });
    },
};
