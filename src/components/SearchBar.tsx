import React from "react";
import { useHistory } from "react-router-dom";
import { Breakpoint, useBreakpoint } from "src/hooks/useBreakpoint";
import WhiteSearchIcon from "src/icons/WhiteSearchIcon.svg";
import BlackSearchIcon from "src/icons/BlackSearchIcon.svg";
import { Button, Flex, Input, useColorMode } from "theme-ui";

const SEARCH_HEIGHT = [56, 90];
const TRANSFORM = ["translate(8px, 12px)", "translate(16px, 32px)"];

interface IProps {
  size?: "small" | "large";
}

export const SearchBar: React.FC<IProps> = ({ size }) => {
  const searchInput = React.useRef<any>(null);
  const history = useHistory();
  const breakpoint = useBreakpoint();
  const [colorMode] = useColorMode();

  let height;
  let transform;
  if (!size) {
    height = SEARCH_HEIGHT;
    transform = TRANSFORM;
  } else if (size === "small") {
    height = SEARCH_HEIGHT[0];
    transform = TRANSFORM[0];
  } else {
    height = SEARCH_HEIGHT[1];
    transform = TRANSFORM[1];
  }

  return (
    <Flex
      sx={{
        "form::before": {
          content: '""',
          position: "absolute",
          height: 28,
          width: 28,
          transform: transform,
          backgroundColor: "var(--theme-ui-colors-text)",
          background: `url(${
            colorMode === "light" ? BlackSearchIcon : WhiteSearchIcon
          }) no-repeat`,
        },
        width: "100%",
        justifyContent: "center",
      }}
    >
      <form
        style={{ width: "100%", maxWidth: 1000 }}
        onSubmit={(e) => {
          const searchTerm = searchInput?.current.value;
          if (searchTerm && searchTerm !== "") {
            history.push(`/search/${searchTerm}`);
          }
          e.preventDefault();
        }}
      >
        <Flex>
          <Input
            sx={{
              pl: [6, 7],
              height: height,
              width: "100%",
              backgroundColor: "secondaryBackground",
              border: "none",
              borderRadius: "6px 0 0 6px",
            }}
            ref={searchInput}
            placeholder="Search name"
          />
          {breakpoint === Breakpoint.DESKTOP && (
            <Button
              sx={{ height: height, borderRadius: "0 6px 6px 0" }}
              type="submit"
            >
              Search
            </Button>
          )}
        </Flex>
      </form>
    </Flex>
  );
};
