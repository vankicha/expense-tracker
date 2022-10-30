import { useAppSelector } from 'redux/hooks';

import { getUserId } from 'redux/features/user';
import { useGetUserStatisticsQuery } from 'redux/api/userApi';

import BalanceLineChart from './BalanceLineChart';
import IncomeOutcomeBarChart from './IncomeOutcomeBarChart';

const UserCharts = () => {
    const userId = useAppSelector(getUserId);
    const { data } = useGetUserStatisticsQuery(userId);

    return data ? (
        <>
            <BalanceLineChart data={data.yearlyBalance} />
            <IncomeOutcomeBarChart data={data.yearlyIncomeOutcome} />
        </>
    ) : null;
};

export default UserCharts;
