import { CustomModal } from "components/Modal/CustomModal";
import { ModalContent } from "@mattjennings/react-modal";
import React from "react";
import { ReserveView } from "components/Modal/ReserveView";

interface Props {
  open: boolean;
  onClose: () => void;
  name: string;
}

export const ReserveModal: React.FC<Props> = ({ open, onClose, name }) => {
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
        <ReserveView name={name} />
      </ModalContent>
    </CustomModal>
  );
};
