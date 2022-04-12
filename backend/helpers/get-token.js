const getToken = (req) => {
    const authorization = req.headers.authorization;

    if (authorization === undefined || authorization === null) {
        return null;
    }

    const bearerToken = authorization.split(" ");

    return bearerToken[1];
}

module.exports = getToken;