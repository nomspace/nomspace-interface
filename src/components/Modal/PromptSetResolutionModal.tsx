import React from "react";
import { GlobalNom } from "hooks/useNom";
import { CustomModal } from "components/Modal/CustomModal";
import { ModalContent } from "@mattjennings/react-modal";
import { Box, Text, Button, Spinner } from "theme-ui";
import { useName } from "hooks/useName";
import { useReclaim } from "../../hooks/useReclaim";
import { useContractKit } from "@celo-tools/use-contractkit";
import { getAddress } from "ethers/lib/utils";

export const PromptSetResolutionModal: React.FC = () => {
  const { address } = useContractKit();
  const { name } = useName();
  const [nom, refetchNom] = GlobalNom.useContainer();
  const { reclaim, loading } = useReclaim(name);

  if (!nom) return null;

  return (
    <CustomModal
      open={
        address !== null &&
        nom.owner !== null &&
        nom.owner === getAddress(address) &&
        // check resolution set
        nom?.resolution !== null
      }
    >
      <ModalContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflowX: "hidden",
        }}
      >
        <Text variant="modal.title">Reclaim Ownership</Text>
        <Text variant="modal.description">
          You currently own this name, but not the record.
          <br />
          Click the button below to also own the record.
        </Text>
        <Box mt={32}>
          {loading ? (
            <Spinner />
          ) : (
            <Button
              sx={{ px: 16, py: 8 }}
              onClick={async () => {
                await reclaim();
                refetchNom();
              }}
            >
              Reclaim
            </Button>
          )}
        </Box>
      </ModalContent>
    </CustomModal>
  );
};
