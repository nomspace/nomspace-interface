import { MULTICALL_ADDR } from "addresses";
import { providers, utils } from "ethers";
import { ERC721__factory } from "generated";
import { Multicall__factory, Nom__factory } from "generated";
import { useCallback } from "react";
import { useAsyncState } from "./useAsyncState";

const BUCKET_SIZE = 200;

/**
 *
 * @returns celopunks
 */

export const useCeloPunks = (user?: string) => {
  // required
  const provider = new providers.JsonRpcProvider("https://forno.celo.org");
  const nft = ERC721__factory.connect(
    "0x9f46B8290A6D41B28dA037aDE0C3eBe24a5D1160",
    provider
  );

  const call = useCallback(async () => {
    if (!user) return null;
    // required

    // multicall address doesn't work
    // const multicallAddress = MULTICALL_ADDR[provider.network.chainId];
    // if (!multicallAddress) return null;
    const multicall = Multicall__factory.connect(
      "0x75f59534dd892c1f8a7b172d639fa854d529ada3",
      provider
    );

    // get total supply of nft (total # of nfts that exist, starting from 1)
    const total = parseInt((await nft.balanceOf(user))._hex);

    let i = 0;
    const promises = [];

    while (i < total) {
      promises.push(
        multicall.callStatic
          .aggregate(
            new Array(total)
              .fill(0)
              .slice(i, i + BUCKET_SIZE)
              .map((_, j) => {
                console.log(i + j);
                return {
                  target: nft.address,
                  callData: nft.interface.encodeFunctionData(
                    "tokenOfOwnerByIndex",
                    [user, i + j]
                  ),
                };
              })
          )
          .then((res) => {
            return Promise.all(
              res.returnData.map((e) => {
                return nft.tokenURI(e);
              })
            );
          })
      );
      i += BUCKET_SIZE;
    }
    return await Promise.all(promises).then((es) => es.flat());
  }, [user]);
  return useAsyncState(null, call);
};
