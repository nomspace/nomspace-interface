import { ChainId } from "@celo-tools/use-contractkit";

type AddressMap = Record<string, string>;

export const RESERVE_PORTAL: AddressMap = {
  [ChainId.Celo]: "0x4f8A658a993347C25f17De54c192C5E6CE8D51cf",
  [ChainId.Avalanche]: "0xC3604Ae1EAeC5Ef06CBf8AF6D3aB060C488453A3",
  [ChainId.Polygon]: "0x1a81A68Fc79aE5821211859e8b01cDD5A24Beab8",
  [ChainId.Fantom]: "0xC3604Ae1EAeC5Ef06CBf8AF6D3aB060C488453A3",

  [ChainId.Alfajores]: "0x032307BFAa0BB0C787E5544425c74cBcBd0d0438",
  [ChainId.Fuji]: "0x4F4dac4180dAC08dc0AF38aE8f439C3A58F296A7",
  [ChainId.Mumbai]: "0xF545610f2eD7dBAE5c793F23684A38877A953aD1",
};
export const FORWARDER_ADDR: AddressMap = {
  [ChainId.Celo]: "0x6AD20B95Eacc40bb7da415e11FFDAc06970abd7c",
  [ChainId.Alfajores]: "0x00Bd9F561D98EB6dA98045814Ef35B714155Fd17",
};
export const ENS_ADDR: AddressMap = {
  [ChainId.Celo]: "0x3DE51c3960400A0F752d3492652Ae4A0b2A36FB3",
  [ChainId.Alfajores]: "0x40cd4db228e9c172dA64513D0e874d009486A9a9",
};
export const RESOLVER_ADDR: AddressMap = {
  [ChainId.Celo]: "0x4030B393bbd64142a8a69E904A0bf15f87993d9A",
  [ChainId.Alfajores]: "0x03E7C2ff868E9c5659863Ec4f2343B2cC3d2f70b",
};
export const BASE_ADDR: AddressMap = {
  [ChainId.Celo]: "0xdf204de57532242700D988422996e9cED7Aba4Cb",
  [ChainId.Alfajores]: "0xb814Fe80D5f1cB29F177AC27ECD29D1f4F378C99",
};
export const NOM_REG_ADDR: AddressMap = {
  [ChainId.Celo]: "0x046D19c5E5E8938D54FB02DCC396ACf7F275490A",
  [ChainId.Alfajores]: "0x26AeE0de70C180f33190CD4f34C02C47C56b2665",
};
export const REVERSE_ADDR: AddressMap = {
  [ChainId.Celo]: "0xe9c3CA404C3b282Fc911EcCa7046D9B699732D8b",
  [ChainId.Alfajores]: "0x10a575534D5976e361d2A90083c6A91512a6Bf94",
};
export const USD: AddressMap = {
  [ChainId.Celo]: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
  [ChainId.Avalanche]: "0xC3604Ae1EAeC5Ef06CBf8AF6D3aB060C488453A3", // USDC.e
  [ChainId.Polygon]: "0x1a81A68Fc79aE5821211859e8b01cDD5A24Beab8", // USDC
  [ChainId.Fantom]: "0xC3604Ae1EAeC5Ef06CBf8AF6D3aB060C488453A3", // USDC

  [ChainId.Alfajores]: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
  [ChainId.Fuji]: "0x45ea5d57ba80b5e3b0ed502e9a08d568c96278f9", // USDC.e
  [ChainId.Mumbai]: "0x3813e82e6f7098b9583fc0f33a962d02018b6803", // USDT
};
export const MULTICALL_ADDR: AddressMap = {
  [ChainId.Celo]: "0x75f59534dd892c1f8a7b172d639fa854d529ada3",
  [ChainId.Alfajores]: "0x387ce7960b5DA5381De08Ea4967b13a7c8cAB3f6",
};
