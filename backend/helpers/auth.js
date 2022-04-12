const Users = require("../models/Users");
const decodeToken = require("./decode-token");

const auth = async (req) => {
    var currentUser = null;        

    if (req.headers.authorization) {
        const token = decodeToken(req);
        const user = await Users.findByPk(token.id);

        currentUser = {
            id: user.id,
            name: user.name,
            email: user.email,
        }
    }

    return currentUser;
}

module.exports = auth;