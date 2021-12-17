import { useMemo } from "react";
import { providers } from "ethers";

export const useCeloProvider = () => {
  return useMemo(() => {
    // TODO: HARDCODE
    return new providers.JsonRpcProvider(
      "https://alfajores-forno.celo-testnet.org"
    );
  }, []);
};
