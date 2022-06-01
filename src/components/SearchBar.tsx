import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Flex, Input } from "theme-ui";

const SEARCH_HEIGHT = [56, 90];

interface IProps {
  size?: "small" | "large";
  placeHolder?: string;
  onSearch?: () => void;
}

export const SearchBar: React.FC<IProps> = ({
  size,
  placeHolder,
  onSearch,
}) => {
  const searchInput = React.useRef<any>(null);
  const history = useHistory();

  let height;
  if (!size) {
    height = SEARCH_HEIGHT[0];
  } else if (size === "small") {
    height = SEARCH_HEIGHT[0];
  } else {
    height = SEARCH_HEIGHT[1];
  }

  return (
    <Flex
      sx={{
        width: "100%",
        justifyContent: "center",
        caretColor: "textColor",
        color: "textColor",
      }}
    >
      <form
        style={{ width: "100%", maxWidth: 1000 }}
        onSubmit={(e) => {
          const searchTerm = searchInput?.current.value.replaceAll(".nom", "");
          if (searchTerm && searchTerm !== "") {
            history.push(`/${searchTerm}`);
          }
          onSearch && onSearch();
          e.preventDefault();
        }}
      >
        <Flex
          sx={{
            fontSize: ["15px", "20px"],
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Input
            sx={{
              pl: [6, 7],
              height,
              maxWidth: ["200px", "66%"],
              backgroundColor: "secondaryBackground",
              border: "2px solid var(--theme-ui-colors-primary)",
              borderRadius: "12px",
              textAlign: "center",
              mb: 8,
              mr: 8,
              "::placeholder": {
                color: "var(--theme-ui-colors-primary)",
              },
            }}
            ref={searchInput}
            placeholder={placeHolder || "Find a nom"}
          />
          <Button
            sx={{
              px: 8,
              py: 4,
              boarderRadius: "12px",
              height,
              width: "fit-content",
            }}
            type="submit"
          >
            Search
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};
