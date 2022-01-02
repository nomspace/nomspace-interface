import React from "react";
import { Box, Flex, Heading, Text, Image } from "theme-ui";
import { SearchBar } from "components/SearchBar";
import styled from "@emotion/styled";
import { BlockText } from "components/BlockText";
import Illustration from "assets/SpaceDiscovery.svg";

const Title = styled(Heading)({
  fontSize: "40px",
  fontWeight: "bold",
  marginBottom: "4px",
});

const Subtitle = styled(BlockText)({
  fontSize: "28px",
  fontWeight: "bold",
  color: "var(--theme-ui-colors-primaryTextColor)",
  marginBottom: "24px",
});

const Description = styled(Text)({
  fontSize: "28px",
  fontWeight: "lighter",
  lineHeight: "28px",
});

const ColoredDescription = styled(Description)({
  color: "var(--theme-ui-colors-primaryTextColor)",
});

export const Search: React.FC = () => {
  return (
    <Flex
      sx={{
        flexDirection: "column",
        justifyContent: "center",
        mt: "20px",
      }}
    >
      <Title as="h1">Nom 2.0</Title>
      <Subtitle>One Nom to rule them all.</Subtitle>
      <Description>
        Wallet addresses are hard to remember.{" "}
        <ColoredDescription>Names aren't.</ColoredDescription>
      </Description>
      <Box mb={2}>
        <Image
          src={Illustration}
          sx={{
            height: ["240px", "300px"],
          }}
        />
      </Box>
      <SearchBar />
    </Flex>
  );
};
