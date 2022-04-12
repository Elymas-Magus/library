const jwt = require("jsonwebtoken");
const Users = require("../models/Users");
const getToken = require("../helpers/get-token");

const verifyJwt = (req, res, next) => {
    const token = getToken(req);

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        console.log(err);
        if (err) {
            return res.status(401).json({
                message: 'Acesso negado!'
            });
        }
        
        Users.findByPk(decoded.id)
            .then(user => {
                user.password = undefined;
                req.user = user;

                next();
            });

    })
}

module.exports = verifyJwt;