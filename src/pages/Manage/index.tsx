import React, { useCallback, useRef, useState } from "react";
import { GlobalNom } from "hooks/useNom";
import { useContractKit } from "@celo-tools/use-contractkit";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  Input,
  Label,
  Spinner,
  useColorMode,
} from "theme-ui";
import { ZERO_ADDRESS } from "utils/constants";
import { useSetNomSetting } from "hooks/useSetNomSetting";
import { useName } from "hooks/useName";
import { Sidebar } from "components/Sidebar";
import defaultPFP from "assets/DefaultPFP.png";
import defaultBanner from "assets/DefaultBanner.png";
import { ChangePFPModal } from "components/Modal/ChangePFPModal";
import { isValidHttpUrl } from "utils/url";

import styled from "@emotion/styled";
import { TextKey } from "config";
import { useHistory } from "react-router-dom";
import { isAddress } from "web3-utils";
import { PencilSimple } from "phosphor-react";

const StyledLabel = styled(Label)({});
const StyledInput = styled(Input)({
  outline: 0,
  borderWidth: "0 0 2px",
  borderColor: "var(--theme-ui-colors-gray)",
  marginBottom: "24px",
});

const EditSection = styled(Box)({
  margin: "16px 64px",
});

export const Manage: React.FC = () => {
  const { name, namehash } = useName();
  const { address } = useContractKit();
  const [nom, refetchNom] = GlobalNom.useContainer();
  const { setNomSetting } = useSetNomSetting(name);
  const resolutionInput = useRef<HTMLInputElement>(null);
  const bioInput = useRef<HTMLInputElement>(null);
  const websiteInput = useRef<HTMLInputElement>(null);
  const twitterInput = useRef<HTMLInputElement>(null);
  const discordInput = useRef<HTMLInputElement>(null);
  const telegramInput = useRef<HTMLInputElement>(null);
  const history = useHistory();
  const [pfpModalOpen, setPfpModalOpen] = useState(false);
  const [colorMode] = useColorMode();

  const isOwner = address && nom?.owner && nom.owner === address;

  // TODO: Text validation
  const onSave = useCallback(async () => {
    const newResolution = resolutionInput.current?.value;
    const newBio = bioInput.current?.value;
    const newWebsite = websiteInput.current?.value;
    const newTwitter = twitterInput.current?.value;
    const newDiscord = discordInput.current?.value;
    const newTelegram = telegramInput.current?.value;

    const fragments = [];
    const values = [];

    if (nom?.resolution !== newResolution) {
      if (newResolution && isAddress(newResolution)) {
        fragments.push("setAddr(bytes32,address)");
        values.push([namehash, newResolution]);
      } else {
        alert("Invalid address entered for resolution.");
      }
    }
    if (nom?.bio !== newBio) {
      fragments.push("setText");
      values.push([namehash, TextKey.DESCRIPTION, newBio]);
    }
    if (nom?.website !== newWebsite && newWebsite) {
      const edited = `https://${newWebsite}`;
      if (isValidHttpUrl(newWebsite)) {
        fragments.push("setText");
        values.push([namehash, TextKey.URL, newWebsite]);
      } else if (isValidHttpUrl(edited)) {
        fragments.push("setText");
        values.push([namehash, TextKey.URL, edited]);
      } else {
        alert(
          "Invalid website URL. Please add http:// or https:// to the beginning"
        );
        return;
      }
    }
    if (nom?.twitter !== newTwitter && newTwitter) {
      fragments.push("setText");
      values.push([namehash, TextKey.TWITTER, newTwitter.replaceAll("@", "")]);
    }
    if (nom?.discord !== newDiscord && newDiscord) {
      fragments.push("setText");
      values.push([namehash, TextKey.DISCORD, newDiscord]);
    }
    if (nom?.telegram !== newTelegram && newTelegram) {
      fragments.push("setText");
      values.push([
        namehash,
        TextKey.TELEGRAM,
        newTelegram.replaceAll("@", ""),
      ]);
    }
    await setNomSetting(fragments, values);
    refetchNom();
    history.push(`/${name}`);
  }, [
    nom?.resolution,
    nom?.bio,
    nom?.website,
    nom?.twitter,
    nom?.discord,
    nom?.telegram,
    setNomSetting,
    refetchNom,
    history,
    name,
    namehash,
  ]);

  return (
    <>
      <ChangePFPModal
        open={pfpModalOpen}
        onClose={() => setPfpModalOpen(false)}
      />
      <Flex
        sx={{
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {name ? (
          <Box sx={{ textAlign: "center", width: "100%" }}>
            <Box
              sx={{
                width: "100%",
                backgroundColor: "background",
                boxShadow: "0 0 0px rgba(0, 0, 0, 0.125)",
              }}
            >
              {nom && nom.owner !== ZERO_ADDRESS && isOwner ? (
                <>
                  {/* Modals */}
                  <Flex>
                    <Sidebar />
                    {/* Page */}
                    <Flex
                      sx={{
                        alignItems: "center",
                        flexDirection: "column",
                        width: "100%",
                      }}
                    >
                      {/* Banner */}
                      <Box variant="search.banner.container">
                        <Box
                          variant="search.banner.image"
                          sx={{
                            backgroundImage: `url(${defaultBanner})`,
                          }}
                        />

                        <Box variant="search.banner.avatar">
                          <Image
                            sx={{
                              borderRadius: "50%",
                              filter: "blur(1px) brightness(0.7)",
                              transition: "all 0.2s ease",
                              cursor: "pointer",
                              ":hover": {
                                filter: "blur(2px) brightness(0.4)",
                              },
                            }}
                            src={nom.avatar !== "" ? nom.avatar : defaultPFP}
                            onClick={() => setPfpModalOpen(true)}
                          />
                          <Box
                            sx={{
                              cursor: "pointer",
                              position: "absolute",
                              left: "0",
                              right: "0",
                              marginLeft: "auto",
                              marginRight: "auto",
                              top: "50%",
                              transform: "translateY(-50%)",
                              height: "avatar",
                              width: "avatar",
                              display: "inline",
                              zIndex: "5",
                              pointerEvents: "none",
                            }}
                            onClick={() => setPfpModalOpen(true)}
                          >
                            <PencilSimple color="white" size={48} />
                          </Box>
                        </Box>
                        {/* nomstronaut + tip */}
                        <Flex variant="search.nomstronautTip.container">
                          <Button
                            variant="search.nomstronautTip.tip"
                            onClick={() => {
                              onSave();
                            }}
                          >
                            DONE
                          </Button>
                        </Flex>
                      </Box>

                      {/* Main Body */}
                      <Box variant="search.details.container">
                        <Flex
                          sx={{
                            flexDirection: "column",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                          }}
                        >
                          {/* Name & Heading */}
                          <Box variant="search.name.container">
                            <Flex variant="search.name.nameContainer">
                              <Heading variant="search.name.heading">
                                {name}
                              </Heading>
                              <Heading
                                variant="search.name.heading"
                                sx={{
                                  color: `${
                                    colorMode === "light"
                                      ? "#D9D9D9"
                                      : "#5e5e5e"
                                  }`,
                                }}
                              >
                                .nom
                              </Heading>
                            </Flex>
                          </Box>

                          {/*Inputs*/}
                          <EditSection>
                            <StyledLabel>Resolution</StyledLabel>
                            <StyledInput
                              ref={resolutionInput}
                              defaultValue={nom?.resolution}
                            />
                            <StyledLabel>Bio</StyledLabel>
                            <StyledInput
                              ref={bioInput}
                              defaultValue={nom?.bio}
                            />
                            <StyledLabel>Website</StyledLabel>
                            <StyledInput
                              ref={websiteInput}
                              defaultValue={nom?.website}
                            />
                            <StyledLabel>Twitter Username</StyledLabel>
                            <StyledInput
                              ref={twitterInput}
                              defaultValue={nom?.twitter}
                            />
                            <StyledLabel>Discord Username</StyledLabel>
                            <StyledInput
                              ref={discordInput}
                              defaultValue={nom?.discord}
                            />
                            <StyledLabel>Telegram Username</StyledLabel>
                            <StyledInput
                              ref={telegramInput}
                              defaultValue={nom?.telegram}
                            />
                          </EditSection>
                        </Flex>
                        {/* Footer */}
                        {/* absolutely positioned */}
                        <Box variant="search.footer.container">
                          <Box variant="search.footer.wallet"></Box>
                          <Box variant="search.footer.moreContainer">
                            <Box variant="search.footer.more"></Box>
                            <Box variant="search.footer.search"></Box>
                          </Box>
                        </Box>
                      </Box>
                    </Flex>
                  </Flex>
                </>
              ) : (
                <Spinner />
              )}
            </Box>
          </Box>
        ) : (
          <Text>Name is invalid. Try searching again.</Text>
        )}
      </Flex>
    </>
  );
};
