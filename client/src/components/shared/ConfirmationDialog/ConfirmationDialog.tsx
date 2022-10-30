import { useState } from 'react';

import { Button, Modal } from '../index';

interface ConfirmationDialogProps {
    children: React.ReactNode;
    isOpen: boolean;
    handleClose: () => void;
    handleSubmit: () => void;
}

const ConfirmationDialog = ({ children, isOpen, handleClose, handleSubmit }: ConfirmationDialogProps) => {
    const [isTransitioning, setTransitioning] = useState<boolean>(false);

    const handleCloseWithTransitioning = () => {
        setTransitioning(true);
        setTimeout(() => {
            setTransitioning(false);
            handleClose();
        }, 300);
    };

    return (
        <Modal
            isOpen={isOpen}
            isTransitioning={isTransitioning}
            handleCloseWithTransitioning={handleCloseWithTransitioning}
        >
            <div className="flex justify-center mb-5">{children}</div>
            <div className="flex gap-2 justify-center">
                <Button onClick={handleCloseWithTransitioning}>Discard</Button>
                <Button
                    onClick={() => {
                        handleSubmit();
                        handleCloseWithTransitioning();
                    }}
                    variant="contained-blue"
                >
                    Confirm
                </Button>
            </div>
        </Modal>
    );
};

export default ConfirmationDialog;
