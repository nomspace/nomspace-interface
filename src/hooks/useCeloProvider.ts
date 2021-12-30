import { useMemo } from "react";
import { providers } from "ethers";
import { ChainId, useContractKit } from "@celo-tools/use-contractkit";

export const useCeloProvider = () => {
  const { network } = useContractKit();
  return useMemo(() => {
    if (network.chainId === ChainId.Alfajores) {
      return new providers.JsonRpcProvider(
        "https://alfajores-forno.celo-testnet.org"
      );
    }
    return new providers.JsonRpcProvider("https://forno.celo.org");
  }, [network.chainId]);
};
