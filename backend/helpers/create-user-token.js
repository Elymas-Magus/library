const jwt = require('jsonwebtoken');

const createUserToken = (user, req, res) => {
    const token = jwt.sign(
        {
            name: user.name,
            id: user.id
        },
        process.env.SECRET_KEY,
        {
            expiresIn: 3600,
        }
    );

    res.status(200).json({
        message: 'Autenticado com sucesso!',
        token: token,
        _id: user.id,
    })
}

module.exports = createUserToken;