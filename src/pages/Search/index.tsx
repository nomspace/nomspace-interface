import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Flex, Heading, Input } from "theme-ui";
import { Breakpoint, useBreakpoint } from "src/hooks/useBreakpoint";
import SearchIcon from "src/icons/SearchIcon.svg";

const SEARCH_HEIGHT = [48, 90];

export const Search: React.FC = () => {
  const searchInput = React.useRef<any>(null);
  const history = useHistory();
  const breakpoint = useBreakpoint();
  return (
    <Flex
      sx={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mt: ["33%", "15%"],
      }}
    >
      <Heading as="h1" mb={4}>
        Nomspace
      </Heading>
      <Flex
        sx={{
          "form::before": {
            content: '""',
            position: "absolute",
            height: 28,
            width: 28,
            transform: ["translate(8px, 8px)", "translate(16px, 32px)"],
            backgroundColor: "var(--theme-ui-colors-text)",
            background: `url(${SearchIcon}) no-repeat`,
          },
          width: "100%",
          justifyContent: "center",
        }}
      >
        <form
          style={{ width: "100%", maxWidth: 1000 }}
          onSubmit={(e) => {
            const searchTerm = searchInput?.current.value;
            history.push(`/search/${searchTerm}`);
            e.preventDefault();
          }}
        >
          <Flex>
            <Input
              sx={{
                pl: [6, 7],
                height: SEARCH_HEIGHT,
                width: ["100%"],
                backgroundColor: "secondaryBackground",
                border: "none",
                borderRadius: "6px 0 0 6px",
              }}
              ref={searchInput}
              placeholder="Search name"
            />
            {breakpoint === Breakpoint.DESKTOP && (
              <Button
                sx={{ height: SEARCH_HEIGHT, borderRadius: "0 6px 6px 0" }}
                type="submit"
              >
                Search
              </Button>
            )}
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};
