import React from "react";
import { Box, Flex, Heading, Text } from "theme-ui";
import { SearchBar } from "components/SearchBar";
import { AccountProfile } from "components/AccountProfile";

/* ASSETS */

// connections
import discord from "pages/SearchDetail/assets/discord.png";
import twitter from "pages/SearchDetail/assets/twitter.png";
import telegram from "pages/SearchDetail/assets/telegram.png";

/* DEMO PURPOSES, DELETE LATER */
// nfts
import nft1 from "pages/SearchDetail/assets/nft1.png";
import nft2 from "pages/SearchDetail/assets/nft2.png";
import nft3 from "pages/SearchDetail/assets/nft3.png";

// tokens
import t1 from "pages/SearchDetail/assets/t1.png";
import t2 from "pages/SearchDetail/assets/t2.png";
import t3 from "pages/SearchDetail/assets/t3.png";
import t4 from "pages/SearchDetail/assets/t4.png";
import t5 from "pages/SearchDetail/assets/t5.png";
import t6 from "pages/SearchDetail/assets/t6.png";
import t7 from "pages/SearchDetail/assets/t7.png";
import t8 from "pages/SearchDetail/assets/t8.png";

// stats

// sources
import s1 from "pages/SearchDetail/assets/s1.png";
import s2 from "pages/SearchDetail/assets/s2.png";
import s3 from "pages/SearchDetail/assets/s3.png";

// nomstronaut

//noms
import nom1 from "pages/SearchDetail/assets/nom1.png";
import nom2 from "pages/SearchDetail/assets/nom2.png";

const noms = [
  { img: nom1, name: "gza", date: "08/18/23" },
  { img: nom2, name: "zatoichi", date: "12/03/22" },
];

const sources = [{ img: s1 }, { img: s2 }, { img: s3 }];

export const Sidebar: React.FC = () => {
  return (
    <Box variant="search.sidebar.container">
      <Flex variant="search.sidebar.walletContainer">
        <AccountProfile />
      </Flex>
      <Box variant="search.sidebar.noms.container">
        <Heading variant="search.sidebar.heading">My Noms</Heading>
        {noms.map((e) => {
          return (
            <Box
              variant="search.sidebar.item"
              sx={{ "::before": { display: "none" } }}
            >
              <Flex
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Flex sx={{ alignItems: "center" }}>
                  <Box variant="search.sidebar.nom.container">
                    <Box
                      variant="search.sidebar.nom.image"
                      sx={{ backgroundImage: `url(${e.img})` }}
                    ></Box>
                  </Box>
                  <Text variant="search.sidebar.nom.name">{e.name}</Text>
                </Flex>
                <Text variant="search.sidebar.nom.date">{e.date}</Text>
              </Flex>
            </Box>
          );
        })}
      </Box>
      <Box variant="search.sidebar.settings.container">
        <Heading variant="search.sidebar.heading">Settings</Heading>
        <Text variant="search.sidebar.item">Light / Dark Mode</Text>
        <Text variant="search.sidebar.item">Default Currency</Text>
        <Text variant="search.sidebar.item">Language</Text>
      </Box>
      <Box variant="search.sidebar.search">
        <SearchBar />
      </Box>
    </Box>
  );
};
