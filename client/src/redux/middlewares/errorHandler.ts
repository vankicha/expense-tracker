import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { logout } from 'redux/features/user';
import { showToast } from 'redux/features/toast';

import { UNAUTHORIZED_TOAST_ID } from 'constants/toast';
import { AUTH_ERROS, SESSION_INVALID } from 'constants/errors';
import { HTTP_STATUS_CODES } from 'constants/common';

const errorHandler: Middleware = () => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        if (
            action.payload.data.status === HTTP_STATUS_CODES.UNAUTHORIZED &&
            AUTH_ERROS.includes(action.payload.data.message)
        ) {
            next(showToast({ message: SESSION_INVALID, type: toast.TYPE.ERROR, toastId: UNAUTHORIZED_TOAST_ID }));
            next(logout());
        } else {
            next(showToast({ message: action.payload.data.message, type: toast.TYPE.ERROR }));
        }
    }

    return next(action);
};

export default errorHandler;
