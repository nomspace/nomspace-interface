import React from "react";
import { Box, Flex, Heading, Text, useColorMode } from "theme-ui";
import { SearchBar } from "components/SearchBar";
import { AccountProfile } from "components/AccountProfile";
import moment from "moment";

/* ASSETS */

/* DEMO PURPOSES, DELETE LATER */
// sources
import s1 from "pages/SearchDetail/assets/s1.png";
import s2 from "pages/SearchDetail/assets/s2.png";
import s3 from "pages/SearchDetail/assets/s3.png";

// nomstronaut

//noms
import nom1 from "pages/SearchDetail/assets/nom1.png";
import nom2 from "pages/SearchDetail/assets/nom2.png";
import { useUserNoms } from "hooks/useUserNoms";
import { Link } from "react-router-dom";

const noms = [
  { img: nom1, name: "gza", date: "08/18/23" },
  { img: nom2, name: "zatoichi", date: "12/03/22" },
];

const sources = [{ img: s1 }, { img: s2 }, { img: s3 }];

export const Sidebar: React.FC = () => {
  const [userNoms] = useUserNoms();
  const [colorMode, setColorMode] = useColorMode();
  return (
    <Box variant="search.sidebar.container">
      <Flex variant="search.sidebar.walletContainer">
        <AccountProfile />
      </Flex>
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
