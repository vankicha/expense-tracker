interface AuthenticationFormContainerProps {
    children: React.ReactNode;
}

const AuthenticationFormContainer = ({ children }: AuthenticationFormContainerProps) => {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="container w-3/4 m-auto flex-1 flex flex-col items-center justify-center">{children}</div>
        </div>
    );
};

export default AuthenticationFormContainer;
