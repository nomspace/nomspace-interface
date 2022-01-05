import React from "react";
import { Box, Flex, Heading, Text, useColorMode } from "theme-ui";
import { SearchBar } from "components/SearchBar";
import { AccountProfile } from "components/AccountProfile";
import moment from "moment";
import { useUserNoms } from "hooks/useUserNoms";
import { Link } from "react-router-dom";

export const Sidebar: React.FC = () => {
  const [userNoms] = useUserNoms();
  const [colorMode, setColorMode] = useColorMode();
  return (
    <Box variant="search.sidebar.container">
      <AccountProfile />
      <Box variant="search.sidebar.noms.container">
        <Heading variant="search.sidebar.heading">My Noms</Heading>
        {userNoms?.map((un, idx) => {
          return (
            <Box
              key={idx}
              variant="search.sidebar.item"
              sx={{ "::before": { display: "none" } }}
            >
              <Link to={`/${un.name}`}>
                <Flex
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Flex sx={{ alignItems: "center" }}>
                    <Text variant="search.sidebar.nom.name">{un.name}.nom</Text>
                  </Flex>
                  <Text variant="search.sidebar.nom.date">
                    {moment.unix(un.expiration).calendar()}
                  </Text>
                </Flex>
              </Link>
            </Box>
          );
        })}
      </Box>
      <Box variant="search.sidebar.settings.container">
        <Heading variant="search.sidebar.heading">Settings</Heading>
        <Text
          variant="search.sidebar.item"
          sx={{ cursor: "pointer" }}
          onClick={() => {
            if (colorMode === "light") {
              setColorMode("dark");
            } else {
              setColorMode("light");
            }
          }}
        >
          Light / Dark Mode
        </Text>
        {/* <Text variant="search.sidebar.item">Default Currency</Text>
        <Text variant="search.sidebar.item">Language</Text> */}
      </Box>
      <Box variant="search.sidebar.search">
        <SearchBar />
      </Box>
    </Box>
  );
};
