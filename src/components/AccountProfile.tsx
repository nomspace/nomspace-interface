import React from "react";
import { Box, Card, Flex, Image, Link } from "theme-ui";
import { Text } from "theme-ui";
import { useContractKit } from "@celo-tools/use-contractkit";
import { Wallet, X } from "phosphor-react";
import { shortenAddress } from "utils/address";
import { EXPLORERS } from "./ExplorerIcons";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";

export const AccountProfile: React.FC = () => {
  const { address, connect, network, destroy } = useContractKit();

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
          <Flex
            sx={{
              alignItems: "center",
              color: "primaryTextColor",
            }}
          >
            <Wallet size={32} />
            {address ? (
              <>
                <CopyToClipboard
                  text={address}
                  onCopy={() => toast("Wallet address copied to clipboard")}
                >
                  <Text variant="primary" ml={2} mt={1}>
                    {shortenAddress(address)}
                  </Text>
                </CopyToClipboard>
                <Box
                  sx={{
                    marginTop: "4px",
                    marginLeft: "4px",
                    padding: "1px",
                    ":hover": {
                      borderRadius: "36px",
                      backgroundColor: "white",
                    },
                  }}
                  onClick={destroy}
                >
                  <X size={12} />
                </Box>
              </>
            ) : (
              <Text variant="primary" ml={2} mt={1}>
                Connect Wallet
              </Text>
            )}
          </Flex>
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
