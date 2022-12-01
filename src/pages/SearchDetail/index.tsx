import { GlobalNom } from "hooks/useNom";
import React, { useState } from "react";
import { useContractKit } from "@celo-tools/use-contractkit";
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  useColorMode,
} from "theme-ui";
import { NATIVE_CURRENCY } from "config";
import { useName } from "hooks/useName";
import { Sidebar } from "components/Sidebar";
import { SocialIcons } from "components/SocialIcons";
import { useTokenBalances } from "hooks/useTokenBalances";
import { useHasNomstronauts } from "hooks/useHasNomstronauts";
import { useUserStats } from "hooks/useUserStats";
import { ExplorerIcons } from "components/ExplorerIcons";
import { UserTags } from "components/UserTags";
import { TipModal } from "components/Modal/TipModal";
import { ExtendModal } from "components/Modal/ExtendModal";
import { ReclaimModal } from "components/Modal/ReclaimModal";
import { Page } from "state/global";
import { useHistory } from "react-router-dom";
import { TokenCarousel } from "components/TokenCarousel";
import { NFTCarousel } from "components/NFTCarousel";
import { useTransferOwnership } from "hooks/useTransferOwnership";
import { useNFTs, usePOAPs } from "hooks/useNFTs";
import defaultPFP from "assets/DefaultPFP.png";
import defaultBanner from "assets/DefaultBanner.png";
import life2 from "pages/SearchDetail/assets/life1.png";
import life1 from "pages/SearchDetail/assets/life2.png";
import networth from "pages/SearchDetail/assets/networth.png";
import astro from "pages/SearchDetail/assets/astro.png";
import { ReserveView } from "components/Modal/ReserveView";
import { isAddress } from "web3-utils";
import { NewTabLink } from "components/NewTabLink";
import { SearchBar } from "components/SearchBar";
import { Spinner } from "theme-ui";
import { toast, ToastContainer } from "react-toastify";
import { useUserNoms } from "hooks/useUserNoms";
import { EXPIRATION_THRESHOLD } from "utils/constants";
import moment from "moment";
import { ImageModal } from "components/ImageModal";

const now = Date.now() / 1000;

