import { CustomModal } from "components/Modal/CustomModal";
import { ModalContent } from "@mattjennings/react-modal";
import React from "react";
import { ReserveView } from "components/Modal/ReserveView";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const ReserveModal: React.FC<Props> = ({ open, onClose }) => {
  return (
    <CustomModal open={open} onClose={onClose}>
      <ModalContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflowX: "hidden",
        }}
      >
        <ReserveView />
      </ModalContent>
    </CustomModal>
  );
};
