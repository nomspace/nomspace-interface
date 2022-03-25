import { MULTICALL_ADDR } from "addresses";
import { BigNumber } from "ethers";
import { ERC721__factory } from "generated";
import { Multicall__factory } from "generated";
import { useCallback } from "react";
import { useAsyncState } from "./useAsyncState";
import nftTokenList from "addresses/nft-token-list";
import axios from "axios";
import { GlobalNom } from "./useNom";
import { SUPPORTED_NETWORKS } from "config";
import { JsonRpcProvider } from "@ethersproject/providers";

export const useNFTs = () => {
  const [nom] = GlobalNom.useContainer();

  const call = useCallback(async () => {
    if (!nom?.resolution) return null;

    const allTokenMetadata = [];
    for (const [chainId, networkTokens] of Object.entries(nftTokenList)) {
      const network = SUPPORTED_NETWORKS.find(
        (network) => network.chainId.toString() === chainId
      );
      const multicallAddress = MULTICALL_ADDR[chainId];
      if (!network || !multicallAddress) continue;

      const provider = new JsonRpcProvider(network.rpc);
      const multicall = Multicall__factory.connect(multicallAddress, provider);
      for (const token of networkTokens) {
        try {
          const nft = ERC721__factory.connect(token.address, provider);

          const total = (await nft.balanceOf(nom.resolution)).toNumber();

          const tokenIds = await multicall.callStatic
            .aggregate(
              new Array(total).fill(0).map((_, idx) => {
                return {
                  target: nft.address,
                  callData: nft.interface.encodeFunctionData(
                    "tokenOfOwnerByIndex",
                    [nom.resolution, idx]
                  ),
                };
              })
            )
            .then((res) => {
              return res.returnData.map((r) => {
                return nft.interface.decodeFunctionResult(
                  "tokenOfOwnerByIndex",
                  r
                )[0] as BigNumber;
              });
            });

          if (token.imagePrefix && token.imageExt) {
            allTokenMetadata.push(
              ...tokenIds.map((id) => ({
                id,
                name: token.name,
                image: `${token.imagePrefix}${id}.${token.imageExt}`,
              }))
            );
          } else {
            const tokenMetadata = await multicall.callStatic
              .aggregate(
                tokenIds.map((tokenId) => ({
                  target: nft.address,
                  callData: nft.interface.encodeFunctionData("tokenURI", [
                    tokenId,
                  ]),
                }))
              )
              .then((res) => {
                return res.returnData.map((r) => {
                  return nft.interface.decodeFunctionResult(
                    "tokenURI",
                    r
                  )[0] as string;
                });
              })
              .then((tokenURIs) => {
                return Promise.all(
                  tokenURIs
                    .map((tokenURI) =>
                      tokenURI
                        .replace("ipfs://", "https://cloudflare-ipfs.com/ipfs/")
                        .replace("ipfs.io", "cloudflare-ipfs.com")
                    )
                    .map(async (uri) => {
                      return axios.get(uri).then(async (res) => ({
                        ...res.data,
                        image: res.data.image
                          .replace("ipfs.io", "cloudflare-ipfs.com")
                          .replace(
                            "ipfs://",
                            "https://cloudflare-ipfs.com/ipfs/"
                          ),
                      }));
                    })
                );
              });
            allTokenMetadata.push(...tokenMetadata);
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
    return allTokenMetadata;
  }, [nom?.resolution]);
  return useAsyncState(null, call);
};
