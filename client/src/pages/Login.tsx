import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { toast } from 'react-toastify';

import AuthenticationLayout from 'layouts/AuthenticationLayout';
import { AuthenticationFormContainer, AuthenticationForm } from 'components/common';
import { InputField } from 'components/shared';
import MainImage from 'assets/main-image.jpg';

import { useLoginMutation } from 'redux/api/authApi';
import { showToast } from 'redux/features/toast';
import { useAppDispatch } from 'redux/hooks';

import { loginSchema } from 'utils/validationSchemas';

import { ILoginInput } from 'constants/types';
import { LOGIN_SUCCESS } from 'constants/messages';

const Login = () => {
    const initialValues: ILoginInput = {
        email: '',
        password: '',
    };

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [login] = useLoginMutation();

    return (
        <AuthenticationLayout image={MainImage}>
            <AuthenticationFormContainer>
                <Formik
                    initialValues={initialValues}
                    validationSchema={loginSchema}
                    onSubmit={(values: ILoginInput) => {
                        login(values)
                            .unwrap()
                            .then(() => {
                                dispatch(showToast({ message: LOGIN_SUCCESS, type: toast.TYPE.SUCCESS }));
                                navigate('/');
                            });
                    }}
                >
                    {({ handleChange, values, errors, touched }) => (
                        <AuthenticationForm formTitle="Sign in to your account" buttonTitle="Log in">
                            <InputField
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={values.email}
                                onChange={handleChange}
                                label="Email"
                                hasError={Boolean(errors.email && touched.email)}
                                errorMessage={errors.email}
                            />

                            <InputField
                                name="password"
                                type="password"
                                placeholder="Password"
                                value={values.password}
                                onChange={handleChange}
                                label="Password"
                                hasError={Boolean(errors.password && touched.password)}
                                errorMessage={errors.password}
                            />
                        </AuthenticationForm>
                    )}
                </Formik>

                <div className="text-gray-500 mt-6">
                    <span className="mr-1">{`Don't have an account yet?`}</span>
                    <Link className="no-underline border-b border-blue-500 text-blue-500" to="/register">
                        Register
                    </Link>
                </div>
            </AuthenticationFormContainer>
        </AuthenticationLayout>
    );
};

export default Login;
