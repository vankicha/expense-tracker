import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import { initialApi } from './api/initialApi';
import user from './features/user';
import toast from './features/toast';
import errorHandler from './middlewares/errorHandler';

import { ENVIRONMENTS } from 'constants/env';

const rootReducer = combineReducers({
    [initialApi.reducerPath]: initialApi.reducer,
    user,
    toast,
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV === ENVIRONMENTS.DEVELOPMENT,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat([errorHandler, initialApi.middleware]),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
