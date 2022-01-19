import { useContractKit } from "@celo-tools/use-contractkit";
import { useENS } from "hooks/useENS";
import { useCallback } from "react";
import { useAsyncState } from "hooks/useAsyncState";
import { createContainer } from "unstated-next";

const useReverseResolution = () => {
  const { address } = useContractKit();
  const ensjs = useENS();

  const call = useCallback(
    async () => (address ? (await ensjs.getName(address)).name : null),
    [address, ensjs]
  );
  return useAsyncState(null, call);
};

export const ReverseResolution = createContainer(useReverseResolution);
