import { useMemo } from "react";
import { providers } from "ethers";
import { useCeloChainId } from "./useCeloChainId";
import { Alfajores, Celo } from "networks";

export const useCeloProvider = () => {
  const celoChainId = useCeloChainId();
  return useMemo(() => {
    if (celoChainId === 44787) {
      return new providers.JsonRpcProvider(Alfajores.rpcUrl);
    }
    return new providers.JsonRpcProvider(Celo.rpcUrl);
  }, [celoChainId]);
};
