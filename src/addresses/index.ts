import { ChainId } from "@celo-tools/use-contractkit";

type AddressMap = Record<string, string>;

export const RESERVE_PORTAL: AddressMap = {
  [ChainId.Celo]: "",

  [ChainId.Alfajores]: "0xcE6863Bac168f47EF41404378Ce838ae14aAFAC8",
  [ChainId.Fuji]: "0xfB1243D603b21D9E1a9669b67998c5CF12F58c1B",
  [ChainId.Mumbai]: "0xb83e6f8BC9553Dd7AaECA86E96fa9B113563dfa3",
};
export const FORWARDER_ADDR: AddressMap = {
  [ChainId.Celo]: "",
  [ChainId.Alfajores]: "0x00Bd9F561D98EB6dA98045814Ef35B714155Fd17",
};
export const ENS_ADDR: AddressMap = {
  [ChainId.Celo]: "",
  [ChainId.Alfajores]: "0x40cd4db228e9c172dA64513D0e874d009486A9a9",
};
export const RESOLVER_ADDR: AddressMap = {
  [ChainId.Celo]: "",
  [ChainId.Alfajores]: "0x03E7C2ff868E9c5659863Ec4f2343B2cC3d2f70b",
};
export const BASE_ADDR: AddressMap = {
  [ChainId.Celo]: "",
  [ChainId.Alfajores]: "0xb814Fe80D5f1cB29F177AC27ECD29D1f4F378C99",
};
export const NOM_REG_ADDR: AddressMap = {
  [ChainId.Celo]: "",
  [ChainId.Alfajores]: "0x26AeE0de70C180f33190CD4f34C02C47C56b2665",
};
export const USD: AddressMap = {
  [ChainId.Celo]: "0x765DE816845861e75A25fCA122bb6898B8B1282a",

  [ChainId.Alfajores]: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
  [ChainId.Fuji]: "0x45ea5d57ba80b5e3b0ed502e9a08d568c96278f9", // USDC.e
  [ChainId.Mumbai]: "0x3813e82e6f7098b9583fc0f33a962d02018b6803", // USDT
};
export const MULTICALL_ADDR: AddressMap = {
  [ChainId.Celo]: "0x75f59534dd892c1f8a7b172d639fa854d529ada3",
  [ChainId.Alfajores]: "0x387ce7960b5DA5381De08Ea4967b13a7c8cAB3f6",
};
