import { initialApi } from './initialApi';

import { Transaction, ITransactionInput } from 'constants/types';
import { HTTP_METHODS, DEFAULT_PAGE, DEFAULT_LIMIT } from 'constants/common';
import { TAG_TYPES } from 'constants/api';

export const transactionsApi = initialApi
    .enhanceEndpoints({ addTagTypes: [TAG_TYPES.TRANSACTION, TAG_TYPES.USER] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getTransactions: builder.query<
                { transactions: Transaction[]; totalTransactionsCount: number },
                { userId: string; page: number; limit: number }
            >({
                query: ({ userId, page = DEFAULT_PAGE, limit = DEFAULT_LIMIT }) =>
                    `/users/${userId}/transactions?page=${page}&limit=${limit}`,
                providesTags: [TAG_TYPES.TRANSACTION],
            }),
            createTransaction: builder.mutation<Transaction, { userId: string; data: ITransactionInput }>({
                query: ({ userId, data }) => ({
                    url: `/users/${userId}/transactions`,
                    method: HTTP_METHODS.POST,
                    body: data,
                }),
                invalidatesTags: [TAG_TYPES.TRANSACTION, TAG_TYPES.USER],
            }),
            updateTransaction: builder.mutation<
                Transaction,
                { userId: string; transactionId: string | undefined; data: ITransactionInput }
            >({
                query: ({ userId, transactionId, data }) => ({
                    url: `/users/${userId}/transactions/${transactionId}`,
                    method: HTTP_METHODS.PUT,
                    body: data,
                }),
                invalidatesTags: [TAG_TYPES.TRANSACTION, TAG_TYPES.USER],
            }),
            deleteTransaction: builder.mutation<Transaction, { userId: string; transactionId: string | undefined }>({
                query: ({ userId, transactionId }) => ({
                    url: `/users/${userId}/transactions/${transactionId}`,
                    method: HTTP_METHODS.DELETE,
                }),
                invalidatesTags: [TAG_TYPES.TRANSACTION, TAG_TYPES.USER],
            }),
        }),
    });

export const {
    useGetTransactionsQuery,
    useCreateTransactionMutation,
    useUpdateTransactionMutation,
    useDeleteTransactionMutation,
} = transactionsApi;
