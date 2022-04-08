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
import { toastTx, toastError } from "utils/toastTx";
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
import { UserNonce } from "./useUserNonce";
import { shiftDecimals } from "utils/number";

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
  const [nonce, setNonce] = UserNonce.useContainer();

  const setNomSetting = useCallback(
    async (functionFragments: any[], values: any[]) => {
      const usdAddress = USD[chainId];
      const ensAddress = ENS_ADDR[celoChainId];
      const reservePortalAddress = RESERVE_PORTAL[chainId];
      const forwarderAddr = FORWARDER_ADDR[celoChainId];
      const ens: ENSJS = new ENS({
        provider: celoProvider,
        ensAddress,
      });
      if (
        nonce == null ||
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
        if (chainId === celoChainId) {
          for (let i = 0; i < functionFragments.length; i++) {
            const tx = await (resolver as any)
              .connect(signer)
              [functionFragments[i]](...values[i]);
            toastTx(tx);
          }
        } else {
          const currencies = [];
          const amounts = [];
          const chainIds = [];
          const requests = [];
          const signatures = [];
          for (let i = 0; i < functionFragments.length; i++) {
            const data = resolver.interface.encodeFunctionData(
              functionFragments[i],
              values[i]
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
              nonce + i,
              data,
              chainId,
              forwarderAddr
            );
            const decimals = await usd.decimals();
            const cost = shiftDecimals(
              BigNumber.from(GAS_USD * 1000),
              decimals,
              3
            );
            currencies.push(usdAddress);
            amounts.push(cost);
            chainIds.push(celoChainId);
            requests.push({
              from,
              to,
              gas,
              value,
              nonce: nonce + i,
              chainId,
              data,
            });
            signatures.push(signature);
          }
          const totalCost = amounts.reduce(
            (acc, curr) => acc.add(curr),
            BigNumber.from(0)
          );
          const allowance = await usd.allowance(address, reservePortalAddress);
          if (totalCost.gt(allowance)) {
            await approve(MaxUint256, reservePortalAddress, usdAddress);
          }
          const gasPrice = await provider.getGasPrice();
          const tx = await reservePortal.batchEscrow(
            currencies,
            amounts,
            chainIds,
            requests,
            signatures,
            { gasPrice }
          );
          setNonce(nonce + functionFragments.length);
          toastTx(tx.hash);
        }
      } catch (e: any) {
        toastError(e);
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
      nonce,
      provider,
      setNonce,
      usdRes,
      userTxDefaults,
    ]
  );
  return { setNomSetting, loading };
};
