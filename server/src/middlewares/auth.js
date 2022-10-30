const express = require('express');
const router = express.Router();

const jwtService = require('../services/jwtService');

const errorBuilder = require('../utils/errorBuilder');

const { NO_TOKEN, NOT_AUTHORIZED } = require('../constants/errors');

const hasToken = async (req, res, next) => {
    if (!req.headers.authorization) {
        next(errorBuilder().unauthorized(NO_TOKEN));
    }

    next();
};

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    try {
        req.user = await jwtService.verifyToken(token);
        next();
    } catch (error) {
        next(errorBuilder().unauthorized(NOT_AUTHORIZED));
    }
};

router.use(hasToken);
router.use(verifyToken);

exports.isAuthenticated = router;
