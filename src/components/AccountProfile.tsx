import React from "react";
import styled from "@emotion/styled";
import { Box, Card, Flex, useColorMode, Image, Link } from "theme-ui";
import { Text } from "theme-ui";
import { useContractKit } from "@celo-tools/use-contractkit";
import { Wallet } from "phosphor-react";
import { WalletDetails } from "components/Wallet/WalletDetails";
import { CloseOnClickaway } from "components/CloseOnClickaway";
import { shortenAddress } from "utils/address";
import { EXPLORERS } from "./ExplorerIcons";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";

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
  const { address, connect, network } = useContractKit();
  const [colorMode] = useColorMode();

  const [walletDetailsOpen, setWalletDetailsOpen] = React.useState(false);

  const walletCard = React.useRef<HTMLDivElement>(null);

  return (
    <Flex sx={{ alignItems: "center", justifyContent: "space-evenly" }}>
      <Box sx={{ position: "relative" }}>
        <Card
          ref={walletCard}
          sx={{ cursor: "pointer", borderRadius: "40px", padding: "8px" }}
          variant="warning"
          onClick={() => {
            if (address) {
              setWalletDetailsOpen(!walletDetailsOpen);
            } else {
              connect();
            }
          }}
        >
          <CopyToClipboard
            text={address}
            onCopy={() => toast("Wallet address copied to clipboard")}
          >
            <Flex
              sx={{
                alignItems: "center",
                color: "primaryTextColor",
              }}
            >
              <Wallet size={32} />
              <Text variant="primary" ml={2} mt={1}>
                {address ? shortenAddress(address) : "Connect Wallet"}
              </Text>
            </Flex>
          </CopyToClipboard>
        </Card>
      </Box>
      <Link
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }}
        href={EXPLORERS[network.chainId]?.explorerUrl}
      >
        <Card variant="warning" sx={{ padding: "12px", borderRadius: "40px" }}>
          <Image
            sx={{ height: 24, width: 24 }}
            src={EXPLORERS[network.chainId]?.imageUrl}
          />
        </Card>
      </Link>
    </Flex>
  );
};
