import React from "react";
import { Container, Flex } from "theme-ui";
import { WalletCard } from "components/Wallet/WalletCard";
import { LogoIcon } from "icons/LogoIcon";
import { ColorModeToggle } from "../ColorModeToggle";

export const MobileHeader: React.FC = () => {
  return (
    <Container sx={{ width: "auto" }}>
      <Flex
        sx={{
          mb: 2,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <LogoIcon />
        <Flex>
          <ColorModeToggle />
          <WalletCard />
        </Flex>
      </Flex>
    </Container>
  );
};
