import React from "react";
import { Modal } from "../react-modal";
import { ModalContent } from "@mattjennings/react-modal";
import { Box, Spinner, Image, Text } from "theme-ui";
import { useHasNomstronauts } from "hooks/useHasNomstronauts";
import { AccountProfile } from "components/AccountProfile";
import { useContractKit } from "@celo-tools/use-contractkit";
import { useUserNoms } from "hooks/useUserNoms";

interface Props {
  setBetaVerified: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BetaModal: React.FC<Props> = ({ setBetaVerified }) => {
  const { address } = useContractKit();
  const [hasNomstronaut] = useHasNomstronauts();
  const [userNoms] = useUserNoms();

  // update hook to allow nomstronaut holders access to site
  const betaVerified =
    address && (hasNomstronaut || (userNoms?.length ?? 0) > 0);
  React.useEffect(() => {
    if (betaVerified) {
      setBetaVerified(true);
    }
  }, [hasNomstronaut, setBetaVerified, address, betaVerified]);

  return (
    <Modal
      sx={{ zIndex: 0 }}
      zIndex="0"
      variant={"beta"}
      open={!betaVerified}
      backdropVariant="betaBackdrop"
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
          {address != null ? (
            <></>
          ) : (
            <>
              {" "}
              <Text variant="modal.title">Nomspace 2.0 Beta</Text>
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
                <b>2.</b> Own an official Nomstronaut NFT or own an existing
                .nom
              </Text>
            </>
          )}
          <Text variant="modal.title">Status:</Text>
          <>
            {address != null ? (
              hasNomstronaut != null ? (
                <>
                  <Text variant="modal.text" sx={{ textAlign: "center" }}>
                    Sorry, It looks like you don't own an official Nomstronaut
                    NFT or .nom!
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
                  <Text variant="modal.text" sx={{ textAlign: "center" }}>
                    ___________
                  </Text>
                  <Text variant="modal.text" sx={{ textAlign: "center" }}>
                    Connect a different wallet.
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
