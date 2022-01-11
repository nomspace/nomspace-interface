import React from "react";
import { useContractKit, useProvider } from "@celo-tools/use-contractkit";
import { useAsyncState } from "hooks/useAsyncState";
import { RESERVE_PORTAL, USD } from "addresses";
import { ERC20__factory } from "generated";

export const useUSD = () => {
  const { address, network } = useContractKit();
  const provider = useProvider();
  const call = React.useCallback(async () => {
    const usdAddress = USD[network.chainId];
    const reservePortalAddress = RESERVE_PORTAL[network.chainId];
    if (!address || !provider || !usdAddress || !reservePortalAddress) {
      return null;
    }
    const usd = ERC20__factory.connect(usdAddress, provider);
    // TODO: Multicall
    const allowance = await usd.allowance(address, reservePortalAddress);
    const balance = await usd.balanceOf(address);
    const decimals = await usd.decimals();
    return { address: usdAddress, allowance, balance, decimals };
  }, [address, network.chainId, provider]);
  return useAsyncState(null, call);
};
