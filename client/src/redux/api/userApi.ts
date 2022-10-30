import { initialApi } from './initialApi';

import { IUserInformation, IUserStatisticsInformation } from 'constants/types';
import { TAG_TYPES } from 'constants/api';

export const userApi = initialApi.enhanceEndpoints({ addTagTypes: [TAG_TYPES.USER] }).injectEndpoints({
    endpoints: (builder) => ({
        getUserMainInformation: builder.query<IUserInformation, string>({
            query: (userId) => `users/${userId}/information`,
            providesTags: [TAG_TYPES.USER],
        }),
        getUserStatistics: builder.query<IUserStatisticsInformation, string>({
            query: (userId) => `users/${userId}/statistics`,
            providesTags: [TAG_TYPES.USER],
        }),
    }),
});

export const { useGetUserMainInformationQuery, useGetUserStatisticsQuery } = userApi;
