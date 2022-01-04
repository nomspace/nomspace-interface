import { ChainId } from "@celo-tools/use-contractkit";

type AddressMap = Record<string, string>;

export const NOM_REG_ADDR: AddressMap = {
  [ChainId.Celo]: "",
  [ChainId.Alfajores]: "0xBcCfE6d8A23A45149eF7f6Ffc9a794628dc88152",
};
export const BASE_ADDR: AddressMap = {
  [ChainId.Celo]: "",
  [ChainId.Alfajores]: "0x466193862999D163839a51B91Af366e46abF77fc",
};
export const ENS_ADDR: AddressMap = {
  [ChainId.Celo]: "",
  [ChainId.Alfajores]: "0xDa4A5d0eB2Ef6341D872803a8bb265d83b96f591",
};
export const RESOLVER_ADDR: AddressMap = {
  [ChainId.Celo]: "",
  [ChainId.Alfajores]: "0xB92E95162a81eAC95ec465DB518c7504c72B422D",
};
export const USD: AddressMap = {
  [ChainId.Celo]: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
  [ChainId.Alfajores]: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
  [ChainId.Fuji]: "0x45ea5d57ba80b5e3b0ed502e9a08d568c96278f9", // USDC.e
};
export const FORWARDER_ADDR: AddressMap = {
  [ChainId.Celo]: "",
  [ChainId.Alfajores]: "0x58288cCFEa81d6101f6100fCA970f80cF4E07948",
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