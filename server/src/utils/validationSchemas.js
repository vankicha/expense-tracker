const Yup = require('yup');
const { PASSWORD_REGEX } = require('../constants/regex');

const registrationSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'First name should be atleast 2 characters!')
        .max(50, 'First name should be lower than 50 characters!')
        .required('This field is required.'),
    lastName: Yup.string()
        .min(2, 'Last name should be atleast 2 characters!')
        .max(50, 'Last name should be lower than 50 characters!')
        .required('This field is required.'),
    email: Yup.string().email('Invalid email!').required('This field is required.'),
    password: Yup.string()
        .matches(
            PASSWORD_REGEX,
            `Password must be atleast 8 characters long and contain one uppercase, one lowercase and one special character.`
        )
        .required('This field is required.'),
    confirmPassword: Yup.string()
        .required('This field is required.')
        .test('password-match', 'Passwords must match', function (value) {
            return this.parent.password === value;
        }),
});

const loginSchema = Yup.object().shape({
    email: Yup.string().required('This field is required.'),
    password: Yup.string()
        .matches(
            PASSWORD_REGEX,
            `Password must be atleast 8 characters long and contain one uppercase, one lowercase and one special character.`
        )
        .required('This field is required.'),
});

const transactionSchema = Yup.object().shape({
    name: Yup.string().required('This field is required.'),
    amount: Yup.number().positive('Amount should be positive.'),
    date: Yup.string().required('This field is required.'),
});

module.exports = {
    registrationSchema,
    loginSchema,
    transactionSchema,
};