export const SearchDetail: React.FC = () => {
  const { name } = useName();
  const { network } = useContractKit();
  const [nom] = GlobalNom.useContainer();
  const [nftMetadata] = useNFTs();
  const [poapMetadata] = usePOAPs();
  const [selectedImage, setSelectedImage] = useState<string>();
  const [tokens] = useTokenBalances(nom?.resolution);
  const [userStats] = useUserStats(nom?.resolution);
  const history = useHistory();
  const [tipModalOpen, setTipModalOpen] = useState(false);
  const [extendModalOpen, setExtendModalOpen] = useState(false);
  const { transferOwnership } = useTransferOwnership(name);
  const [colorMode] = useColorMode();
  const [hasNomstronaut] = useHasNomstronauts();
  const [userNoms] = useUserNoms();

  // Toast for no resolution
  React.useEffect(() => {
    let toastId: React.ReactText;
    if (nom?.isOwner && (!nom?.resolution || Number(nom?.resolution) === 0)) {
      toastId = toast.warn(
        <>
          <div>
            ⚠️ It looks like you don't have a resolution! Set it{" "}
            <u
              style={{ cursor: "pointer" }}
              onClick={() => {
                history.push(`${name}/${Page.MANAGE}`);
              }}
            >
              here
            </u>{" "}
            to see your NFTs!
          </div>
        </>,
        {
          position: "top-center",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          toastId: `resolution_${name}`,
          containerId: "B",
          style: { cursor: "default" },
          bodyClassName: "warningBodyToast",
        }
      );
    }
    return () => {
      toastId && toast.dismiss(toastId);
    };
  }, [history, name, nom?.isOwner, nom?.resolution]);

  React.useEffect(() => {
    let toastId: React.ReactText;
    if (userNoms) {
      const expiringNoms = userNoms
        .filter((un) => un.expiration < now + EXPIRATION_THRESHOLD)
        .sort((a, b) => a.expiration - b.expiration);
      if (expiringNoms.length > 0) {
        const expiringNom = expiringNoms[0]!;
        const durationToExpiry = moment.duration(
          expiringNom.expiration - now,
          "seconds"
        );
        toastId = toast.warn(
          <>
            <div>
              ⚠️ {expiringNom.name}.nom is expiring in{" "}
              {durationToExpiry.humanize()}! Renew it{" "}
              <u
                style={{ cursor: "pointer" }}
                onClick={() => {
                  history.push(`${expiringNom.name}`);
                  setExtendModalOpen(true);
                }}
              >
                here
              </u>
            </div>
          </>,
          {
            position: "top-center",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            toastId: `expiring_${expiringNom.name}`,
            containerId: "B",
            style: { cursor: "default" },
            bodyClassName: "warningBodyToast",
          }
        );
      }
    }
    return () => {
      toastId && toast.dismiss(toastId);
    };
  }, [history, name, nom, userNoms]);

  return (
    <>
      {/* this is just for the warning banner */}
      <ToastContainer
        enableMultiContainer
        style={{ width: "auto", zIndex: 90 }}
        containerId={"B"}
      />
      {nom && name && (
        <>
          <TipModal
            open={tipModalOpen}
            onClose={() => setTipModalOpen(false)}
            resolution={nom.resolution}
          />
          <ExtendModal
            open={extendModalOpen}
            onClose={() => setExtendModalOpen(false)}
            name={name}
          />
          <ReclaimModal />
        </>
      )}
      <ImageModal src={selectedImage} setSrc={setSelectedImage} />
      <Flex
        sx={{
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box sx={{ textAlign: "center", width: "100%", height: "100%" }}>
          <Flex sx={{ height: "100%" }}>
            {/* Sidebar */}
            <Sidebar openExtendModal={() => setExtendModalOpen(true)} />
            {/* Page */}
            {nom !== null ? (
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
                  <NewTabLink
                    href={nom.avatar !== "" ? nom.avatar : defaultPFP}
                  >
                    <Image
                      variant="search.banner.avatar"
                      src={nom.avatar !== "" ? nom.avatar : defaultPFP}
                    />
                  </NewTabLink>
                  <Flex variant="search.nomstronautTip.container">
                    {hasNomstronaut && (
                      <Image
                        src={astro}
                        variant="search.connection.imageContainer"
                        sx={{
                          backgroundColor: "transparent",
                          width: [60, null, null, 85],
                          height: [60, null, null, 85],
                          marginRight: [0, null, null, 12],
                        }}
                        ml="4px"
                        mr="6px"
                      />
                    )}
                    <Box variant="search.connection.desktopContainer">
                      <SocialIcons nom={nom} />
                    </Box>
                    {nom.isOwner && (
                      <>
                        <Button
                          onClick={() => {
                            history.push(`${name}/${Page.MANAGE}`);
                          }}
                          variant="search.nomstronautTip.edit"
                        >
                          EDIT
                        </Button>
                      </>
                    )}
                    {nom.owner != null && (
                      <Button
                        onClick={() => setTipModalOpen(true)}
                        variant="search.nomstronautTip.tip"
                      >
                        <b>TIP</b>
                      </Button>
                    )}
                  </Flex>
                </Box>

                {/* Main Body */}
                <Box variant="search.details.container">
                  <Flex variant="search.details.heading">
                    {/* Name & Description */}
                    <Box variant="search.name.container">
                      <Flex variant="search.name.nameContainer">
                        <Heading variant="search.name.heading">
                          <b>{name}</b>
                        </Heading>
                        <Heading
                          variant="search.name.heading"
                          sx={{
                            color: `${
                              colorMode === "light" ? "#D9D9D9" : "#5e5e5e"
                            }`,
                          }}
                        >
                          .nom
                        </Heading>
                        <Badge
                          mt={4}
                          ml={4}
                          px={2}
                          bg={nom.owner ? "primary" : "gray"}
                        >
                          {nom.owner ? "Reserved" : "Unreserved"}
                        </Badge>
                      </Flex>
                      <Heading variant="search.name.subHeading">
                        {nom.bio}
                      </Heading>
                    </Box>
                    <Box>
                      <SocialIcons nom={nom} />
                      <UserTags userAddress={nom.resolution} />
                    </Box>
                  </Flex>
                  {/* NFTs */}
                  {nom.owner == null && name ? (
                    <ReserveView name={name} />
                  ) : (
                    <>
                      {nftMetadata != null && nftMetadata?.length > 0 && (
                        <>
                          <Heading variant="search.heading">NFTs</Heading>
                          <NFTCarousel
                            tokens={nftMetadata}
                            onItemClick={(idx) => {
                              setSelectedImage(nftMetadata[idx]?.image);
                            }}
                          />
                        </>
                      )}
                      {poapMetadata != null && poapMetadata?.length > 0 && (
                        <>
                          <Heading variant="search.heading" mt={[2, 4]}>
                            POAPs
                          </Heading>
                          <NFTCarousel
                            tokens={poapMetadata}
                            onItemClick={(idx) => {
                              setSelectedImage(poapMetadata[idx]?.image);
                            }}
                          />
                        </>
                      )}
                      {/* Tokens */}
                      {tokens && tokens.length > 0 && (
                        <>
                          <Heading variant="search.heading" mt={[2, 4]}>
                            Tokens
                          </Heading>
                          <TokenCarousel tokens={tokens} />
                        </>
                      )}
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
                      {nom.isOwner && (
                        <Flex sx={{ py: 20, justifyContent: "center" }}>
                          <Button
                            sx={{ px: 16, py: 8, backgroundColor: "red" }}
                            onClick={() => {
                              const newOwner = prompt(
                                "Enter new owner address"
                              );
                              if (!newOwner || !isAddress(newOwner)) {
                                alert(
                                  "Invalid address entered. Please try again"
                                );
                                return;
                              }
                              transferOwnership(newOwner);
                            }}
                          >
                            Transfer Ownership
                          </Button>
                        </Flex>
                      )}
                    </>
                  )}
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
            ) : (
              <Container sx={{ textAlign: "center", mt: 42 }}>
                {name ? (
                  <Flex sx={{ justifyContent: "center" }}>
                    <Spinner />
                  </Flex>
                ) : (
                  <>
                    <Heading as="h1" sx={{ fontSize: 42 }}>
                      Invalid name.
                    </Heading>
                    <Text sx={{ display: "block" }} mb={16}>
                      Please try searching again
                    </Text>
                    <SearchBar />
                  </>
                )}
              </Container>
            )}
          </Flex>
        </Box>
      </Flex>
    </>
  );
};
