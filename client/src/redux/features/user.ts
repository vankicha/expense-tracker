import { combineReducers, createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import { authApi } from '../api/authApi';
import { userApi } from '../api/userApi';
import { RootState } from '../store';

import { IUser, IUserInformation } from 'constants/types';
import { userPersistConfig } from 'constants/store';

const userInitialState: IUser = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    createdAt: '',
    updatedAt: '',
    token: '',
};

const informationInitialSlice: IUserInformation = {
    income: 0,
    outcome: 0,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: userInitialState,
    reducers: {
        logout: () => userInitialState,
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
            return { ...state, ...payload };
        });
        builder.addMatcher(authApi.endpoints.registerUser.matchFulfilled, (state, { payload }) => {
            return { ...state, ...payload };
        });
    },
});

const informationSlice = createSlice({
    name: 'information',
    initialState: informationInitialSlice,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(userApi.endpoints.getUserMainInformation.matchFulfilled, (state, { payload }) => {
            return { ...state, ...payload };
        });
    },
});

export default combineReducers({
    auth: persistReducer(userPersistConfig, authSlice.reducer),
    information: informationSlice.reducer,
});

export const { logout } = authSlice.actions;

export const isAuthenticated = (state: RootState) => Boolean(state.user.auth.token);
export const getUserId = (state: RootState) => state.user.auth.id;
export const getUserInformation = (state: RootState) => state.user.information;
