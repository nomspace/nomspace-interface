import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Flex, Text } from "theme-ui";
import { LogoIcon } from "icons/LogoIcon";
import { Breakpoint, useBreakpoint } from "hooks/useBreakpoint";

export const Logo: React.FC = () => {
  const history = useHistory();
  const breakpoint = useBreakpoint();
  return (
    <Flex
      sx={{ cursor: "pointer" }}
      onClick={() => {
        history.push("/");
      }}
    >
      <Box sx={{ fill: "textColor" }} mr={2}>
        <LogoIcon />
      </Box>
      {breakpoint === Breakpoint.DESKTOP && (
        <Text variant="logo">Nomspace</Text>
      )}
    </Flex>
  );
};
