const Sequelize = require('sequelize');

module.exports = (db) => {
    return db.define('transaction', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        amount: Sequelize.DECIMAL(11, 2),
        date: Sequelize.DATE,
        type: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });
};
