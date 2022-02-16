import React from "react";
import { GlobalNom } from "hooks/useNom";
import {
  Box,
  Button,
  Flex,
  Input,
  Spinner,
  Text,
  Image,
  ThemeProvider as ThemeUIThemeProvider,
  useColorMode,
} from "theme-ui";
import { useUSD } from "hooks/useUSD";
import { useReserve } from "hooks/useReserve";
import { formatUnits } from "ethers/lib/utils";
import { getNomCost, getNomYears } from "utils/cost";
import { useContractKit } from "@celo-tools/use-contractkit";
import { BlockscoutAddressLink } from "components/BlockscoutAddressLink";
import { shortenAddress } from "utils/address";
import { TOKEN_LIST, Token } from "addresses";
import MenuItem from "@mui/material/MenuItem";
import { Select } from "@mui/material";
import theme from "theme";
import { ThemeProvider, createTheme } from "@mui/material";

interface Props {
  name: string;
}

export const ReserveView: React.FC<Props> = ({ name }) => {
  const { address, network, connect } = useContractKit();

  const [nom] = GlobalNom.useContainer();
  const [years, setYears] = React.useState(1);
  const [cost, setCost] = React.useState(name.length <= 3 ? 20 : 5);
  const [coin, setCoin] = React.useState<Token | undefined>();
  const [usd, refetchUSD] = useUSD(coin?.address);
  const { reserve, loading } = useReserve(name);

  const [colorMode] = useColorMode();

  React.useEffect(() => {
    if (TOKEN_LIST) {
      let sameChainToken = Object.entries(TOKEN_LIST).filter(
        ([_, t]) => t.chainId === network.chainId
      );

      if (sameChainToken[0]) {
        setCoin(sameChainToken[0][1]);
      }
    }
  }, [network]);

  let button = (
    <Button
      variant="modal.form.submit"
      onClick={() => connect().catch(console.warn)}
    >
      Connect Wallet
    </Button>
  );
  if (usd && Number(formatUnits(usd.balance, usd.decimals)) < cost) {
    button = (
      <Button variant="modal.form.submit" disabled={true}>
        Insufficient funds
      </Button>
    );
  } else if (usd && Number(formatUnits(usd.balance, usd.decimals)) >= cost) {
    button = (
      <Button
        variant="modal.form.submit"
        onClick={async () => {
          await reserve(years, coin?.name || "");
          refetchUSD();
        }}
      >
        Confirm
      </Button>
    );
  }

  React.useEffect(() => {
    setCost(getNomCost(name, years, coin?.symbol === "vNOM"));
  }, [coin, name, years]);

  if (nom == null) {
    return <Spinner />;
  }

  if (!name) return <Text>Invalid name</Text>;
  return (
    <Flex variant="modal.container">
      <Text variant="modal.title">
        Reserve{" "}
        <Text variant="modal.title" color="primaryTextColor">
          {name}.nom
        </Text>
      </Text>
      <Box variant="modal.form.container">
        {address && (
          <Box variant="modal.form.selectWrapper">
            <ThemeProvider
              theme={createTheme({
                palette: {
                  mode: `${colorMode === "light" ? "light" : "dark"}`,
                },
              })}
            >
              <Select
                MenuProps={{
                  disableScrollLock: true,
                }}
                value={coin?.name || ""}
                label="Select Currency"
                onChange={(e) => {
                  const token = TOKEN_LIST[e.target.value] || coin;
                  setCoin(token);
                }}
                autoWidth
                sx={{
                  borderRadius: "11px",
                  backgroundColor: "var(--theme-ui-colors-secondaryBackground)",
                  border: "4px solid var(--theme-ui-colors-primary)",
                  // backgroundColor: "white",
                  filter: "drop-shadow(0px 3px 6px #00000029)",
                  width: "100%",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
              >
                {TOKEN_LIST &&
                  Object.entries(TOKEN_LIST)
                    .filter(([_, t]) => t.chainId === network.chainId)
                    .map(([_, t]) => {
                      return (
                        <MenuItem value={t.name} key={t.address}>
                          <ThemeUIThemeProvider theme={theme}>
                            <Flex
                              sx={{
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%",
                              }}
                            >
                              <Flex
                                sx={{
                                  alignItems: "center",
                                  fontFamily: "sen",
                                  fontSize: ["25px", null, null, "33px"],
                                }}
                              >
                                <Image
                                  sx={{ height: 24, width: 24 }}
                                  mr={4}
                                  src={t.logoURI}
                                />
                                {t.name}
                              </Flex>
                            </Flex>
                          </ThemeUIThemeProvider>
                        </MenuItem>
                      );
                    })}
              </Select>
            </ThemeProvider>
          </Box>
        )}
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
              setCost(getNomCost(name, years, coin?.symbol === "vNOM"));
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
              setYears(getNomYears(name, cost, coin?.symbol === "vNOM"));
            }}
          />
          <Text sx={{ ml: 8 }}>{address ? coin?.symbol : "USD"}</Text>
        </Flex>
        {loading ? (
          <Spinner />
        ) : nom.owner == null ? (
          button
        ) : nom.owner === address ? (
          <Text>You own this name!</Text>
        ) : (
          nom.owner && (
            <Text>
              Name has already been reserved by{" "}
              <BlockscoutAddressLink address={nom.owner}>
                {shortenAddress(nom.owner)}
              </BlockscoutAddressLink>
            </Text>
          )
        )}
      </Box>
    </Flex>
  );
};
