import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, Flex, Heading, Input, Label } from "theme-ui";

export const Search: React.FC = () => {
  const searchInput = React.useRef<any>(null);
  const history = useHistory();
  return (
    <Box>
      <Heading as="h1">Search</Heading>
      <form
        onSubmit={(e) => {
          const searchTerm = searchInput?.current.value;
          history.push(`/search/${searchTerm}`);
          e.preventDefault();
        }}
      >
        <Label>Search</Label>
        <Input ref={searchInput} mb={2} />
        <Flex sx={{ justifyContent: "center" }}>
          <Button type="submit">Search</Button>
        </Flex>
      </form>
    </Box>
  );
};
