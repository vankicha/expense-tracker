import { useAppSelector } from 'redux/hooks';

import { getUserId } from 'redux/features/user';
import { useGetUserMainInformationQuery } from 'redux/api/userApi';

const withUserData = (WrappedComponent: React.ComponentType) => {
    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    const ComponentWithUserData: React.FC = (props) => {
        const userId = useAppSelector(getUserId);
        useGetUserMainInformationQuery(userId);

        return <WrappedComponent {...props} />;
    };

    ComponentWithUserData.displayName = `withUserData(${displayName})`;

    return ComponentWithUserData;
};

export default withUserData;
