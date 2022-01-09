import React from "react";
import { useNom } from "hooks/useNom";
import { useParams, useHistory } from "react-router-dom";
import { Box, Button, Flex, Input, Spinner, Text } from "theme-ui";
import { useUSD } from "hooks/useUSD";
import { useReserve } from "hooks/useReserve";
import { formatName } from "utils/name";
import { formatUnits } from "ethers/lib/utils";
import { useContractKit } from "@celo-tools/use-contractkit";
import { normalize } from "eth-ens-namehash";
import { GetExplorerIconImages } from "components/ExplorerIcons";
import { ThemeProvider, createTheme } from "@mui/material";
import { ThemeProvider as ThemeUIThemeProvider } from "theme-ui";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import theme from "theme";
import { useName } from "hooks/useName";

export const Reserve: React.FC = () => {
  const { name } = useName();

  const [nom, refetchNom] = useNom(name);
  const [years, setYears] = React.useState(1);
  const [cost, setCost] = React.useState("5");
  const [usd, refetchUSD] = useUSD();
  const { approve, reserve } = useReserve(name);
  const [coin, setCoin] = React.useState("Celo");
  const coins = GetExplorerIconImages("");

  if (nom == null) {
    return <Spinner />;
  }

  const approveButton = (
    <Button
      variant="modal.form.submit"
      onClick={() => approve().then(refetchUSD)}
    >
      Approve
    </Button>
  );

  const reserveButton = (
    <Button
      variant="modal.form.submit"
      onClick={() => reserve(years).then(refetchUSD).then(refetchNom)}
    >
      Reserve
    </Button>
  );

  let button = approveButton;
  if (usd) {
    const fmtCost = Number(cost === "" ? "0" : cost);
    if (Number(formatUnits(usd.balance, usd.decimals)) < fmtCost) {
      button = <Button disabled={true}>Insufficient funds</Button>;
    } else if (Number(formatUnits(usd.allowance, usd.decimals)) >= fmtCost) {
      button = reserveButton;
    }
  }
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
          <Box variant="modal.form.durationWrapper">
            <Input
              variant="modal.form.input"
              type="number"
              placeholder="0.00"
            />
          </Box>
          <Box variant="modal.form.selectWrapper">
            <ThemeProvider theme={createTheme()}>
              <Select
                MenuProps={{
                  disableScrollLock: true,
                }}
                value={coin}
                onChange={(e) => {
                  setCoin(e.target.value);
                }}
                autoWidth
                sx={{
                  borderRadius: "11px",
                  backgroundColor: "white",
                  filter: "drop-shadow(0px 3px 6px #00000029)",
                  border: "none",
                  width: "100%",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
              >
                {coins &&
                  coins.map((e) => {
                    return (
                      <MenuItem value={e.name} key={e.name}>
                        <ThemeUIThemeProvider theme={theme}>
                          <Flex
                            sx={{
                              alignItems: "center",
                              justifyContent: "space-between",
                              fontFamily: "sen",
                              fontSize: ["25px", null, null, "33px"],
                            }}
                          >
                            {e.elm}
                            {e.name}
                          </Flex>
                        </ThemeUIThemeProvider>
                      </MenuItem>
                    );
                  })}
              </Select>
            </ThemeProvider>
          </Box>
          <Box variant="modal.form.totalCostWrapper">
            <Input
              variant="modal.form.input"
              type="number"
              placeholder="0.00"
            />
          </Box>
          <Button disabled={!!""} variant="modal.form.submit">
            CONFIRM
          </Button>
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
