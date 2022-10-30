const bcrypt = require('bcryptjs');

const userData = require('../data/userData');

const { SALT_ROUNDS } = require('../config/config');

const register = async (userInfo) => {
    const existingUser = await userData.getOneByEmail(userInfo.email);

    if (existingUser) {
        throw new Error();
    }

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(userInfo.password, salt);

    const userRecord = {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        password: hashedPassword,
    };

    return userData.create(userRecord);
};

const login = async (userInfo) => {
    const { password, ...rest } = await userData.getOneByEmail(userInfo.email);

    const isMatch = await bcrypt.compare(userInfo.password, password);

    if (!isMatch) {
        throw new Error();
    }

    return rest;
};

module.exports = {
    register,
    login,
};
