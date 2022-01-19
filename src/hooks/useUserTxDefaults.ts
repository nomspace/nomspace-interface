import { useCallback } from "react";
import { useContractKit } from "@celo-tools/use-contractkit";
import { useAsyncState } from "hooks/useAsyncState";

export const useUserTxDefaults = () => {
  const { address } = useContractKit();
  const call = useCallback(async () => {
    if (!address) return null;
    const from = address;
    const gas = 2e6;
    const value = 0;
    return { from, gas, value };
  }, [address]);
  return useAsyncState(null, call);
};
