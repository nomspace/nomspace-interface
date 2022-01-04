import { useContractKit, useProvider } from "@celo-tools/use-contractkit";
import tokenList from "web3-token-list";
import { useAsyncState } from "hooks/useAsyncState";
import { useCallback } from "react";
import { MULTICALL_ADDR } from "addresses";
import { ERC20__factory, Multicall__factory } from "generated";
import { BigNumber } from "ethers";

export const useTokenBalances = (user?: string) => {
  const { network } = useContractKit();
  const provider = useProvider();

  const call = useCallback(async () => {
    if (!user) return null;
    const multicallAddress = MULTICALL_ADDR[network.chainId];
    if (!multicallAddress) return null;
    const multicall = Multicall__factory.connect(multicallAddress, provider);
    const networkTokens = tokenList[network.chainId];
    if (!networkTokens) return null;
    const ERC20Interface = ERC20__factory.createInterface();
    const balances = await multicall.callStatic
      .aggregate(
        networkTokens.map((t) => ({
          target: t.address,
          callData: ERC20Interface.encodeFunctionData("balanceOf", [user]),
        }))
      )
      .then((v) =>
        v.returnData.map(
          (r) =>
            ERC20Interface.decodeFunctionResult("balanceOf", r)[0] as BigNumber
        )
      );
    return networkTokens.filter((_, i) => balances[i]?.gt("0"));
  }, [network.chainId, provider, user]);

  return useAsyncState(null, call);
};
