import { MULTICALL_ADDR } from "addresses";
import { providers } from "ethers";
import { ERC721__factory } from "generated";
import { Multicall__factory, Nom__factory } from "generated";
import { useCallback } from "react";
import { useAsyncState } from "./useAsyncState";

const BUCKET_SIZE = 200;

export const useCeloPunks = () => {
  const provider = new providers.JsonRpcProvider("https://forno.celo.org");
  const nft = ERC721__factory.connect(
    "0x9f46B8290A6D41B28dA037aDE0C3eBe24a5D1160",
    provider
  );

  const call = useCallback(async () => {
    const multicallAddress = MULTICALL_ADDR[provider.network.chainId];
    if (!multicallAddress) return null;
    const multicall = Multicall__factory.connect(multicallAddress, provider);
    const supply = (await nft.totalSupply()).toString();
    return await multicall.callStatic
      .aggregate(
        new Array(100).fill(0).map((_, i) => {
          return {
            target: nft.address,
            callData: nft.interface.encodeFunctionData("ownerOf", [i + 1]),
          };
        })
      )
      .then((res) => {
        return res.returnData.map((e) => {
          return nft.interface.decodeFunctionResult("ownerOf", e);
        });
      });
  }, []);
  return useAsyncState(null, call);

  // console.log(r);
  // console.log(nft.interface.encodeFunctionData("ownerOf", [1]));
};

// [
//         {
//           target: nft.address,
//           callData: nft.interface.encodeFunctionData("ownerOf", [1]),
//         },
//         {
//           target: nft.address,
//           callData: nft.interface.encodeFunctionData("ownerOf", [25]),
//         },
//       ]
