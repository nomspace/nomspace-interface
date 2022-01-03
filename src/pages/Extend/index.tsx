import React from "react";
// import { useNom } from "hooks/useNom";
// import {
//   useContractKit,
//   useGetConnectedSigner,
//   useProvider,
// } from "@celo-tools/use-contractkit";
// import { useParams, useHistory } from "react-router-dom";
// import {
//   Box,
//   Button,
//   Card,
//   Flex,
//   Heading,
//   Input,
//   Spinner,
//   Text,
// } from "theme-ui";
// import { ethers } from "ethers";
// import { BlockText } from "components/BlockText";
// import { NOM_FEE, RESERVE_PORTAL, USD } from "config";
// import { toastTx } from "utils/toastTx";
// import { toast } from "react-toastify";
// import { CaretLeft, ArrowDown } from "phosphor-react";
// import { SearchBar } from "components/SearchBar";
// import { YEAR_IN_SECONDS, ZERO_ADDRESS } from "utils/constants";
// import { useUSD } from "hooks/useUSD";
// import { MaxUint256 } from "@ethersproject/constants";
// import { formatName } from "utils/name";
// import { ERC20__factory, Nom__factory } from "generated";
// import { formatUnits } from "ethers/lib/utils";
// import { normalize } from "eth-ens-namehash";

