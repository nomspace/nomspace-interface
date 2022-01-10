import { GlobalNom } from "hooks/useNom";
import React, { useState } from "react";
import { useContractKit } from "@celo-tools/use-contractkit";
import { Box, Button, Flex, Heading, Spinner, Image, Text } from "theme-ui";
import { NATIVE_CURRENCY } from "config";
import { ZERO_ADDRESS } from "utils/constants";
import { useName } from "hooks/useName";
import { Sidebar } from "components/Sidebar";
import { SocialIcons } from "components/SocialIcons";
import { useTokenBalances } from "hooks/useTokenBalances";
import { useUserStats } from "hooks/useUserStats";
import { ExplorerIcons } from "components/ExplorerIcons";
import { UserTags } from "components/UserTags";
import { TipModal } from "components/Modal/TipModal";
import { ReserveModal } from "components/Modal/ReserveModal";
import { ExtendModal } from "components/Modal/ExtendModal";
import { Page } from "state/global";
import { useHistory } from "react-router-dom";
import { BlockscoutAddressLink } from "components/BlockscoutAddressLink";
import { useNFTs } from "hooks/useNFTs";
import defaultPFP from "assets/DefaultPFP.png";
import defaultBanner from "assets/DefaultBanner.png";
import life2 from "pages/SearchDetail/assets/life1.png";
import life1 from "pages/SearchDetail/assets/life2.png";
import networth from "pages/SearchDetail/assets/networth.png";
// import nomstronaut from "pages/SearchDetail/assets/astro.png";

export const SearchDetail: React.FC = () => {
  const { name } = useName();
  const { address, network } = useContractKit();
  const [nom] = GlobalNom.useContainer();
  const [nftMetadata] = useNFTs(nom?.resolution);
  const [tokens] = useTokenBalances(nom?.resolution);
  const [userStats] = useUserStats(nom?.resolution);
  const history = useHistory();
  const [tipModalOpen, setTipModalOpen] = useState(false);
  const [reserveModalOpen, setReserveModalOpen] = useState(false);
  const [extendModalOpen, setExtendModalOpen] = useState(false);

  const isOwner =
    address && nom && nom.owner.toLowerCase() === address.toLowerCase();

  if (!nom) return <Spinner />;
  if (!name) return <Text>Name is invalid. Please try again.</Text>;

  return (
    <>
      <TipModal
        open={tipModalOpen}
        onClose={() => setTipModalOpen(false)}
        resolution={nom.resolution}
      />
      <ReserveModal
        open={reserveModalOpen}
        onClose={() => setReserveModalOpen(false)}
        name={name}
      />
      <ExtendModal
        open={extendModalOpen}
        onClose={() => setExtendModalOpen(false)}
        name={name}
      />
      <Flex
        sx={{
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {name ? (
          <Box sx={{ textAlign: "center", width: "100%" }}>
            {/* Modals */}
            <Flex>
              {/* Sidebar */}
              <Sidebar nom={nom} />
              {/* Page */}
              {nom && (
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
                        backgroundImage: `url(${defaultBanner})`,
                      }}
                    />
                    <Image
                      sx={{ clipPath: "circle(60px at center)" }}
                      variant="search.banner.avatar"
                      src={nom.avatar !== "" ? nom.avatar : defaultPFP}
                    />
                    {/* nomstronaut + tip */}
                    <Flex variant="search.nomstronautTip.container">
                      {/* 
                      TODO: Nomstraunat tag
                      <Box variant="search.nomstronautTip.imageContainer">
                        <Box
                          variant="search.nomstronautTip.image"
                          sx={{
                            backgroundImage: `url(${nomstronaut})`,
                          }}
                        ></Box>
                      </Box> */}
                      <Box variant="search.nomstronautTip.connectionsContainer">
                        <SocialIcons nom={nom} />
                      </Box>
                      {isOwner && (
                        <Button
                          onClick={() => {
                            history.push(`${name}/${Page.MANAGE}`);
                          }}
                          variant="search.nomstronautTip.edit"
                        >
                          EDIT
                        </Button>
                      )}
                      <Button
                        onClick={() => {
                          if (nom.owner === ZERO_ADDRESS) {
                            setReserveModalOpen(true);
                          } else if (nom.owner === address) {
                            setExtendModalOpen(true);
                          } else {
                            setTipModalOpen(true);
                          }
                        }}
                        variant="search.nomstronautTip.tip"
                      >
                        {nom.owner === ZERO_ADDRESS
                          ? "RESERVE"
                          : nom.owner === address
                          ? "EXTEND"
                          : "TIP"}
                      </Button>
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
                      {nftMetadata != null ? (
                        nftMetadata?.map((t, idx) => {
                          return (
                            <Box variant="search.nft.imageContainer" key={idx}>
                              <Spinner />
                              <Image
                                variant="search.nft.image"
                                src={t.image}
                                sx={{ display: "none" }}
                                onLoad={(e) => {
                                  console.log("image loaded");
                                  (
                                    e.target as HTMLImageElement
                                  ).previousSibling?.remove();
                                  (e.target as HTMLImageElement).style.display =
                                    "block";
                                  console.log("image loader removed");
                                }}
                              ></Image>
                            </Box>
                          );
                        })
                      ) : (
                        <Spinner />
                      )}
                    </Box>
                    {/* Tokens */}
                    <Heading variant="search.heading">Tokens</Heading>
                    <Box variant="search.rowScrollContainer">
                      {tokens?.map((t, idx) => {
                        return (
                          <Box key={idx} variant="search.token.imageContainer">
                            <BlockscoutAddressLink address={t.address}>
                              <Box
                                variant="search.token.image"
                                sx={{
                                  backgroundImage: `url(${t.logoURI})`,
                                }}
                              ></Box>
                            </BlockscoutAddressLink>
                          </Box>
                        );
                      })}
                    </Box>
                    {/* Stats */}

                    <Heading variant="search.heading">Stats</Heading>
                    <Box variant="search.stat.container">
                      <Flex variant="search.stat.row">
                        <Box variant="search.stat.icon">
                          <Image src={life1} variant="search.stat.life1Icon" />
                          <Image src={life2} variant="search.stat.life2Icon" />
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
              )}
            </Flex>
          </Box>
        ) : (
          <Text>Name is invalid. Try searching again.</Text>
        )}
      </Flex>
    </>
  );
};
