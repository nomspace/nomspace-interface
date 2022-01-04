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

export const NOM_REG_ADDR: Record<string, string> = {
  [ChainId.Celo]: "",
  [ChainId.Alfajores]: "0x0922a1b101bF136ED352cE9714Da81f2fE75FD61",
};
export const BASE_ADDR: Record<string, string> = {
  [ChainId.Celo]: "",
  [ChainId.Alfajores]: "0xcD199D20ef01Af7056BEF844B0039CCf2BCD5A13",
};
export const ENS_ADDR: Record<string, string> = {
  [ChainId.Celo]: "",
  [ChainId.Alfajores]: "0xD67a5414da6B1dcb64aBA3B06b3Be6Db29D832D7",
};
export const USD: Record<string, string> = {
  [ChainId.Celo]: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
  [ChainId.Alfajores]: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
  [ChainId.Fuji]: "0x45ea5d57ba80b5e3b0ed502e9a08d568c96278f9", // USDC.e
};
export const FORWARDER_ADDR: Record<string, string> = {
  [ChainId.Celo]: "",
  [ChainId.Alfajores]: "0xb14f85eCbb81A560016385A8fcdef709e6aaFbaf",
};
export const RESERVE_PORTAL: Record<string, string> = {
  [ChainId.Celo]: "",
  [ChainId.Alfajores]: "0xE0e61BeF1AD40880F92e2bf7617A2BB538feA655",
  [ChainId.Fuji]: "0x1c743749d0070091D964356E710CeFA07B00A58b",
};
export const MULTICALL_ADDR: Record<string, string> = {
  [ChainId.Celo]: "0x75f59534dd892c1f8a7b172d639fa854d529ada3",
  [ChainId.Alfajores]: "0x387ce7960b5DA5381De08Ea4967b13a7c8cAB3f6",
};
export const NATIVE_CURRENCY: Record<string, string> = {
  [ChainId.Celo]: "CELO",
  [ChainId.Alfajores]: "CELO",
  [ChainId.Fuji]: "AVAX",
  [ChainId.Avalanche]: "AVAX",
  [ChainId.Kovan]: "ETH",
  [ChainId.Ethereum]: "ETH",
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
