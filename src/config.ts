import { ChainId } from "@celo-tools/use-contractkit";
import { YEAR_IN_SECONDS } from "utils/constants";

export const NOM: Record<string, string> = {
  [ChainId.Celo]: "0xABf8faBbC071F320F222A526A2e1fBE26429344d",
  [ChainId.Alfajores]: "0xb83e6f8BC9553Dd7AaECA86E96fa9B113563dfa3", // OperatorOwned
  [ChainId.Baklava]: "",
};
export const USD: Record<string, string> = {
  [ChainId.Celo]: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
  [ChainId.Alfajores]: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
  [ChainId.Baklava]: "",
  [ChainId.Fuji]: "0x45ea5d57ba80b5e3b0ed502e9a08d568c96278f9", // USDC.e
};
export const FEE_MODULE: Record<string, string> = {
  [ChainId.Celo]: "0x07DDCB69Bc2637A6c03d5523696E21B688b42d65",
  [ChainId.Alfajores]: "0xa41b00095C14Ff7c3697485136eE53C12B3a681A",
  [ChainId.Baklava]: "",
};
export const RESERVE_PORTAL: Record<string, string> = {
  [ChainId.Celo]: "",
  [ChainId.Alfajores]: "0xC3604Ae1EAeC5Ef06CBf8AF6D3aB060C488453A3",
  [ChainId.Baklava]: "",
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
