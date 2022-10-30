import { useAppDispatch } from 'redux/hooks';
import { AppDispatch } from 'redux/store';

interface SidenavFooterItemProps {
    icon: JSX.Element;
    title: string;
    onClick?: (dispatch: AppDispatch) => void;
}

const SidenavFooterItem = ({ icon, title, onClick }: SidenavFooterItemProps) => {
    const dispatch = useAppDispatch();

    return (
        <div
            className="m-2 cursor-pointer flex items-center text-base py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
            onClick={onClick?.bind(null, dispatch)}
        >
            {icon}
            <span>{title}</span>
        </div>
    );
};

export default SidenavFooterItem;
