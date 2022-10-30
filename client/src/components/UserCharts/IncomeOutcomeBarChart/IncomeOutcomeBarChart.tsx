import moment from 'moment';

import { Container } from 'components/shared';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';

import { transformAmountToString } from 'utils/functions';

import { YEAR_ONLY } from 'constants/time';
import { IUserStatisticsInformation } from 'constants/types';

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
        return (
            <div className="py-2 px-4 bg-white text-xl">
                <p className="text-gray-700 ">{label}</p>
                <p className="text-green-400">Income: {transformAmountToString(payload[0].payload.income)}</p>
                <p className="text-red-400">Outcome: {transformAmountToString(payload[0].payload.outcome)}</p>
                <p className="text-gray-500">Total: {transformAmountToString(payload[0].payload.balance)}</p>
            </div>
        );
    }

    return null;
};

const IncomeOutcomeBarChart = ({ data }: { data: IUserStatisticsInformation['yearlyIncomeOutcome'] }) => {
    return (
        <Container additionalClasses={['h-[450px]', 'flex', 'flex-col', 'gap-2.5']}>
            <h3 className="text-xl text-center text-gray-400">
                Income and outcome through {moment().format(YEAR_ONLY)}
            </h3>

            <ResponsiveContainer>
                <BarChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                    }}
                >
                    <CartesianGrid strokeDasharray="10 10" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="income" fill="#4ade80" />
                    <Bar dataKey="outcome" fill="#f87171" />
                </BarChart>
            </ResponsiveContainer>
        </Container>
    );
};

export default IncomeOutcomeBarChart;
