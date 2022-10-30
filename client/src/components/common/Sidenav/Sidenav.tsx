import SidenavLinkItem from './SidenavLinkItem';
import SidenavFooterItem from './SidenavFooterItem';

import { SIDENAV_HEADER_LINK_ITEMS, SIDENAV_BODY_LINK_ITEMS, SIDENAV_FOOTER_ITEMS } from './SidenavConstants';

const Sidenav = () => {
    return (
        <div className="w-60 h-screen shadow-md bg-white sticky top-0">
            <div className="py-4 px-6">
                <div className="flex items-center justify-center">
                    <h1 className="text-2xl text-blue-600">Expense Tracker</h1>
                </div>
            </div>

            <hr className="my-2" />

            <ul className="relative px-1">
                {SIDENAV_HEADER_LINK_ITEMS.map((headerItem, index) => (
                    <SidenavLinkItem
                        key={`${headerItem.title}${index}`}
                        path={headerItem.path}
                        icon={headerItem.icon}
                        title={headerItem.title}
                    />
                ))}
            </ul>

            <hr className="my-2" />

            <ul className="relative px-1">
                {SIDENAV_BODY_LINK_ITEMS.map((bodyItem, index) => (
                    <SidenavLinkItem
                        key={`${bodyItem.title}${index}`}
                        path={bodyItem.path}
                        icon={bodyItem.icon}
                        title={bodyItem.title}
                    />
                ))}
            </ul>

            <div className="text-center bottom-0 absolute w-full">
                <hr className="my-0" />
                {SIDENAV_FOOTER_ITEMS.map((footerItem, index) => (
                    <SidenavFooterItem
                        key={`${footerItem.title}${index}`}
                        icon={footerItem.icon}
                        title={footerItem.title}
                        onClick={footerItem.onClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default Sidenav;
