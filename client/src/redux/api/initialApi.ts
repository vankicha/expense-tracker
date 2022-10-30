import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { RootState } from '../store';

import { BASE_SERVER_URL } from 'constants/env';

export const initialApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_SERVER_URL}`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.auth.token;

            if (token) headers.set('Authorization', `Bearer ${token}`);

            return headers;
        },
    }),
    endpoints: () => ({}),
});
