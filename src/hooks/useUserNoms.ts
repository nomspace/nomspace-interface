import React from "react";
import { useContractKit } from "@celo-tools/use-contractkit";
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
import { usePollingAsyncState } from "./usePollingAsyncState";
import { getPastEvents } from "utils/events";
import { multicallBatch } from "utils/multicall";
import { BigNumber } from "ethers";

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

    const tokenIds = await getPastEvents(
      baseRegistrarImplementation,
      baseRegistrarImplementation.filters["Transfer(address,address,uint256)"](
        null,
        address,
        null
      ),
      9295881
    ).then((events) => {
      const tokenIds = events.map((event) => BigNumber.from(event.args?.[2]));
      const seen: Record<string, boolean> = {};
      return tokenIds.filter((tokenId) => {
        const t = tokenId.toString();
        if (!seen[t]) {
          seen[t] = true;
          return true;
        }
        return false;
      });
    });
    const tokenIdExpirations = await multicallBatch(
      multicall,
      tokenIds.map((tokenId) => {
        return {
          target: baseAddress,
          callData: baseRegistrarImplementation.interface.encodeFunctionData(
            "nameExpires",
            [tokenId]
          ),
        };
      })
    ).then((res) =>
      res.map((value) =>
        baseRegistrarImplementation.interface
          .decodeFunctionResult("nameExpires", value)[0]
          .toNumber()
      )
    );
    const activeTokens = tokenIds
      .map((tokenId, idx) => ({
        tokenId,
        expiration: tokenIdExpirations[idx],
      }))
      .filter((t) => t.expiration >= now);
    const tokenIdOwners = await multicallBatch(
      multicall,
      activeTokens.map(({ tokenId }) => {
        return {
          target: baseAddress,
          callData: baseRegistrarImplementation.interface.encodeFunctionData(
            "ownerOf",
            [tokenId]
          ),
        };
      })
    ).then((res) =>
      res.map(
        (value) =>
          baseRegistrarImplementation.interface.decodeFunctionResult(
            "ownerOf",
            value
          )[0]
      )
    );

    type Token = {
      name: string;
      tokenId: BigNumber;
      expiration: number;
      owner: string;
    };
    const ownedTokens = activeTokens
      .map(({ tokenId, expiration }, idx) => ({
        name: tokenId.toHexString(),
        tokenId,
        expiration,
        owner: tokenIdOwners[idx],
      }))
      .filter((t) => t.owner === address)
      .reduce((acc, curr) => {
        acc[curr.tokenId.toHexString()] = curr;
        return acc;
      }, {} as Record<string, Token>);
    const events = await getPastEvents(
      nomRegistrarController,
      (nomRegistrarController as any).filters[
        "NameRegistered(string,bytes32,address,uint256,uint256)"
      ](null, Object.keys(ownedTokens), null, null, null),
      9295881
    );
    const seen: Record<string, boolean> = {};
    return events
      .filter((event) => {
        const name = event.args?.[0];
        if (!seen[name]) {
          seen[name] = true;
          return true;
        }
        return false;
      })
      .map((event) => {
        const name = event.args?.[0];
        const tokenId = BigNumber.from(event.args?.[1]).toHexString();
        return {
          ...ownedTokens[tokenId]!,
          name,
        };
      });
  }, [celoChainId, celoProvider, address]);

  return usePollingAsyncState(null, 30000, call);
};
