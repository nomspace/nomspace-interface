import { useCallback, useState } from "react";
import {
  useContractKit,
  useGetConnectedSigner,
  useProvider,
} from "@celo-tools/use-contractkit";
import { USD, RESERVE_PORTAL, ENS_ADDR, FORWARDER_ADDR } from "addresses";
import {
  ReservePortal,
  ReservePortal__factory,
  PublicResolver__factory,
} from "generated";
import { toastTx } from "utils/toastTx";
import { toast } from "react-toastify";
import { useCeloChainId } from "./useCeloChainId";
import { useCeloProvider } from "./useCeloProvider";
import { ENSJS } from "types/ensjs";
import ENS from "@ensdomains/ensjs";
import { useUserTxDefaults } from "./useUserTxDefaults";
import { getSignature } from "utils/sig";

export const useSetNomSetting = (name?: string | null) => {
  const { address, network } = useContractKit();
  const provider = useProvider();
  const celoProvider = useCeloProvider();
  const celoChainId = useCeloChainId();
  const [loading, setLoading] = useState(false);
  const getConnectedSigner = useGetConnectedSigner();
  const [userTxDefaults] = useUserTxDefaults();

  const setNomSetting = useCallback(
    async (functionFragment: any, values: any) => {
      const usdAddress = USD[network.chainId];
      const ensAddress = ENS_ADDR[celoChainId];
      const reservePortalAddress = RESERVE_PORTAL[network.chainId];
      const forwarderAddr = FORWARDER_ADDR[celoChainId];
      if (
        !usdAddress ||
        !ensAddress ||
        !reservePortalAddress ||
        !forwarderAddr ||
        !address ||
        !name ||
        !userTxDefaults
      ) {
        return;
      }
      const ens: ENSJS = new ENS({
        provider: celoProvider,
        ensAddress,
      });
      const resolverAddr = await ens.name(`${name}.nom`).getResolverAddr();
      const resolver = await PublicResolver__factory.connect(
        resolverAddr,
        celoProvider
      );
      const signer = await getConnectedSigner();
      const reservePortal = ReservePortal__factory.connect(
        reservePortalAddress,
        signer
      ) as unknown as ReservePortal;
      try {
        setLoading(true);
        const data = resolver.interface.encodeFunctionData(
          functionFragment,
          values
        );
        if (!data) return;
        const { from, nonce, gas, value } = userTxDefaults;
        const to = resolver.address;
        const signature = await getSignature(
          signer,
          from,
          to,
          value,
          gas,
          nonce,
          data,
          celoChainId,
          forwarderAddr
        );
        const gasPrice = await provider.getGasPrice();
        const tx = await reservePortal.escrow(
          usdAddress,
          0,
          celoChainId,
          {
            from,
            to,
            gas,
            value,
            nonce,
            data,
          },
          signature,
          { gasPrice }
        );
        toastTx(tx.hash);
      } catch (e: any) {
        toast(e.message);
        console.error(e);
      } finally {
        setLoading(false);
      }
    },
    [
      address,
      celoChainId,
      celoProvider,
      getConnectedSigner,
      name,
      network.chainId,
      provider,
      userTxDefaults,
    ]
  );
  return { setNomSetting, loading };
};
