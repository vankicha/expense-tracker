const moment = require('moment');

const transactionData = require('../data/transactionData');

const { TRANSACTION_TYPES } = require('../constants/transactions');
const { FULL_MONTH_ONLY } = require('../constants/time');

const getUserTransactions = (userId, offset, limit) => {
    const order = [['date', 'DESC']];

    return transactionData.getUserTransactions(userId, offset, limit, order);
};
const getUserAllTransactionsCount = (userId) => transactionData.getUserAllTransactionsCount(userId);

const createTransaction = (userId, data) => {
    const transactionRecord = {
        ...data,
        date: moment(data.date).utc(),
        amount: Number(data.amount).toFixed(2),
        userId,
    };

    return transactionData.createTransaction(transactionRecord);
};

const updateTransaction = (transactionId, data) => {
    const transactionRecord = {
        ...data,
        date: moment(data.date).utc(),
        amount: Number(data.amount).toFixed(2),
    };

    return transactionData.updateTransaction(transactionId, transactionRecord);
};

const deleteTransaction = (transactionId) => transactionData.deleteTransaction(transactionId);

const getUserIncomeOutcome = async (userId) => {
    const data = await transactionData.getUserIncomeOutcome(userId);

    const incomeTotalAmount = data.find((x) => x.type === TRANSACTION_TYPES.INCOME)?.totalAmount;
    const outcomeTotalAmount = data.find((x) => x.type === TRANSACTION_TYPES.EXPENSE)?.totalAmount;

    return { income: incomeTotalAmount || 0, outcome: outcomeTotalAmount || 0 };
};

const getYearlyUserStatistics = async (userId) => {
    const year = moment().year();
    const transactions = await transactionData
        .getUserTransactions(userId)
        .then((transactions) => transactions.filter((transaction) => moment(transaction.date).year() === year));

    const yearlyIncomeOutcome = transactions.reduce((acc, transaction) => {
        const transactionMonth = moment(transaction.date).format(FULL_MONTH_ONLY);
        const transactionAmount = transaction.amount;
        const isExpense = transaction.type === TRANSACTION_TYPES.EXPENSE;

        let currentMonthData = acc.find((x) => x.month === transactionMonth);
        if (currentMonthData) {
            currentMonthData.income = isExpense ? currentMonthData.income : currentMonthData.income + transactionAmount;
            currentMonthData.outcome = isExpense
                ? currentMonthData.outcome + transactionAmount
                : currentMonthData.outcome;
            currentMonthData.balance = isExpense
                ? currentMonthData.balance - transactionAmount
                : currentMonthData.balance + transactionAmount;
        }

        return acc;
    }, moment.months().map(month => ({ month, income: 0, outcome: 0, balance: 0 })));

    const yearlyBalance = yearlyIncomeOutcome.map((x, index) => {
        const totalBalanceUntilCurrentMonth = yearlyIncomeOutcome
            .slice(0, index + 1)
            .reduce((acc, month) => acc + month.balance, 0);

        return {
            month: x.month,
            balance: totalBalanceUntilCurrentMonth,
        };
    });

    return { yearlyBalance, yearlyIncomeOutcome };
};

module.exports = {
    getUserTransactions,
    getUserAllTransactionsCount,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getUserIncomeOutcome,
    getYearlyUserStatistics,
};
