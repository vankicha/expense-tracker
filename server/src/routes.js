const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('./middlewares/auth');

router.use('/auth', require('./controllers/authController'));
router.use('/users', isAuthenticated, require('./controllers/userController'));

module.exports = router;
