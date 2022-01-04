import React from "react";
import { useNom } from "hooks/useNom";
import {
  useContractKit,
  useGetConnectedSigner,
  useProvider,
} from "@celo-tools/use-contractkit";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Spinner,
  Image,
  Text,
} from "theme-ui";
import { NATIVE_CURRENCY } from "addresses";
import { ZERO_ADDRESS } from "utils/constants";
import { useSetNomSetting } from "hooks/useSetNomSetting";
import { useName } from "hooks/useName";
import { Sidebar } from "components/Sidebar";
import { SocialIcons } from "components/SocialIcons";
import { useTokenBalances } from "hooks/useTokenBalances";
import { useUserStats } from "hooks/useUserStats";
import { ExplorerIcons } from "components/ExplorerIcons";
import { UserTags } from "components/UserTags";

/* ASSETS */
import pfp from "pages/SearchDetail/assets/pfp.png";
import banner from "pages/SearchDetail/assets/banner.png";

// connections

/* DEMO PURPOSES, DELETE LATER */
// nfts
import nft1 from "pages/SearchDetail/assets/nft1.png";
import nft2 from "pages/SearchDetail/assets/nft2.png";
import nft3 from "pages/SearchDetail/assets/nft3.png";

// tokens

// stats
import life2 from "pages/SearchDetail/assets/life1.png";
import life1 from "pages/SearchDetail/assets/life2.png";
import networth from "pages/SearchDetail/assets/networth.png";

// sources

// nomstronaut
import nomstronaut from "pages/SearchDetail/assets/astro.png";

const nfts = [
  {
    img: nft1,
    name: "Alice Red or Blue Pill",
    id: "00001",
    os: "",
  },
  {
    img: nft2,
    name: "CeloPunk",
    id: "00420",
    os: "",
  },
  {
    img: nft3,
    name: "Zatoichi",
    id: "003",
    os: "",
  },
];

/* DEMO PURPOSES, DELETE LATER */

