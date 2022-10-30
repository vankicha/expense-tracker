import { constructClassName } from 'utils/functions';

interface IconButtonProps {
    children: React.ReactNode;
    icon?: JSX.Element;
    additionalClasses?: string[];
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const IconButton = ({ children, icon, additionalClasses, onClick }: IconButtonProps) => {
    const mainClasses = [
        'py-1',
        'px-2',
        'flex',
        'items-center',
        'gap-2',
        'justify-center',
        'w-fit',
        'text-gray-700',
        'cursor-pointer',
        'hover:bg-gray-200',
        'hover:rounded',
    ];

    return (
        <button className={constructClassName(mainClasses, additionalClasses)} onClick={onClick}>
            {icon && <span>{icon}</span>}
            <span className="text-lg">{children}</span>
        </button>
    );
};

export default IconButton;
