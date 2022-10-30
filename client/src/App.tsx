import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Toast from 'components/common/Toast';

import PrivateRoute from 'hoc/PrivateRoute';
import PublicRoute from 'hoc/PublicRoute';

import Dashboard from 'pages/Dashboard';
import Transactions from 'pages/Transactions';
import Login from 'pages/Login';
import Register from 'pages/Register';

import './App.css';

function App() {
    return (
        <>
            <ToastContainer />
            <Toast />
            <Routes>
                <Route path="/" element={<PrivateRoute />}>
                    <Route index element={<Dashboard />} />
                    <Route path="transactions" element={<Transactions />} />
                </Route>

                <Route path="/" element={<PublicRoute />}>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
