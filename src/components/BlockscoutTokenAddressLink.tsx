import { useContractKit } from "@celo-tools/use-contractkit";
import React from "react";
import { Link } from "theme-ui";

export const BlockscoutTokenAddressLink: React.FC<{
  address: string;
  tokenAddress: string;
}> = ({ tokenAddress, children }) => {
  const { network } = useContractKit();
  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      // href={`${network.explorer}/address/${address}/tokens/${tokenAddress}/token-transfers`}
      href={`${network.explorer}/address/${tokenAddress}`}
      style={{ textDecoration: "none" }}
    >
      {children}
    </Link>
  );
};
