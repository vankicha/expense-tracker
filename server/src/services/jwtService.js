const jwt = require('jsonwebtoken');

const { SECRET_KEY, JWT_EXPIRATION_TIME } = require('../config/config');

const signToken = (userId) => {
    const token = jwt.sign({ id: userId }, SECRET_KEY, {
        expiresIn: JWT_EXPIRATION_TIME,
    });

    return token;
};

const verifyToken = (token) =>
    new Promise((resolve, reject) => {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) reject();
            resolve(decoded);
        });
    });

module.exports = {
    signToken,
    verifyToken,
};
