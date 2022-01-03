import React from "react";
import { BASE_ADDR, ENS_ADDR, TextKey } from "config";
import { useAsyncState } from "./useAsyncState";
import { useCeloProvider } from "hooks/useCeloProvider";
import { useCeloChainId } from "hooks/useCeloChainId";
import { BaseRegistrarImplementation__factory } from "generated";
import ENS, { labelhash } from "@ensdomains/ensjs";
import { normalize } from "eth-ens-namehash";
import { ZERO_ADDRESS } from "utils/constants";
import { ENSJS } from "types/ensjs";

type NomResult = {
  resolution: string;
  owner: string;
  expiration: number;
  bio: string;
  github: string;
  discord: string;
  telegram: string;
  twitter: string;
};

export const useNom = (name: string) => {
  const provider = useCeloProvider();
  const celoChainId = useCeloChainId();
  // Normalize name
  name = normalize(name);

  const call = React.useCallback(async (): Promise<NomResult | null> => {
    const baseAddress = BASE_ADDR[celoChainId];
    const ensAddress = ENS_ADDR[celoChainId];
    if (!baseAddress || !ensAddress) {
      return null;
    }
    const ens: ENSJS = new ENS({
      provider,
      ensAddress,
    });
    const nom = ens.name(`${name}.nom`);
    const base = BaseRegistrarImplementation__factory.connect(
      baseAddress,
      provider
    );

    const tokenId = labelhash(name);
    // TODO: Promise.all or multicall
    const resolution = await nom.getAddress();
    const bio = await nom.getText(TextKey.DESCRIPTION);
    const github = await nom.getText(TextKey.GITHUB);
    const discord = await nom.getText(TextKey.DISCORD);
    const telegram = await nom.getText(TextKey.TELEGRAM);
    const twitter = await nom.getText(TextKey.TWITTER);
    const owner = await base.ownerOf(tokenId).catch(() => ZERO_ADDRESS);
    const expiration = (await base.nameExpires(tokenId)).toNumber();

    return {
      resolution,
      owner,
      expiration,
      bio,
      github,
      discord,
      telegram,
      twitter,
    };
  }, [provider, celoChainId, name]);

  return useAsyncState(null, call);
};
