import { useContractKit } from "@celo-tools/use-contractkit";

export const TESTNET_CHAINIDS = [44787, 43113];
export const useCeloChainId = () => {
  const { network } = useContractKit();

  if (TESTNET_CHAINIDS.includes(network.chainId)) {
    return 44787;
  }
  return 44787; // TODO: 42220
};
