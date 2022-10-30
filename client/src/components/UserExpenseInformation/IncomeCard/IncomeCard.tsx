import { transformAmountToString } from 'utils/functions';

interface IncomeCardProps {
    incomeTotalAmount: number;
}

const IncomeCard = ({ incomeTotalAmount }: IncomeCardProps) => {
    return (
        <div>
            <h3 className="text-xl text-center text-gray-400 uppercase">Income</h3>
            <p className="font-bold text-3xl text-center text-green-600">
                {transformAmountToString(incomeTotalAmount)}
            </p>
        </div>
    );
};

export default IncomeCard;
