import { useContractKit } from "@celo-tools/use-contractkit";
import React from "react";
import { Card } from "theme-ui";
import { shortenAddress } from "src/utils/address";

export const ConnectWallet: React.FC = () => {
  const { address, connect } = useContractKit();
  if (!address) {
    return <Card onClick={connect}>Connect Wallet</Card>;
  }

  return <Card>{shortenAddress(address)}</Card>;
};
