import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  useColorMode,
  Button,
  Input,
} from "theme-ui";
import { SearchBar } from "components/SearchBar";
import { AccountProfile } from "components/AccountProfile";
import moment from "moment";
import { useUserNoms } from "hooks/useUserNoms";
import { Link } from "react-router-dom";
import { AnimatedModalStack } from "@mattjennings/react-modal";
import QRCode from "qrcode.react";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ThemeProvider, createTheme } from "@mui/material";

import { GetExplorerIconImages } from "components/ExplorerIcons";
import { ThemeProvider as ThemeUIThemeProvider } from "theme-ui";
import theme from "theme";

import styled from "@emotion/styled";

import {
  Modal,
  ModalTitle,
  ModalContent,
  ModalFooter,
} from "@mattjennings/react-modal";
import { QrCode } from "phosphor-react";

interface Props {
  nom: { resolution: string };
}

export const Sidebar: React.FC<Props> = ({ nom }) => {
  const [userNoms] = useUserNoms();
  const [colorMode, setColorMode] = useColorMode();

  // const [openModal, setOpenModal, Dialog] = CustomAnimation();

  const [coin, setCoin] = React.useState("Celo");
  const [openTestDialog, setOpenTestDialog] = React.useState(false);
  // let TestDialog = () => {
  //   return (
  //     <AnimatedModalStack>
  //       <Modal
  //         onClose={() => {
  //           setOpenTestDialog(false);
  //         }}
  //         open={openTestDialog}
  //         animations={{
  //           default: {
  //             enter: {
  //               x: 550,
  //               transition: {
  //                 duration: 0.3,
  //                 ease: "easeInOut",
  //               },
  //             },
  //             exit: {
  //               x: "-100vh",
  //               transition: {
  //                 duration: 3.3,
  //                 ease: "easeInOut",
  //               },
  //             },
  //           },
  //         }}
  //       >
  //         {({ onClose }) => (
  //           <>
  //             <ModalTitle>
  //               <Text
  //                 sx={{
  //                   fontSize: 2,
  //                   fontWeight: "medium",
  //                 }}
  //               >
  //                 Welcome!
  //               </Text>
  //             </ModalTitle>
  //             <ModalContent>
  //               <Text>This is the modal example</Text>
  //             </ModalContent>
  //             <ModalFooter>
  //               <button onClick={onClose}>OK</button>
  //             </ModalFooter>
  //           </>
  //         )}
  //       </Modal>
  //     </AnimatedModalStack>
  //     // <ThemeProvider theme={createTheme()}>
  //     //   <Dialog
  //     //     onClose={() => {
  //     //       setOpenTestDialog(false);
  //     //     }}
  //     //     open={openTestDialog}
  //     //   >
  //     //     asdf
  //     //   </Dialog>
  //     // </ThemeProvider>
  //   );
  // };

  // const CustomAnimation = ({
  //   open,
  //   setOpen,
  // }: {
  //   open: boolean;
  //   setOpen: (b: boolean) => any;
  // }) => {
  //   return (
  //     <>
  //       <Button onClick={() => setOpen(true)}>open</Button>
  //       <Modal
  //         open={open}
  //         onClose={() => setOpen(false)}
  //         animations={{
  //           default: {
  //             enter: {
  //               y: 0,
  //               transition: {
  //                 duration: 0.3,
  //                 ease: "easeInOut",
  //               },
  //             },
  //             exit: {
  //               y: "-100vh",
  //               transition: {
  //                 duration: 0.3,
  //                 ease: "easeInOut",
  //               },
  //             },
  //           },
  //           fullScreen: {
  //             enter: {
  //               opacity: 1,
  //             },
  //             exit: {
  //               opacity: 0,
  //             },
  //           },
  //         }}
  //       >
  //         {({ onClose }) => (
  //           <>
  //             <ModalTitle>
  //               <Text
  //                 sx={{
  //                   fontSize: 2,
  //                   fontWeight: "medium",
  //                 }}
  //               >
  //                 Welcome!
  //               </Text>
  //             </ModalTitle>
  //             <ModalContent>
  //               <Text>This is the modal example</Text>
  //             </ModalContent>
  //             <ModalFooter>
  //               <Button variant="pill" onClick={onClose}>
  //                 OK
  //               </Button>
  //             </ModalFooter>
  //           </>
  //         )}
  //       </Modal>
  //     </>
  //   );
  // };

  const CustomAnimation = () => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>open</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          animations={{
            default: {
              enter: {
                y: 0,
                transition: {
                  duration: 0.3,
                  ease: "easeInOut",
                },
              },
              exit: {
                y: "-100vh",
                transition: {
                  duration: 0.3,
                  ease: "easeInOut",
                },
              },
            },
            fullScreen: {
              enter: {
                opacity: 1,
              },
              exit: {
                opacity: 0,
              },
            },
          }}
        >
          {({ onClose }) => (
            <>
              <ModalTitle>
                <Text
                  sx={{
                    fontSize: 2,
                    fontWeight: "medium",
                  }}
                >
                  Welcome!
                </Text>
              </ModalTitle>
              <ModalContent>
                <Text>This is the modal example</Text>
              </ModalContent>
              <ModalFooter>
                <Button variant="pill" onClick={onClose}>
                  OK
                </Button>
              </ModalFooter>
            </>
          )}
        </Modal>
      </>
    );
  };

  const coins = GetExplorerIconImages(nom.resolution);
  console.log(coins);

  return (
    <>
      <Modal
        open={openTestDialog}
        onClose={() => setOpenTestDialog(false)}
        animations={{
          default: {
            enter: {
              y: 0,

              transition: {
                duration: 0.3,
                ease: "easeInOut",
              },
            },
            exit: {
              y: "-100vh",

              transition: {
                duration: 0.3,
                ease: "easeInOut",
              },
            },
          },
          fullScreen: {
            enter: {
              opacity: 1,
            },
            exit: {
              opacity: 0,
            },
          },
        }}
      >
        <ModalContent>
          <Text variant="modal.title">Send a Tip</Text>
          <Flex variant="modal.container">
            <Box variant="modal.qrCode">
              <QRCode
                value={`https://twitter.com/nomspace_nom`}
                bgColor={"rgba(0,0,0,0)"}
                style={{ width: "300px", height: "300px" }}
                size={300}
              />
            </Box>
            <Text variant="modal.wallet.mobile">{nom.resolution}</Text>
            <Box variant="modal.form.container">
              <Box variant="modal.form.item">
                <ThemeProvider theme={createTheme()}>
                  <Select
                    value={coin}
                    onChange={(e) => {
                      setCoin(e.target.value);
                    }}
                    autoWidth
                    MenuProps={{
                      disableScrollLock: true,
                    }}
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
                                  fontSize: "33px",
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
              <Box variant="modal.form.inputWrapper">
                <Input
                  variant="modal.form.input"
                  type="number"
                  placeholder="0.00"
                />
              </Box>
              <Button disabled={!!""} variant="modal.form.submit">
                Enter an Amount
              </Button>
            </Box>
          </Flex>
          <Text variant="modal.wallet.desktop">
            <u>{nom.resolution}</u>
          </Text>
        </ModalContent>
      </Modal>
      <Box variant="search.sidebar.container">
        <AccountProfile />
        <Box variant="search.sidebar.noms.container">
          <Heading variant="search.sidebar.heading">My Noms</Heading>
          {userNoms?.map((un, idx) => {
            return (
              <Box
                key={idx}
                variant="search.sidebar.item"
                sx={{ "::before": { display: "none" } }}
              >
                <Link to={`/${un.name}`}>
                  <Flex
                    sx={{
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Flex sx={{ alignItems: "center" }}>
                      <Text variant="search.sidebar.nom.name">
                        {un.name}.nom
                      </Text>
                    </Flex>
                    <Text variant="search.sidebar.nom.date">
                      {moment.unix(un.expiration).format("MM/DD/YYYY")}
                    </Text>
                  </Flex>
                </Link>
              </Box>
            );
          })}
        </Box>
        <Box variant="search.sidebar.settings.container">
          <Heading variant="search.sidebar.heading">Settings</Heading>
          <Text
            variant="search.sidebar.item"
            sx={{ cursor: "pointer" }}
            onClick={() => {
              if (colorMode === "light") {
                setColorMode("dark");
              } else {
                setColorMode("light");
              }
            }}
          >
            Light / Dark Mode
          </Text>
          <Text
            variant="search.sidebar.item"
            onClick={() => {
              setOpenTestDialog(true);
            }}
            sx={{ cursor: "pointer" }}
          >
            Test Tip
          </Text>
          {/* <Text variant="search.sidebar.item">Default Currency</Text>
        <Text variant="search.sidebar.item">Language</Text> */}
        </Box>
        <Box variant="search.sidebar.search">
          <SearchBar />
        </Box>
      </Box>
    </>
  );
};
