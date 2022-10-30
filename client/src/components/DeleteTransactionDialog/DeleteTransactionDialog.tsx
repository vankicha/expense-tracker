import { toast } from 'react-toastify';

import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { useDeleteTransactionMutation } from 'redux/api/transactionsApi';
import { getUserId } from 'redux/features/user';
import { showToast } from 'redux/features/toast';

import { ConfirmationDialog } from 'components/shared';

import { Transaction } from 'constants/types';
import { TRANSACTION_DELETE_SUCCESS } from 'constants/messages';

interface DeleteransactionDialogProps {
    isOpen: boolean;
    selectedTransaction?: Partial<Transaction>;
    handleClose: () => void;
}

const DeleteTransactionDialog = ({ isOpen, selectedTransaction, handleClose }: DeleteransactionDialogProps) => {
    const userId = useAppSelector(getUserId);
    const dispatch = useAppDispatch();
    const [deleteTransaction] = useDeleteTransactionMutation();

    const handleSubmit = () => {
        deleteTransaction({ userId, transactionId: selectedTransaction?.id });
        dispatch(showToast({ message: TRANSACTION_DELETE_SUCCESS, type: toast.TYPE.SUCCESS }));
    };

    return (
        <ConfirmationDialog isOpen={isOpen} handleClose={handleClose} handleSubmit={handleSubmit}>
            <span className="text-lg font-medium text-gray-600">Are you sure you want to delete this item?</span>
        </ConfirmationDialog>
    );
};

export default DeleteTransactionDialog;
