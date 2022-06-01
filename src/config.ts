import { ChainId } from "@celo-tools/use-contractkit";
import { YEAR_IN_SECONDS } from "utils/constants";

export enum TextKey {
  EMAIL = "email",
  URL = "url",
  AVATAR = "avatar",
  DESCRIPTION = "description",
  NOTICE = "notice",
  KEYWORDS = "keywords",
  DISCORD = "com.discord",
  GITHUB = "com.github",
  REDDIT = "com.reddit",
  TWITTER = "com.twitter",
  TELEGRAM = "org.telegram",
}

export const NATIVE_CURRENCY: Record<string, string> = {
  [ChainId.Celo]: "CELO",
  [ChainId.Alfajores]: "CELO",
  [ChainId.Fuji]: "AVAX",
  [ChainId.Avalanche]: "AVAX",
  [ChainId.Kovan]: "ETH",
  [ChainId.Ethereum]: "AVAX",
  [ChainId.FantomTestnet]: "FTM",
  [ChainId.Fantom]: "FTM",
  [ChainId.Mumbai]: "MATIC",
  [ChainId.Polygon]: "MATIC",
};

export type Network = {
  chainId: number;
  name: string;
  rpc: string;
  explorer: string;
  gasCurrency: string;
  blockTimeInSeconds: number;
};

export const SUPPORTED_NETWORKS: Array<Network> = [
  {
    chainId: 42220,
    name: "Celo",
    rpc: "https://forno.celo.org",
    explorer: "https://explorer.celo.org",
    gasCurrency: "CELO",
    blockTimeInSeconds: 5,
  },
  {
    chainId: 250,
    name: "Fantom",
    rpc: "https://rpc.ftm.tools",
    explorer: "https://explorer.fantom.network",
    gasCurrency: "FTM",
    blockTimeInSeconds: 1,
  },
  {
    chainId: 43114,
    name: "Avalanche",
    rpc: "https://api.avax.network/ext/bc/C/rpc",
    explorer: "https://snowtrace.io",
    gasCurrency: "AVAX",
    blockTimeInSeconds: 2,
  },
  {
    chainId: 137,
    name: "Polygon",
    rpc: "https://polygon-rpc.com",
    explorer: "https://polygonscan.com",
    gasCurrency: "MATIC",
    blockTimeInSeconds: 2,
  },
  {
    chainId: 1,
    name: "Ethereum",
    rpc: process.env.REACT_APP_ETHEREUM_RPC || "",
    explorer: "https://etherscan.io",
    gasCurrency: "ETH",
    blockTimeInSeconds: 15,
  },
  ...(process.env.NODE_ENV === "development"
    ? [
        {
          chainId: 44787,
          name: "Alfajores",
          rpc: "https://alfajores-forno.celo-testnet.org",
          explorer: "https://alfajores-blockscout.celo-testnet.org",
          gasCurrency: "CELO",
          blockTimeInSeconds: 15,
        },
        {
          chainId: 4002,
          name: "Fantom Testnet",
          rpc: "https://rpc.testnet.fantom.network",
          explorer: "https://explorer.testnet.fantom.network",
          gasCurrency: "FTM",
          blockTimeInSeconds: 1,
        },
        {
          chainId: 43113,
          name: "Fuji",
          rpc: "https://api.avax-test.network/ext/bc/C/rpc",
          explorer: "https://explorer.avax-test.network",
          gasCurrency: "AVAX",
          blockTimeInSeconds: 2,
        },
        {
          chainId: 80001,
          name: "Mumbai",
          rpc: process.env.REACT_APP_POLYGON_RPC || "",
          explorer: "https://mumbai.polygonscan.com",
          gasCurrency: "MATIC",
          blockTimeInSeconds: 2,
        },
        {
          chainId: 42,
          name: "Kovan",
          rpc: process.env.REACT_APP_KOVAN_RPC || "",
          explorer: "https://kovan.etherscan.io",
          gasCurrency: "ETH",
          blockTimeInSeconds: 15,
        },
      ]
    : []),
];

export const DECIMAL_PRECISION = 2; // Number of decimals to show

export const localForageVersion = 1;

export const NOM_FEE = 5 / YEAR_IN_SECONDS;

export const GAS_USD = 0.01; // $0.01 cents per tx
