import { ChainId } from "@celo-tools/use-contractkit";
import { CustomChainId } from "networks";

type AddressMap = Record<string, string>;

export const RESERVE_PORTAL: AddressMap = {
  [ChainId.Mainnet]: "0x4f8A658a993347C25f17De54c192C5E6CE8D51cf",
  [CustomChainId.Avalanche]: "0xC3604Ae1EAeC5Ef06CBf8AF6D3aB060C488453A3",
  [CustomChainId.Polygon]: "0x1a81A68Fc79aE5821211859e8b01cDD5A24Beab8",
  [CustomChainId.Fantom]: "0xC3604Ae1EAeC5Ef06CBf8AF6D3aB060C488453A3",

  [ChainId.Alfajores]: "0x032307BFAa0BB0C787E5544425c74cBcBd0d0438",
  [CustomChainId.Fuji]: "0x4F4dac4180dAC08dc0AF38aE8f439C3A58F296A7",
  [CustomChainId.Mumbai]: "0xF545610f2eD7dBAE5c793F23684A38877A953aD1",
};
export const FORWARDER_ADDR: AddressMap = {
  [ChainId.Mainnet]: "0x6AD20B95Eacc40bb7da415e11FFDAc06970abd7c",
  [ChainId.Alfajores]: "0x00Bd9F561D98EB6dA98045814Ef35B714155Fd17",
};
export const ENS_ADDR: AddressMap = {
  [ChainId.Mainnet]: "0x3DE51c3960400A0F752d3492652Ae4A0b2A36FB3",
  [ChainId.Alfajores]: "0x40cd4db228e9c172dA64513D0e874d009486A9a9",
};
export const RESOLVER_ADDR: AddressMap = {
  [ChainId.Mainnet]: "0x4030B393bbd64142a8a69E904A0bf15f87993d9A",
  [ChainId.Alfajores]: "0x03E7C2ff868E9c5659863Ec4f2343B2cC3d2f70b",
};
export const BASE_ADDR: AddressMap = {
  [ChainId.Mainnet]: "0xdf204de57532242700D988422996e9cED7Aba4Cb",
  [ChainId.Alfajores]: "0xb814Fe80D5f1cB29F177AC27ECD29D1f4F378C99",
};
export const NOM_REG_ADDR: AddressMap = {
  [ChainId.Mainnet]: "0x046D19c5E5E8938D54FB02DCC396ACf7F275490A",
  [ChainId.Alfajores]: "0x26AeE0de70C180f33190CD4f34C02C47C56b2665",
};
export const REVERSE_ADDR: AddressMap = {
  [ChainId.Mainnet]: "0xe9c3CA404C3b282Fc911EcCa7046D9B699732D8b",
  [ChainId.Alfajores]: "0x10a575534D5976e361d2A90083c6A91512a6Bf94",
};
export const USD: AddressMap = {
  [ChainId.Mainnet]: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
  [CustomChainId.Avalanche]: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664", // USDC.e
  [CustomChainId.Polygon]: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174", // USDC
  [CustomChainId.Fantom]: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75", // USDC

  [ChainId.Alfajores]: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
  [CustomChainId.Fuji]: "0x45ea5d57ba80b5e3b0ed502e9a08d568c96278f9", // USDC.e
  [CustomChainId.Mumbai]: "0x3813e82e6f7098b9583fc0f33a962d02018b6803", // USDT
};
export const MULTICALL_ADDR: AddressMap = {
  [ChainId.Mainnet]: "0x75f59534dd892c1f8a7b172d639fa854d529ada3",
  [CustomChainId.Avalanche]: "0x0FB54156B496b5a040b51A71817aED9e2927912E",
  [CustomChainId.Polygon]: "0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507",
  [CustomChainId.Fantom]: "0xD98e3dBE5950Ca8Ce5a4b59630a5652110403E5c",
  [CustomChainId.Ethereum]: "0xeefba1e63905ef1d7acba5a8513c70307c1ce441",

  [ChainId.Alfajores]: "0x387ce7960b5DA5381De08Ea4967b13a7c8cAB3f6",
  [CustomChainId.Fuji]: "0xb465Fd2d9C71d5D6e6c069aaC9b4E21c69aAA78f",
  [CustomChainId.Mumbai]: "0x08411ADd0b5AA8ee47563b146743C13b3556c9Cc",
};

export type Token = {
  address: string;
  name: string;
  symbol: string;
  chainId: number;
  decimals: number;
  logoURI: string;
  registrar?: string;
};
type TokenList = Record<string, Token>;

export const TOKEN_LIST: TokenList = {
  "Celo Alfajores cUSD": {
    address: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
    name: "Celo Alfajores cUSD",
    symbol: "cUSD",
    chainId: 44787,
    decimals: 18,
    logoURI:
      "https://raw.githubusercontent.com/sushiswap/icons/master/token/cusd.jpg",
    registrar: "0x26AeE0de70C180f33190CD4f34C02C47C56b2665",
  },
  "Avalanche Fuji USDC.e": {
    address: "0x45ea5d57ba80b5e3b0ed502e9a08d568c96278f9",
    name: "Avalanche Fuji USDC.e",
    symbol: "USDC.e",
    chainId: 43113,
    decimals: 18,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    registrar: "0x26AeE0de70C180f33190CD4f34C02C47C56b2665",
  },
  "Polygon Mumbai USDT": {
    address: "0x3813e82e6f7098b9583fc0f33a962d02018b6803",
    name: "Polygon Mumbai USDT",
    symbol: "USDT",
    chainId: 80001,
    decimals: 18,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    registrar: "0x26AeE0de70C180f33190CD4f34C02C47C56b2665",
  },
  "Celo cUSD": {
    address: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
    name: "Celo cUSD",
    symbol: "cUSD",
    chainId: 42220,
    decimals: 18,
    logoURI:
      "https://raw.githubusercontent.com/sushiswap/icons/master/token/cusd.jpg",
  },
  "Nom Voucher": {
    address: "0x0956525490C753fe8134BC64873374167D0f3923",
    name: "Nom Voucher",
    symbol: "vNOM",
    chainId: 42220,
    decimals: 18,
    logoURI: "https://nom.space/android-chrome-512x512.png",
    registrar: "0x33D2bb7aC3D9c726b940AEB0d31c44864716514B",
  },
  "Avalanche USDC.e": {
    address: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664",
    name: "Avalanche USDC.e",
    symbol: "USDC.e",
    chainId: 43114,
    decimals: 18,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
  },
  "Avalanche Nom Voucher": {
    address: "0xE0d373A8c31D05f240E9864138b35e580FC53cD8",
    name: "Avalanche Nom Voucher",
    symbol: "vNOM",
    chainId: 43114,
    decimals: 18,
    logoURI: "https://nom.space/android-chrome-512x512.png",
    registrar: "0x33D2bb7aC3D9c726b940AEB0d31c44864716514B",
  },
  "Polygon USDC": {
    address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    name: "Polygon USDC",
    symbol: "USDC",
    chainId: 137,
    decimals: 18,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
  },
  "Fantom USDC": {
    address: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75",
    name: "Fantom USDC",
    symbol: "USDC",
    chainId: 250,
    decimals: 18,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
  },
};
