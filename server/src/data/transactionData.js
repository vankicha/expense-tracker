const sequelize = require('sequelize');

const db = require('./db');

const getUserTransactions = (userId, offset, limit, order) =>
    db.Transaction.findAll({
        raw: true,
        where: { userId },
        offset,
        limit,
        order,
    });

const getUserAllTransactionsCount = (userId) =>
    db.Transaction.count({
        where: { userId },
    });

const createTransaction = (transactionRecord) => db.Transaction.create(transactionRecord);

const updateTransaction = async (transactionId, transactionRecord) => {
    await db.Transaction.update(transactionRecord, {
        where: { id: transactionId },
    });

    const result = await db.Transaction.findByPk(transactionId);

    return result;
};

const deleteTransaction = (transactionId) =>
    db.Transaction.destroy({
        where: { id: transactionId },
    });

const getUserIncomeOutcome = (userId) =>
    db.Transaction.findAll({
        raw: true,
        where: { userId },
        attributes: ['type', [sequelize.fn('sum', sequelize.col('amount')), 'totalAmount']],
        group: ['type'],
    });

module.exports = {
    getUserTransactions,
    getUserAllTransactionsCount,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getUserIncomeOutcome,
};
