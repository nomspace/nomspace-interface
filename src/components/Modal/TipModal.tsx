import React from "react";
import { CustomModal } from "components/Modal/CustomModal";
import { ModalContent } from "@mattjennings/react-modal";
import QRCode from "qrcode.react";
import MenuItem from "@mui/material/MenuItem";
import theme from "theme";
import { Flex, Box, Input, Button, Text } from "theme-ui";
import { GetExplorerIconImages } from "components/ExplorerIcons";
import { ThemeProvider, createTheme } from "@mui/material";
import { ThemeProvider as ThemeUIThemeProvider } from "theme-ui";
import Select from "@mui/material/Select";

interface Props {
  open: boolean;
  onClose: () => void;
  resolution: string;
}

export const TipModal: React.FC<Props> = ({ resolution, open, onClose }) => {
  const [coin, setCoin] = React.useState("Celo");
  const coins = GetExplorerIconImages(resolution);

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
            <Box variant="modal.form.amountWrapper">
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
        <Text variant="modal.wallet.desktop">
          <u>{resolution}</u>
        </Text>
      </ModalContent>
    </CustomModal>
  );
};
