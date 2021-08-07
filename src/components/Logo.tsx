import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Flex, Text } from "theme-ui";
import { LogoIcon } from "src/icons/LogoIcon";

export const Logo: React.FC = () => {
  const history = useHistory();
  return (
    <Flex>
      <Box sx={{ color: "primaryText" }} mr={2}>
        <LogoIcon />
      </Box>
      <Text
        sx={{ cursor: "pointer" }}
        variant="logo"
        onClick={() => {
          history.push("/");
        }}
      >
        Nomspace
      </Text>
    </Flex>
  );
};
