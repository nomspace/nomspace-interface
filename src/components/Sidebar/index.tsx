import React, { useState } from "react";
import {
  ThemeProvider as ThemeUIThemeProvider,
  Box,
  Flex,
  Heading,
  Text,
  useColorMode,
  useThemeUI,
} from "theme-ui";
import { SearchBar } from "components/SearchBar";
import { AccountProfile } from "components/AccountProfile";
import moment from "moment";
import { useUserNoms } from "hooks/useUserNoms";
import { Link } from "react-router-dom";
import { Spinner } from "theme-ui";
import { Drawer, ThemeProvider, createTheme } from "@mui/material";
import { List, CaretLeft } from "phosphor-react";

export const Sidebar: React.FC = () => {
  const [userNoms] = useUserNoms();
  const [colorMode, setColorMode] = useColorMode();
  const { theme } = useThemeUI();

  const [open, setOpen] = useState(false);

  const closeSidebar = () => {
    setOpen(false);
  };
  const openSidebar = () => {
    setOpen(true);
  };

  const sidebarContent = (
    <>
      <Box variant="search.sidebar.container" sx={{ height: "100%" }}>
        <AccountProfile />
        <Box variant="search.sidebar.nom.container">
          {userNoms ? (
            userNoms.length > 0 && (
              <>
                <Heading variant="search.sidebar.heading">My Noms</Heading>
                {userNoms.map((un, idx) => {
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
              </>
            )
          ) : (
            <Spinner />
          )}
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
          {/* <Text variant="search.sidebar.item">Default Currency</Text>
        <Text variant="search.sidebar.item">Language</Text> */}
        </Box>
        <Box variant="search.sidebar.search">
          <SearchBar />
        </Box>
      </Box>
    </>
  );

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: open ? 99 : 10000,
          backgroundColor: "rgba(0,0,0,0.3)",
          padding: "10px",
          borderRadius: "50%",
          cursor: "pointer",
          transition: "opacity 0.3s ease-in",
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
          transition: "opacity 0.3s ease-in",
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
              console.log("close sidebar");
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
