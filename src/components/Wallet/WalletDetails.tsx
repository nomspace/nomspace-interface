import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Planet, Wallet, X } from "phosphor-react";
import { Box, Button, Flex, Text, useColorMode } from "theme-ui";
import { useContractKit } from "@celo-tools/use-contractkit";
import { toast } from "react-toastify";
import { shortenAddress } from "utils/address";
import styled from "@emotion/styled";

interface Props {
  onClose?: () => any;
}

const BG = styled(Flex)<{ colorMode: string }>(({ colorMode }) => ({
  alignItems: "center",
  backgroundColor:
    colorMode === "dark"
      ? "var(--theme-ui-colors-background)"
      : "var(--theme-ui-colors-secondaryBackground)",
  marginBottom: "8px",
  padding: "8px",
  borderRadius: "4px",
}));

export const WalletDetails: React.FC<Props> = ({ onClose }) => {
  const [colorMode] = useColorMode();
  const { address, connect, destroy, network } = useContractKit();

  return (
    <Box>
      <Flex sx={{ justifyContent: "space-between", mb: 3 }}>
        <Text sx={{ fontSize: 18 }}>Wallet</Text>
        {onClose && <X size={20} onClick={onClose} />}
      </Flex>
      {address && (
        <Flex>
          <CopyToClipboard
            text={address}
            onCopy={() => toast("Copied wallet address to clipboard")}
          >
            <BG
              colorMode={colorMode}
              sx={{
                cursor: "pointer",
                mr: 2,
              }}
            >
              <Wallet size={32} />
              <Text variant="primary" mt={1} ml={2}>
                {shortenAddress(address, 4)}
              </Text>
            </BG>
          </CopyToClipboard>
          <BG colorMode={colorMode}>
            <Planet size={32} />
            <Text variant="primary" mt={1} ml={2}>
              {network.name}
            </Text>
          </BG>
        </Flex>
      )}
      {address ? (
        <Flex sx={{ justifyContent: "center" }}>
          <Button
            sx={{ whiteSpace: "nowrap" }}
            variant="secondary"
            mr={2}
            onClick={() => connect().catch(console.warn)}
          >
            Change Wallet
          </Button>
          <Button sx={{ whiteSpace: "nowrap" }} onClick={destroy}>
            Disconnect
          </Button>
        </Flex>
      ) : (
        <Button onClick={connect} sx={{ width: "100%" }}>
          Connect
        </Button>
      )}
    </Box>
  );
};
