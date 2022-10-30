import TableHead from './TableHead';
import TableRow from './TableRow';
import TableDataCell from './TableDataCell';
import TablePagination from './TablePagination';

type HeadCell<T> = {
    id: Extract<keyof T, string>;
    label: string;
};

interface TableProps<T> {
    heads: HeadCell<T>[];
    rows: Array<T>;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    limit: number;
    totalRows: number;
}

const Table = <T,>({ heads, rows, page, setPage, limit, totalRows }: TableProps<T>) => {
    const hasTableData = rows.length > 0;

    return (
        <>
            <div>
                <table className="w-full rounded-t shadow-md text-left overflow-hidden">
                    <thead className="uppercase bg-blue-50 text-blue-600">
                        <tr>
                            {heads.map((head) => (
                                <TableHead key={head.id}>{head.label}</TableHead>
                            ))}
                        </tr>
                    </thead>
                    {hasTableData && (
                        <tbody>
                            {rows.map((row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {heads.map((head: HeadCell<T>) => (
                                        <TableDataCell key={`td${rowIndex}${head.id}`}>
                                            <>{row[head.id]}</>
                                        </TableDataCell>
                                    ))}
                                </TableRow>
                            ))}
                        </tbody>
                    )}
                </table>

                {hasTableData && <TablePagination limit={limit} page={page} setPage={setPage} totalRows={totalRows} />}
            </div>

            {!hasTableData && (
                <div className="w-full py-6 rounded-b shadow-md bg-white rounded-b text-center font-medium text-xl text-gray-500">
                    <p>No results found.</p>
                </div>
            )}
        </>
    );
};

export default Table;
