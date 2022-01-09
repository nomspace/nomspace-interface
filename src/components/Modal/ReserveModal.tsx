import { CustomModal } from "components/Modal/CustomModal";
import { ModalContent } from "@mattjennings/react-modal";
import { Flex, Text } from "theme-ui";
import React, { useEffect } from "react";
import { Reserve } from "pages/Reserve";
import { useRef } from "react";

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
        <Reserve />
      </ModalContent>
    </CustomModal>
  );
};
