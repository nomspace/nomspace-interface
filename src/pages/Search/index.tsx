import React from "react";
import { Box, Flex, Heading } from "theme-ui";
import { LogoIcon } from "src/icons/LogoIcon";
import { SearchBar } from "src/components/SearchBar";

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
      <Box sx={{ fill: "text" }}>
        <LogoIcon size={128} />
      </Box>
      <Heading as="h1" mb={4}>
        Nomspace
      </Heading>
      <SearchBar />
    </Flex>
  );
};
