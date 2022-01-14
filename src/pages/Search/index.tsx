import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Card,
  useColorMode,
  Link,
} from "theme-ui";
import { SearchBar } from "components/SearchBar";
import styled from "@emotion/styled";
import UbeswapDarkImage from "assets/Ubeswap_dark.png";
import MobiusDarkImage from "assets/Mobius_dark.png";
import CelotrackerDarkImage from "assets/Celotracker_dark.png";
import UbeswapLightImage from "assets/Ubeswap_light.png";
import MobiusLightImage from "assets/Mobius_light.png";
import CelotrackerLightImage from "assets/Celotracker_light.png";
import ProfilePreviewIllustration from "assets/ProfilePreviewIllustration.png";
import NFTIllustration from "assets/NFTIllustration.png";
import CrossChainIllustration from "assets/CrossChainIllustration.png";
import { GithubLogo, TwitterLogo, DiscordLogo } from "phosphor-react";
import { NewTabLink } from "components/NewTabLink";
import { LogoIcon } from "icons/LogoIcon";

const Title = styled(Heading)({
  fontSize: "40px",
  fontWeight: 600,
  marginBottom: "4px",
});

const Subtitle = styled(Heading)({
  fontSize: "28px",
  fontWeight: 600,
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
  fontWeight: 600,
});
const ColoredHeader = styled(Header)({
  color: "var(--theme-ui-colors-primaryTextColor)",
});

const StyledCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  padding: "28px 24px",
  borderRadius: "20px",
});
const CardTitle = styled(Heading)({
  fontSize: "25px",
  marginBottom: "12px",
});
const CardText = styled(Text)({
  fontSize: "16px",
  color: "var(--theme-ui-colors-primaryTextColor)",
  lineHeight: "24px",
});
const CardImage = styled(Image)({
  marginTop: "20px",
});

export const Search: React.FC = () => {
  const [colorMode] = useColorMode();

  return (
    <Flex
      sx={{
        flexDirection: "column",
        justifyContent: "center",
        mt: "42px",
        mx: ["28px", "180px"],
      }}
    >
      <Title as="h1">Nomspace</Title>
      <Subtitle>One Nom to rule them all.</Subtitle>
      <Description>
        Wallet addresses are hard to remember.{" "}
        <ColoredDescription>Names aren't.</ColoredDescription>
      </Description>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "42px",
          marginBottom: "42px",
        }}
      >
        <Box sx={{ fill: "textColor" }}>
          <LogoIcon size={128} />
        </Box>
        <Heading as="h1" mb={4} sx={{ fontSize: "42px" }}>
          Nomspace
        </Heading>
      </Box>
      <SearchBar />

      <StyledCard mt="42px">
        <CardTitle as="h3">A Cross-chain Name</CardTitle>
        <CardText>
          <strong>Reserve once and use everywhere.</strong>
          <br />
          Why manage a different name service for every chain when you can use
          one?
        </CardText>
        <CardImage src={CrossChainIllustration} />
      </StyledCard>
      <StyledCard mt="42px">
        <CardTitle as="h3">Show off a little</CardTitle>
        <CardText>
          Every .nom comes with a domain to show off your growing art
          collection. <strong>Showcase more than just a PFP.</strong>
        </CardText>
        <CardImage src={NFTIllustration} />
      </StyledCard>
      <StyledCard mt="42px">
        <CardTitle as="h3">You Are What You Do</CardTitle>
        <CardText>
          <strong>Put your coins where your mouth is.</strong> Use your .nom
          landing page to show your assets + favorite projects.
        </CardText>
        <CardImage src={ProfilePreviewIllustration} />
      </StyledCard>

      <Header as="h2" mt="50px">
        Integrated with
      </Header>
      <Flex
        sx={{ justifyContent: "space-evenly", mt: "30px", flexWrap: "wrap" }}
      >
        <NewTabLink href="https://ubeswap.org">
          <Image
            sx={{ height: "40px" }}
            src={colorMode === "dark" ? UbeswapDarkImage : UbeswapLightImage}
          />
        </NewTabLink>
        <NewTabLink href="https://mobius.money">
          <Image
            sx={{ height: "40px" }}
            src={colorMode === "dark" ? MobiusDarkImage : MobiusLightImage}
          />
        </NewTabLink>
        <NewTabLink href="https://celotracker.com">
          <Image
            sx={{ height: "40px" }}
            src={
              colorMode === "dark"
                ? CelotrackerDarkImage
                : CelotrackerLightImage
            }
          />
        </NewTabLink>
      </Flex>

      <Header as="h2" mt="64px">
        Nomspace
      </Header>
      <ColoredHeader>Mint your name as an NFT.</ColoredHeader>
      <Text my="12px">
        All .nom's are NFTs which means you can easily transfer and sell them.
      </Text>
      <SearchBar />
      <Flex sx={{ justifyContent: "center", my: "42px" }}>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/Nomspace"
          style={{ textDecoration: "none" }}
          mr={2}
        >
          <GithubLogo size={32} />
        </Link>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/Nomspace"
          style={{ textDecoration: "none" }}
          mr={2}
        >
          <TwitterLogo size={32} />
        </Link>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://discord.gg/3g9zRPRAPH"
          style={{ textDecoration: "none" }}
        >
          <DiscordLogo size={32} />
        </Link>
      </Flex>
    </Flex>
  );
};
