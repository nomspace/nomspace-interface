import { useContractKit, useProvider } from "@celo-tools/use-contractkit";
import { MULTICALL_ADDR } from "addresses";
import { BigNumber } from "ethers";
import { ERC721__factory } from "generated";
import { Multicall__factory } from "generated";
import { useCallback } from "react";
import { useAsyncState } from "./useAsyncState";
import nftTokenList from "addresses/nft-token-list";
import axios from "axios";
import { GlobalNom } from "./useNom";

export const useNFTs = () => {
  const [nom] = GlobalNom.useContainer();
  const { network } = useContractKit();
  const provider = useProvider();

  const call = useCallback(async () => {
    // TODO: MULTICALL on other networks
    const multicallAddress = MULTICALL_ADDR[network.chainId];
    if (!nom?.resolution || !multicallAddress) return null;
    const multicall = Multicall__factory.connect(multicallAddress, provider);

    const networkTokens = nftTokenList[network.chainId] ?? [];
    const allTokenMetadata = [];
    for (const token of networkTokens) {
      try {
        const nft = ERC721__factory.connect(token.address, provider);

        const total = (await nft.balanceOf(nom.resolution)).toNumber();

        const tokenMetadata = await multicall.callStatic
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
          })
          .then((tokenIds) =>
            multicall.callStatic.aggregate(
              tokenIds.map((tokenId) => ({
                target: nft.address,
                callData: nft.interface.encodeFunctionData("tokenURI", [
                  tokenId,
                ]),
              }))
            )
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
              tokenURIs.map(async (uri) => {
                if (!uri.endsWith("json")) {
                  uri = uri + ".json"; // TODO: Hardcode
                }
                return axios.get(uri).then(async (res) => ({
                  ...res.data,
                  image: res.data.image.replace(
                    "ipfs://",
                    "https://cloudflare-ipfs.com/ipfs/"
                  ),
                }));
              })
            );
          });
        allTokenMetadata.push(...tokenMetadata);
      } catch (e) {
        console.error(e);
      }
    }
    return allTokenMetadata;
  }, [network.chainId, nom?.resolution, provider]);
  return useAsyncState(null, call);
};
