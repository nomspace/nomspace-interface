import { useWindowDimensions } from "hooks/useWindowDimensions";
import { NewTabLink } from "components/NewTabLink";
import { Box, Spinner, Image } from "theme-ui";
import { FixedSizeList as List } from "react-window";
import React from "react";

interface Metadata {
  image: string;
}
interface Props {
  tokens: Metadata[];
  width?: number;
  onItemClick?: (idx: number) => void;
}

interface IItemProps {
  index: number;
  data: {
    tokens: Metadata[];
    onItemClick?: (idx: number) => void;
  };
  style: React.CSSProperties;
}

const Column: React.FC<IItemProps> = ({ index, style, data }) => {
  const { tokens, onItemClick } = data;
  const token = tokens[index];
  if (!token) return null;
  return (
    <Box
      style={style}
      variant="search.nft.imageContainer"
      onClick={onItemClick ? () => onItemClick(index) : undefined}
    >
      <NewTabLink href={onItemClick ? undefined : token.image}>
        <Spinner />
        <Image
          variant="search.nft.image"
          src={token.image}
          onLoad={(e) => {
            (e.target as HTMLImageElement).previousSibling?.remove();
            (e.target as HTMLImageElement).style.display = "block";
          }}
        />
      </NewTabLink>
    </Box>
  );
};

export const NFTCarousel: React.FC<Props> = ({
  tokens,
  width,
  onItemClick,
}) => {
  const { width: windowWidth } = useWindowDimensions();
  return (
    <Box variant="search.rowScrollContainer">
      <List
        className="no-scrollbars"
        height={200}
        itemCount={tokens.length}
        itemSize={218}
        layout="horizontal"
        width={width || windowWidth - 32}
        itemData={{ tokens, onItemClick }}
      >
        {Column}
      </List>
    </Box>
  );
};
