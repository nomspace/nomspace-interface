import { useCallback, useState } from "react";
import {
  useContractKit,
  useGetConnectedSigner,
  useProvider,
} from "@celo-tools/use-contractkit";
import { USD, RESERVE_PORTAL, FORWARDER_ADDR, BASE_ADDR } from "addresses";
import {
  BaseRegistrarImplementation__factory,
  ReservePortal,
  ReservePortal__factory,
} from "generated";
import { toastTx } from "utils/toastTx";
import { toast } from "react-toastify";
import { labelhash } from "@ensdomains/ensjs";
import { useCeloProvider } from "./useCeloProvider";
import { useCeloChainId } from "./useCeloChainId";
import { useUserTxDefaults } from "hooks/useUserTxDefaults";
import { getSignature } from "utils/sig";
import { UserNonce } from "./useUserNonce";

export const useTransferOwnership = (name?: string) => {
  const { address, network } = useContractKit();
  const { chainId } = network;
  const provider = useProvider();
  const celoProvider = useCeloProvider();
  const celoChainId = useCeloChainId();
  const [loading, setLoading] = useState(false);
  const getConnectedSigner = useGetConnectedSigner();
  const [userTxDefaults] = useUserTxDefaults();
  const [nonce, setNonce] = UserNonce.useContainer();

  const transferOwnership = useCallback(
    async (newOwner: string) => {
      const usdAddress = USD[network.chainId];
      const baseAddress = BASE_ADDR[celoChainId];
      const reservePortalAddress = RESERVE_PORTAL[network.chainId];
      const forwarderAddr = FORWARDER_ADDR[celoChainId];
      if (
        !name ||
        !usdAddress ||
        !reservePortalAddress ||
        !address ||
        !baseAddress ||
        !forwarderAddr ||
        !userTxDefaults
      ) {
        return;
      }
      const signer = await getConnectedSigner();
      const baseRegistrarImplementation =
        BaseRegistrarImplementation__factory.connect(baseAddress, celoProvider);
      const reservePortal = ReservePortal__factory.connect(
        reservePortalAddress,
        signer
      ) as unknown as ReservePortal;
      try {
        setLoading(true);
        const tokenId = labelhash(name);
        const data = baseRegistrarImplementation.interface.encodeFunctionData(
          "safeTransferFrom(address,address,uint256)" as any,
          [address, newOwner, tokenId]
        );
        if (!data || nonce == null) return;
        const { from, gas, value } = userTxDefaults;
        const to = baseRegistrarImplementation.address;
        const signature = await getSignature(
          signer,
          from,
          to,
          value,
          gas,
          nonce,
          data,
          chainId,
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
            chainId,
            data,
          },
          signature,
          { gasPrice }
        );
        await tx.wait(2);
        setNonce(nonce + 1);
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
      chainId,
      getConnectedSigner,
      name,
      network.chainId,
      nonce,
      provider,
      setNonce,
      userTxDefaults,
    ]
  );

  return { transferOwnership, loading };
};
