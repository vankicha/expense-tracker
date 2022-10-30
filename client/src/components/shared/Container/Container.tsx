import { constructClassName } from 'utils/functions';

interface ContainerProps {
    children: React.ReactNode;
    additionalClasses?: string[];
}

const Container = ({ children, additionalClasses }: ContainerProps) => {
    const mainClasses = ['rounded', 'shadow-md', 'bg-white', 'p-4'];

    return <div className={constructClassName(mainClasses, additionalClasses)}>{children}</div>;
};

export default Container;
