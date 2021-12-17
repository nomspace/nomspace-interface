import React from "react";
import { Box, Container, Flex } from "theme-ui";
import { Logo } from "components/Logo";
import { ColorModeToggle } from "components/ColorModeToggle";
import { AccountProfile } from "components/AccountProfile";

export const DesktopHeader: React.FC = () => {
  return (
    <>
      <Container sx={{ width: "auto" }}>
        <Flex
          sx={{
            mb: 2,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box mr={4}>
            <Logo />
          </Box>
          <Flex>
            <ColorModeToggle />
            <AccountProfile />
          </Flex>
        </Flex>
      </Container>
    </>
  );
};
