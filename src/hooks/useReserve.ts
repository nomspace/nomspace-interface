import { useCallback, useState } from "react";
import {
  useContractKit,
  useGetConnectedSigner,
  useProvider,
} from "@celo-tools/use-contractkit";
import { MaxUint256 } from "@ethersproject/constants";
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
import { formatUnits } from "ethers/lib/utils";
import { YEAR_IN_SECONDS } from "utils/constants";
import ENS from "@ensdomains/ensjs";
import { useCeloProvider } from "./useCeloProvider";
import { useCeloChainId } from "./useCeloChainId";
import { useUserTxDefaults } from "hooks/useUserTxDefaults";
import { getSignature } from "utils/sig";
import { UserNonce } from "./useUserNonce";

export const useReserve = (name?: string) => {
  const { address, network } = useContractKit();
  const { chainId } = network;
  const provider = useProvider();
  const celoProvider = useCeloProvider();
  const celoChainId = useCeloChainId();
  const [loading, setLoading] = useState(false);
  const getConnectedSigner = useGetConnectedSigner();
  const [userTxDefaults] = useUserTxDefaults();
  const [nonce, setNonce] = UserNonce.useContainer();

  const approve = useCallback(async () => {
    const reservePortalAddress = RESERVE_PORTAL[chainId];
    const usdAddress = USD[chainId];
    if (!reservePortalAddress || !usdAddress) {
      return;
    }
    const signer = await getConnectedSigner();
    try {
      setLoading(true);
      const usd = ERC20__factory.connect(usdAddress, signer);
      const gasPrice = await provider.getGasPrice();
      const tx = await usd.approve(
        reservePortalAddress,
        MaxUint256.toString(), // TODO: don't do max
        { gasPrice }
      );
      await tx.wait(2);
      toastTx(tx.hash);
    } catch (e: any) {
      toast(e.message);
    } finally {
      setLoading(false);
    }
  }, [getConnectedSigner, chainId, provider]);

  const reserve = useCallback(
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
        !userTxDefaults
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
        const cost = await nomRegistrarController.rentPrice(
          name,
          duration,
          address
        );
        const tx = await reservePortal.escrow(
          usdAddress,
          cost.shr(18).shl(await usd.decimals()),
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
  return { approve, reserve, loading };
};
