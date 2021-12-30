import React from "react";
import { BASE_ADDR, ENS_ADDR } from "config";
import { useAsyncState } from "./useAsyncState";
import { useCeloProvider } from "hooks/useCeloProvider";
import { useCeloChainId } from "hooks/useCeloChainId";
import { BaseRegistrarImplementation__factory } from "generated";
import ENS, { labelhash } from "@ensdomains/ensjs";

type NomResult = {
  resolution: string;
  owner: string;
  expiration: number;
};

export const useNom = (name: string) => {
  const provider = useCeloProvider();
  const celoChainId = useCeloChainId();

  const call = React.useCallback(async (): Promise<NomResult | null> => {
    const baseAddr = BASE_ADDR[celoChainId];
    if (!baseAddr) {
      return null;
    }
    const ens = new ENS({
      provider,
      ensAddress: ENS_ADDR[celoChainId],
    });
    const nom = ens.name(`${name}.nom`);
    const base = BaseRegistrarImplementation__factory.connect(
      baseAddr,
      provider
    );

    const resolution = await nom.getAddress();
    const tokenId = labelhash(name);
    const owner = await base.ownerOf(tokenId);
    const expiration = (await base.nameExpires(tokenId)).toNumber();

    return { resolution, owner, expiration };
  }, [provider, celoChainId, name]);

  return useAsyncState(null, call);
};
