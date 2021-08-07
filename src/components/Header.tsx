import React from "react";
import { Box, Flex } from "theme-ui";
import { Logo } from "src/components/Logo";
import { ConnectWallet } from "src/components/ConnectWallet";
import { useLocation } from "react-router-dom";

export const Header: React.FC = () => {
  const location = useLocation();
  return (
    <Flex sx={{ justifyContent: "space-between" }} mb={4}>
      {location.pathname === "/search" ? <Box /> : <Logo />}
      <ConnectWallet />
    </Flex>
  );
};
