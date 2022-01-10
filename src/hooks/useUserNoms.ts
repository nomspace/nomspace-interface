import React from "react";
import { useContractKit } from "@celo-tools/use-contractkit";
import { useAsyncState } from "./useAsyncState";
import {
  BaseRegistrarImplementation__factory,
  Multicall__factory,
  NomRegistrarController__factory,
} from "generated";
import { useCeloProvider } from "./useCeloProvider";
import {
  BASE_ADDR,
  MULTICALL_ADDR,
  NOM_REG_ADDR,
  RESOLVER_ADDR,
} from "addresses";
import { useCeloChainId } from "./useCeloChainId";
import { ZERO_ADDRESS } from "utils/constants";

const now = Date.now() / 1000;

export const useUserNoms = () => {
  const { address } = useContractKit();
  const celoProvider = useCeloProvider();
  const celoChainId = useCeloChainId();

  const call = React.useCallback(async () => {
    const baseAddress = BASE_ADDR[celoChainId];
    const nomRegistrarAddress = NOM_REG_ADDR[celoChainId];
    const multicallAddress = MULTICALL_ADDR[celoChainId];
    const resolverAddress = RESOLVER_ADDR[celoChainId];
    if (
      !baseAddress ||
      !nomRegistrarAddress ||
      !multicallAddress ||
      !resolverAddress
    )
      return null;
    if (address == null || address === ZERO_ADDRESS) return [];
    const nomRegistrarController = NomRegistrarController__factory.connect(
      nomRegistrarAddress,
      celoProvider
    );
    const multicall = Multicall__factory.connect(
      multicallAddress,
      celoProvider
    );
    const baseRegistrarImplementation =
      BaseRegistrarImplementation__factory.connect(baseAddress, celoProvider);

    const tokenIds = await baseRegistrarImplementation
      .queryFilter(
        baseRegistrarImplementation.filters[
          "Transfer(address,address,uint256)"
        ](null, address, null)
      )
      .then((events) => {
        return events.map((event) => event.args.tokenId);
      });
    const tokenIdOwners = await multicall.callStatic
      .aggregate(
        tokenIds.map((tokenId) => {
          return {
            target: baseAddress,
            callData: baseRegistrarImplementation.interface.encodeFunctionData(
              "ownerOf",
              [tokenId]
            ),
          };
        })
      )
      .then((res) =>
        res.returnData.map(
          (value) =>
            baseRegistrarImplementation.interface.decodeFunctionResult(
              "ownerOf",
              value
            )[0]
        )
      );
    const tokenIdExpirations = await multicall.callStatic
      .aggregate(
        tokenIds.map((tokenId) => {
          return {
            target: baseAddress,
            callData: baseRegistrarImplementation.interface.encodeFunctionData(
              "nameExpires",
              [tokenId]
            ),
          };
        })
      )
      .then((res) =>
        res.returnData.map((value) =>
          baseRegistrarImplementation.interface
            .decodeFunctionResult("nameExpires", value)[0]
            .toNumber()
        )
      );
    const ownedTokens = tokenIds
      .map((tokenId, idx) => ({
        tokenId,
        expiration: tokenIdExpirations[idx],
        owner: tokenIdOwners[idx],
      }))
      .filter((t) => t.owner === address && t.expiration >= now);
    const userNoms = [];
    for (const token of ownedTokens) {
      const events = await nomRegistrarController.queryFilter(
        nomRegistrarController.filters[
          "NameRegistered(string,bytes32,address,uint256,uint256)"
        ](null, token.tokenId.toHexString(), null, null, null)
      );
      if (events.length > 0) {
        userNoms.push({
          ...token,
          name: events[0]?.args.name,
        });
      }
    }
    return userNoms;
  }, [celoChainId, celoProvider, address]);

  return useAsyncState(null, call);
};
