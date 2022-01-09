import { MULTICALL_ADDR } from "addresses";
import { providers, utils } from "ethers";
import { ERC721__factory } from "generated";
import { Multicall__factory, Nom__factory } from "generated";
import { useCallback } from "react";
import { useAsyncState } from "./useAsyncState";
import { Utils } from "web3-utils";

const BUCKET_SIZE = 200;

/**
 *
 * @returns celopunks
 */

export const useCeloPunks = () => {
  // required
  const provider = new providers.JsonRpcProvider("https://forno.celo.org");
  const nft = ERC721__factory.connect(
    "0x9f46B8290A6D41B28dA037aDE0C3eBe24a5D1160",
    provider
  );

  const call = useCallback(async () => {
    // required

    // multicall address doesn't work
    // const multicallAddress = MULTICALL_ADDR[provider.network.chainId];
    // if (!multicallAddress) return null;
    const multicall = Multicall__factory.connect(
      "0x75f59534dd892c1f8a7b172d639fa854d529ada3",
      provider
    );

    // get total supply of nft (total # of nfts that exist, starting from 1)
    const supply = (await nft.totalSupply()).toString();

    // get owner of each nft
    return await multicall.callStatic
      .aggregate(
        new Array(10).fill(0).map((_, i) => {
          return {
            target: nft.address,
            callData: nft.interface.encodeFunctionData("tokenOfOwnerByIndex", [
              "0x29a6520a99656e5b17a34471d5d458efd3696695",
              i,
            ]),
          };
        })
      )
      .then((res) => {
        return Promise.all(
          res.returnData.map((e) => {
            return nft.tokenURI(e);
          })
        );
      });
  }, []);
  return useAsyncState(null, call);
};
