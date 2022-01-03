import React from "react";
import { Box, Flex, Heading, Text, Image, Card } from "theme-ui";
import { SearchBar } from "components/SearchBar";
import styled from "@emotion/styled";
import { BlockText } from "components/BlockText";
import Illustration from "assets/SpaceDiscovery.svg";
import CeloImage from "assets/Celo.png";
import AvalancheImage from "assets/Avalanche.png";
import PolygonImage from "assets/Polygon.png";
import UbeswapImage from "assets/Ubeswap.png";
import MobiusImage from "assets/Mobius.png";

const Title = styled(Heading)({
  fontSize: "40px",
  fontWeight: "bold",
  marginBottom: "4px",
});

const Subtitle = styled(BlockText)({
  fontSize: "28px",
  fontWeight: "bold",
  lineHeight: "28px",
  color: "var(--theme-ui-colors-primaryTextColor)",
  marginBottom: "24px",
});

const Description = styled(Text)({
  fontSize: "28px",
  lineHeight: "28px",
});

const ColoredDescription = styled(Description)({
  color: "var(--theme-ui-colors-primaryTextColor)",
});

const Header = styled(Heading)({
  fontSize: "24px",
});
const ColoredHeader = styled(Header)({
  color: "var(--theme-ui-colors-primaryTextColor)",
});

const TokenLogo = styled(Image)({
  height: "68px",
  width: "68px",
});

const StyledCard = styled(Card)({
  textAlign: "center",
  padding: "28px 24px",
  borderRadius: "20px",
});
const CardTitle = styled(Heading)({
  fontSize: "25px",
  marginBottom: "12px",
});
const CardText = styled(Text)({
  fontWeight: "bold",
  fontSize: "16px",
  color: "var(--theme-ui-colors-primaryTextColor)",
});

export const Search: React.FC = () => {
  return (
    <Flex
      sx={{
        flexDirection: "column",
        justifyContent: "center",
        mt: "42px",
        mx: "28px",
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
      <Flex sx={{ justifyContent: "center", mt: "50px" }}>
        <Header as="h2" mr="8px">
          Your Crypto
        </Header>
        <ColoredHeader as="h2">Identity</ColoredHeader>
      </Flex>
      <Flex sx={{ justifyContent: "space-evenly", mt: "50px" }}>
        <TokenLogo src={CeloImage} />
        <TokenLogo src={AvalancheImage} />
        <TokenLogo src={PolygonImage} />
      </Flex>
      <StyledCard mt="42px">
        <CardTitle as="h3">A Cross-chain Name</CardTitle>
        <CardText>
          <strong>Reserve once and use everywhere.</strong>
          Why manage a different name service for every chain when you can use
          one?
        </CardText>
      </StyledCard>
      <StyledCard mt="42px">
        <CardTitle as="h3">Show off a little</CardTitle>
        <CardText>
          Every .nom comes with a domain to show off your growing art
          collection. <strong>Showcase more than just a PFP.</strong>
        </CardText>
      </StyledCard>
      <StyledCard mt="42px">
        <CardTitle as="h3">You Are What You Do</CardTitle>
        <CardText>
          <strong>Put your coins where your mouth is.</strong> Use your .nom
          landing page to show your assets + favorite projects.
        </CardText>
      </StyledCard>

      <Header as="h2" mt="50px">
        Integrated with
      </Header>
      <Flex sx={{ justifyContent: "space-evenly", mt: "30px" }}>
        <Image src={UbeswapImage} />
        <Image src={MobiusImage} />
      </Flex>

      <Header as="h2" mt="64px">
        Nomspace
      </Header>
      <ColoredHeader>Mint your name as an NFT.</ColoredHeader>
      <Text my="12px">
        All .nom's are NFTs which means you can easily transfer and sell them.
      </Text>
      <SearchBar />
    </Flex>
  );
};
