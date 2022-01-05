import { useCeloProvider } from "hooks/useCeloProvider";
import { useCeloChainId } from "hooks/useCeloChainId";
import ENS from "@ensdomains/ensjs";
import { ENSJS } from "types/ensjs";
import { ENS_ADDR } from "addresses";
import { useMemo } from "react";

export const useENS = () => {
  const celoProvider = useCeloProvider();
  const celoChainId = useCeloChainId();

  return useMemo<ENSJS>(
    () =>
      new ENS({
        provider: celoProvider,
        ensAddress: ENS_ADDR[celoChainId],
      }),
    [celoChainId, celoProvider]
  );
};
