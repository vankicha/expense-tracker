require('dotenv').config();

const config = {
    development: {
        PORT: process.env.PORT || 5000,
        SALT_ROUNDS: Number(process.env.SALT_ROUNDS),
        SECRET_KEY: process.env.SECRET_KEY,
        JWT_EXPIRATION_TIME: Number(process.env.JWT_EXPIRATION_TIME),
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_NAME: process.env.DB_NAME,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
    },
};

module.exports = config[process.env.NODE_ENV];
