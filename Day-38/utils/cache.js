const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

module.exports = {
    save: (res, data) => {
        const idFile = uuidv4();
        const cacheFile = {
            data: data,
            id_file: idFile,
        };
        try {
            res.cookie("data", idFile, { maxAge: 900000, httpOnly: true });
            fs.writeFileSync(
                `./cache/${idFile}.json`,
                JSON.stringify(cacheFile)
            );
        } catch (e) {
            console.log(e.message);
        }
    },
};
