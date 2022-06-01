import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Card,
  Link,
  useColorMode,
  Container,
} from "theme-ui";
import { SearchBar } from "components/SearchBar";
import styled from "@emotion/styled";
import ProfilePreviewIllustration from "assets/ProfilePreviewIllustration.png";
import NFTIllustration from "assets/NFTIllustration.png";
import CrossChainIllustration from "assets/CrossChainIllustration.png";
import { NewTabLink } from "components/NewTabLink";
import { LogoIcon } from "icons/LogoIcon";
import { ReactComponent as DiscordLogo } from "assets/discord.svg";
import { ReactComponent as TwitterLogo } from "assets/twitter.svg";
import { ReactComponent as GithubLogo } from "assets/github.svg";
import { PARTNER_LIST } from "partner-list";

const Title = styled(Heading)({
  fontWeight: 600,
  marginBottom: "4px",
});

const Subtitle = styled(Heading)({
  fontWeight: 600,
  lineHeight: "28px",
  color: "var(--theme-ui-colors-primaryTextColor)",
  marginBottom: "24px",
});

const Description = styled(Text)({
  lineHeight: "28px",
});
const ColoredDescription = styled(Description)({
  color: "var(--theme-ui-colors-primaryTextColor)",
  whiteSpace: "nowrap",
});

const Header = styled(Heading)({
  fontSize: "24px",
});
const ColoredHeader = styled(Heading)({
  fontWeight: 600,
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
const CardTitle = styled(Heading)({});
const CardText = styled(Text)({});
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
      <Flex sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Title as="h1" variant="splash.title">
          Nomspace
        </Title>
        <Link
          sx={{ fontSize: 5, color: "white" }}
          target="_blank"
          rel="noopener noreferrer"
          href="https://docs.nom.space"
        >
          Docs
        </Link>
      </Flex>
      <Subtitle variant="splash.subtitle">One Nom to rule them all.</Subtitle>
      <Description variant="splash.description">
        Wallet addresses are hard to remember.{" "}
        <ColoredDescription variant="splash.description">
          Names aren't.
        </ColoredDescription>
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
        {/* <Heading as="h1" mb={4} sx={{ fontSize: "42px" }}>
          Nomspace
        </Heading> */}
      </Box>
      <SearchBar placeHolder="Reserve a nom" />

      <StyledCard mt="42px">
        <CardTitle as="h3" variant="splash.card.title">
          A Cross-chain Name
        </CardTitle>
        <CardText variant="splash.card.text">
          <strong>Reserve once and use everywhere.</strong>
          <br />
          Why manage a different name service for every chain when you can use
          one?
        </CardText>
        <CardImage src={CrossChainIllustration} />
      </StyledCard>
      <StyledCard mt="42px">
        <CardTitle as="h3" variant="splash.card.title">
          Show off a little
        </CardTitle>
        <CardText variant="splash.card.text">
          Every .nom comes with a domain to show off your growing art
          collection.
          <br /> <strong>Showcase more than just a PFP.</strong>
        </CardText>
        <CardImage src={NFTIllustration} />
      </StyledCard>
      <StyledCard mt="42px">
        <CardTitle as="h3" variant="splash.card.title">
          You Are What You Do
        </CardTitle>
        <CardText variant="splash.card.text">
          <strong>Put your coins where your mouth is.</strong>
          <br /> Use your .nom landing page to show your assets + favorite
          projects.
        </CardText>
        <CardImage src={ProfilePreviewIllustration} />
      </StyledCard>

      <Header as="h2" mt="50px" sx={{ textAlign: "center" }}>
        Integrated with
      </Header>
      <Flex
        sx={{
          justifyContent: "space-evenly",
          mt: "30px",
          flexWrap: "wrap",
          "> *": { mx: 30, mt: 20 },
        }}
      >
        {PARTNER_LIST.map(
          ({ href, lightImageSrc, darkImageSrc, text }, idx) => (
            <Container
              sx={{
                width: ["100%", "fit-content"],
                mb: 8,
              }}
            >
              <NewTabLink key={idx} href={href}>
                <Flex
                  sx={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    sx={{ height: "40px" }}
                    src={colorMode === "dark" ? darkImageSrc : lightImageSrc}
                  />
                  {text && <Text sx={{ ml: 4 }}>{text}</Text>}
                </Flex>
              </NewTabLink>
            </Container>
          )
        )}
      </Flex>

      <Header as="h2" mt="64px" sx={{ fontSize: ["24px", "28px", "35px"] }}>
        Nomspace
      </Header>
      <ColoredHeader sx={{ fontSize: ["20px", "28px", "35px"] }}>
        Mint your name as an NFT.
      </ColoredHeader>
      <Text my="12px" sx={{ fontSize: ["18px", null, "25px"] }}>
        All .nom's are NFTs which means you can easily transfer and sell them.
      </Text>
      <SearchBar />
      <Flex
        sx={{
          mt: "42px",
          mb: "21px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "> *": {
            marginRight: 20,
            marginLeft: 20,
            textDecoration: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          "> * > *": {
            height: "32px",
            width: "32px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          ">  * *": {
            fill: "var(--theme-ui-colors-primaryTextColor) !important",
          },
        }}
      >
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/Nomspace"
          style={{ textDecoration: "none" }}
        >
          <GithubLogo />
        </Link>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/Nomspace_nom"
          style={{ textDecoration: "none" }}
        >
          <TwitterLogo />
        </Link>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://discord.gg/3g9zRPRAPH"
          style={{ textDecoration: "none" }}
        >
          <DiscordLogo />
        </Link>
      </Flex>
    </Flex>
  );
};
