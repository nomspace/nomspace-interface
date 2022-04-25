import React from "react";
import { TextKey } from "config";
import { BASE_ADDR, ENS_ADDR, MULTICALL_ADDR, RESOLVER_ADDR } from "addresses";
import { usePollingAsyncState } from "./usePollingAsyncState";
import { useCeloProvider } from "hooks/useCeloProvider";
import { useCeloChainId } from "hooks/useCeloChainId";
import {
  BaseRegistrarImplementation__factory,
  PublicResolver__factory,
  ENSRegistry__factory,
  Multicall__factory,
} from "generated";
import { labelhash } from "@ensdomains/ensjs";
import { useName } from "./useName";
import { createContainer } from "unstated-next";

export type NomResult = {
  resolution: string;
  owner: string | null;
  recordOwner: string;
  expiration: number;
  bio: string;
  website: string;
  github: string;
  discord: string;
  telegram: string;
  twitter: string;
  avatar: string;
};

const useNom = () => {
  const { name, namehash } = useName();
  const celoProvider = useCeloProvider();
  const celoChainId = useCeloChainId();

  const call = React.useCallback(async (): Promise<NomResult | null> => {
    const baseAddress = BASE_ADDR[celoChainId];
    const resolverAddress = RESOLVER_ADDR[celoChainId];
    const ensAddress = ENS_ADDR[celoChainId];
    const multicallAddress = MULTICALL_ADDR[celoChainId];
    if (
      !baseAddress ||
      !resolverAddress ||
      !ensAddress ||
      !name ||
      !namehash ||
      !multicallAddress
    ) {
      return null;
    }
    const ens = ENSRegistry__factory.connect(ensAddress, celoProvider);
    const resolver = PublicResolver__factory.connect(
      resolverAddress,
      celoProvider
    );
    const base = BaseRegistrarImplementation__factory.connect(
      baseAddress,
      celoProvider
    );
    const multicall = Multicall__factory.connect(
      multicallAddress,
      celoProvider
    );

    const tokenId = labelhash(name);
    const calls = [
      {
        contract: resolver,
        function: "addr(bytes32)",
        values: [namehash],
      },
      {
        contract: resolver,
        function: "text",
        values: [namehash, TextKey.DESCRIPTION],
      },
      {
        contract: resolver,
        function: "text",
        values: [namehash, TextKey.URL],
      },
      {
        contract: resolver,
        function: "text",
        values: [namehash, TextKey.GITHUB],
      },
      {
        contract: resolver,
        function: "text",
        values: [namehash, TextKey.DISCORD],
      },
      {
        contract: resolver,
        function: "text",
        values: [namehash, TextKey.TELEGRAM],
      },
      {
        contract: resolver,
        function: "text",
        values: [namehash, TextKey.TWITTER],
      },
      {
        contract: resolver,
        function: "text",
        values: [namehash, TextKey.AVATAR],
      },
      {
        contract: base,
        function: "nameExpires",
        values: [tokenId],
      },
      {
        contract: ens,
        function: "owner(bytes32)",
        values: [namehash],
      },
    ];
    const owner = await base.ownerOf(tokenId).catch(() => null);

    const [
      resolution,
      bio,
      website,
      github,
      discord,
      telegram,
      twitter,
      avatar,
      expiration,
      recordOwner,
    ] = await multicall.callStatic
      .aggregate(
        calls.map((call) => ({
          target: call.contract.address,
          callData: call.contract.interface.encodeFunctionData(
            call.function as any,
            call.values as any
          ),
        }))
      )
      .then((results) =>
        results.returnData.map(
          (value, idx) =>
            calls[idx]?.contract.interface.decodeFunctionResult(
              calls[idx]?.function as any,
              value
            )[0]
        )
      );

    return {
      resolution,
      owner,
      recordOwner,
      expiration,
      bio,
      website,
      github,
      discord,
      telegram,
      twitter,
      avatar,
    };
  }, [celoChainId, name, namehash, celoProvider]);

  return usePollingAsyncState(null, 10000, call);
};

export const GlobalNom = createContainer(useNom);
