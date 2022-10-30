import moment from 'moment';

import { Container } from 'components/shared';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';

import { transformAmountToString } from 'utils/functions';

import { YEAR_ONLY } from 'constants/time';
import { IUserStatisticsInformation } from 'constants/types';

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
        return (
            <div className="py-2 px-4 bg-white">
                <p className="text-gray-700 text-xl">{`${label}: ${transformAmountToString(payload[0].value)}`}</p>
            </div>
        );
    }

    return null;
};

const BalanceLineChart = ({ data }: { data: IUserStatisticsInformation['yearlyBalance'] }) => {
    return (
        <Container additionalClasses={['h-[450px]', 'flex', 'flex-col', 'gap-2.5']}>
            <h3 className="text-xl text-center text-gray-400">Balance through {moment().format(YEAR_ONLY)}</h3>
            <ResponsiveContainer>
                <LineChart
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
                    <Line type="monotone" dataKey="balance" stroke="#2563eb" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </Container>
    );
};

export default BalanceLineChart;