export const Extend: React.FC = () => {
  return null;
  // const { name } = useParams<{ name: string }>();
  // const nameFormatted = formatName(name);

  // const { network } = useContractKit();
  // const provider = useProvider();
  // const getConnectedSigner = useGetConnectedSigner();
  // const [nom, refetchNom] = useNom(nameFormatted);
  // const [years, setYears] = React.useState("1");
  // const [cost, setCost] = React.useState("5");
  // const [approveLoading, setApproveLoading] = React.useState(false);
  // const [extendLoading, setExtendLoading] = React.useState(false);
  // const [usd, refetchUSD] = useUSD();
  // const history = useHistory();

  // let isNormal = false;
  // try {
  //   isNormal = !!normalize(name);
  // } catch (e) {}
  // if (nom == null) {
  //   return <Spinner />;
  // }

  // const approveButton = (
  //   <Button
  //     onClick={async () => {
  //       const reservePortalAddress = RESERVE_PORTAL[network.chainId];
  //       const usdAddress = USD[network.chainId];
  //       if (!reservePortalAddress || !usdAddress) {
  //         return;
  //       }
  //       const signer = await getConnectedSigner();
  //       try {
  //         setApproveLoading(true);
  //         const usd = ERC20__factory.connect(usdAddress, signer);
  //         const gasPrice = await provider.getGasPrice();
  //         const tx = await usd.approve(
  //           FEE_MODULE[network.chainId]!,
  //           MaxUint256.toString(),
  //           { gasPrice }
  //         );
  //         toastTx(tx.hash);
  //         refetchUSD();
  //       } catch (e: any) {
  //         toast(e.message);
  //       } finally {
  //         setApproveLoading(false);
  //       }
  //     }}
  //   >
  //     Approve
  //   </Button>
  // );

  // const extendButton = (
  //   <Button
  //     onClick={async () => {
  //       const nomAddress = NOM[network.chainId];
  //       if (!nomAddress) return;
  //       const signer = await getConnectedSigner();
  //       const nom = Nom__factory.connect(nomAddress, signer);

  //       try {
  //         setExtendLoading(true);
  //         const gasPrice = await provider.getGasPrice();
  //         const tx = await nom.extend(
  //           ethers.utils.formatBytes32String(nameFormatted),
  //           Math.floor(Number(years) * YEAR_IN_SECONDS),
  //           {
  //             gasPrice,
  //           }
  //         );
  //         toastTx(tx.hash);
  //         refetchNom();
  //       } catch (e: any) {
  //         toast(e.message);
  //       } finally {
  //         setExtendLoading(false);
  //       }
  //     }}
  //   >
  //     Extend
  //   </Button>
  // );

  // const loading = approveLoading || extendLoading;
  // let button = approveButton;
  // if (usd) {
  //   const fmtCost = Number(cost === "" ? "0" : cost);
  //   if (Number(formatUnits(usd.balance, usd.decimals)) < fmtCost) {
  //     button = <Button disabled={true}>Insufficient funds</Button>;
  //   } else if (Number(formatUnits(usd.allowance, usd.decimals)) >= fmtCost) {
  //     button = extendButton;
  //   }
  // }

  // return (
  //   <Flex sx={{ alignItems: "center", flexDirection: "column" }}>
  //     <Box sx={{ width: "100%", maxWidth: "800px" }} mb={4}>
  //       <SearchBar size="small" />
  //     </Box>
  //     <Card sx={{ width: "100%", maxWidth: "800px" }} py={4} px={3}>
  //       <Flex
  //         onClick={() => history.goBack()}
  //         sx={{ alignItems: "center", cursor: "pointer" }}
  //         mb={4}
  //       >
  //         <CaretLeft size={28} />
  //         <Text>Back</Text>
  //       </Flex>
  //       <Flex mb={2}>
  //         <Heading as="h2" mr={2}>
  //           Extend
  //         </Heading>
  //         <Heading color="primaryTextColor">{name}.nom</Heading>
  //       </Flex>
  //       <Flex mb={4}>
  //         <Heading as="h2" mr={2}>
  //           New Expiration
  //         </Heading>
  //         <Heading color="primaryTextColor">
  //           {new Date(
  //             (nom.expiration + Math.floor(Number(years) * YEAR_IN_SECONDS)) *
  //               1000
  //           ).toLocaleDateString("en-US")}
  //         </Heading>
  //       </Flex>
  //       <Text variant="form">Years to extend</Text>
  //       <Flex sx={{ alignItems: "center" }}>
  //         <Input
  //           type="number"
  //           value={years}
  //           onChange={(e) => {
  //             const years = e.target.value;
  //             setYears(years);
  //             setCost((Number(years) * YEAR_IN_SECONDS * NOM_FEE).toString());
  //           }}
  //           mr={2}
  //         />
  //         <Text>year(s)</Text>
  //       </Flex>
  //       <Box mt={2} sx={{ textAlign: "center" }}>
  //         <ArrowDown size={32} />
  //       </Box>
  //       <Flex sx={{ alignItems: "center" }}>
  //         <Box sx={{ width: "100%" }} mr={2}>
  //           <Flex sx={{ justifyContent: "space-between", mb: 1 }}>
  //             <Text variant="form">Cost</Text>
  //             <Text
  //               sx={{ color: "primaryTextColor", cursor: "pointer" }}
  //               variant="form"
  //               onClick={() => {
  //                 if (usd) {
  //                   const cost = formatUnits(usd.balance, usd.decimals);
  //                   setCost(cost);
  //                   setYears(
  //                     (Number(cost) / YEAR_IN_SECONDS / NOM_FEE).toString()
  //                   );
  //                 }
  //               }}
  //             >
  //               max:{" "}
  //               {usd
  //                 ? Number(formatUnits(usd.balance, usd.decimals)).toFixed(4)
  //                 : "0"}
  //             </Text>
  //           </Flex>
  //           <Input
  //             sx={{ width: "100%" }}
  //             value={cost}
  //             onChange={(e) => {
  //               const cost = e.target.value;
  //               setCost(cost);
  //               setYears((Number(cost) / YEAR_IN_SECONDS / NOM_FEE).toString());
  //             }}
  //           />
  //         </Box>
  //         <Text mt={3}>cUSD</Text>
  //       </Flex>
  //       <Flex sx={{ justifyContent: "center", mt: 6 }}>
  //         {isNormal ? (
  //           nom.owner !== ZERO_ADDRESS ? (
  //             loading ? (
  //               <Spinner />
  //             ) : (
  //               button
  //             )
  //           ) : (
  //             <BlockText>Name is not reserved.</BlockText>
  //           )
  //         ) : (
  //           <BlockText>
  //             This name is invalid and not available for reservation.
  //           </BlockText>
  //         )}
  //       </Flex>
  //     </Card>
  //   </Flex>
  // );
};
