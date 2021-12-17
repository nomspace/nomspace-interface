import React from "react";
import { Nom } from "generated/Nom";
import { ethers } from "ethers";
import { NOM } from "config";
import { useAsyncState } from "./useAsyncState";
import { formatName } from "utils/name";
import { useCeloProvider } from "hooks/useCeloProvider";
import { Nom__factory } from "generated";
import { utils } from "ethers";

export const useNom = (name: string) => {
  const provider = useCeloProvider();
  const nameFormatted = formatName(name);

  const call = React.useCallback(async () => {
    const nom = Nom__factory.connect(
      NOM[44787]!, // TODO: HARDCODE
      provider
    ) as unknown as Nom;

    const resolution = await nom.resolve(
      utils.formatBytes32String(nameFormatted)
    );

    const owner = await nom.nameOwner(utils.formatBytes32String(nameFormatted));

    const expiration = await nom.expirations(
      ethers.utils.formatBytes32String(nameFormatted)
    );

    return { resolution, owner, expiration };
  }, [provider, nameFormatted]);

  return useAsyncState(null, call);
};
