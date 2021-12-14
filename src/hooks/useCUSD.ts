import React from "react";
import { useContractKit } from "@celo-tools/use-contractkit";
import { StableToken } from "@celo/contractkit";
import { useAsyncState } from "src/hooks/useAsyncState";
import { FEE_MODULE } from "src/config";
import { toBN } from "web3-utils";

export const useCUSD = () => {
  const { kit, address, network } = useContractKit();
  const call = React.useCallback(async () => {
    if (!address) {
      return null;
    }
    const cUSD = await kit._web3Contracts.getStableToken(StableToken.cUSD);
    const allowance = toBN(
      await cUSD.methods.allowance(address, FEE_MODULE[network.chainId]).call()
    );
    const balance = toBN(await cUSD.methods.balanceOf(address).call());
    return { allowance, balance };
  }, [address, kit._web3Contracts, network.chainId]);
  return useAsyncState(null, call);
};
