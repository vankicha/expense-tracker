import { useState } from 'react';
import moment from 'moment';

import { useAppSelector } from 'redux/hooks';
import { getUserId } from 'redux/features/user';
import { useGetTransactionsQuery } from 'redux/api/transactionsApi';

import { IconButton, Table } from 'components/shared';
import TransactionDialog from 'components/TransactionDialog';
import DeleteTransactionDialog from 'components/DeleteTransactionDialog';

import AddIcon from 'assets/AddIcon';
import EditIcon from 'assets/EditIcon';
import DeleteIcon from 'assets/DeleteIcon';

import { transformAmountToString } from 'utils/functions';

import { TRANSACTIONS_TABLE_CELLS } from './TransactionsTableConstants';
import { DATE_MONTH_YEAR_SLASH_FORMAT } from 'constants/time';
import { TRANSACTION_TYPES } from 'constants/transactions';
import { Transaction, TransactionTableRow } from 'constants/types';
import { DEFAULT_PAGE, DEFAULT_LIMIT } from 'constants/common';

const TransactionsTable = () => {
    const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState<boolean>(false);
    const [isDeleteTransactionDialogOpen, setIsDeleteTransactionDialogOpen] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [selectedTransaction, setSelectedTransaction] = useState<Partial<Transaction>>({});
    const [page, setPage] = useState<number>(DEFAULT_PAGE);
    const limit = DEFAULT_LIMIT;

    const userId = useAppSelector(getUserId);
    const { data = { transactions: [], totalTransactionsCount: 0 } } = useGetTransactionsQuery({ userId, page, limit });

    const handleAddNewClick = () => {
        setIsTransactionDialogOpen(true);
    };

    const handleCloseDialogClick = () => {
        setSelectedTransaction({});
        setIsEditMode(false);
        setIsTransactionDialogOpen(false);
        setIsDeleteTransactionDialogOpen(false);
    };

    const handleEditIconClick = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setIsEditMode(true);
        setIsTransactionDialogOpen(true);
    };

    const handleDeleteIconClick = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setIsDeleteTransactionDialogOpen(true);
    };

    const adjustRows = (transactions: Transaction[]): TransactionTableRow[] => {
        return transactions.map((transaction) => {
            const isExpense: boolean = transaction.type === TRANSACTION_TYPES.EXPENSE;

            return {
                name: transaction.name,
                amount: (
                    <span className={`${isExpense ? 'text-red-600' : 'text-green-600'}`}>
                        {isExpense
                            ? `-${transformAmountToString(transaction.amount)}`
                            : `+${transformAmountToString(transaction.amount)}`}
                    </span>
                ),
                date: moment(transaction.date).format(DATE_MONTH_YEAR_SLASH_FORMAT),
                actions: (
                    <div className="flex gap-2 items-center">
                        <div
                            onClick={handleEditIconClick.bind(null, transaction)}
                            className="py-1 px-1 cursor-pointer hover:bg-gray-200 hover:rounded"
                        >
                            <EditIcon />
                        </div>
                        <div
                            onClick={handleDeleteIconClick.bind(null, transaction)}
                            className="py-1 px-1 cursor-pointer hover:bg-gray-200 hover:rounded"
                        >
                            <DeleteIcon />
                        </div>
                    </div>
                ),
            };
        });
    };

    return (
        <div>
            <IconButton icon={<AddIcon />} additionalClasses={['mx-auto', 'mb-2.5']} onClick={handleAddNewClick}>
                Add Transaction
            </IconButton>

            <Table
                heads={TRANSACTIONS_TABLE_CELLS}
                rows={adjustRows(data.transactions)}
                page={page}
                setPage={setPage}
                limit={limit}
                totalRows={data.totalTransactionsCount}
            />

            <TransactionDialog
                isOpen={isTransactionDialogOpen}
                isEditMode={isEditMode}
                selectedTransaction={selectedTransaction}
                handleClose={handleCloseDialogClick}
            />

            <DeleteTransactionDialog
                isOpen={isDeleteTransactionDialogOpen}
                selectedTransaction={selectedTransaction}
                handleClose={handleCloseDialogClick}
            />
        </div>
    );
};

export default TransactionsTable;
