import { transformAmountToString } from 'utils/functions';

interface YourBalanceProps {
    balanceTotalAmount: number;
}

const YourBalance = ({ balanceTotalAmount }: YourBalanceProps) => {
    return (
        <div>
            <h1 className="font-medium text-2xl text-center text-gray-500 uppercase">Your Balance</h1>
            <p className="font-bold text-5xl text-center text-gray-700">
                {transformAmountToString(balanceTotalAmount)}
            </p>
        </div>
    );
};

export default YourBalance;
