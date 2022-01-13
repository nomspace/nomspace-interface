import React from "react";
import { Box, Button, Flex, Spinner, useColorMode } from "theme-ui";
import { Logo } from "src/components/Logo";
import { ConnectWallet } from "src/components/ConnectWallet";
import { useHistory, useLocation } from "react-router-dom";
import { Moon, Sun } from "phosphor-react";
import { useUserNoms } from "src/hooks/useUserNoms";

export const Header: React.FC = () => {
  const location = useLocation();
  const [colorMode, setColorMode] = useColorMode();
  const [userNoms] = useUserNoms();
  const history = useHistory();

  return (
    <Flex sx={{ justifyContent: "space-between", alignItems: "center" }} mb={4}>
      {location.pathname === "/search" ? <Box /> : <Logo />}
      <Flex>
        {location.pathname !== "/nomstronaut/nomstronaut" && (
          <>
            <Button
              onClick={() => {
                history.push("/nomstronaut/nomstronaut");
                setColorMode("dark");
              }}
              sx={{
                color: "var(--theme-ui-colors-text)",
                border: "1px solid var(--theme-ui-colors-primary)",
                background: "var(--theme-ui-colors-primary)",
                px: [1, 2],
                py: 1,
                mr: [1, 4],
              }}
            >
              Nomstronaut
            </Button>
            {userNoms ? (
              <Button
                onClick={() => {
                  alert(userNoms);
                }}
                sx={{
                  color: "var(--theme-ui-colors-text)",
                  border: "1px solid var(--theme-ui-colors-text)",
                  background: "transparent",
                  px: [1, 2],
                  py: 1,
                  mr: [1, 4],
                }}
              >
                My Noms
              </Button>
            ) : (
              <Spinner mr={[1, 4]} />
            )}

            <Flex
              sx={{
                alignItems: "center",
                backgroundColor: "secondaryBackground",
                mr: [1, 4],
                px: 2,
                cursor: "pointer",
                borderRadius: "6px",
              }}
              onClick={() => {
                if (colorMode === "light") {
                  setColorMode("dark");
                } else {
                  setColorMode("light");
                }
              }}
            >
              {colorMode === "light" ? <Sun size={28} /> : <Moon size={28} />}
            </Flex>
          </>
        )}
        <ConnectWallet />
      </Flex>
    </Flex>
  );
};
