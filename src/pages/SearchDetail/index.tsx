import React from "react";
import { useParams } from "react-router-dom";
import { Box } from "theme-ui";

export const SearchDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  return <Box>Search {name}</Box>;
};
