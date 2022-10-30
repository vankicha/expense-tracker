type SwitchSideOptions = {
    text: string;
    textColor: string;
    backgroundColor: string;
};

interface DoubleSwitchProps {
    leftSideOptions: SwitchSideOptions;
    rightSideOptions: SwitchSideOptions;
    isChecked: boolean;
    onChange: () => void;
}

const DoubleSwitch = ({ leftSideOptions, rightSideOptions, isChecked, onChange }: DoubleSwitchProps) => {
    return (
        <label className="mx-auto inline-flex relative items-center cursor-pointer" htmlFor="double-switch">
            <span className={`mr-3 text-sm font-medium ${leftSideOptions.textColor}${isChecked ? ' opacity-50' : ''}`}>
                {leftSideOptions.text}
            </span>
            <input
                className="sr-only peer"
                id="double-switch"
                type="checkbox"
                checked={isChecked}
                onChange={onChange}
            />
            <div
                className={`relative w-[36px] h-[20px] ${
                    isChecked ? rightSideOptions.backgroundColor : leftSideOptions.backgroundColor
                } rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[16px] after:w-[16px] after:transition-all`}
            />
            <span
                className={`ml-3 text-sm font-medium ${rightSideOptions.textColor}${!isChecked ? ' opacity-50' : ''}`}
            >
                {rightSideOptions.text}
            </span>
        </label>
    );
};

export default DoubleSwitch;
