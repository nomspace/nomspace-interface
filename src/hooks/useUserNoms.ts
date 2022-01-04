import React from "react";
import { useContractKit } from "@celo-tools/use-contractkit";
import { useAsyncState } from "./useAsyncState";
import {
  BaseRegistrarImplementation__factory,
  Multicall__factory,
} from "generated";
import { useCeloProvider } from "./useCeloProvider";
import { BASE_ADDR, MULTICALL_ADDR, RESOLVER_ADDR } from "addresses";
import { useCeloChainId } from "./useCeloChainId";
import { PublicResolver__factory } from "generated/factories/PublicResolver__factory";

export const useUserNoms = () => {
  const { address } = useContractKit();
  const celoProvider = useCeloProvider();
  const celoChainId = useCeloChainId();

  const call = React.useCallback(async () => {
    const baseAddress = BASE_ADDR[celoChainId];
    const multicallAddress = MULTICALL_ADDR[celoChainId];
    const resolverAddress = RESOLVER_ADDR[celoChainId];
    if (!baseAddress || !multicallAddress || !resolverAddress) return null;
    const baseRegistrar = BaseRegistrarImplementation__factory.connect(
      baseAddress,
      celoProvider
    );
    const multicall = Multicall__factory.connect(
      multicallAddress,
      celoProvider
    );
    const resolverInterface = PublicResolver__factory.createInterface();

    const userNoms = await baseRegistrar
      .queryFilter(
        baseRegistrar.filters["Transfer(address,address,uint256)"](
          null,
          address,
          null
        )
      )
      .then((events) => {
        console.log(events[0]?.args.tokenId.toHexString());
        console.log(events[1]?.args.tokenId.toHexString());
        return multicall.callStatic.aggregate(
          events.map((event) => ({
            target: resolverAddress,
            callData: resolverInterface.encodeFunctionData("name", [
              event.args.tokenId.toHexString(),
            ]),
          }))
        );
      })
      .then((results) => {
        return results.returnData.map((value) =>
          resolverInterface.decodeFunctionResult("name", value)
        );
      });
    console.log("usernoms", userNoms);
  }, [celoChainId, celoProvider, address]);

  return useAsyncState(null, call);
};
