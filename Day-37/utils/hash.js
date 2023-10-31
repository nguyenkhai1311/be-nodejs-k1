const bcrypt = require("bcrypt");
const saltRound = 10;

module.exports = {
    make: (password) => {
        const hash = bcrypt.hashSync(password, saltRound);
        return hash;
    },
};
