import { useWindowDimensions } from "hooks/useWindowDimensions";
import { NewTabLink } from "components/NewTabLink";
import { Box, Spinner, Image } from "theme-ui";
import { FixedSizeList as List } from "react-window";
import React from "react";
import { useBreakpointIndex } from "@theme-ui/match-media";

interface Metadata {
  image: string;
}
interface Props {
  tokens: Metadata[];
}

interface IItemProps {
  index: number;
  data: {
    tokens: Metadata[];
  };
  style: React.CSSProperties;
}

const Column: React.FC<IItemProps> = ({ index, style, data }) => {
  const { tokens } = data;
  const token = tokens[index];
  if (!token) return null;
  return (
    <Box style={style} variant="search.nft.imageContainer">
      <NewTabLink href={token.image}>
        <Spinner />
        <Image
          variant="search.nft.image"
          src={token.image}
          sx={{
            display: "none",
            width: "100%",
          }}
          onLoad={(e) => {
            (e.target as HTMLImageElement).previousSibling?.remove();
            (e.target as HTMLImageElement).style.display = "block";
          }}
        />
      </NewTabLink>
    </Box>
  );
};

export const NFTCarousel: React.FC<Props> = ({ tokens }) => {
  const { width } = useWindowDimensions();
  const breakpointIndex = useBreakpointIndex();
  const heights = [133, 160, 200, 300];
  const widths = heights.map((h) => h + 12);
  return (
    <Box variant="search.rowScrollContainer">
      <List
        className="no-scrollbars"
        height={heights[breakpointIndex] || 200}
        itemCount={tokens.length}
        itemSize={widths[breakpointIndex] || 212}
        layout="horizontal"
        width={width - 32}
        itemData={{ tokens }}
      >
        {Column}
      </List>
    </Box>
  );
};
