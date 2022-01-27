import { Token } from "web3-token-list";
import { useWindowDimensions } from "hooks/useWindowDimensions";
import { Box } from "theme-ui";
import { BlockscoutTokenAddressLink } from "components/BlockscoutTokenAddressLink";
import { useContractKit } from "@celo-tools/use-contractkit";
import { FixedSizeList as List } from "react-window";
import React from "react";
import { Breakpoint, useBreakpoint } from "hooks/useBreakpoint";

interface Props {
  tokens: Token[];
}

interface IItemProps {
  index: number;
  data: {
    tokens: Token[];
  };
  style: React.CSSProperties;
}

const Column: React.FC<IItemProps> = ({ index, style, data }) => {
  const { address } = useContractKit();
  const { tokens } = data;
  const token = tokens[index];
  return (
    <>
      {token && (
        <Box style={style} variant="search.token.imageContainer">
          <BlockscoutTokenAddressLink
            address={address || ""}
            tokenAddress={token.address}
          >
            <Box
              variant="search.token.image"
              sx={{
                backgroundImage: `url(${token.logoURI})`,
              }}
            />
          </BlockscoutTokenAddressLink>
        </Box>
      )}
    </>
  );
};

export const TokenCarousel: React.FC<Props> = ({ tokens }) => {
  const { width } = useWindowDimensions();
  const breakpoint = useBreakpoint();
  console.log(tokens.length);
  return (
    <Box
      variant="search.carouselRowContainer"
      sx={{
        "> * > * > *": {
          marginLeft: ["mobile", "tablet", "desktop"],
        },
        "> * > *": {},
      }}
    >
      <List
        height={breakpoint === Breakpoint.DESKTOP ? 110 : 75}
        itemCount={tokens.length}
        itemSize={breakpoint === Breakpoint.DESKTOP ? 110 : 75}
        layout="horizontal"
        width={width - 3}
        itemData={{ tokens }}
        style={{ overflow: "auto" }}
      >
        {Column}
      </List>
    </Box>
  );
};
