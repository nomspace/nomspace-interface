import React from "react";
import { GlobalNom } from "hooks/useNom";
import { CustomModal } from "components/Modal/CustomModal";
import { ModalContent } from "@mattjennings/react-modal";
import { useNFTs } from "hooks/useNFTs";
import { Box, Spinner, Image, Text } from "theme-ui";
import { useSetNomSetting } from "hooks/useSetNomSetting";
import { UserNonce } from "hooks/useUserNonce";
import { TextKey } from "config";
import { useName } from "hooks/useName";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const ChangePFPModal: React.FC<Props> = ({ open, onClose }) => {
  const { name, namehash } = useName();
  const [nftMetadata] = useNFTs();
  const { setNomSetting } = useSetNomSetting(name);
  const [nonce, setNonce] = UserNonce.useContainer();
  const changePFP = React.useCallback(
    async (avatarUrl: string) => {
      if (!nonce) return;
      await setNomSetting(nonce, "setText", [
        namehash,
        TextKey.AVATAR,
        avatarUrl,
      ]);
      setNonce(nonce + 1);
      onClose();
    },
    [namehash, nonce, onClose, setNomSetting, setNonce]
  );

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
        <Text variant="modal.title">Change profile picture</Text>
        <Box variant="search.rowScrollContainer">
          {nftMetadata != null ? (
            nftMetadata?.map((t, idx) => {
              return (
                <Box variant="search.nft.imageContainer" key={idx}>
                  <Spinner />
                  <Image
                    variant="search.nft.image"
                    src={t.image}
                    sx={{ display: "none", cursor: "pointer" }}
                    onLoad={(e) => {
                      console.log("image loaded");
                      (e.target as HTMLImageElement).previousSibling?.remove();
                      (e.target as HTMLImageElement).style.display = "block";
                      console.log("image loader removed");
                    }}
                    onClick={() => changePFP(t.image)}
                  ></Image>
                </Box>
              );
            })
          ) : (
            <Spinner />
          )}
        </Box>
      </ModalContent>
    </CustomModal>
  );
};
