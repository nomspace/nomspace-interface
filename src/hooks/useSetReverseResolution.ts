import { useCallback, useState } from "react";
import {
  useContractKit,
  useGetConnectedSigner,
  useProvider,
} from "@celo-tools/use-contractkit";
import { GAS_USD } from "config";
import { USD, RESERVE_PORTAL, FORWARDER_ADDR, REVERSE_ADDR } from "addresses";
import {
  ERC20__factory,
  ReservePortal,
  ReservePortal__factory,
  ReverseRegistrar__factory,
} from "generated";
import { toastTx } from "utils/toastTx";
import { toast } from "react-toastify";
import { useCeloProvider } from "./useCeloProvider";
import { useCeloChainId } from "./useCeloChainId";
import { useUserTxDefaults } from "hooks/useUserTxDefaults";
import { getSignature } from "utils/sig";
import { UserNonce } from "./useUserNonce";
import { useUSD } from "./useUSD";
import { useApprove } from "./useApprove";
import { MaxUint256 } from "@ethersproject/constants";
import { BigNumber } from "ethers";

export const useSetReverseResolution = () => {
  const { address, network, connect } = useContractKit();
  const { chainId } = network;
  const provider = useProvider();
  const celoProvider = useCeloProvider();
  const celoChainId = useCeloChainId();
  const [loading, setLoading] = useState(false);
  const getConnectedSigner = useGetConnectedSigner();
  const [userTxDefaults] = useUserTxDefaults();
  const [nonce, setNonce] = UserNonce.useContainer();
  const { approve } = useApprove();
  const [usdRes] = useUSD();

  const setReverseResolution = useCallback(
    async (name: string) => {
      if (!address) await connect();
      const usdAddress = USD[network.chainId];
      const reverseAddress = REVERSE_ADDR[celoChainId];
      const reservePortalAddress = RESERVE_PORTAL[network.chainId];
      const forwarderAddr = FORWARDER_ADDR[celoChainId];
      const signer = await getConnectedSigner();
      if (
        !name ||
        !usdAddress ||
        !reservePortalAddress ||
        !address ||
        !reverseAddress ||
        !forwarderAddr ||
        !userTxDefaults ||
        !usdRes
      ) {
        return;
      }
      const reverseRegistrar = ReverseRegistrar__factory.connect(
        reverseAddress,
        celoProvider
      );
      try {
        setLoading(true);
        if (chainId === celoChainId) {
          const tx = await reverseRegistrar.connect(signer).setName(name);
          toastTx(tx.hash);
        } else {
          const usd = ERC20__factory.connect(usdAddress, signer);
          const decimals = await usd.decimals();
          const allowance = await usd.allowance(address, reservePortalAddress);
          const cost = BigNumber.from(GAS_USD * 1000)
            .shl(decimals)
            .shr(3);
          if (cost.gt(allowance)) {
            await approve(MaxUint256, reservePortalAddress);
          }
          const reservePortal = ReservePortal__factory.connect(
            reservePortalAddress,
            signer
          ) as unknown as ReservePortal;
          const data = reverseRegistrar.interface.encodeFunctionData(
            "setName",
            [name]
          );
          if (!data || nonce == null) return;
          const { from, gas, value } = userTxDefaults;
          const to = reverseRegistrar.address;
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
            cost,
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
    },
    [
      address,
      approve,
      celoChainId,
      celoProvider,
      chainId,
      connect,
      getConnectedSigner,
      network.chainId,
      nonce,
      provider,
      setNonce,
      usdRes,
      userTxDefaults,
    ]
  );

  return { setReverseResolution, loading };
};