export const SearchDetail: React.FC = () => {
  const { name } = useName();
  const { address, network } = useContractKit();
  const provider = useProvider();
  const getConnectedSigner = useGetConnectedSigner();
  const [nom, refetchNom] = useNom(name);
  console.log("NOM", nom);
  const { setNomSetting, loading } = useSetNomSetting(name);
  const [changeOwnerLoading, setChangeOwnerLoading] = React.useState(false);
  const [showQR, setShowQR] = React.useState(false);
  const [tokens] = useTokenBalances(nom?.resolution);
  const [userStats] = useUserStats(nom?.resolution);

  const isOwner =
    address && nom && nom.owner.toLowerCase() === address.toLowerCase();

  if (!nom) {
    return <Spinner />;
  }

  return (
    <Flex
      sx={{
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {name ? (
        <Box sx={{ textAlign: "center", width: "100%" }}>
          <Card sx={{ width: "100%" }} py={4} px={3}>
            {nom && nom.owner !== ZERO_ADDRESS && isOwner && (
              <>
                {/* Modals */}
                <Flex>
                  {/* Sidebar */}
                  <Sidebar />
                  {/* Page */}
                  <Flex
                    sx={{
                      alignItems: "center",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    {/* Banner */}
                    <Box variant="search.banner.container">
                      <Box
                        variant="search.banner.image"
                        sx={{
                          backgroundImage: `url(${banner})`,
                        }}
                      />
                      <Image variant="search.banner.avatar" src={pfp} />
                      {/* nomstronaut + tip */}
                      <Flex variant="search.nomstronautTip.container">
                        <Box variant="search.nomstronautTip.imageContainer">
                          <Box
                            variant="search.nomstronautTip.image"
                            sx={{
                              backgroundImage: `url(${nomstronaut})`,
                            }}
                          ></Box>
                        </Box>
                        <Box variant="search.nomstronautTip.connectionsContainer">
                          <SocialIcons nom={nom} />
                        </Box>
                        <Button variant="search.nomstronautTip.tip">TIP</Button>
                      </Flex>
                    </Box>

                    {/* Main Body */}
                    <Box variant="search.details.container">
                      <Flex variant="search.details.heading">
                        {/* Name & Description */}
                        <Box variant="search.name.container">
                          <Flex variant="search.name.nameContainer">
                            <Heading variant="search.name.heading">
                              {name}
                            </Heading>
                            <Heading
                              variant="search.name.heading"
                              sx={{ color: "#D9D9D9" }}
                            >
                              .nom
                            </Heading>
                          </Flex>
                          <Heading variant="search.name.subHeading">
                            {nom.bio}
                          </Heading>
                        </Box>
                        <Box>
                          {/* Connections */}
                          <Flex variant="search.connection.container">
                            <SocialIcons nom={nom} />
                          </Flex>
                          {/* Tags */}
                          <UserTags userAddress={nom.resolution} />
                        </Box>
                      </Flex>
                      {/* NFTs */}
                      <Heading variant="search.heading">NFTs</Heading>
                      <Box variant="search.rowScrollContainer">
                        {nfts.map((e) => {
                          return (
                            <Box variant="search.nft.imageContainer">
                              <Box
                                variant="search.nft.image"
                                sx={{
                                  backgroundImage: `url(${e.img})`,
                                }}
                              ></Box>
                            </Box>
                          );
                        })}
                      </Box>
                      {/* Tokens */}
                      <Heading variant="search.heading">Tokens</Heading>
                      <Box variant="search.rowScrollContainer">
                        {tokens?.map((t) => {
                          return (
                            <Box variant="search.token.imageContainer">
                              <Box
                                variant="search.token.image"
                                sx={{
                                  backgroundImage: `url(${t.logoURI})`,
                                }}
                              ></Box>
                            </Box>
                          );
                        })}
                      </Box>
                      {/* Stats */}
                      <Heading variant="search.heading">Stats</Heading>
                      <Box variant="search.stat.container">
                        <Flex variant="search.stat.row">
                          <Box variant="search.stat.icon">
                            <Image
                              src={life1}
                              variant="search.stat.life1Icon"
                            />
                            <Image
                              src={life2}
                              variant="search.stat.life2Icon"
                            />
                          </Box>
                          <Heading variant="search.stat.heading">
                            Activity:&nbsp;
                          </Heading>
                          <Text variant="search.stat.text">
                            {userStats
                              ? new Intl.NumberFormat().format(
                                  userStats?.transactionCount
                                )
                              : "-"}{" "}
                            Transactions
                          </Text>
                        </Flex>
                        <Box variant="search.stat.divider"></Box>
                        <Flex variant="search.stat.row">
                          <Image
                            src={networth}
                            variant="search.stat.icon"
                            ml="4px"
                            mr="6px"
                          />
                          <Heading variant="search.stat.heading">
                            Net Worth:&nbsp;
                          </Heading>
                          <Text variant="search.stat.text">
                            {userStats
                              ? new Intl.NumberFormat().format(
                                  userStats.nativeBalance
                                )
                              : "0"}{" "}
                            {NATIVE_CURRENCY[network.chainId]}
                          </Text>
                        </Flex>
                      </Box>
                      {/* Sources */}
                      <Heading variant="search.heading">Sources</Heading>
                      <Box variant="search.rowScrollContainer">
                        <Text variant="search.source.text">
                          View on Block Explorers: &nbsp;&nbsp;
                        </Text>
                        <ExplorerIcons userAddress={nom.resolution} />
                      </Box>
                      {/* Footer */}
                      {/* absolutely positioned */}
                      <Box variant="search.footer.container">
                        <Box variant="search.footer.wallet"></Box>
                        <Box variant="search.footer.moreContainer">
                          <Box variant="search.footer.more"></Box>
                          <Box variant="search.footer.search"></Box>
                        </Box>
                      </Box>
                    </Box>
                  </Flex>
                </Flex>
              </>
            )}
          </Card>
        </Box>
      ) : (
        <Text>Name is invalid. Try searching again.</Text>
      )}
    </Flex>
  );
};
