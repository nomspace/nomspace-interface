import React from "react";
import { Modal } from "../react-modal";
import { ModalContent } from "@mattjennings/react-modal";
import { useNFTs } from "hooks/useNFTs";
import { Box, Spinner, Image, Text } from "theme-ui";

import { AccountProfile } from "components/AccountProfile";
import { useContractKit } from "@celo-tools/use-contractkit";

interface Props {
  setBetaVerified: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BetaModal: React.FC<Props> = ({ setBetaVerified }) => {
  const [walletConnected, setWalletConnected] = React.useState(false);
  const [hasNomstronaut, setHasNomstronaut] = React.useState(false);
  const [emptyAccount, setEmptyAccount] = React.useState(false);

  const { address } = useContractKit();
  const [nftMetadata] = useNFTs();

  // check if have nomstronaut
  React.useEffect(() => {
    nftMetadata?.forEach((e) => {
      if (e.name.includes("Nomstronaut")) {
        setHasNomstronaut(true);
      }
    });
    if (nftMetadata === undefined) {
      console.log("set");
      setEmptyAccount(true);
    }
    console.log("nft", nftMetadata);
  }, [nftMetadata]);

  // check if wallet connected
  React.useEffect(() => {
    if (address != null) {
      setWalletConnected(true);
    }
  }, [address]);

  // update hook to allow nomstronaut holders access to site
  React.useEffect(() => {
    if (walletConnected && hasNomstronaut) {
      setBetaVerified(true);
    }
  }, [walletConnected, hasNomstronaut, setBetaVerified]);

  return (
    <Modal
      sx={{ zIndex: 0 }}
      zIndex="0"
      variant={"beta"}
      open={!(walletConnected && hasNomstronaut)}
      backdropVariant="betaBackdrop"
      onClose={() => {}}
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
    >
      <ModalContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflowX: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: ["0px 10vw", null, "0px 20vw", "0px 15vw"],
          }}
        >
          <Text variant="modal.title">NomSpace 2.0 Beta</Text>
          <Text variant="modal.text">
            Welcome! In order to access the Beta, you must:
          </Text>
          <Text
            variant="modal.text"
            sx={{ width: "100%", marginLeft: "25px", textAlign: "left" }}
          >
            <b>1.</b> Connect your wallet.
          </Text>
          <Text
            variant="modal.text"
            sx={{ width: "100%", marginLeft: "25px", textAlign: "left" }}
          >
            <b>2.</b> Own an official Nomstronaut NFT.
          </Text>

          <Text variant="modal.title">Status:</Text>

          <>
            {address != null ? (
              nftMetadata != null || emptyAccount ? (
                <>
                  <Text variant="modal.text" sx={{ textAlign: "center" }}>
                    Sorry, It looks like you don't own an official Nomstronaut
                    NFT!
                  </Text>
                  <Image
                    src="https://media1.giphy.com/media/vsvBFlxjvLoME/giphy.gif?cid=790b7611b73ecc2c208736326b1384f15ecdfb074b687a85&amp;rid=giphy.gif&amp;ct=g"
                    alt="Shocked Jaw Drop GIF"
                    sx={{
                      width: "450px",
                      height: "225px",
                    }}
                  />
                  <Text variant="modal.text" sx={{ textAlign: "center" }}>
                    Don't worry! Nomspace 2.0 will become to available to
                    everyone on {"<date here>"}
                  </Text>
                </>
              ) : (
                <Spinner />
              )
            ) : (
              <>
                <Text variant="modal.text" sx={{ textAlign: "center" }}>
                  Wallet not connected.
                </Text>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <AccountProfile />
                </Box>
              </>
            )}
          </>
        </Box>
      </ModalContent>
    </Modal>
  );
};
