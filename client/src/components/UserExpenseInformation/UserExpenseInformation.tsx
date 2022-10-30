import { useAppSelector } from 'redux/hooks';
import { getUserInformation } from 'redux/features/user';

import { ContainerWrapper, Container } from 'components/shared';

import YourBalance from './YourBalance';
import IncomeCard from './IncomeCard';
import ExpenseCard from './ExpenseCard';

const UserExpenseInformation = () => {
    const { income, outcome } = useAppSelector(getUserInformation);

    return (
        <>
            <YourBalance balanceTotalAmount={income - outcome} />
            <ContainerWrapper.Flex>
                <Container additionalClasses={['flex-grow', 'w-full']}>
                    <IncomeCard incomeTotalAmount={income} />
                </Container>
                <Container additionalClasses={['flex-grow', 'w-full']}>
                    <ExpenseCard expenseTotalAmount={outcome} />
                </Container>
            </ContainerWrapper.Flex>
        </>
    );
};

export default UserExpenseInformation;
