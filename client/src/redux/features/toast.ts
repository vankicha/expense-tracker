import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'redux/store';

import type { Theme, TypeOptions } from 'react-toastify';

import { DEFAULT_TOAST_ID } from 'constants/toast';

interface IToastState {
    isOpen: boolean;
    message: string;
    toastId: string;
    theme: Theme;
    type: Exclude<TypeOptions, 'default'> | undefined;
}

const toastInitialState: IToastState = {
    isOpen: false,
    message: '',
    toastId: DEFAULT_TOAST_ID,
    theme: 'colored',
    type: undefined,
};

const toastSlice = createSlice({
    name: 'toast',
    initialState: toastInitialState,
    reducers: {
        initToast: () => toastInitialState,
        showToast: (state, action: PayloadAction<object>) => {
            return { ...toastInitialState, isOpen: true, ...action.payload };
        },
    },
});

export default toastSlice.reducer;
export const { initToast, showToast } = toastSlice.actions;

export const getToast = (state: RootState) => state.toast;
