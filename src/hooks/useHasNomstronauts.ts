import { useCallback } from "react";
import { providers } from "ethers";
import { useContractKit } from "@celo-tools/use-contractkit";
import { ERC721__factory } from "generated";
import { useAsyncState } from "hooks/useAsyncState";

export const useHasNomstronauts = () => {
  const { address } = useContractKit();

  const call = useCallback(async () => {
    if (!address) {
      return false;
    }
    const provider = new providers.JsonRpcProvider("https://forno.celo.org");
    const nft = ERC721__factory.connect(
      "0x8237f38694211F25b4c872F147F027044466Fa80",
      provider
    );
    return await nft.balanceOf(address).then((balance) => balance.gt(0));
  }, [address]);

  return useAsyncState(null, call);
};
