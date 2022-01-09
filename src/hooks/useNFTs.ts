import { useContractKit, useProvider } from "@celo-tools/use-contractkit";
import { MULTICALL_ADDR } from "addresses";
import { BigNumber } from "ethers";
import { ERC721__factory } from "generated";
import { Multicall__factory } from "generated";
import { useCallback } from "react";
import { useAsyncState } from "./useAsyncState";
import nftTokenList from "addresses/nft-token-list";

export const useNFTs = (user?: string) => {
  const { network } = useContractKit();
  const provider = useProvider();

  const call = useCallback(async () => {
    // TODO: MULTICALL on other networks
    const multicallAddress = MULTICALL_ADDR[network.chainId];
    if (!user || !multicallAddress) return null;
    const multicall = Multicall__factory.connect(multicallAddress, provider);

    const networkTokens = nftTokenList[network.chainId] ?? [];
    const allTokenURIs = [];
    for (const token of networkTokens) {
      const nft = ERC721__factory.connect(token.address, provider);

      const total = (await nft.balanceOf(user)).toNumber();

      const tokenURIs = await multicall.callStatic
        .aggregate(
          new Array(total).fill(0).map((_, idx) => {
            return {
              target: nft.address,
              callData: nft.interface.encodeFunctionData(
                "tokenOfOwnerByIndex",
                [user, idx]
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
              callData: nft.interface.encodeFunctionData("tokenURI", [tokenId]),
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
        });
      allTokenURIs.push(...tokenURIs);
    }
    console.log(allTokenURIs);
    return allTokenURIs;
  }, [network.chainId, provider, user]);
  return useAsyncState(null, call);
};
