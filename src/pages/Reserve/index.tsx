import React from "react";
import { useNom } from "hooks/useNom";
import { useParams, useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Input,
  Spinner,
  Text,
} from "theme-ui";
import { BlockText } from "components/BlockText";
import { NOM_FEE } from "config";
import { CaretLeft, ArrowDown } from "phosphor-react";
import { SearchBar } from "components/SearchBar";
import { YEAR_IN_SECONDS, ZERO_ADDRESS } from "utils/constants";
import { useUSD } from "hooks/useUSD";
import { useReserve } from "hooks/useReserve";
import { formatName } from "utils/name";
import { formatUnits } from "ethers/lib/utils";
import { BlockscoutAddressLink } from "components/BlockscoutAddressLink";
import { shortenAddress } from "utils/address";
import { useContractKit } from "@celo-tools/use-contractkit";
import { normalize } from "eth-ens-namehash";
import { GetExplorerIconImages } from "components/ExplorerIcons";
import { ThemeProvider, createTheme } from "@mui/material";
import { ThemeProvider as ThemeUIThemeProvider } from "theme-ui";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import theme from "theme";

export const Reserve: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const nameFormatted = formatName(name);
  const { address } = useContractKit();

  const [nom, refetchNom] = useNom(nameFormatted);
  const [years, setYears] = React.useState(1);
  const [cost, setCost] = React.useState("5");
  const [usd, refetchUSD] = useUSD();
  const history = useHistory();
  const { approve, reserve, loading } = useReserve(name);
  const [coin, setCoin] = React.useState("Celo");
  const coins = GetExplorerIconImages("");

  let isNormal = false;
  try {
    isNormal = !!normalize(name);
  } catch (e) {}

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
          <Box variant="modal.form.inputWrapper">
            <Input
              type="number"
              value={years}
              onChange={(e) => {
                const years = e.target.value;
                if (isNaN(Number(years))) return;
                setYears(Number(years));
                setCost((Number(years) * YEAR_IN_SECONDS * NOM_FEE).toString());
              }}
              variant="modal.form.input"
              sx={{ paddingLeft: "230px", boxSizing: "border-box" }}
              placeholder="0"
            />
            <Text
              sx={{
                fontWeight: "400",
                display: "block",
                position: "absolute",
                width: 80,
                left: 21,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: [25, null, null, 32],
                whiteSpace: ["normal", "nowrap"],
              }}
            >
              Duration (Years)
            </Text>
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
          <Text
            sx={{ color: "primaryTextColor", cursor: "pointer" }}
            variant="form"
            onClick={() => {
              if (usd) {
                const cost = formatUnits(usd.balance, usd.decimals);
                setCost(cost);
                setYears(Number(cost) / YEAR_IN_SECONDS / NOM_FEE);
              }
            }}
          >
            max: {usd ? formatUnits(usd.balance, usd.decimals) : "0"}
          </Text>

          <Box variant="modal.form.inputWrapper">
            <Input
              value={cost}
              onChange={(e) => {
                const cost = e.target.value;
                setCost(cost);
                setYears(Number(cost) / YEAR_IN_SECONDS / NOM_FEE);
              }}
              variant="modal.form.input"
              placeholder="0.00"
              sx={{ paddingLeft: "150px" }}
            />
            <Text
              sx={{
                fontWeight: "400",
                display: "block",
                position: "absolute",
                width: 80,
                left: 21,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: [25, null, null, 32],
                whiteSpace: ["normal", "nowrap"],
              }}
            >
              Total Cost
            </Text>
          </Box>

          {isNormal ? (
            loading ? (
              <Spinner />
            ) : nom.owner === ZERO_ADDRESS ? (
              button
            ) : nom.owner === address ? (
              <BlockText>You own this name!</BlockText>
            ) : (
              <BlockText>
                Name has already been reserved by{" "}
                <BlockscoutAddressLink address={nom.owner}>
                  {shortenAddress(nom.owner)}
                </BlockscoutAddressLink>
              </BlockText>
            )
          ) : (
            <BlockText>
              This name is invalid and not available for reservation.
            </BlockText>
          )}
        </Box>
      </Flex>
    </>
  );
};
