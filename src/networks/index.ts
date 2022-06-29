import { ChainId, Network, NetworkNames } from "@celo-tools/use-contractkit";

export enum CustomChainId {
  Avalanche = 43114,
  Fuji = 43113,
  Fantom = 250,
  FantomTestnet = 4002,
  Ethereum = 1,
  Kovan = 42,
  Polygon = 137,
  Mumbai = 80001,
}

// We do an unsafe cast so we can use a custom network name
export const Celo: Network = {
  name: NetworkNames.Mainnet,
  rpcUrl: "https://forno.celo.org",
  graphQl: "https://explorer.celo.org/graphiql",
  explorer: "https://explorer.celo.org",
  chainId: ChainId.Mainnet,
};

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

export const Avalanche: Network = {
  name: "Avalanche",
  rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
  explorer: "https://snowtrace.io",
  chainId: CustomChainId.Avalanche,
} as unknown as Network;

export const Fuji: Network = {
  name: "Fuji",
  rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
  explorer: "https://testnet.snowtrace.io",
  chainId: CustomChainId.Fuji,
} as unknown as Network;

export const Polygon: Network = {
  name: "Polygon",
  rpcUrl:
    process.env.POLYGON_RPC_URL || process.env.REACT_APP_POLYGON_RPC_URL || "",
  explorer: "https://polygonscan.com",
  chainId: CustomChainId.Polygon,
} as unknown as Network;

export const Mumbai: Network = {
  name: "Mumbai",
  rpcUrl:
    process.env.MUMBAI_RPC_URL || process.env.REACT_APP_MUMBAI_RPC_URL || "",
  explorer: "https://mumbai.polygonscan.com",
  chainId: CustomChainId.Mumbai,
} as unknown as Network;

export const Fantom: Network = {
  name: "Fantom",
  rpcUrl: "https://rpc.ftm.tools",
  explorer: "https://ftmscan.com",
  chainId: CustomChainId.Fantom,
} as unknown as Network;

export const FantomTestnet: Network = {
  name: "FantomTestnet",
  rpcUrl: "https://rpc.testnet.fantom.network",
  explorer: "https://testnet.ftmscan.com",
  chainId: CustomChainId.FantomTestnet,
} as unknown as Network;

export const Ethereum: Network = {
  name: "Ethereum",
  rpcUrl:
    process.env.ETHEREUM_RPC_URL ||
    process.env.REACT_APP_ETHEREUM_RPC_URL ||
    "",
  explorer: "https://etherscan.io",
  chainId: CustomChainId.Ethereum,
} as unknown as Network;

export const Kovan: Network = {
  name: "Kovan",
  rpcUrl:
    process.env.KOVAN_RPC_URL || process.env.REACT_APP_KOVAN_RPC_URL || "",
  explorer: "https://kovan.etherscan.io",
  chainId: CustomChainId.Kovan,
} as unknown as Network;
