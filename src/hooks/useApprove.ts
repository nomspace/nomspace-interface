import { useCallback, useState } from "react";
import {
  useContractKit,
  useGetConnectedSigner,
  useProvider,
} from "@celo-tools/use-contractkit";
import { ERC20__factory } from "generated";
import { toastTx } from "utils/toastTx";
import { toast } from "react-toastify";
import { BigNumberish } from "ethers";

export const useApprove = () => {
  const { network } = useContractKit();
  const { chainId } = network;
  const provider = useProvider();
  const [loading, setLoading] = useState(false);
  const getConnectedSigner = useGetConnectedSigner();

  const approve = useCallback(
    async (amount: BigNumberish, spender: string, address: string) => {
      const signer = await getConnectedSigner();
      try {
        setLoading(true);
        const usd = ERC20__factory.connect(address, signer);
        const gasPrice = await provider.getGasPrice();
        const tx = await usd.approve(spender, amount, {
          gasPrice,
        });
        await tx.wait(1);
        toastTx(tx.hash);
      } catch (e: any) {
        toast(e.message);
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getConnectedSigner, chainId, provider]
  );

  return { approve, loading };
};
