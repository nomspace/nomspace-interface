import { useCallback, useState } from "react";
import {
  useContractKit,
  useGetConnectedSigner,
  useProvider,
} from "@celo-tools/use-contractkit";
import { USD, RESERVE_PORTAL, BASE_ADDR, FORWARDER_ADDR } from "addresses";
import {
  ERC20__factory,
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

export const useReclaim = (name?: string) => {
  const { address, network } = useContractKit();
  const { chainId } = network;
  const provider = useProvider();
  const celoProvider = useCeloProvider();
  const celoChainId = useCeloChainId();
  const [loading, setLoading] = useState(false);
  const getConnectedSigner = useGetConnectedSigner();
  const [userTxDefaults] = useUserTxDefaults();
  const [nonce, setNonce] = UserNonce.useContainer();

  const reclaim = useCallback(async () => {
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
    const usd = ERC20__factory.connect(usdAddress, signer);
    const baseRegistrarImplementation =
      BaseRegistrarImplementation__factory.connect(baseAddress, celoProvider);
    const reservePortal = ReservePortal__factory.connect(
      reservePortalAddress,
      signer
    ) as unknown as ReservePortal;
    try {
      setLoading(true);
      const tokenId = labelhash(name);
      if (network.chainId === celoChainId) {
        const tx = await baseRegistrarImplementation
          .connect(signer)
          .reclaim(tokenId, address);
        toastTx(tx.hash);
      } else {
        const data = baseRegistrarImplementation.interface.encodeFunctionData(
          "reclaim",
          [tokenId, address]
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
          usd.address,
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
      }
    } catch (e: any) {
      toast(e.message);
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [
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
  ]);
  return { reclaim, loading };
};
