import { useCallback } from "react";
import { useProvider } from "@celo-tools/use-contractkit";
import { utils } from "ethers";
import { useAsyncState } from "hooks/useAsyncState";
import { ZERO_ADDRESS } from "utils/constants";

type UserStats = {
  transactionCount: number;
  nativeBalance: number;
};
export const useUserStats = (user?: string) => {
  const provider = useProvider();
  const call = useCallback(async (): Promise<UserStats | null> => {
    if (!user) return null;
    if (user === ZERO_ADDRESS) {
      return {
        transactionCount: 0,
        nativeBalance: 0,
      };
    }

    return {
      transactionCount: await provider.getTransactionCount(user),
      nativeBalance: Number(
        utils.formatUnits(await provider.getBalance(user), 18)
      ),
    };
  }, [provider, user]);
  return useAsyncState(null, call);
};
