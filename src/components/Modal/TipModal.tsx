import React, { useCallback, useEffect, useRef, useState } from "react";
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
} from "theme-ui";
import Select from "@mui/material/Select";
import { Token } from "web3-token-list";
import { TokenWithBalance, useTokens } from "hooks/useTokens";
import { formatUnits, parseUnits } from "ethers/lib/utils";
import { useGetConnectedSigner } from "@celo-tools/use-contractkit";
import { ERC20__factory } from "generated";
import { GlobalNom } from "hooks/useNom";
import { useName } from "hooks/useName";
import { toastTx } from "utils/toastTx";

interface Props {
  open: boolean;
  onClose: () => void;
  resolution: string;
}

export const TipModal: React.FC<Props> = ({ resolution, open, onClose }) => {
  const { name } = useName();
  const [nom] = GlobalNom.useContainer();
  const [tokens] = useTokens();
  const [coin, setCoin] = React.useState<TokenWithBalance>();
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
    <CustomModal open={open} onClose={onClose}>
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
              value={`https://twitter.com/nomspace_nom`}
              bgColor={"rgba(0,0,0,0)"}
              style={{ width: "100%", height: "100%" }}
              size={300}
            />
          </Box>
          <Text variant="modal.wallet.mobile">{resolution}</Text>
          <Box variant="modal.form.container">
            <Box variant="modal.form.selectWrapper">
              <ThemeProvider theme={createTheme()}>
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
                    backgroundColor: "white",
                    filter: "drop-shadow(0px 3px 6px #00000029)",
                    border: "none",
                    width: "100%",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                >
                  {tokens &&
                    tokens.map((t) => {
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
                              <Text>
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
            <Box variant="modal.form.amountWrapper">
              <Input
                variant="modal.form.input"
                type="number"
                value={amount}
                onChange={(e) => {
                  const amount = Number(e.target.value);
                  if (isNaN(amount)) return;
                  setAmount(amount);
                }}
              />
            </Box>
            <Button
              onClick={send}
              variant="modal.form.submit"
              disabled={coin?.balance.lt(
                parseUnits(amount.toString(), coin.decimals)
              )}
            >
              SEND
            </Button>
          </Box>
        </Flex>
        <Text variant="modal.wallet.desktop">
          <u>{resolution}</u>
        </Text>
      </ModalContent>
    </CustomModal>
  );
};
