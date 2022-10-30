const { HTTP_STATUS_CODES } = require('../constants/common');
const { SOMETHING_WENT_WRONG } = require('../constants/errors');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    err.status = err.status || HTTP_STATUS_CODES.INTERNAL_SERVER;
    err.message = err.message || SOMETHING_WENT_WRONG;
    res.status(err.status).send(err);
};

exports.errorHandler = errorHandler;
