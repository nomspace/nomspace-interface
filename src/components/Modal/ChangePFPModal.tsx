import React, { ReactElement } from "react";
import { CustomModal } from "components/Modal/CustomModal";
import { ModalContent } from "@mattjennings/react-modal";
import { useNFTs } from "hooks/useNFTs";
import { Box, Spinner, Image, Text } from "theme-ui";
import { useSetNomSetting } from "hooks/useSetNomSetting";
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
  const [NftRow, setNftRow] = React.useState(<></>);
  const changePFP = React.useCallback(
    async (avatarUrl: string) => {
      await setNomSetting(["setText"], [[namehash, TextKey.AVATAR, avatarUrl]]);
      onClose();
    },
    [namehash, onClose, setNomSetting]
  );

  React.useEffect(() => {
    if (nftMetadata == null) return;
    type parsedNFT = {
      [key: string]: ReactElement[];
    };
    let parsed: parsedNFT = {};

    nftMetadata?.forEach((t, idx) => {
      // assuming NFT names go like this:
      // <name> #0000
      let name: string = t.name;
      name = name.substring(0, name.lastIndexOf(" "));

      if (parsed[name] === undefined) {
        parsed[name] = [];
      }
      parsed[name]?.push(
        <Box variant="search.nft.imageContainer" key={name + idx}>
          <Spinner />
          <Image
            variant="search.nft.image"
            src={t.image}
            sx={{ display: "none", cursor: "pointer" }}
            onLoad={(e) => {
              (e.target as HTMLImageElement).previousSibling?.remove();
              (e.target as HTMLImageElement).style.display = "block";
            }}
            onClick={() => changePFP(t.image)}
          ></Image>
        </Box>
      );
    });

    let elms: ReactElement[] = [];
    for (const nftName in parsed) {
      elms.push(
        <Text
          variant="modal.text"
          key={nftName + "title"}
          sx={{ paddingLeft: "1.2rem" }}
        >
          <b>{nftName}</b>
        </Text>
      );
      elms.push(
        <Box variant="search.rowScrollContainer" key={nftName + "row"}>
          {parsed[nftName]}
        </Box>
      );
    }

    setNftRow(<>{elms}</>);
  }, [nftMetadata, changePFP]);

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
        <Box
          sx={{
            overflow: "auto",

            width: "100%",
            overflowY: "visible",
            paddingBottom: 20,
            "::-webkit-scrollbar-thumb": {
              // backgroundColor: "transparent",
            },
          }}
        >
          {nftMetadata != null ? NftRow : <Spinner />}
        </Box>
      </ModalContent>
    </CustomModal>
  );
};
