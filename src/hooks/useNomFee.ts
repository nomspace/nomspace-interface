import React from "react";
import { useContractKit, ChainId } from "@celo-tools/use-contractkit";
import { useAsyncState } from "src/hooks/useAsyncState";
import { FEE_MODULE_V1 } from "src/config";
import { toBN, AbiItem } from "web3-utils";
import FeeModuleV1Metadata from "src/abis/nomspace/FeeModuleV1.json";
import { FeeModuleV1 } from "src/generated/FeeModuleV1";

export const useNomFee = () => {
  const { kit, network } = useContractKit();
  const call = React.useCallback(async () => {
    if (network.chainId === ChainId.Alfajores) {
      return toBN(0);
    }
    const feeModule = new kit.web3.eth.Contract(
      FeeModuleV1Metadata.abi as AbiItem[],
      FEE_MODULE_V1
    ) as unknown as FeeModuleV1;
    return toBN(await feeModule.methods.paymentRate().call());
  }, [kit, network]);
  return useAsyncState(toBN(0), call);
};
