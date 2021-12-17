import { useMemo } from "react";
import Web3 from "web3";

export const useCeloWeb3 = () => {
  return useMemo(() => {
    return new Web3("https://alfajores-forno.celo-testnet.org");
  }, []);
};
