import React from "react";
import { CustomModal } from "components/Modal/CustomModal";
import { ModalContent } from "@mattjennings/react-modal";
import { useNFTs } from "hooks/useNFTs";
import { Box, Text, Heading } from "theme-ui";
import { useSetNomSetting } from "hooks/useSetNomSetting";
import { TextKey } from "config";
import { useName } from "hooks/useName";
import { NFTCarousel } from "components/NFTCarousel";
import { useWindowDimensions } from "hooks/useWindowDimensions";
import { Breakpoint, useBreakpoint } from "hooks/useBreakpoint";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const ChangePFPModal: React.FC<Props> = ({ open, onClose }) => {
  const { name, namehash } = useName();
  const [nftMetadata] = useNFTs();
  const { setNomSetting } = useSetNomSetting(name);
  const changePFP = React.useCallback(
    async (avatarUrl: string) => {
      await setNomSetting(["setText"], [[namehash, TextKey.AVATAR, avatarUrl]]);
      onClose();
    },
    [namehash, onClose, setNomSetting]
  );

  const { width } = useWindowDimensions();
  const breakpoint = useBreakpoint();

  if (nftMetadata == null) return null;
  const groups = Object.entries(
    nftMetadata?.reduce((acc, nft) => {
      if (!acc[nft.name]) acc[nft.name] = [];
      acc[nft.name].push(nft);
      return acc;
    }, {})
  ).map(([name, group], idx) => {
    return (
      <>
        <Heading sx={{ fontSize: 36, mb: 8 }} key={name + "heading"}>
          {name}
        </Heading>
        <Box
          key={name + "img"}
          sx={{
            height: 200,
            width: [width - 100, width - 200],
            mb: 32,
            "> *": {
              width: [width - 100 + " !important", width - 200 + " !important"],
            },
            "> * > *": {
              width: [width - 100 + " !important", width - 200 + " !important"],
            },
          }}
        >
          <NFTCarousel
            tokens={group as any}
            onItemClick={(i) => changePFP((group as any)[i].image)}
            width={breakpoint == Breakpoint.DESKTOP ? width - 300 : width - 150}
          />
        </Box>
      </>
    );
  });

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      showClose={true}
      sx={{ padding: 0 }}
    >
      <ModalContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflowX: "hidden",
          px: "0",
        }}
      >
        <Text
          variant="modal.title"
          sx={{ marginTop: "1.2rem", paddingLeft: "1.2rem" }}
        >
          Select new profile picture
        </Text>
        {groups}
      </ModalContent>
    </CustomModal>
  );
};
