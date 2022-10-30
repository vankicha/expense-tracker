const express = require('express');
const router = express.Router();

const { isUserAuthorised } = require('../middlewares/isUserAuthorised');

const transactionService = require('../services/transactionService');

const errorBuilder = require('../utils/errorBuilder');
const { transactionSchema } = require('../utils/validationSchemas');

const {
    CANNOT_GET_MAIN_INFORMATION,
    CANNOT_GET_YEARLY_STATISTICS,
    CANNOT_GET_TRANSACTIONS,
    CANNOT_CREATE_TRANSACTION,
    CANNOT_UPDATE_TRANSACTION,
    CANNOT_DELETE_TRANSACTION,
} = require('../constants/errors');

const getUserMainInformation = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const { income, outcome } = await transactionService.getUserIncomeOutcome(userId);

        res.json({ income, outcome });
    } catch (error) {
        next(errorBuilder(error).badRequest(CANNOT_GET_MAIN_INFORMATION));
    }
};

const getYearlyUserStatistics = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const result = await transactionService.getYearlyUserStatistics(userId);

        res.json(result);
    } catch (error) {
        next(errorBuilder(error).badRequest(CANNOT_GET_YEARLY_STATISTICS));
    }
};

const getUserTransactions = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const page = Number(req.query.page);
        const limit = Number(req.query.limit);
        const offset = page * limit;

        const transactions = await transactionService.getUserTransactions(userId, offset, limit);
        const totalTransactionsCount = await transactionService.getUserAllTransactionsCount(userId);

        res.json({ transactions, totalTransactionsCount });
    } catch (error) {
        next(errorBuilder(error).badRequest(CANNOT_GET_TRANSACTIONS));
    }
};

const createTransaction = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const data = req.body;

        await transactionSchema.validate(data);

        const result = await transactionService.createTransaction(userId, data);

        res.json(result);
    } catch (error) {
        next(errorBuilder(error).badRequest(CANNOT_CREATE_TRANSACTION));
    }
};

const updateTransaction = async (req, res, next) => {
    try {
        const { transactionId } = req.params;
        const data = req.body;

        await transactionSchema.validate(data);

        const result = await transactionService.updateTransaction(transactionId, data);

        res.json(result);
    } catch (error) {
        next(errorBuilder(error).badRequest(CANNOT_UPDATE_TRANSACTION));
    }
};

const deleteTransaction = async (req, res, next) => {
    try {
        const { transactionId } = req.params;

        await transactionService.deleteTransaction(transactionId);

        res.json(transactionId);
    } catch (error) {
        next(errorBuilder(error).badRequest(CANNOT_DELETE_TRANSACTION));
    }
};

router.get('/:userId/information', isUserAuthorised, getUserMainInformation);
router.get('/:userId/statistics', isUserAuthorised, getYearlyUserStatistics);
router.get('/:userId/transactions', isUserAuthorised, getUserTransactions);
router.post('/:userId/transactions', isUserAuthorised, createTransaction);
router.put('/:userId/transactions/:transactionId', isUserAuthorised, updateTransaction);
router.delete('/:userId/transactions/:transactionId', isUserAuthorised, deleteTransaction);

module.exports = router;
