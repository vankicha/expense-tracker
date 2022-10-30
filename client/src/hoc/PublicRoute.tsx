import { Navigate, Outlet } from 'react-router-dom';

import { isAuthenticated } from 'redux/features/user';

import { useAppSelector } from 'redux/hooks';

const PublicRoute = () => {
    const isUserAuthenticated = useAppSelector(isAuthenticated);

    if (!isUserAuthenticated) return <Outlet />;

    return <Navigate to="/" />;
};

export default PublicRoute;
