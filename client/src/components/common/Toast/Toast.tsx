import { useEffect } from 'react';
import { toast as toastify } from 'react-toastify';

import { getToast, initToast } from 'redux/features/toast';
import { useAppSelector, useAppDispatch } from 'redux/hooks';

import type { ToastItem } from 'react-toastify';
import { DEFAULT_TOAST_ID, TOAST_ITEM_STATUS } from 'constants/toast';

const Toast = () => {
    const toast = useAppSelector(getToast);
    const dispatch = useAppDispatch();

    const unsubscribe = toastify.onChange((payload: ToastItem) => {
        switch (payload.status) {
            case TOAST_ITEM_STATUS.REMOVED:
                dispatch(initToast());
                break;
        }
    });

    useEffect(() => {
        if (toast.isOpen) {
            if (toastify.isActive(toast.toastId) && toast.toastId === DEFAULT_TOAST_ID) {
                toastify.update(toast.toastId, { render: toast.message, type: toast.type, theme: toast.theme });
            } else if (toast.type) {
                if (toast.toastId === DEFAULT_TOAST_ID) toastify.dismiss();
                toastify[toast.type](toast.message, { theme: toast.theme, toastId: toast.toastId });
            } else {
                if (toast.toastId === DEFAULT_TOAST_ID) toastify.dismiss();
                toastify(toast.message, { theme: toast.theme, toastId: toast.toastId });
            }
            unsubscribe();
        }
    }, [toast]);

    return null;
};

export default Toast;
