import { createPortal } from 'react-dom';

interface ModalProps {
    children?: React.ReactNode;
    isOpen: boolean;
    isTransitioning: boolean;
    handleCloseWithTransitioning: () => void;
}

const Backdrop = ({
    handleCloseWithTransitioning,
}: {
    handleCloseWithTransitioning: ModalProps['handleCloseWithTransitioning'];
}) => {
    return (
        <div onClick={handleCloseWithTransitioning} className="fixed w-full h-screen top-0 left-0 z-10 bg-black/75" />
    );
};

const Modal = ({ children, isOpen, isTransitioning, handleCloseWithTransitioning }: ModalProps) => {
    return isOpen ? (
        <>
            {createPortal(
                <Backdrop handleCloseWithTransitioning={handleCloseWithTransitioning} />,
                document.getElementById('backdrop-root') as HTMLElement
            )}
            {createPortal(
                <div
                    className={`absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-50 rounded shadow-md py-10 px-8 bg-white w-[450px]${
                        isOpen ? ` animate-fadeIn` : ''
                    }${isTransitioning ? ` animate-fadeOut` : ''}`}
                >
                    {children}
                </div>,
                document.getElementById('modal-root') as HTMLElement
            )}
        </>
    ) : null;
};

export default Modal;
