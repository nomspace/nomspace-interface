import { useContractKit, useProvider } from "@celo-tools/use-contractkit";
import { useCallback } from "react";
import tokenList, { Token } from "web3-token-list";
import { Multicall__factory, ERC20__factory } from "generated";
import { MULTICALL_ADDR } from "addresses";
import { useAsyncState } from "./useAsyncState";
import { BigNumber } from "ethers";

export type TokenWithBalance = Token & {
  balance: BigNumber;
};

export const useTokens = () => {
  const { network, address } = useContractKit();
  const provider = useProvider();
  const call = useCallback(async () => {
    const multicallAddress = MULTICALL_ADDR[network.chainId];
    const networkTokens = tokenList[network.chainId];
    if (!multicallAddress || !address || !networkTokens) return null;
    const multicall = Multicall__factory.connect(multicallAddress, provider);
    const erc20 = ERC20__factory.createInterface();
    const balances = await multicall.callStatic
      .aggregate(
        networkTokens.map((t) => ({
          target: t.address,
          callData: erc20.encodeFunctionData("balanceOf", [address]),
        }))
      )
      .then((r) =>
        r.returnData.map((rd) => erc20.decodeFunctionResult("balanceOf", rd)[0])
      );
    const res: TokenWithBalance[] = [];
    for (let i = 0; i < networkTokens.length; i++) {
      const token = networkTokens[i];
      if (!token?.chainId) continue;
      res.push({ ...token, balance: balances[i] });
    }
    return res.sort((a, b) => {
      const value = b.balance.sub(a.balance);
      if (value.eq(0)) return 0;
      if (value.gt(0)) return 1;
      return -1;
    });
  }, [address, network.chainId, provider]);
  return useAsyncState(null, call);
};
