import withUserData from 'hoc/withUserData';

import MainLayout from 'layouts/MainLayout';

import { ContainerWrapper } from 'components/shared';
import UserExpenseInformation from 'components/UserExpenseInformation';
import UserCharts from 'components/UserCharts';

const Home = () => {
    return (
        <MainLayout>
            <ContainerWrapper>
                <UserExpenseInformation />
                <UserCharts />
            </ContainerWrapper>
        </MainLayout>
    );
};

export default withUserData(Home);
