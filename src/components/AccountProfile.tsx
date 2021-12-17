import React from "react";
import styled from "@emotion/styled";
import { Box, Card, Flex, useColorMode } from "theme-ui";
import { Text } from "theme-ui";
import { useContractKit } from "@celo-tools/use-contractkit";
import { Wallet } from "phosphor-react";
import { WalletDetails } from "components/Wallet/WalletDetails";
import { CloseOnClickaway } from "components/CloseOnClickaway";
import { shortenAddress } from "utils/address";

const HoverDetails = styled(Box)<{ colorMode: string }>(({ colorMode }) => {
  return {
    position: "absolute",
    backgroundColor:
      colorMode === "dark"
        ? "var(--theme-ui-colors-secondaryBackground)"
        : "var(--theme-ui-colors-background)",
    padding: "12px",
    top: 60,
    right: 0,
    borderRadius: "6px",
    color: "var(--theme-ui-colors-primaryTextColor)",
    border: "1px solid",
  };
});

export const AccountProfile: React.FC = () => {
  const { address, connect } = useContractKit();
  const [colorMode] = useColorMode();

  const [walletDetailsOpen, setWalletDetailsOpen] = React.useState(false);

  const walletCard = React.useRef<HTMLDivElement>(null);

  return (
    <Flex sx={{ alignItems: "center" }}>
      <Box sx={{ position: "relative" }}>
        <Card
          ref={walletCard}
          sx={{ cursor: "pointer" }}
          variant="warning"
          onClick={() => {
            if (address) {
              setWalletDetailsOpen(!walletDetailsOpen);
            } else {
              connect();
            }
          }}
        >
          <Flex sx={{ alignItems: "center", color: "primaryTextColor" }}>
            <Wallet size={32} />
            <Text variant="primary" ml={2} mt={1}>
              {address ? shortenAddress(address) : "Connect Wallet"}
            </Text>
          </Flex>
        </Card>
        {address && walletDetailsOpen && (
          <CloseOnClickaway
            onClickaway={(e) => {
              if (walletCard?.current?.contains(e.target)) {
                return;
              }
              setWalletDetailsOpen(false);
            }}
          >
            <HoverDetails colorMode={colorMode}>
              <WalletDetails />
            </HoverDetails>
          </CloseOnClickaway>
        )}
      </Box>
    </Flex>
  );
};
