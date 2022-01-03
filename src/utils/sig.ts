import { BigNumberish } from "ethers";
import { JsonRpcSigner } from "@ethersproject/providers";

export const getSignature = async (
  signer: JsonRpcSigner,
  from: string,
  to: string,
  value: BigNumberish,
  gas: BigNumberish,
  nonce: BigNumberish,
  data: string,
  chainId: BigNumberish,
  verifyingContract: string
) => {
  const domain = {
    name: "OwnableMinimalForwarder",
    version: "0.0.1",
    chainId,
    verifyingContract,
  };
  const types = {
    ForwardRequest: [
      { name: "from", type: "address" },
      { name: "to", type: "address" },
      { name: "value", type: "uint256" },
      { name: "gas", type: "uint256" },
      { name: "nonce", type: "uint256" },
      { name: "data", type: "bytes" },
    ],
  };
  const values = {
    from,
    to,
    value,
    gas,
    nonce,
    data,
  };
  console.log(values);
  return await signer._signTypedData(domain, types, values);
};
