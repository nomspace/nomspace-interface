import React from "react";
import { useContractKit } from "@celo-tools/use-contractkit";
import { useAsyncState } from "./useAsyncState";
import {
  BaseRegistrarImplementation__factory,
  Multicall__factory,
  NomRegistrarController__factory,
} from "generated";
import { useCeloProvider } from "./useCeloProvider";
import {
  BASE_ADDR,
  MULTICALL_ADDR,
  NOM_REG_ADDR,
  RESOLVER_ADDR,
} from "addresses";
import { useCeloChainId } from "./useCeloChainId";
import { labelhash } from "@ensdomains/ensjs";

export const useUserNoms = () => {
  const { address } = useContractKit();
  const celoProvider = useCeloProvider();
  const celoChainId = useCeloChainId();

  const call = React.useCallback(async () => {
    const baseAddress = BASE_ADDR[celoChainId];
    const nomRegistrarAddress = NOM_REG_ADDR[celoChainId];
    const multicallAddress = MULTICALL_ADDR[celoChainId];
    const resolverAddress = RESOLVER_ADDR[celoChainId];
    if (
      !baseAddress ||
      !nomRegistrarAddress ||
      !multicallAddress ||
      !resolverAddress
    )
      return null;
    const nomRegistrarController = NomRegistrarController__factory.connect(
      nomRegistrarAddress,
      celoProvider
    );
    const multicall = Multicall__factory.connect(
      multicallAddress,
      celoProvider
    );
    const baseInterface =
      BaseRegistrarImplementation__factory.createInterface();

    const userNoms = await nomRegistrarController
      .queryFilter(
        nomRegistrarController.filters[
          "NameRegistered(string,bytes32,address,uint256,uint256)"
        ](null, null, address, null, null)
      )
      .then((events) => {
        return events.map((event) => event.args.name);
      });
    const expirations = await multicall.callStatic
      .aggregate(
        userNoms.map((name) => {
          return {
            target: baseAddress,
            callData: baseInterface.encodeFunctionData("nameExpires", [
              labelhash(name),
            ]),
          };
        })
      )
      .then((results) => {
        return results.returnData.map((value) =>
          baseInterface.decodeFunctionResult("nameExpires", value)[0].toNumber()
        );
      });
    const activeNoms = [];
    for (let i = 0; i < userNoms.length; i++) {
      const name = userNoms[i];
      const expiration = expirations[i];
      if (expiration > Date.now() / 1000) {
        activeNoms.push({
          name,
          expiration,
        });
      }
    }
    return activeNoms;
  }, [celoChainId, celoProvider, address]);

  return useAsyncState(null, call);
};
