import React from "react";
import { Box } from "theme-ui";

// TODO: Remove any
const tags: any[] = [
  // { name: "farmer", color: "green" },
  // { name: "lender", color: "blue" },
  // { name: "borrower", color: "red" },
  // { name: "staker", color: "yellow" },
];

interface Props {
  userAddress: string;
}

export const UserTags: React.FC<Props> = () => {
  return (
    <Box variant="search.rowScrollContainer">
      {tags.map((e) => {
        return <Box variant={`search.tag.${e.color}`}>{e.name}</Box>;
      })}
    </Box>
  );
};
