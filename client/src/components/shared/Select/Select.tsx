import { ErrorMessage } from '../index';

interface SelectProps {
    children: React.ReactNode;
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    label: string;
    hasError?: boolean;
    errorMessage?: string;
}

const Select = ({ children, name, value, onChange, label, hasError, errorMessage }: SelectProps) => {
    return (
        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
            <select
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight${
                    hasError ? ` outline outline-1 outline-red-500` : ' focus:outline-none focus:shadow-outline'
                }`}
                name={name}
                value={value}
                onChange={onChange}
            >
                <option value="" disabled>
                    Choose an option
                </option>
                {children}
            </select>
            {hasError && <ErrorMessage message={errorMessage} />}
        </div>
    );
};

export default Select;
