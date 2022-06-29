import { ChainId, Network, NetworkNames } from "@celo-tools/use-contractkit";

// We do an unsafe cast so we can use a custom network name
export const Celo: Network = {
  name: "QNMainnet",
  rpcUrl: "https://forno.celo.org",
  graphQl: "https://explorer.celo.org/graphiql",
  explorer: "https://explorer.celo.org",
  chainId: ChainId.Celo,
} as unknown as Network;

export const Alfajores: Network = {
  name: NetworkNames.Alfajores,
  rpcUrl: "https://alfajores-forno.celo-testnet.org",
  graphQl: "https://alfajores-blockscout.celo-testnet.org/graphiql",
  explorer: "https://alfajores-blockscout.celo-testnet.org",
  chainId: ChainId.Alfajores,
};

export const xDai: Network = {
  name: "xDai",
  rpcUrl: "https://rpc.xdaichain.com",
  explorer: "https://blockscout.com/xdai/mainnet",
  chainId: 100,
} as unknown as Network;
