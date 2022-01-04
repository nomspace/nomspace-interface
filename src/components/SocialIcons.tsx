import styled from "@emotion/styled";
import { Flex, Image, Link } from "theme-ui";
import DiscordIcon from "pages/SearchDetail/assets/discord.png";
import TwitterIcon from "pages/SearchDetail/assets/twitter.png";
import TelegramIcon from "pages/SearchDetail/assets/telegram.png";

const Icon = styled(Image)({
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
});

interface Props {
  nom: {
    discord: string;
    twitter: string;
    telegram: string;
  };
}

export const SocialIcons: React.FC<Props> = ({ nom }) => {
  return (
    <Flex>
      {nom.discord && (
        <Link href={nom.discord}>
          <Icon src={DiscordIcon} />
        </Link>
      )}
      {nom.twitter && (
        <Link href={nom.twitter}>
          <Icon src={TwitterIcon} />
        </Link>
      )}
      {nom.telegram && (
        <Link href={nom.telegram}>
          <Icon src={TelegramIcon} />
        </Link>
      )}
    </Flex>
  );
};
