import { useCallback, useState } from "react";
import {
  useContractKit,
  useGetConnectedSigner,
  useProvider,
} from "@celo-tools/use-contractkit";
import {
  RESERVE_PORTAL,
  NOM_REG_ADDR,
  FORWARDER_ADDR,
  RESOLVER_ADDR,
  TOKEN_LIST,
} from "addresses";
import {
  ERC20__factory,
  NomRegistrarController__factory,
  ReservePortal,
  ReservePortal__factory,
} from "generated";
import { toastError, toastTx } from "utils/toastTx";
import { YEAR_IN_SECONDS } from "utils/constants";
import { useCeloProvider } from "./useCeloProvider";
import { useCeloChainId } from "./useCeloChainId";
import { useUserTxDefaults } from "hooks/useUserTxDefaults";
import { getSignature } from "utils/sig";
import { UserNonce } from "./useUserNonce";
import { useUSD } from "./useUSD";
import { useApprove } from "./useApprove";
import { MaxUint256 } from "@ethersproject/constants";
import { shiftDecimals } from "utils/number";

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
    async (years: number, tokenName: string) => {
      if (!address) await connect();
      const tokenAddress = TOKEN_LIST[tokenName]?.address;
      const regAddress =
        TOKEN_LIST[tokenName]?.registrar || NOM_REG_ADDR[celoChainId];
      const reservePortalAddress = RESERVE_PORTAL[network.chainId];
      const forwarderAddr = FORWARDER_ADDR[celoChainId];
      const resolverAddress = RESOLVER_ADDR[celoChainId];
      const signer = await getConnectedSigner();
      if (
        !name ||
        !tokenAddress ||
        !reservePortalAddress ||
        !address ||
        !regAddress ||
        !forwarderAddr ||
        !resolverAddress ||
        !userTxDefaults ||
        !usdRes
      ) {
        return;
      }
      const token = ERC20__factory.connect(tokenAddress, signer);
      const nomRegistrarController = NomRegistrarController__factory.connect(
        regAddress,
        celoProvider
      );
      const decimals = await token.decimals();
      const duration = Math.ceil(Number(years) * YEAR_IN_SECONDS);
      const cost = shiftDecimals(
        await nomRegistrarController.rentPrice(name, duration, address),
        18,
        decimals
      );

      try {
        setLoading(true);
        if (chainId === celoChainId) {
          const allowance = await token.allowance(
            address,
            nomRegistrarController.address
          );
          if (cost.gt(allowance)) {
            await approve(
              MaxUint256,
              nomRegistrarController.address,
              tokenAddress
            );
          }
          const tx = await nomRegistrarController
            .connect(signer)
            .registerWithConfig(
              name,
              address,
              duration,
              resolverAddress,
              address
            );
          toastTx(tx.hash);
        } else {
          const allowance = await token.allowance(
            address,
            reservePortalAddress
          );
          if (cost.gt(allowance)) {
            await approve(MaxUint256, reservePortalAddress, tokenAddress);
          }
          const reservePortal = ReservePortal__factory.connect(
            reservePortalAddress,
            signer
          ) as unknown as ReservePortal;
          const data = nomRegistrarController.interface.encodeFunctionData(
            "registerWithConfig",
            [name, address, duration, resolverAddress, address]
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
          const tx = await reservePortal.escrow(
            tokenAddress,
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
          setNonce(nonce + 1);
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
      connect,
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
    async (years: number, tokenName: string) => {
      const usdAddress = TOKEN_LIST[tokenName]?.address;
      const regAddress =
        TOKEN_LIST[tokenName]?.registrar || NOM_REG_ADDR[celoChainId];
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
      const token = ERC20__factory.connect(usdAddress, signer);
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
        const allowance = await token.allowance(
          address,
          nomRegistrarController.address
        );
        if (chainId === celoChainId) {
          const decimals = await token.decimals();
          const cost = shiftDecimals(
            await nomRegistrarController.rentPrice(name, duration, address),
            18,
            decimals
          );

          if (cost.gt(allowance)) {
            await approve(
              MaxUint256,
              nomRegistrarController.address,
              usdAddress
            );
          }
          const tx = await nomRegistrarController
            .connect(signer)
            .renew(name, duration);
          toastTx(tx.hash);
        } else {
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
          const decimals = await token.decimals();
          const cost = shiftDecimals(
            await nomRegistrarController.rentPrice(name, duration, address),
            18,
            decimals
          );
          if (cost.gt(allowance)) {
            await approve(
              MaxUint256,
              nomRegistrarController.address,
              usdAddress
            );
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
          setNonce(nonce + 1);
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
