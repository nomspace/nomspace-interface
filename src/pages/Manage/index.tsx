import React, { useCallback, useRef } from "react";
import { useNom } from "hooks/useNom";
import { useContractKit } from "@celo-tools/use-contractkit";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Image,
  Text,
  Input,
  Label,
  Spinner,
} from "theme-ui";
import { ZERO_ADDRESS } from "utils/constants";
import { useSetNomSetting } from "hooks/useSetNomSetting";
import { useName } from "hooks/useName";
import { Sidebar } from "components/Sidebar";

/* ASSETS */
import pfp from "pages/SearchDetail/assets/pfp.png";
import banner from "pages/SearchDetail/assets/banner.png";

// connections

/* DEMO PURPOSES, DELETE LATER */
// nfts

// tokens

// stats

// sources
import s1 from "pages/SearchDetail/assets/s1.png";
import s2 from "pages/SearchDetail/assets/s2.png";
import s3 from "pages/SearchDetail/assets/s3.png";

// nomstronaut

//noms
import styled from "@emotion/styled";
import { TextKey } from "config";
import { useHistory } from "react-router-dom";

const sources = [{ img: s1 }, { img: s2 }, { img: s3 }];

/* DEMO PURPOSES, DELETE LATER */

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
  const [nom, refetchNom] = useNom(name);
  const { setNomSetting } = useSetNomSetting(name);
  const bioInput = useRef<HTMLInputElement>(null);
  const websiteInput = useRef<HTMLInputElement>(null);
  const twitterInput = useRef<HTMLInputElement>(null);
  const discordInput = useRef<HTMLInputElement>(null);
  const telegramInput = useRef<HTMLInputElement>(null);
  const history = useHistory();

  const isOwner =
    address && nom && nom.owner.toLowerCase() === address.toLowerCase();

  // TODO: Text validation
  const onSave = useCallback(async () => {
    const newBio = bioInput.current?.value;
    const newWebsite = websiteInput.current?.value;
    const newTwitter = twitterInput.current?.value;
    const newDiscord = discordInput.current?.value;
    const newTelegram = telegramInput.current?.value;

    if (nom?.bio !== newBio) {
      await setNomSetting("setText", [namehash, TextKey.DESCRIPTION, newBio]);
      refetchNom();
    }
    if (nom?.website !== newWebsite) {
      await setNomSetting("setText", [namehash, TextKey.URL, newWebsite]);
      refetchNom();
    }
    if (nom?.twitter !== newTwitter) {
      await setNomSetting("setText", [namehash, TextKey.TWITTER, newTwitter]);
      refetchNom();
    }
    if (nom?.discord !== newDiscord) {
      await setNomSetting("setText", [namehash, TextKey.DISCORD, newDiscord]);
      refetchNom();
    }
    if (nom?.telegram !== newTelegram) {
      await setNomSetting("setText", [namehash, TextKey.DISCORD, newTelegram]);
      refetchNom();
    }
    history.push(`/${name}`);
  }, [nom, history, name, setNomSetting, namehash, refetchNom]);

  return (
    <Flex
      sx={{
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {name ? (
        <Box sx={{ textAlign: "center", width: "100%" }}>
          <Card sx={{ width: "100%" }} py={4} px={3}>
            {nom && nom.owner !== ZERO_ADDRESS && isOwner ? (
              <>
                {/* Modals */}
                <Flex>
                  {/* Sidebar */}
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
                          backgroundImage: `url(${banner})`,
                        }}
                      />
                      <Image variant="search.banner.avatar" src={pfp} />
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
                      <Flex variant="search.details.heading">
                        {/* Name & Heading */}
                        <Box variant="search.name.container">
                          <Flex variant="search.name.nameContainer">
                            <Heading variant="search.name.heading">
                              {name}
                            </Heading>
                            <Heading
                              variant="search.name.heading"
                              sx={{ color: "#D9D9D9" }}
                            >
                              .nom
                            </Heading>
                            {sources.map((e) => {
                              return (
                                <Box variant="search.name.source.imageContainer">
                                  <Box
                                    variant="search.name.source.image"
                                    sx={{
                                      backgroundImage: `url(${e.img})`,
                                    }}
                                  ></Box>
                                </Box>
                              );
                            })}
                          </Flex>
                        </Box>

                        {/*Inputs*/}
                        <EditSection>
                          <StyledLabel>Bio</StyledLabel>
                          <StyledInput ref={bioInput} defaultValue={nom?.bio} />
                          <StyledLabel>Website</StyledLabel>
                          <StyledInput
                            ref={websiteInput}
                            defaultValue={nom?.website}
                          />
                          <StyledLabel>Twitter</StyledLabel>
                          <StyledInput
                            ref={twitterInput}
                            defaultValue={nom?.twitter}
                          />
                          <StyledLabel>Discord</StyledLabel>
                          <StyledInput
                            ref={discordInput}
                            defaultValue={nom?.discord}
                          />
                          <StyledLabel>Telegram</StyledLabel>
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
          </Card>
        </Box>
      ) : (
        <Text>Name is invalid. Try searching again.</Text>
      )}
    </Flex>
  );
};
