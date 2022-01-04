import { ChainId } from "@celo-tools/use-contractkit";

type AddressMap = Record<string, string>;

export const NOM_REG_ADDR: AddressMap = {
  [ChainId.Celo]: "",
  [ChainId.Alfajores]: "0x0922a1b101bF136ED352cE9714Da81f2fE75FD61",
};
export const BASE_ADDR: AddressMap = {
  [ChainId.Celo]: "",
  [ChainId.Alfajores]: "0xcD199D20ef01Af7056BEF844B0039CCf2BCD5A13",
};
export const ENS_ADDR: AddressMap = {
  [ChainId.Celo]: "",
  [ChainId.Alfajores]: "0xD67a5414da6B1dcb64aBA3B06b3Be6Db29D832D7",
};
export const USD: AddressMap = {
  [ChainId.Celo]: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
  [ChainId.Alfajores]: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
  [ChainId.Fuji]: "0x45ea5d57ba80b5e3b0ed502e9a08d568c96278f9", // USDC.e
};
export const FORWARDER_ADDR: AddressMap = {
  [ChainId.Celo]: "",
  [ChainId.Alfajores]: "0xb14f85eCbb81A560016385A8fcdef709e6aaFbaf",
};
export const RESERVE_PORTAL: AddressMap = {
  [ChainId.Celo]: "",
  [ChainId.Alfajores]: "0xE0e61BeF1AD40880F92e2bf7617A2BB538feA655",
  [ChainId.Fuji]: "0x1c743749d0070091D964356E710CeFA07B00A58b",
};
export const MULTICALL_ADDR: AddressMap = {
  [ChainId.Celo]: "0x75f59534dd892c1f8a7b172d639fa854d529ada3",
  [ChainId.Alfajores]: "0x387ce7960b5DA5381De08Ea4967b13a7c8cAB3f6",
};
export const NATIVE_CURRENCY: AddressMap = {
  [ChainId.Celo]: "CELO",
  [ChainId.Alfajores]: "CELO",
  [ChainId.Fuji]: "AVAX",
  [ChainId.Avalanche]: "AVAX",
  [ChainId.Kovan]: "ETH",
  [ChainId.Ethereum]: "ETH",
};
