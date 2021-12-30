import { useCallback, useState } from "react";
import {
  useContractKit,
  useGetConnectedSigner,
  useProvider,
} from "@celo-tools/use-contractkit";
import { MaxUint256 } from "@ethersproject/constants";
import { USD, RESERVE_PORTAL, NOM, ENS_ADDR, NOM_REG_ADDR } from "config";
import {
  ERC20__factory,
  NomRegistrarController__factory,
  OperatorOwnedNomV2__factory,
  ReservePortal,
  ReservePortal__factory,
} from "generated";
import { toastTx } from "utils/toastTx";
import { toast } from "react-toastify";
import { formatUnits } from "ethers/lib/utils";
import { YEAR_IN_SECONDS } from "utils/constants";
import ENS from "@ensdomains/ensjs";
import { useCeloProvider } from "./useCeloProvider";

export const useReserve = (name: string) => {
  const { address, network } = useContractKit();
  const provider = useProvider();
  const celoProvider = useCeloProvider();
  const [loading, setLoading] = useState(false);
  const getConnectedSigner = useGetConnectedSigner();

  const approve = useCallback(async () => {
    const reservePortalAddress = RESERVE_PORTAL[network.chainId];
    const usdAddress = USD[network.chainId];
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
      toastTx(tx.hash);
      //   refetchUSD();
    } catch (e: any) {
      toast(e.message);
    } finally {
      setLoading(false);
    }
  }, [getConnectedSigner, network.chainId, provider]);

  const reserve = useCallback(
    async (years: number) => {
      const usdAddress = USD[network.chainId];
      const nomAddress = NOM[network.chainId];
      const regAddress = NOM_REG_ADDR[network.chainId];
      const reservePortalAddress = RESERVE_PORTAL[network.chainId];
      if (
        !usdAddress ||
        !nomAddress ||
        !reservePortalAddress ||
        !address ||
        !regAddress
      ) {
        return;
      }
      const signer = await getConnectedSigner();
      const usd = ERC20__factory.connect(usdAddress, signer);
      const nom = OperatorOwnedNomV2__factory.createInterface();
      const reservePortal = ReservePortal__factory.connect(
        reservePortalAddress,
        signer
      ) as unknown as ReservePortal;
      const ens = new ENS({
        provider,
        ensAddress: ENS_ADDR[network.chainId],
      });
      const resolver = await ens.name("resolver").getAddress();
      const reg = NomRegistrarController__factory.connect(
        regAddress,
        celoProvider
      );

      try {
        setLoading(true);
        const duration = Math.ceil(Number(years) * YEAR_IN_SECONDS);
        const data = nom.encodeFunctionData("register", [
          name, // TODO format
          address,
          duration,
          resolver,
          address,
        ]);

        if (!data) return;
        const gasPrice = await provider.getGasPrice();
        const cost = await reg.rentPrice(name, duration, address);
        const tx = await reservePortal.escrow(
          usd.address,
          formatUnits(cost, (await usd.decimals()) - 18), // Assume cost is in 18 decimals
          44787, // TODO: Hardcode. Check testnet vs mainnet
          nomAddress,
          0,
          data,
          address,
          {
            gasPrice,
          }
        );
        toastTx(tx.hash);
      } catch (e: any) {
        toast(e.message);
        console.error(e);
      } finally {
        setLoading(false);
      }
    },
    [address, celoProvider, getConnectedSigner, name, network.chainId, provider]
  );
  return { approve, reserve, loading };
};
