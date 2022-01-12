import { ChainId } from "@celo-tools/use-contractkit";
import { toWei } from "web3-utils";

export const NOM = {
  [ChainId.Mainnet]: "0xABf8faBbC071F320F222A526A2e1fBE26429344d",
  [ChainId.Alfajores]: "0x36C976Da6A6499Cad683064F849afa69CD4dec2e",
  [ChainId.Baklava]: "",
};

export const NomstronautAddress = "0x11E3f251EE1a4C989c2f39C0041312C18ae780e1";

export const MintTime = 1642011386 //1642114800

export const FEE_MODULE_V1 = "0x07DDCB69Bc2637A6c03d5523696E21B688b42d65";

export const DEFAULT_GAS_PRICE = toWei("0.13", "gwei");
