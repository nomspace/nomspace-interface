import React, { useCallback, useEffect, useState } from "react";
import { CustomModal } from "components/Modal/CustomModal";
import { ModalContent } from "@mattjennings/react-modal";
import QRCode from "qrcode.react";
import MenuItem from "@mui/material/MenuItem";
import theme from "theme";
import { ThemeProvider, createTheme } from "@mui/material";
import {
  ThemeProvider as ThemeUIThemeProvider,
  Image,
  Flex,
  Box,
  Input,
  Button,
  Text,
  useColorMode,
} from "theme-ui";
import Select from "@mui/material/Select";
import { TokenWithBalance, useTokens } from "hooks/useTokens";
import { formatUnits, parseUnits } from "ethers/lib/utils";
import {
  useContractKit,
  useGetConnectedSigner,
} from "@celo-tools/use-contractkit";
import { ERC20__factory } from "generated";
import { GlobalNom } from "hooks/useNom";
import { toastTx } from "utils/toastTx";

interface Props {
  open: boolean;
  onClose: () => void;
  resolution: string;
}

export const TipModal: React.FC<Props> = ({ resolution, open, onClose }) => {
  const [nom] = GlobalNom.useContainer();
  const [tokens] = useTokens();
  const [coin, setCoin] = React.useState<TokenWithBalance>();
  const [colorMode] = useColorMode();
  const { address } = useContractKit();
  const getConnectedSigner = useGetConnectedSigner();
  useEffect(() => {
    const initialToken =
      tokens?.find((t) => t.symbol.includes("cUSD")) ||
      tokens?.find((t) => t.symbol.includes("USD"));
    setCoin(initialToken);
  }, [tokens]);
  const [amount, setAmount] = useState(5);
  const send = useCallback(async () => {
    if (!nom || !coin) return;
    const erc20 = ERC20__factory.connect(
      coin.address,
      await getConnectedSigner()
    );
    const tx = await erc20.transfer(
      nom.resolution,
      parseUnits(amount.toString(), coin.decimals)
    );
    toastTx(tx.hash);
    onClose();
  }, [amount, coin, getConnectedSigner, nom, onClose]);

  return (
    <CustomModal open={open} onClose={onClose} showClose={true}>
      <ModalContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflowX: "hidden",
        }}
      >
        <Text variant="modal.title">Send Tip</Text>
        <Flex variant="modal.container">
          <Box variant="modal.qrCode">
            <QRCode
              value={`celo://wallet/pay?address=${nom?.resolution}`}
              bgColor={"rgba(0,0,0,0)"}
              fgColor={`${colorMode === "light" ? "black" : "white"}`}
              style={{ width: "100%", height: "100%" }}
              size={300}
            />
          </Box>
          <Text variant="modal.wallet.mobile">{resolution}</Text>
          <Box variant="modal.form.container">
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
                  value={coin?.symbol}
                  onChange={(e) => {
                    const token = tokens?.find(
                      (t) => t.symbol === e.target.value
                    );
                    setCoin(token);
                  }}
                  autoWidth
                  sx={{
                    borderRadius: "11px",
                    backgroundColor:
                      "var(--theme-ui-colors-secondaryBackground)",
                    border: "4px solid var(--theme-ui-colors-primary)",
                    // backgroundColor: "white",
                    filter: "drop-shadow(0px 3px 6px #00000029)",
                    width: "100%",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                >
                  {tokens &&
                    tokens
                      .filter(
                        (t) => Number(formatUnits(t.balance, t.decimals)) > 0.01
                      )
                      .map((t) => {
                        return (
                          <MenuItem value={t.symbol} key={t.address}>
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
                                  {t.symbol}
                                </Flex>
                                <Text
                                  sx={{
                                    color: `var(--theme-ui-colors-textColor)`,
                                  }}
                                >
                                  {Number(
                                    formatUnits(t.balance, t.decimals)
                                  ).toFixed(4)}
                                </Text>
                              </Flex>
                            </ThemeUIThemeProvider>
                          </MenuItem>
                        );
                      })}
                </Select>
              </ThemeProvider>
            </Box>
            <Box variant="modal.form.inputWrapper">
              <Input
                variant="modal.form.input"
                type="number"
                value={amount}
                onChange={(e) => {
                  const amount = Number(e.target.value);
                  if (isNaN(amount)) return;
                  setAmount(amount);
                }}
                placeholder="0.00"
                sx={{ paddingLeft: "130px" }}
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
                Amount
              </Text>
            </Box>
            {!address ? (
              <Button variant="modal.form.submit" disabled={true}>
                Connect Wallet
              </Button>
            ) : (
              <Button
                onClick={send}
                variant="modal.form.submit"
                disabled={coin?.balance.lt(
                  parseUnits(amount.toString(), coin.decimals)
                )}
              >
                SEND
              </Button>
            )}
          </Box>
        </Flex>
        <Text variant="modal.wallet.desktop">
          <u>{resolution}</u>
        </Text>
      </ModalContent>
    </CustomModal>
  );
};
