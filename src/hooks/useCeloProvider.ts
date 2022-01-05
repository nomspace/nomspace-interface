import { useMemo } from "react";
import { providers } from "ethers";
import { useCeloChainId } from "./useCeloChainId";

export const useCeloProvider = () => {
  const celoChainId = useCeloChainId();
  return useMemo(() => {
    if (celoChainId === 44787) {
      return new providers.JsonRpcProvider(
        "https://alfajores-forno.celo-testnet.org"
      );
    }
    return new providers.JsonRpcProvider("https://forno.celo.org");
  }, [celoChainId]);
};
