import { ChainId } from "@celo-tools/use-contractkit";
import styled from "@emotion/styled";
import { useCeloChainId } from "hooks/useCeloChainId";
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

const MAINNET_EXPLORERS: Record<string, Explorer> = {
  [ChainId.Celo]: {
    imageUrl: Celo,
    explorerUrl: "https://explorer.celo.org",
  },
  // [ChainId.Polygon]: {
  //   imageUrl: Polygon,
  //   explorerUrl: "https://polygonscan.com",
  // },
  [ChainId.Avalanche]: {
    imageUrl: Avalanche,
    explorerUrl: "https://snowtrace.io",
  },
};

const TESTNET_EXPLORERS: Record<string, Explorer> = {
  [ChainId.Alfajores]: {
    imageUrl: Celo,
    explorerUrl: "https://alfajores-blockscout.celo-testnet.org",
  },
  [ChainId.Fuji]: {
    imageUrl: Avalanche,
    explorerUrl: "https://testnet.snowtrace.io",
  },
};

export const EXPLORERS: Record<string, Explorer> = {
  ...MAINNET_EXPLORERS,
  ...TESTNET_EXPLORERS,
};

const ExplorerIcon = styled(Image)({
  width: "42px",
  height: "42px",
  marginRight: "16px",
});

export const ExplorerIcons: React.FC<Props> = ({ userAddress }) => {
  const celoChainId = useCeloChainId();
  const explorers =
    celoChainId === 44787 ? TESTNET_EXPLORERS : MAINNET_EXPLORERS;
  if (!userAddress) return null;

  return (
    <>
      {Object.values(explorers).map((e, idx) => {
        return (
          <Link
            key={idx}
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
