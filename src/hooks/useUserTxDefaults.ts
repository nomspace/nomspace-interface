import { useCallback } from "react";
import { useCeloChainId } from "hooks/useCeloChainId";
import { useCeloProvider } from "hooks/useCeloProvider";
import { FORWARDER_ADDR } from "config";
import { useContractKit } from "@celo-tools/use-contractkit";
import { OwnableMinimalForwarder__factory } from "generated";
import { useAsyncState } from "hooks/useAsyncState";
export const useUserTxDefaults = () => {
  const { address } = useContractKit();
  const celoChainId = useCeloChainId();
  const celoProvider = useCeloProvider();
  const call = useCallback(async () => {
    const forwarderAddr = FORWARDER_ADDR[celoChainId];
    if (!address || !forwarderAddr) return null;
    const forwarder = OwnableMinimalForwarder__factory.connect(
      forwarderAddr,
      celoProvider
    );
    const from = address;
    const nonce = await forwarder
      .getNonce(address)
      .then((nonce) => nonce.toString());
    const gas = 2e6;
    const value = 0;
    return { from, nonce, gas, value };
  }, [address, celoChainId, celoProvider]);
  return useAsyncState(null, call);
};
