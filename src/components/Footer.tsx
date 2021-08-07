import React from "react";
import { Box, Flex, Link } from "theme-ui";
import { GithubLogo, TwitterLogo } from "phosphor-react";

export const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        bottom: 0,
        pb: 4,
      }}
    >
      <Flex sx={{ justifyContent: "center" }}>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/nomspace"
          style={{ textDecoration: "none" }}
          mr={2}
        >
          <GithubLogo size={32} />
        </Link>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/nomspace_nom"
          style={{ textDecoration: "none" }}
        >
          <TwitterLogo size={32} />
        </Link>
      </Flex>
    </Box>
  );
};
