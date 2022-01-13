import { BytesLike } from "ethers";
import { Multicall } from "generated";

const BUCKET_SIZE = 500;

export const multicallBatch = async (
  multicall: Multicall,
  calls: { target: string; callData: BytesLike }[]
): Promise<string[]> => {
  const results = [];
  let i = 0;
  while (i < calls.length) {
    results.push(
      ...(await multicall.callStatic
        .aggregate(calls.slice(i, i + BUCKET_SIZE))
        .then((r) => r.returnData))
    );
    i += BUCKET_SIZE;
  }
  return results;
};
