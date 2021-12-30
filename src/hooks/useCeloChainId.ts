import { useContractKit } from "@celo-tools/use-contractkit";

const TESTNET_CHAINIDS = [44787];
export const useCeloChainId = () => {
  const { network } = useContractKit();

  if (TESTNET_CHAINIDS.includes(network.chainId)) {
    return 44787;
  }
  return 42220;
};
