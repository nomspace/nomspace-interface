import { MULTICALL_ADDR } from "addresses";
import { BigNumber } from "ethers";
import { ERC721__factory, Multicall } from "generated";
import { Multicall__factory } from "generated";
import { useCallback } from "react";
import { useAsyncState } from "./useAsyncState";
import nftTokenList, { NFT } from "addresses/nft-token-list";
import axios from "axios";
import { GlobalNom, NomResult } from "./useNom";
import { SUPPORTED_NETWORKS } from "config";
import { JsonRpcProvider } from "@ethersproject/providers";

async function poapCall(resolution: string) {
  if (process.env.REACT_APP_POAP_KEY === undefined) {
    console.error("REACT_APP_POAP_KEY not present, skipping POAP fetch");
    return [];
  }
  const poapMetadata = [];
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "X-API-Key": process.env.REACT_APP_POAP_KEY,
    },
  };

  var poaps:any;
  await fetch(
    `https://api.poap.tech/actions/scan/${resolution}`,
    options
  )
    .then((response) => response.json())
    .then((response) => (poaps = response))
    .catch((err) => {
      console.error(err);
      return [];
    });

  for (const poap of poaps) {
    const url = poap.event.image_url;

    poapMetadata.push({
      name: poap.event.name,
      image: `${url}`,
    });
  }
  return poapMetadata;
}

const fetchCollection = async (
  token: NFT,
  provider: JsonRpcProvider,
  multicall: Multicall,
  nom: NomResult
) => {
  const metadata = [];

  try {
    const nft = ERC721__factory.connect(token.address, provider);

    const total = (await nft.balanceOf(nom.resolution)).toNumber();

    const tokenIds = await multicall.callStatic
      .aggregate(
        new Array(total).fill(0).map((_, idx) => {
          return {
            target: nft.address,
            callData: nft.interface.encodeFunctionData("tokenOfOwnerByIndex", [
              nom.resolution,
              idx,
            ]),
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
      metadata.push(
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
            callData: nft.interface.encodeFunctionData("tokenURI", [tokenId]),
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
                    .replace("ipfs://", "https://cloudflare-ipfs.com/ipfs/"),
                }));
              })
          );
        });
      metadata.push(...tokenMetadata);
    }
  } catch (e) {
    console.error(e);
  }
  return metadata;
};

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
      if (!network || !multicallAddress) {
        console.error(
          "Missing network or multicall address for network",
          chainId
        );
        continue;
      }

      const provider = new JsonRpcProvider(network.rpc);
      const multicall = Multicall__factory.connect(multicallAddress, provider);
      for (const token of networkTokens) {
        allTokenMetadata.push(fetchCollection(token, provider, multicall, nom));
      }
    }
    allTokenMetadata.push((poapCall("0x7af8e291ff3b35e3f33be73fa73d31b7934fed1e")));
    let tokenMetadata = await Promise.all(allTokenMetadata).then((res) =>
      res.flat()
    );
    return tokenMetadata;
  }, [nom]);
  return useAsyncState(null, call);
};
