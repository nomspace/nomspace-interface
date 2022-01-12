import { useCallback, useState } from "react";
import {
  useContractKit,
  useGetConnectedSigner,
  useProvider,
} from "@celo-tools/use-contractkit";
import {
  USD,
  RESERVE_PORTAL,
  ENS_ADDR,
  NOM_REG_ADDR,
  FORWARDER_ADDR,
} from "addresses";
import {
  ERC20__factory,
  NomRegistrarController__factory,
  ReservePortal,
  ReservePortal__factory,
} from "generated";
import { toastTx } from "utils/toastTx";
import { toast } from "react-toastify";
import { YEAR_IN_SECONDS } from "utils/constants";
import ENS from "@ensdomains/ensjs";
import { useCeloProvider } from "./useCeloProvider";
import { useCeloChainId } from "./useCeloChainId";
import { useUserTxDefaults } from "hooks/useUserTxDefaults";
import { getSignature } from "utils/sig";
import { UserNonce } from "./useUserNonce";
import { useUSD } from "./useUSD";
import { useApprove } from "./useApprove";
import { MaxUint256 } from "@ethersproject/constants";

export const useReserve = (name?: string) => {
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

  const reserve = useCallback(
    async (years: number) => {
      if (!address) await connect();
      const usdAddress = USD[network.chainId];
      const regAddress = NOM_REG_ADDR[celoChainId];
      const reservePortalAddress = RESERVE_PORTAL[network.chainId];
      const forwarderAddr = FORWARDER_ADDR[celoChainId];
      if (
        !name ||
        !usdAddress ||
        !reservePortalAddress ||
        !address ||
        !regAddress ||
        !forwarderAddr ||
        !userTxDefaults ||
        !usdRes
      ) {
        return;
      }
      const signer = await getConnectedSigner();
      const usd = ERC20__factory.connect(usdAddress, signer);
      const nomRegistrarController = NomRegistrarController__factory.connect(
        regAddress,
        celoProvider
      );
      const reservePortal = ReservePortal__factory.connect(
        reservePortalAddress,
        signer
      ) as unknown as ReservePortal;
      const ens = new ENS({
        provider: celoProvider,
        ensAddress: ENS_ADDR[celoChainId],
      });
      const resolver = await ens.name("resolver").getAddress();
      try {
        setLoading(true);
        const duration = Math.ceil(Number(years) * YEAR_IN_SECONDS);
        const data = nomRegistrarController.interface.encodeFunctionData(
          "registerWithConfig",
          [name, address, duration, resolver, address]
        );
        if (!data || nonce == null) return;
        const { from, gas, value } = userTxDefaults;
        const to = nomRegistrarController.address;
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
        const cost = (
          await nomRegistrarController.rentPrice(name, duration, address)
        )
          .shr(18)
          .shl(decimals);
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
      approve,
      celoChainId,
      celoProvider,
      chainId,
      getConnectedSigner,
      name,
      network.chainId,
      nonce,
      provider,
      setNonce,
      usdRes,
      userTxDefaults,
    ]
  );

  const extend = useCallback(
    async (years: number) => {
      const usdAddress = USD[network.chainId];
      const regAddress = NOM_REG_ADDR[celoChainId];
      const reservePortalAddress = RESERVE_PORTAL[network.chainId];
      const forwarderAddr = FORWARDER_ADDR[celoChainId];
      if (
        !name ||
        !usdAddress ||
        !reservePortalAddress ||
        !address ||
        !regAddress ||
        !forwarderAddr ||
        !userTxDefaults ||
        !usdRes
      ) {
        return;
      }
      const signer = await getConnectedSigner();
      const usd = ERC20__factory.connect(usdAddress, signer);
      const nomRegistrarController = NomRegistrarController__factory.connect(
        regAddress,
        celoProvider
      );
      const reservePortal = ReservePortal__factory.connect(
        reservePortalAddress,
        signer
      ) as unknown as ReservePortal;
      try {
        setLoading(true);
        const duration = Math.ceil(Number(years) * YEAR_IN_SECONDS);
        const data = nomRegistrarController.interface.encodeFunctionData(
          "renew",
          [name, duration]
        );
        if (!data || nonce == null) return;
        const { from, gas, value } = userTxDefaults;
        const to = nomRegistrarController.address;
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
        const cost = (
          await nomRegistrarController.rentPrice(name, duration, address)
        )
          .shr(18)
          .shl(decimals);
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
      approve,
      celoChainId,
      celoProvider,
      chainId,
      getConnectedSigner,
      name,
      network.chainId,
      nonce,
      provider,
      setNonce,
      usdRes,
      userTxDefaults,
    ]
  );
  return { reserve, extend, loading };
};
