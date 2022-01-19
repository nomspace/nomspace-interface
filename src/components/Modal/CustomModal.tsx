import { Modal } from "../react-modal";
import { X } from "phosphor-react";
import { ThemeUIStyleObject } from "theme-ui";

interface Props {
  open: boolean;
  onClose?: () => void;
  showClose?: boolean;
  sx?: ThemeUIStyleObject | undefined;
}

export const CustomModal: React.FC<Props> = ({
  open,
  onClose,
  showClose = false,
  children,
  sx,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      fullScreen={false}
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
      }}
      sx={sx}
    >
      {showClose && (
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            cursor: "pointer",
          }}
          onClick={onClose}
        >
          <X size={32} />
        </div>
      )}
      {children}
    </Modal>
  );
};
