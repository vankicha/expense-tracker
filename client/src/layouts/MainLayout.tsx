import { Sidenav } from 'components/common';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="w-full h-full flex flex-row min-w-[1200px]">
            <Sidenav />
            <main className="w-[calc(100%-15rem)] bg-slate-100 grow p-14">
                <div className="max-w-[1680px] mx-auto">{children}</div>
            </main>
        </div>
    );
};

export default MainLayout;
