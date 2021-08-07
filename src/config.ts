import { ChainId } from "@celo-tools/use-contractkit";
import { toWei } from "web3-utils";

export const NOM = {
  [ChainId.Mainnet]: "0xABf8faBbC071F320F222A526A2e1fBE26429344d",
  [ChainId.Alfajores]: "0x36C976Da6A6499Cad683064F849afa69CD4dec2e",
  [ChainId.Baklava]: "",
};

export const DEFAULT_GAS_PRICE = toWei("0.13", "gwei");
