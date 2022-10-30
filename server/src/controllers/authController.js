const express = require('express');
const router = express.Router();

const authService = require('../services/authService');
const jwtService = require('../services/jwtService');

const errorBuilder = require('../utils/errorBuilder');
const { registrationSchema, loginSchema } = require('../utils/validationSchemas');

const { REGISTRATION_FAILED, LOGIN_FAILED } = require('../constants/errors');

const register = async (req, res, next) => {
    try {
        const userInfo = req.body;

        await registrationSchema.validate(userInfo);

        const user = await authService.register(userInfo);
        user.token = jwtService.signToken(user.id);

        res.json(user);
    } catch (error) {
        next(errorBuilder(error).badRequest(REGISTRATION_FAILED));
    }
};

const login = async (req, res, next) => {
    try {
        const userInfo = req.body;

        await loginSchema.validate(userInfo);

        const user = await authService.login(userInfo);
        user.token = jwtService.signToken(user.id);

        res.json(user);
    } catch (error) {
        next(errorBuilder(error).badRequest(LOGIN_FAILED));
    }
};

router.post('/register', register);
router.post('/login', login);

module.exports = router;
