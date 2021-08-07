import React from "react";
import { Flex } from "theme-ui";
import { Logo } from "src/components/Logo";
import { ConnectWallet } from "src/components/ConnectWallet";

export const Header: React.FC = () => {
  return (
    <Flex sx={{ justifyContent: "space-between" }} mb={4}>
      <Logo />
      <ConnectWallet />
    </Flex>
  );
};
