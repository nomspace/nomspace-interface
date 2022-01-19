import styled from "@emotion/styled";
import { Flex, Text, Box } from "theme-ui";

import { ReactComponent as DiscordLogo } from "assets/discord.svg";
import { ReactComponent as TwitterLogo } from "assets/twitter.svg";
import { ReactComponent as TelegramLogo } from "assets/telegram.svg";

import { NewTabLink } from "components/NewTabLink";

const Website = styled(Text)({
  width: "46px",
  height: "46px",
  marginRight: "12px",
  padding: "7px",
  backgroundColor: "#5452FC",
  filter: "drop-shadow(0px 3px 6px #00000029)",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "12px",
  color: "white",
});

interface Props {
  nom: {
    discord: string;
    twitter: string;
    telegram: string;
    website: string;
  };
}

export const SocialIcons: React.FC<Props> = ({ nom }) => {
  if (!nom.website && !nom.discord && !nom.twitter && !nom.telegram) {
    return null;
  }
  return (
    <Flex variant="search.connection.container">
      {nom.website && (
        <NewTabLink href={nom.website}>
          <Website>WWW</Website>
        </NewTabLink>
      )}
      {nom.discord && (
        <NewTabLink href={`https://discordapp.com/users/${nom.discord}`}>
          <Box variant="search.connection.imageContainer">
            <DiscordLogo />
          </Box>
        </NewTabLink>
      )}
      {nom.twitter && (
        <NewTabLink href={`https://twitter.com/${nom.twitter}`}>
          <Box variant="search.connection.imageContainer">
            <TwitterLogo />
          </Box>
        </NewTabLink>
      )}
      {nom.telegram && (
        <NewTabLink href={`https://t.me/${nom.telegram}`}>
          <Box variant="search.connection.imageContainer">
            <TelegramLogo />
          </Box>
        </NewTabLink>
      )}
    </Flex>
  );
};
