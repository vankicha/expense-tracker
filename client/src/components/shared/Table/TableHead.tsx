const TableHead = ({ children }: { children: React.ReactNode }) => (
    <th scope="col" className="py-3 px-6">
        {children}
    </th>
);

export default TableHead;
