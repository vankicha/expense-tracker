const db = require('./db');

const create = async (userInfo) => {
    const { id, firstName, lastName, email, createdAt, updatedAt } = await db.User.create(userInfo);

    return {
        id,
        firstName,
        lastName,
        email,
        createdAt,
        updatedAt,
    };
};

const getOneByEmail = (email) => db.User.findOne({ raw: true, where: { email } });

module.exports = {
    create,
    getOneByEmail,
};
