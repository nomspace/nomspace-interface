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
  ERC20__factory,
} from "generated";
import { toastTx } from "utils/toastTx";
import { toast } from "react-toastify";
import { useCeloChainId } from "./useCeloChainId";
import { useCeloProvider } from "./useCeloProvider";
import { ENSJS } from "types/ensjs";
import ENS from "@ensdomains/ensjs";
import { useUserTxDefaults } from "./useUserTxDefaults";
import { getSignature } from "utils/sig";
import { useApprove } from "./useApprove";
import { GAS_USD } from "config";
import { useUSD } from "./useUSD";
import { MaxUint256 } from "@ethersproject/constants";
import { BigNumber } from "ethers";

export const useSetNomSetting = (name?: string | null) => {
  const { address, network } = useContractKit();
  const { chainId } = network;
  const provider = useProvider();
  const celoProvider = useCeloProvider();
  const celoChainId = useCeloChainId();
  const [loading, setLoading] = useState(false);
  const getConnectedSigner = useGetConnectedSigner();
  const [userTxDefaults] = useUserTxDefaults();
  const { approve } = useApprove();
  const [usdRes] = useUSD();

  const setNomSetting = useCallback(
    async (nonce: number, functionFragment: any, values: any) => {
      const usdAddress = USD[chainId];
      const ensAddress = ENS_ADDR[celoChainId];
      const reservePortalAddress = RESERVE_PORTAL[chainId];
      const forwarderAddr = FORWARDER_ADDR[celoChainId];
      if (
        !usdAddress ||
        !ensAddress ||
        !reservePortalAddress ||
        !forwarderAddr ||
        !address ||
        !name ||
        !userTxDefaults ||
        !usdRes
      ) {
        return;
      }
      const ens: ENSJS = new ENS({
        provider: celoProvider,
        ensAddress,
      });
      const resolverAddr = await ens.name(`${name}.nom`).getResolverAddr();
      const resolver = PublicResolver__factory.connect(
        resolverAddr,
        celoProvider
      );
      const signer = await getConnectedSigner();
      const reservePortal = ReservePortal__factory.connect(
        reservePortalAddress,
        signer
      ) as unknown as ReservePortal;
      const usd = ERC20__factory.connect(usdAddress, signer);
      try {
        setLoading(true);
        const data = resolver.interface.encodeFunctionData(
          functionFragment,
          values
        );
        if (!data) return;
        const { from, gas, value } = userTxDefaults;
        const to = resolver.address;
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
        const decimals = await usd.decimals();
        const cost = BigNumber.from(GAS_USD * 1000)
          .shl(decimals)
          .shr(3);
        if (cost.gt(usdRes.allowance)) {
          await approve(MaxUint256);
        }
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
      approve,
      celoChainId,
      celoProvider,
      chainId,
      getConnectedSigner,
      name,
      provider,
      usdRes,
      userTxDefaults,
    ]
  );
  return { setNomSetting, loading };
};
