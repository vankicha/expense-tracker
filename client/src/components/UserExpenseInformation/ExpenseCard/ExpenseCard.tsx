import { transformAmountToString } from 'utils/functions';

interface ExpenseCardProps {
    expenseTotalAmount: number;
}

const ExpenseCard = ({ expenseTotalAmount }: ExpenseCardProps) => {
    return (
        <div>
            <h3 className="text-xl text-center text-gray-400 uppercase">Outcome</h3>
            <p className="font-bold text-3xl text-center text-red-600">{transformAmountToString(expenseTotalAmount)}</p>
        </div>
    );
};

export default ExpenseCard;
