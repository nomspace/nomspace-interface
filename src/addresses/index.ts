import { ChainId } from "@celo-tools/use-contractkit";

type AddressMap = Record<string, string>;

export const RESERVE_PORTAL: AddressMap = {
  [ChainId.Celo]: "",
  [ChainId.Alfajores]: "0xcE6863Bac168f47EF41404378Ce838ae14aAFAC8",
  [ChainId.Fuji]: "0xfB1243D603b21D9E1a9669b67998c5CF12F58c1B",
};
export const FORWARDER_ADDR: AddressMap = {
  [ChainId.Celo]: "",
  [ChainId.Alfajores]: "0x00Bd9F561D98EB6dA98045814Ef35B714155Fd17",
};
export const ENS_ADDR: AddressMap = {
  [ChainId.Celo]: "",
  [ChainId.Alfajores]: "0xd46B6669C8e50d0279E9aD3bb64a556786B6196B",
};
export const RESOLVER_ADDR: AddressMap = {
  [ChainId.Celo]: "",
  [ChainId.Alfajores]: "0x3c94b19597b2De1Cad7Ca2D214E859B454831455",
};
export const BASE_ADDR: AddressMap = {
  [ChainId.Celo]: "",
  [ChainId.Alfajores]: "0x98725B0e93D761F9095690f688a964AA1F584870",
};
export const NOM_REG_ADDR: AddressMap = {
  [ChainId.Celo]: "",
  [ChainId.Alfajores]: "0xf3C07ee51b08B47a152d1917924101a7c9eA2769",
};
export const USD: AddressMap = {
  [ChainId.Celo]: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
  [ChainId.Alfajores]: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
  [ChainId.Fuji]: "0x45ea5d57ba80b5e3b0ed502e9a08d568c96278f9", // USDC.e
};
export const MULTICALL_ADDR: AddressMap = {
  [ChainId.Celo]: "0x75f59534dd892c1f8a7b172d639fa854d529ada3",
  [ChainId.Alfajores]: "0x387ce7960b5DA5381De08Ea4967b13a7c8cAB3f6",
};