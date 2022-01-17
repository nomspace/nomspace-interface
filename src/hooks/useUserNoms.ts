import React from "react";
import { useContractKit } from "@celo-tools/use-contractkit";
import {
  BaseRegistrarImplementation__factory,
  Multicall__factory,
} from "generated";
import { useCeloProvider } from "./useCeloProvider";
import { BASE_ADDR, MULTICALL_ADDR } from "addresses";
import { useCeloChainId } from "./useCeloChainId";
import { ZERO_ADDRESS } from "utils/constants";
import { usePollingAsyncState } from "./usePollingAsyncState";
import { getPastEvents } from "utils/events";
import { multicallBatch } from "utils/multicall";
import { BigNumber } from "ethers";
import { getAddress, solidityKeccak256 } from "ethers/lib/utils";
import { gql, useApolloClient } from "@apollo/client";

const now = Date.now() / 1000;
const BASE_NODE =
  "0xa4651816c31c95504abf8cae41e6338ac7c665df8b7c0c1f5c29fc1daf91e034";

const DOMAIN_QUERY = gql`
  query DomainQuery($nodehash: String) {
    domains(first: 1, where: { id: $nodehash }) {
      name
    }
  }
`;

export const useUserNoms = () => {
  const { address } = useContractKit();
  const celoProvider = useCeloProvider();
  const celoChainId = useCeloChainId();
  const apolloClient = useApolloClient();

  const call = React.useCallback(async () => {
    const baseAddress = BASE_ADDR[celoChainId];
    const multicallAddress = MULTICALL_ADDR[celoChainId];
    if (!baseAddress || !multicallAddress) return null;
    if (address == null || address === ZERO_ADDRESS) return [];
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
      9295881,
      1_000_000
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
    if (tokenIds.length === 0) {
      return [];
    }
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
      }, 1_000)
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
      }, 1_000)
    ).then((res) =>
      res.map(
        (value) =>
          baseRegistrarImplementation.interface.decodeFunctionResult(
            "ownerOf",
            value
          )[0]
      )
    );

    const ownedTokens = activeTokens
      .map(({ tokenId, expiration }, idx) => ({
        name: tokenId.toHexString(),
        tokenId,
        expiration,
        owner: tokenIdOwners[idx],
        nodehash: solidityKeccak256(
          ["bytes32", "uint256"],
          [BASE_NODE, tokenId]
        ),
      }))
      .filter((t) => t.owner === getAddress(address));
    const tokens = [];
    for (const token of ownedTokens) {
      const { nodehash } = token;
      const { data } = await apolloClient.query({
        query: DOMAIN_QUERY,
        variables: { nodehash },
      });
      if (data && data.domains && data.domains.length > 0) {
        const { name } = data.domains[0];
        tokens.push({
          ...token,
          name: name.slice(0, name.length - 4),
        });
      }
    }
    return tokens;
  }, [celoChainId, address, celoProvider, apolloClient]);

  return usePollingAsyncState(null, 30000, call);
};
