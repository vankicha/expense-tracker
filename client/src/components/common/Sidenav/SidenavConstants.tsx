import { toast } from 'react-toastify';

import { AppDispatch } from 'redux/store';
import { logout } from 'redux/features/user';
import { showToast } from 'redux/features/toast';

import HomeIcon from 'assets/HomeIcon';
import CashIcon from 'assets/CashIcon';
import LogoutIcon from 'assets/LogoutIcon';

import { LOGOUT_SUCCESS } from 'constants/messages';

export const SIDENAV_HEADER_LINK_ITEMS = [
    {
        path: '/',
        icon: <HomeIcon />,
        title: 'Dashboard',
    },
];

export const SIDENAV_BODY_LINK_ITEMS = [
    {
        path: '/transactions',
        icon: <CashIcon />,
        title: 'Transactions',
    },
];

export const SIDENAV_FOOTER_ITEMS = [
    {
        icon: <LogoutIcon />,
        title: 'Logout',
        onClick: (dispatch: AppDispatch) => {
            dispatch(logout());
            dispatch(showToast({ message: LOGOUT_SUCCESS, type: toast.TYPE.SUCCESS }));
        },
    },
];
