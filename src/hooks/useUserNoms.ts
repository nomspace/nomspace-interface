import React from "react";
import { useContractKit } from "@celo-tools/use-contractkit";
import { useAsyncState } from "./useAsyncState";
import { NomKit } from "@nomspace/nomspace";

export const useUserNoms = () => {
  const { kit, network, address } = useContractKit();

  const call = React.useCallback(async () => {
    return [];
    // if (!address || !NOM[network.chainId]) {
    //   return null;
    // }
    // const nomKit = new NomKit(kit as any, NOM[network.chainId]!);
    // return await nomKit.userNoms(address);
  }, [kit, network.chainId, address]);

  return useAsyncState(null, call);
};
