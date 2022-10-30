import ArrowLeftIcon from 'assets/ArrowLeftIcon';
import ArrowRightIcon from 'assets/ArrowRightIcon';

import { DEFAULT_PAGE } from 'constants/common';

interface TablePaginationProps {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    limit: number;
    totalRows: number;
}

const TablePagination = ({ page, setPage, limit, totalRows }: TablePaginationProps) => {
    const isFirstPage = page === DEFAULT_PAGE;
    const hasMorePages = (page + 1) * limit < totalRows;

    const showingFrom = isFirstPage ? '1' : `${(page + 1) * limit - limit}`;
    const showingTo = isFirstPage
        ? totalRows < limit
            ? `${totalRows}`
            : `${limit}`
        : hasMorePages
        ? `${(page + 1) * limit}`
        : `${totalRows}`;

    const handlePrevClick = () => {
        if (isFirstPage) return;
        setPage((prevState) => prevState - 1);
    };

    const handleNextClick = () => {
        if (!hasMorePages) return;
        setPage((prevState) => prevState + 1);
    };

    return (
        <div className="py-3 flex flex-col items-center bg-white rounded-b shadow-md">
            <span className="text-sm text-gray-500">
                Showing <span className="font-medium text-gray-700">{showingFrom}</span> to{' '}
                <span className="font-medium text-gray-700">{showingTo}</span> of{' '}
                <span className="font-medium text-gray-700">{totalRows}</span>
            </span>
            <div className="inline-flex mt-2">
                <button
                    className="inline-flex items-center py-2 px-4 text-sm font-medium rounded-l bg-blue-50 text-blue-500 hover:text-blue-700"
                    onClick={handlePrevClick}
                >
                    <ArrowLeftIcon /> Prev
                </button>
                <button
                    className="inline-flex items-center py-2 px-4 text-sm font-medium border-0 border-l border-gray-300 rounded-r bg-blue-50 text-blue-500 hover:text-blue-700"
                    onClick={handleNextClick}
                >
                    Next <ArrowRightIcon />
                </button>
            </div>
        </div>
    );
};

export default TablePagination;
