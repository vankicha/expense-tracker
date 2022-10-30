import { Form } from 'formik';

import { Button } from 'components/shared';

interface AuthenticationFormProps {
    children: React.ReactNode;
    formTitle: string;
    buttonTitle: string;
}

const AuthenticationForm = ({ children, formTitle, buttonTitle }: AuthenticationFormProps) => {
    return (
        <Form className="bg-white text-black w-full" autoComplete="off">
            <h1 className="mb-8 text-3xl text-center">{formTitle}</h1>

            <div className="flex flex-col gap-4">{children}</div>

            <Button type="submit" variant="contained-blue" additionalClasses={['mt-4', 'w-full']}>
                {buttonTitle}
            </Button>
        </Form>
    );
};

export default AuthenticationForm;
