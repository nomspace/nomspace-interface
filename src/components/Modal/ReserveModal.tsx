import { CustomModal } from "components/Modal/CustomModal";
import { ModalContent } from "@mattjennings/react-modal";
import { Flex, Text } from "theme-ui";
import React from "react";
import { Reserve } from "pages/Reserve";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const ReserveModal: React.FC<Props> = ({ open, onClose }) => {
  return (
    <CustomModal open={open} onClose={onClose}>
      <ModalContent>
        <Text variant="modal.title">Reserve a Nom</Text>
        <Flex variant="modal.container">
          <Reserve />
        </Flex>
      </ModalContent>
    </CustomModal>
  );
};
