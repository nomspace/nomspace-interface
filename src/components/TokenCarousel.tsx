import { Token } from "web3-token-list";
import { useWindowDimensions } from "hooks/useWindowDimensions";
import { Box } from "theme-ui";
import { BlockscoutTokenAddressLink } from "components/BlockscoutTokenAddressLink";
import { useContractKit } from "@celo-tools/use-contractkit";
import { FixedSizeList as List } from "react-window";
import React from "react";

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
    <Box style={style} variant="search.token.imageContainer">
      {token && (
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
      )}
    </Box>
  );
};

export const TokenCarousel: React.FC<Props> = ({ tokens }) => {
  const { width } = useWindowDimensions();
  return (
    <Box variant="search.rowScrollContainer">
      <List
        className="no-scrollbars"
        height={75}
        itemCount={tokens.length}
        itemSize={75}
        layout="horizontal"
        width={width - 32}
        itemData={{ tokens }}
      >
        {Column}
      </List>
    </Box>
  );
};
