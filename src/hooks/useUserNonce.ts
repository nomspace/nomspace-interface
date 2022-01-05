import { useContractKit } from "@celo-tools/use-contractkit";
import { useEffect, useState } from "react";
import { FORWARDER_ADDR } from "addresses";
import { useCeloChainId } from "hooks/useCeloChainId";
import { useCeloProvider } from "hooks/useCeloProvider";
import { OwnableMinimalForwarder__factory } from "generated";
import { createContainer } from "unstated-next";

const useUserNonce = (): [number | undefined, (nonce: number) => void] => {
  const { address } = useContractKit();
  const celoChainId = useCeloChainId();
  const celoProvider = useCeloProvider();

  const [nonce, setNonce] = useState<number>();
  useEffect(() => {
    (async () => {
      const forwarderAddr = FORWARDER_ADDR[celoChainId];
      if (!address || !forwarderAddr) return null;
      const forwarder = OwnableMinimalForwarder__factory.connect(
        forwarderAddr,
        celoProvider
      );
      await forwarder
        .getNonce(address)
        .then((nonce) => setNonce(nonce.toNumber()));
    })();
  }, [address, celoChainId, celoProvider]);
  return [nonce, setNonce];
};

export const UserNonce = createContainer(useUserNonce);
