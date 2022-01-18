import React, { useState } from "react";
import {
  ThemeProvider as ThemeUIThemeProvider,
  Box,
  Flex,
  Heading,
  Text,
  useColorMode,
  useThemeUI,
  Container,
} from "theme-ui";
import { SearchBar } from "components/SearchBar";
import { AccountProfile } from "components/AccountProfile";
import moment from "moment";
import { useUserNoms } from "hooks/useUserNoms";
import { Link, useHistory } from "react-router-dom";
import { Spinner } from "theme-ui";
import { Drawer, ThemeProvider, createTheme } from "@mui/material";
import { List, CaretLeft } from "phosphor-react";
import { LogoIcon } from "icons/LogoIcon";
import { ReverseResolution } from "hooks/useReverseResolution";
import { useSetReverseResolution } from "hooks/useSetReverseResolution";

interface Props {
  openExtendModal?: () => void;
}

export const Sidebar: React.FC<Props> = ({ openExtendModal }) => {
  const [userNoms] = useUserNoms();
  const [colorMode, setColorMode] = useColorMode();
  const { theme } = useThemeUI();
  const history = useHistory();
  const [reverseResolution, refetchReverseResolution] =
    ReverseResolution.useContainer();
  const { setReverseResolution } = useSetReverseResolution();

  const [open, setOpen] = useState(false);

  const closeSidebar = () => {
    setOpen(false);
  };
  const openSidebar = () => {
    setOpen(true);
  };

  const sidebarContent = (
    <Box variant="search.sidebar.container">
      <Box
        onClick={() => {
          closeSidebar();
        }}
      >
        <AccountProfile />
      </Box>
      <Box variant="search.sidebar.nom.container">
        {userNoms ? (
          userNoms.length > 0 && (
            <>
              <Heading variant="search.sidebar.heading">My Noms</Heading>
              {userNoms.map((un, idx) => {
                return (
                  <Flex
                    key={idx}
                    variant="search.sidebar.item"
                    sx={{
                      "::before": { display: "none" },
                      flexDirection: "column",
                    }}
                  >
                    <Flex
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Link to={`/${un.name}`}>
                        <Flex sx={{ alignItems: "center" }}>
                          <Text variant="search.sidebar.nom.name">
                            {un.name}.nom
                          </Text>
                        </Flex>
                      </Link>
                      <Flex sx={{ alignItems: "center" }}>
                        <Text variant="search.sidebar.nom.date" mr={2}>
                          {moment.unix(un.expiration).format("MM/DD/YYYY")}
                        </Text>
                        <Text
                          sx={{
                            textDecoration: "underline",
                            fontSize: 12,
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            if (openExtendModal) {
                              history.push(`/${un.name}`);
                              closeSidebar();
                              openExtendModal();
                            }
                          }}
                        >
                          Extend
                        </Text>
                      </Flex>
                    </Flex>
                    {reverseResolution !== un.name && (
                      <Container
                        sx={{ textAlign: "right", height: "fit-content" }}
                      >
                        <Text
                          sx={{
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                          onClick={async () => {
                            await setReverseResolution(un.name);
                            refetchReverseResolution();
                          }}
                        >
                          Set as default
                        </Text>
                      </Container>
                    )}
                  </Flex>
                );
              })}
            </>
          )
        ) : (
          <Spinner />
        )}
      </Box>
      <Box variant="search.sidebar.search" mt={48}>
        <SearchBar onSearch={() => closeSidebar()} />
      </Box>
      <Box mt={48}>
        {colorMode === "light" ? (
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
            {" "}
            <u>
              <b>Light</b>
            </u>{" "}
            / Dark Mode
          </Text>
        ) : (
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
            Light /{" "}
            <u>
              <b>Dark</b>
            </u>{" "}
            Mode
          </Text>
        )}

        {/* <Text variant="search.sidebar.item">Default Currency</Text>
        <Text variant="search.sidebar.item">Language</Text> */}
      </Box>
      <Box mt={24}>
        <Link to="/">
          <Flex
            sx={{
              flexDirection: "column",
              alignItems: "center",
              fill: "var(--theme-ui-colors-textColor)",
            }}
          >
            <LogoIcon />
            <Text>Nomspace</Text>
          </Flex>
        </Link>
      </Box>
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: open ? 49 : 100,
          backgroundColor: "rgba(0,0,0,0.3)",
          padding: "10px",
          borderRadius: "50%",
          cursor: "pointer",
          transition: "opacity 0.20s linear",
          opacity: open ? 0 : 1,
        }}
        onClick={() => {
          openSidebar();
        }}
      >
        <List
          size={32}
          color={`${colorMode === "light" ? "white" : "white"}`}
        />
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: !open ? 99 : 10000,
          backgroundColor: "rgba(0,0,0,0.3)",
          padding: "10px",
          borderRadius: "50%",
          cursor: "pointer",
          transition: "opacity 0.20s linear",
          opacity: !open ? 0 : 1,
        }}
        onClick={() => {
          closeSidebar();
        }}
      >
        <CaretLeft
          size={32}
          color={`${colorMode === "light" ? "white" : "white"}`}
        />
      </Box>
      <ThemeProvider theme={createTheme()}>
        {/* breakpoint === Breakpoint.DESKTOP
          leaving here to come back to later,
          for some reason MUI persistent drawer is being a pain 
          in the ass.
          reference links:

        */}
        {false ? (
          // desktop
          <Drawer
            variant="persistent"
            anchor="left"
            open={open}
            onClose={() => {
              closeSidebar();
            }}
            sx={{
              position: "relative",
              width: "auto",
              ".MuiPaper-root": {
                position: "absolute",
              },
            }}
          >
            <ThemeUIThemeProvider theme={theme}>
              {/* add sidebar close button here */}
              {sidebarContent}
            </ThemeUIThemeProvider>
          </Drawer>
        ) : (
          // mobile
          <Drawer
            variant="temporary"
            anchor="left"
            open={open}
            onClose={closeSidebar}
            sx={{}}
          >
            <ThemeUIThemeProvider theme={theme}>
              {sidebarContent}
            </ThemeUIThemeProvider>
          </Drawer>
        )}
      </ThemeProvider>
    </>
  );
};
