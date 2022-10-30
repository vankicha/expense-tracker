import { constructClassName } from 'utils/functions';

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'contained-blue';
    type?: 'submit' | 'reset' | 'button';
    additionalClasses?: string[];
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ children, type, variant, additionalClasses, onClick }: ButtonProps) => {
    const mainClasses: string[] = ['flex', 'py-2', 'px-4', 'justify-center', 'font-medium', 'rounded'];

    switch (variant) {
        case 'contained-blue':
            mainClasses.push(...'bg-blue-500 text-white hover:bg-blue-700 focus:outline-none'.split(' '));
            break;
        default:
            mainClasses.push(...'bg-white text-gray-700 hover:bg-gray-100 border-gray-400 border shadow'.split(' '));
            break;
    }

    return (
        <button
            className={constructClassName(mainClasses, additionalClasses)}
            onClick={onClick}
            type={type || 'submit'}
        >
            <span className="text-lg">{children}</span>
        </button>
    );
};

export default Button;
