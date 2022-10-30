import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { toast } from 'react-toastify';

import AuthenticationLayout from 'layouts/AuthenticationLayout';
import { AuthenticationFormContainer, AuthenticationForm } from 'components/common';
import { InputField } from 'components/shared';
import MainImage from 'assets/main-image.jpg';

import { useRegisterUserMutation } from 'redux/api/authApi';
import { showToast } from 'redux/features/toast';
import { useAppDispatch } from 'redux/hooks';

import { registrationSchema } from 'utils/validationSchemas';

import { IRegisterInput } from 'constants/types';
import { REGISTER_SUCCESS } from 'constants/messages';

const Register = () => {
    const initialValues: IRegisterInput = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [registerUser] = useRegisterUserMutation();

    return (
        <AuthenticationLayout image={MainImage}>
            <AuthenticationFormContainer>
                <Formik
                    initialValues={initialValues}
                    validationSchema={registrationSchema}
                    onSubmit={(values: IRegisterInput) => {
                        registerUser(values)
                            .unwrap()
                            .then(() => {
                                dispatch(showToast({ message: REGISTER_SUCCESS, type: toast.TYPE.SUCCESS }));
                                navigate('/');
                            });
                    }}
                >
                    {({ handleChange, values, errors, touched }) => (
                        <AuthenticationForm formTitle="Create your account" buttonTitle="Register">
                            <InputField
                                name="firstName"
                                type="text"
                                placeholder="First Name"
                                value={values.firstName}
                                onChange={handleChange}
                                label="First Name"
                                hasError={Boolean(errors.firstName && touched.firstName)}
                                errorMessage={errors.firstName}
                            />

                            <InputField
                                name="lastName"
                                type="text"
                                placeholder="Last Name"
                                value={values.lastName}
                                onChange={handleChange}
                                label="Last Name"
                                hasError={Boolean(errors.lastName && touched.lastName)}
                                errorMessage={errors.lastName}
                            />

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

                            <InputField
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                label="Confirm Password"
                                hasError={Boolean(errors.confirmPassword && touched.confirmPassword)}
                                errorMessage={errors.confirmPassword}
                            />
                        </AuthenticationForm>
                    )}
                </Formik>

                <div className="text-gray-500 mt-8">
                    <span className="mr-1">Already have an account?</span>
                    <Link className="no-underline border-b border-blue-500 text-blue-500" to="/login">
                        Log in
                    </Link>
                </div>
            </AuthenticationFormContainer>
        </AuthenticationLayout>
    );
};

export default Register;
