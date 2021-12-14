import { ChainId } from "@celo-tools/use-contractkit";
import { toWei } from "web3-utils";

export const NOM = {
  [ChainId.Mainnet]: "0xABf8faBbC071F320F222A526A2e1fBE26429344d",
  [ChainId.Alfajores]: "0xb83e6f8BC9553Dd7AaECA86E96fa9B113563dfa3",
  [ChainId.Baklava]: "",
};
export const FEE_MODULE = {
  [ChainId.Mainnet]: "0x07DDCB69Bc2637A6c03d5523696E21B688b42d65",
  [ChainId.Alfajores]: "0xa41b00095C14Ff7c3697485136eE53C12B3a681A",
  [ChainId.Baklava]: "",
};
export const RESERVE_PORTAL = {
  [ChainId.Mainnet]: "",
  [ChainId.Alfajores]: "0xC3604Ae1EAeC5Ef06CBf8AF6D3aB060C488453A3",
  [ChainId.Baklava]: "",
};

export const DEFAULT_GAS_PRICE = toWei("0.13", "gwei");
