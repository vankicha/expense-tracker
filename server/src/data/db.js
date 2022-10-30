const Sequelize = require('sequelize');

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = require('../config/config');

const sequelizeOptions = {
    dialect: 'mysql',
    dialectOptions: { decimalNumbers: true },
    logging: false,
    host: DB_HOST,
    port: DB_PORT,
};

const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, sequelizeOptions);

db.User = require('../models/User')(db);
db.Transaction = require('../models/Transaction')(db);

db.User.hasMany(db.Transaction);
db.Transaction.belongsTo(db.User);

module.exports = db;
