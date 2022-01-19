import { CustomModal } from "components/Modal/CustomModal";
import { ModalContent } from "@mattjennings/react-modal";
import React from "react";
import { ExtendView } from "components/Modal/ExtendView";

interface Props {
  open: boolean;
  onClose: () => void;
  name: string;
}

export const ExtendModal: React.FC<Props> = ({ open, onClose, name }) => {
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
        <ExtendView onClose={onClose} name={name} />
      </ModalContent>
    </CustomModal>
  );
};
