interface AuthenticationLayoutProps {
    children: React.ReactNode;
    image: string;
}

const AuthenticationLayout = ({ children, image }: AuthenticationLayoutProps) => {
    return (
        <div className="w-full h-screen flex min-w-[1200px]">
            <div className="w-1/2 flex flex-wrap justify-center">
                <img className="w-full h-full" src={image} />
            </div>
            <div className="w-1/2">{children}</div>
        </div>
    );
};

export default AuthenticationLayout;
