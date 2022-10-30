import { useEffect, useState } from 'react';
import { useFormikContext } from 'formik';

import { Button, Modal } from '../index';

import CloseIcon from 'assets/CloseIcon';

interface DialogProps {
    children: React.ReactNode;
    isOpen: boolean;
    dialogTitle: string;
    handleClose: () => void;
    handleSubmit: () => void;
}

const Dialog = ({ children, isOpen, dialogTitle, handleClose, handleSubmit }: DialogProps) => {
    const [isTransitioning, setTransitioning] = useState<boolean>(false);
    const { resetForm } = useFormikContext();

    const handleCloseWithTransitioning = () => {
        setTransitioning(true);
        setTimeout(() => {
            handleClose();
            setTransitioning(false);
        }, 300);
    };

    useEffect(() => {
        if (!isOpen) {
            resetForm();
            handleCloseWithTransitioning();
        }
    }, [isOpen]);

    return (
        <Modal
            isOpen={isOpen}
            isTransitioning={isTransitioning}
            handleCloseWithTransitioning={handleCloseWithTransitioning}
        >
            <div className="flex justify-between items-center text-gray-600">
                <h3 className="text-xl">{dialogTitle}</h3>
                <div
                    className="p-1 cursor-pointer hover:bg-gray-200 hover:rounded"
                    onClick={handleCloseWithTransitioning}
                >
                    <CloseIcon />
                </div>
            </div>
            <div className="flex my-5">{children}</div>
            <div className="flex gap-2 justify-end">
                <Button onClick={handleCloseWithTransitioning}>Discard</Button>
                <Button onClick={handleSubmit} variant="contained-blue">
                    Submit
                </Button>
            </div>
        </Modal>
    );
};

export default Dialog;
