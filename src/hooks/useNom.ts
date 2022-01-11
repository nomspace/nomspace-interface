import React from "react";
import { TextKey } from "config";
import { BASE_ADDR } from "addresses";
import { usePollingAsyncState } from "./usePollingAsyncState";
import { useCeloProvider } from "hooks/useCeloProvider";
import { useCeloChainId } from "hooks/useCeloChainId";
import { BaseRegistrarImplementation__factory } from "generated";
import { labelhash } from "@ensdomains/ensjs";
import { useENS } from "hooks/useENS";
import { useName } from "./useName";
import { createContainer } from "unstated-next";

type NomResult = {
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
  const { name } = useName();
  const celoProvider = useCeloProvider();
  const celoChainId = useCeloChainId();
  const ens = useENS();

  const call = React.useCallback(async (): Promise<NomResult | null> => {
    const baseAddress = BASE_ADDR[celoChainId];
    if (!baseAddress || !name) {
      return null;
    }
    const nom = ens.name(`${name}.nom`);
    const base = BaseRegistrarImplementation__factory.connect(
      baseAddress,
      celoProvider
    );

    const tokenId = labelhash(name);
    // TODO: multicall
    const [
      resolution,
      bio,
      website,
      github,
      discord,
      telegram,
      twitter,
      avatar,
      owner,
      expiration,
      recordOwner,
    ] = await Promise.all([
      nom.getAddress(),
      nom.getText(TextKey.DESCRIPTION),
      nom.getText(TextKey.URL),
      nom.getText(TextKey.GITHUB),
      nom.getText(TextKey.DISCORD),
      nom.getText(TextKey.TELEGRAM),
      nom.getText(TextKey.TWITTER),
      nom.getText(TextKey.AVATAR),
      base.ownerOf(tokenId).catch(() => null),
      base.nameExpires(tokenId).then((e) => e.toNumber()),
      nom.getOwner(),
    ]);
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
  }, [celoChainId, ens, name, celoProvider]);

  return usePollingAsyncState(null, 10000, call);
};

export const GlobalNom = createContainer(useNom);
