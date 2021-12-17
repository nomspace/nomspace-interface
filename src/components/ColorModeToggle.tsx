import { Moon, Sun } from "phosphor-react";
import React from "react";
import { Flex, useColorMode } from "theme-ui";

export const ColorModeToggle: React.FC = () => {
  const [colorMode, setColorMode] = useColorMode();
  return (
    <Flex
      sx={{
        alignItems: "center",
        backgroundColor: "secondaryBackground",
        mr: 2,
        px: 2,
        cursor: "pointer",
        borderRadius: "6px",
        color: "textColor",
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
  );
};
