import withUserData from 'hoc/withUserData';

import MainLayout from 'layouts/MainLayout';

import { ContainerWrapper } from 'components/shared';
import UserExpenseInformation from 'components/UserExpenseInformation';
import TransactionsTable from 'components/TransactionsTable';

const Transactions = () => {
    return (
        <MainLayout>
            <ContainerWrapper>
                <UserExpenseInformation />
                <TransactionsTable />
            </ContainerWrapper>
        </MainLayout>
    );
};

export default withUserData(Transactions);
