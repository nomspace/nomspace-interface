import React from "react";
import { useNom } from "hooks/useNom";
import { Box, Button, Flex, Input, Spinner, Text } from "theme-ui";
import { useUSD } from "hooks/useUSD";
import { useReserve } from "hooks/useReserve";
import { formatUnits } from "ethers/lib/utils";
import { useName } from "hooks/useName";
import { useTokens } from "hooks/useTokens";
import { getNomCost, getNomYears } from "utils/cost";
import { ZERO_ADDRESS } from "utils/constants";
import { useContractKit } from "@celo-tools/use-contractkit";
import { BlockscoutAddressLink } from "components/BlockscoutAddressLink";
import { BlockText } from "components/BlockText";
import { shortenAddress } from "utils/address";

export const Reserve: React.FC = () => {
  const { name } = useName();
  const { address } = useContractKit();

  const [nom] = useNom(name);
  const [years, setYears] = React.useState(1);
  const [cost, setCost] = React.useState(5);
  const [usd, refetchUSD] = useUSD();
  const [tokens] = useTokens();
  const { approve, reserve, loading } = useReserve(name);

  if (nom == null) {
    return <Spinner />;
  }

  const confirmButton = (
    <Button
      variant="modal.form.submit"
      onClick={async () => {
        await approve(cost);
        await reserve(years);
        refetchUSD();
      }}
    >
      CONFIRM
    </Button>
  );

  let button = confirmButton;
  if (usd) {
    if (Number(formatUnits(usd.balance, usd.decimals)) < cost) {
      button = <Button disabled={true}>Insufficient funds</Button>;
    }
  }
  if (!name) return <Text>Invalid name</Text>;
  return (
    <>
      <Text variant="modal.title">
        Reserve{" "}
        <Text variant="modal.title" color="primaryTextColor">
          {name}.nom
        </Text>
      </Text>
      <Flex variant="modal.container">
        <Box variant="modal.form.container">
          <Flex
            variant="modal.form.durationWrapper"
            sx={{ alignItems: "center" }}
          >
            <Input
              variant="modal.form.input"
              type="number"
              value={years}
              onChange={(e) => {
                const years = Number(e.target.value);
                if (isNaN(years)) return;
                setYears(years);
                setCost(getNomCost(name, years));
              }}
              mr={2}
            />
            <Text sx={{ ml: 8 }}>year(s)</Text>
          </Flex>
          <Flex sx={{ justifyContent: "flex-end", width: "100%", mr: 120 }}>
            <Text
              sx={{ color: "primaryTextColor", cursor: "pointer" }}
              variant="form"
              onClick={() => {
                if (usd) {
                  const cost = Number(formatUnits(usd.balance, usd.decimals));
                  setCost(cost);
                  setYears(getNomYears(name, cost));
                }
              }}
            >
              max:{" "}
              {usd
                ? Number(formatUnits(usd.balance, usd.decimals)).toFixed(4)
                : "0"}
            </Text>
          </Flex>
          <Flex
            variant="modal.form.totalCostWrapper"
            sx={{ alignItems: "center" }}
          >
            <Input
              variant="modal.form.input"
              type="number"
              value={cost}
              onChange={(e) => {
                const cost = Number(e.target.value);
                if (isNaN(cost)) return;
                setCost(cost);
                setYears(getNomYears(name, cost));
              }}
            />
            <Text sx={{ ml: 8 }}>
              {tokens?.find((t) => t.address === usd?.address)?.symbol}
            </Text>
          </Flex>
          {loading ? (
            <Spinner />
          ) : nom.owner === ZERO_ADDRESS ? (
            button
          ) : nom.owner === address ? (
            <Text>You own this name!</Text>
          ) : (
            <Text>
              Name has already been reserved by{" "}
              <BlockscoutAddressLink address={nom.owner}>
                {shortenAddress(nom.owner)}
              </BlockscoutAddressLink>
            </Text>
          )}
        </Box>
      </Flex>
    </>
  );

  // return (
  //   <Flex sx={{ alignItems: "center", flexDirection: "column" }}>
  //     <Box sx={{ width: "100%", maxWidth: "800px" }} py={4} px={3}>
  //       <Flex mb={4}>
  //         <Heading as="h2">
  //           Reserve <Text color="primaryTextColor">{name}.nom</Text>
  //         </Heading>
  //       </Flex>
  //       <Text variant="form">Years to reserve</Text>
  //       <Flex sx={{ alignItems: "center" }}>
  //         <Input
  //           type="number"
  //           value={years}
  //           onChange={(e) => {
  //             const years = e.target.value;
  //             if (isNaN(Number(years))) return;
  //             setYears(Number(years));
  //             setCost((Number(years) * YEAR_IN_SECONDS * NOM_FEE).toString());
  //           }}
  //           mr={2}
  //         />
  //         <Text>year(s)</Text>
  //       </Flex>
  //       <Flex mt={2} sx={{ justifyContent: "center" }}>
  //         <ArrowDown size={32} />
  //       </Flex>
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
  //                   setYears(Number(cost) / YEAR_IN_SECONDS / NOM_FEE);
  //                 }
  //               }}
  //             >
  //               max: {usd ? formatUnits(usd.balance, usd.decimals) : "0"}
  //             </Text>
  //           </Flex>
  //           <Input
  //             sx={{ width: "100%" }}
  //             value={cost}
  //             onChange={(e) => {
  //               const cost = e.target.value;
  //               setCost(cost);
  //               setYears(Number(cost) / YEAR_IN_SECONDS / NOM_FEE);
  //             }}
  //           />
  //         </Box>
  //         <Text mt={3}>USD</Text>
  //       </Flex>
  //       <Flex sx={{ justifyContent: "center", mt: 6 }}>
  //         {isNormal ? (
  //           loading ? (
  //             <Spinner />
  //           ) : nom.owner === ZERO_ADDRESS ? (
  //             button
  //           ) : nom.owner === address ? (
  //             <BlockText>You own this name!</BlockText>
  //           ) : (
  //             <BlockText>
  //               Name has already been reserved by{" "}
  //               <BlockscoutAddressLink address={nom.owner}>
  //                 {shortenAddress(nom.owner)}
  //               </BlockscoutAddressLink>
  //             </BlockText>
  //           )
  //         ) : (
  //           <BlockText>
  //             This name is invalid and not available for reservation.
  //           </BlockText>
  //         )}
  //       </Flex>
  //     </Box>
  //   </Flex>
  // );
};
