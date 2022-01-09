import React from "react";
import { Box } from "theme-ui";

export const SearchDetailMobileFooter: React.FC = () => {
  return (
    <Box sx={{}}>
      <Box>number / wallet</Box>
      {/* should use mui drawer here pretty sure */}
      <Box>menu, search</Box>
    </Box>
  );
};
