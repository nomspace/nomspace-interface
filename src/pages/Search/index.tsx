import React from "react";
import { Box, Flex } from "theme-ui";
import { LogoIcon } from "icons/LogoIcon";
import { SearchBar } from "components/SearchBar";

export const Search: React.FC = () => {
  return (
    <Flex
      sx={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mt: ["33%", "10%"],
      }}
    >
      <Box sx={{ fill: "textColor", mb: 4 }}>
        <LogoIcon size={128} />
      </Box>
      <SearchBar />
    </Flex>
  );
};
