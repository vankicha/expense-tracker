const { HTTP_STATUS_CODES } = require('../constants/common');
const { BAD_REQUEST, NOT_AUTHORIZED, NO_ACCESS, NOT_FOUND } = require('../constants/errors');

const errorBuilder = (err) => ({
    custom: (status, message = BAD_REQUEST) => ({ status, message, err }),
    badRequest: (message = BAD_REQUEST) => ({ status: HTTP_STATUS_CODES.BAD_REQUEST, message, err }),
    unauthorized: (message = NOT_AUTHORIZED) => ({ status: HTTP_STATUS_CODES.UNAUTHORIZED, message, err }),
    forbidden: (message = NO_ACCESS) => ({ status: HTTP_STATUS_CODES.FORBIDDEN, message, err }),
    notFound: (message = NOT_FOUND) => ({ status: HTTP_STATUS_CODES.NOT_FOUND, message, err }),
});

module.exports = errorBuilder;
