import { useCallback } from "react";
import { useProvider } from "@celo-tools/use-contractkit";
import { utils } from "ethers";
import { useAsyncState } from "hooks/useAsyncState";

type UserStats = {
  transactionCount: number;
  nativeBalance: number;
};
export const useUserStats = (user?: string) => {
  const provider = useProvider();
  const call = useCallback(async (): Promise<UserStats | null> => {
    if (!user) return null;

    return {
      transactionCount: await provider.getTransactionCount(user),
      nativeBalance: Number(
        utils.formatUnits(await provider.getBalance(user), 18)
      ),
    };
  }, [provider, user]);
  return useAsyncState(null, call);
};
