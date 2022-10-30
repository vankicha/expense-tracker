const ContainerWrapper = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex flex-col gap-8 h-full">{children}</div>;
};

const Flex = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex gap-5">{children}</div>;
};

ContainerWrapper.Flex = Flex;

export default ContainerWrapper;
