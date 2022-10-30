import { initialApi } from './initialApi';

import { IUser, IRegisterInput, ILoginInput } from 'constants/types';
import { HTTP_METHODS } from 'constants/common';

export const authApi = initialApi.injectEndpoints({
    endpoints: (builder) => ({
        registerUser: builder.mutation<IUser, IRegisterInput>({
            query(data) {
                return {
                    url: 'auth/register',
                    method: HTTP_METHODS.POST,
                    body: data,
                };
            },
        }),
        login: builder.mutation<IUser, ILoginInput>({
            query(data) {
                return {
                    url: 'auth/login',
                    method: HTTP_METHODS.POST,
                    body: data,
                };
            },
        }),
    }),
});

export const { useRegisterUserMutation, useLoginMutation } = authApi;
