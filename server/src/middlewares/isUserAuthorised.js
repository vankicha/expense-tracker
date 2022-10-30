const errorBuilder = require('../utils/errorBuilder');

const { NO_ACCESS } = require('../constants/errors');

const isUserAuthorised = async (req, res, next) => {
    const { userId } = req.params;
    const { id } = req.user;

    if (userId == id) {
        next();
        return;
    }

    next(errorBuilder().forbidden(NO_ACCESS));
};

exports.isUserAuthorised = isUserAuthorised;
