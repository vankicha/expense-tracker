import { ErrorMessage } from '../index';

interface InputFieldProps {
    name: string;
    type?: string;
    step?: string;
    placeholder?: string;
    value?: string | number;
    label: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    hasError?: boolean;
    errorMessage?: string;
}

const InputField = ({
    name,
    type,
    step,
    placeholder,
    value,
    label,
    onChange,
    hasError,
    errorMessage,
}: InputFieldProps) => {
    return (
        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
            <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight${
                    hasError ? ` outline outline-1 outline-red-500` : ' focus:outline-none focus:shadow-outline'
                }`}
                name={name}
                type={type || 'text'}
                step={step || 0}
                value={value || ''}
                placeholder={placeholder || ''}
                onChange={onChange}
            />
            {hasError && <ErrorMessage message={errorMessage} />}
        </div>
    );
};

export default InputField;
