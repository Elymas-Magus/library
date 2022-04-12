const jwt = require("jsonwebtoken");
const getToken = require("./get-token");

const decodeToken = (req) => {
    const token = getToken(req);
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    return decoded;
}

module.exports = decodeToken;