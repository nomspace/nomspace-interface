import { Modal } from "@mattjennings/react-modal";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const CustomModal: React.FC<Props> = ({ open, onClose, children }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      animations={{
        default: {
          enter: {
            y: 0,
            transition: {
              duration: 0.3,
              ease: "easeInOut",
            },
          },
          exit: {
            y: "-100vh",

            transition: {
              duration: 0.3,
              ease: "easeInOut",
            },
          },
        },
        fullScreen: {
          enter: {
            opacity: 1,
          },
          exit: {
            opacity: 0,
          },
        },
      }}
    >
      {children}
    </Modal>
  );
};
