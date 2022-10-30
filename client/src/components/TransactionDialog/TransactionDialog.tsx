import { Formik, Form } from 'formik';
import moment from 'moment';
import { toast } from 'react-toastify';

import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { useCreateTransactionMutation, useUpdateTransactionMutation } from 'redux/api/transactionsApi';
import { getUserId } from 'redux/features/user';
import { showToast } from 'redux/features/toast';

import { Dialog, DoubleSwitch, InputField } from 'components/shared';

import { YEAR_MONTH_DATE_DASH_FORMAT } from 'constants/time';
import { ITransactionInput, Transaction } from 'constants/types';
import { TRANSACTION_TYPES } from 'constants/transactions';

import { transactionSchema } from 'utils/validationSchemas';
import { TRANSACTION_ADD_SUCCESS, TRANSACTION_EDIT_SUCCESS } from 'constants/messages';

interface TransactionDialogProps {
    isOpen: boolean;
    isEditMode: boolean;
    selectedTransaction?: Partial<Transaction>;
    handleClose: () => void;
}

const TransactionDialog = ({ isOpen, isEditMode, selectedTransaction, handleClose }: TransactionDialogProps) => {
    const initialValues: ITransactionInput = {
        name: selectedTransaction?.name || '',
        amount: selectedTransaction?.amount || 0,
        date: selectedTransaction?.date ? moment(selectedTransaction?.date).format(YEAR_MONTH_DATE_DASH_FORMAT) : '',
        type: selectedTransaction?.type || TRANSACTION_TYPES.EXPENSE,
    };

    const leftSideOptions = {
        text: TRANSACTION_TYPES.EXPENSE,
        textColor: 'text-red-600',
        backgroundColor: 'bg-red-600',
    };

    const rightSideOptions = {
        text: TRANSACTION_TYPES.INCOME,
        textColor: 'text-green-600',
        backgroundColor: 'bg-green-600',
    };

    const userId = useAppSelector(getUserId);
    const dispatch = useAppDispatch();
    const [createTransaction] = useCreateTransactionMutation();
    const [updateTransaction] = useUpdateTransactionMutation();

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={transactionSchema}
            onSubmit={(values: ITransactionInput) => {
                isEditMode
                    ? updateTransaction({
                          userId,
                          transactionId: selectedTransaction?.id,
                          data: values,
                      })
                    : createTransaction({ userId, data: values });
                isEditMode
                    ? dispatch(showToast({ message: TRANSACTION_EDIT_SUCCESS, type: toast.TYPE.SUCCESS }))
                    : dispatch(showToast({ message: TRANSACTION_ADD_SUCCESS, type: toast.TYPE.SUCCESS }));
                handleClose();
            }}
        >
            {({ handleSubmit, handleChange, setFieldValue, values, errors, touched }) => (
                <Dialog
                    isOpen={isOpen}
                    dialogTitle={isEditMode ? 'Edit Transaction' : 'Add Transaction'}
                    handleClose={handleClose}
                    handleSubmit={handleSubmit}
                >
                    <Form className="w-full flex flex-col gap-3" autoComplete="off">
                        <InputField
                            name="name"
                            type="text"
                            placeholder="Name"
                            value={values.name}
                            onChange={handleChange}
                            label="Name"
                            hasError={Boolean(errors.name && touched.name)}
                            errorMessage={errors.name}
                        />
                        <InputField
                            name="amount"
                            type="number"
                            step="0.01"
                            placeholder="$0.00"
                            value={values.amount}
                            onChange={handleChange}
                            label="Amount"
                            hasError={Boolean(errors.amount && touched.amount)}
                            errorMessage={errors.amount}
                        />
                        <InputField
                            name="date"
                            type="date"
                            value={values.date}
                            onChange={handleChange}
                            label="Date"
                            hasError={Boolean(errors.date && touched.date)}
                            errorMessage={errors.date}
                        />

                        <DoubleSwitch
                            leftSideOptions={leftSideOptions}
                            rightSideOptions={rightSideOptions}
                            isChecked={values.type === rightSideOptions.text}
                            onChange={() =>
                                setFieldValue(
                                    'type',
                                    values.type === TRANSACTION_TYPES.EXPENSE
                                        ? TRANSACTION_TYPES.INCOME
                                        : TRANSACTION_TYPES.EXPENSE
                                )
                            }
                        />
                    </Form>
                </Dialog>
            )}
        </Formik>
    );
};

export default TransactionDialog;
