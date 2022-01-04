import styled from "@emotion/styled";
import Celo from "pages/SearchDetail/assets/s1.png";
import Polygon from "pages/SearchDetail/assets/s2.png";
import Avalanche from "pages/SearchDetail/assets/s3.png";
import React from "react";
import { Image, Link } from "theme-ui";

interface Props {
  userAddress: string;
}

type Explorer = {
  imageUrl: string;
  explorerUrl: string;
};

const EXPLORERS: Explorer[] = [
  {
    imageUrl: Celo,
    explorerUrl: "https://explorer.celo.org",
  },
  {
    imageUrl: Polygon,
    explorerUrl: "https://polygonscan.com",
  },
  {
    imageUrl: Avalanche,
    explorerUrl: "https://snowtrace.io",
  },
];

const ExplorerIcon = styled(Image)({
  width: "42px",
  height: "42px",
  marginRight: "16px",
});

export const ExplorerIcons: React.FC<Props> = ({ userAddress }) => {
  if (!userAddress) return null;

  return (
    <>
      {EXPLORERS.map((e) => {
        return (
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={`${e.explorerUrl}/address/${userAddress}`}
            style={{ textDecoration: "none" }}
          >
            <ExplorerIcon src={e.imageUrl} />
          </Link>
        );
      })}
    </>
  );
};
