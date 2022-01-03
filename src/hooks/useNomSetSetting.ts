import { useCallback, useState } from "react";
import {
  useContractKit,
  useGetConnectedSigner,
  useProvider,
} from "@celo-tools/use-contractkit";
import { USD, RESERVE_PORTAL, NOM_REG_ADDR } from "config";
import {
  OperatorOwnedNomV2__factory,
  ReservePortal,
  ReservePortal__factory,
} from "generated";
import { toastTx } from "utils/toastTx";
import { toast } from "react-toastify";
import { useCeloChainId } from "./useCeloChainId";
import { normalize } from "eth-ens-namehash";

export const useNomSetSetting = (name: string) => {
  const { address, network } = useContractKit();
  const provider = useProvider();
  const celoChainId = useCeloChainId();
  const [loading, setLoading] = useState(false);
  const getConnectedSigner = useGetConnectedSigner();
  name = normalize(name);

  const setNomSetting = useCallback(
    async (functionFragment: any, values: any) => {
      // const usdAddress = USD[network.chainId];
      // const nomAddress = NOM_REG_ADDR[celoChainId];
      // const reservePortalAddress = RESERVE_PORTAL[network.chainId];
      // if (!usdAddress || !nomAddress || !reservePortalAddress || !address) {
      //   return;
      // }
      // const signer = await getConnectedSigner();
      // const nom = OperatorOwnedNomV2__factory.createInterface();
      // const reservePortal = ReservePortal__factory.connect(
      //   reservePortalAddress,
      //   signer
      // ) as unknown as ReservePortal;
      // try {
      //   setLoading(true);
      //   console.log(functionFragment, values);
      //   const data = nom.encodeFunctionData(functionFragment, values);
      //   if (!data) return;
      //   const gasPrice = await provider.getGasPrice();
      //   const tx = await reservePortal.escrow(
      //     usdAddress,
      //     0,
      //     celoChainId,
      //     nomAddress,
      //     0,
      //     data,
      //     {
      //       gasPrice,
      //     }
      //   );
      //   toastTx(tx.hash);
      // } catch (e: any) {
      //   toast(e.message);
      //   console.error(e);
      // } finally {
      //   setLoading(false);
      // }
    },
    [address, celoChainId, getConnectedSigner, network.chainId, provider]
  );
  return { setNomSetting, loading };
};
