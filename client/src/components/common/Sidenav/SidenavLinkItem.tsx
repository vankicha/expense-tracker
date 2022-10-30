import { NavLink } from 'react-router-dom';

interface SideNavLinkItemProps {
    path: string;
    icon: JSX.Element;
    title: string;
}

const SideNavLinkItem = ({ path, icon, title }: SideNavLinkItemProps) => {
    return (
        <li className="relative">
            <NavLink
                to={path}
                className={({ isActive }) =>
                    'flex items-center text-base py-4 px-6 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded ' +
                    'hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out ' +
                    `${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`
                }
            >
                {icon}
                <span>{title}</span>
            </NavLink>
        </li>
    );
};

export default SideNavLinkItem;
