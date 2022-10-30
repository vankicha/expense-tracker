const ErrorMessage = ({ message }: { message?: string }) => {
    return message ? <div className="text-sm text-red-500 italic mt-1">{message}</div> : null;
};

export default ErrorMessage;
