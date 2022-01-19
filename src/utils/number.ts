import { BigNumberish } from "@ethersproject/bignumber";
import { formatUnits, parseUnits } from "ethers/lib/utils";

export const shiftDecimals = (
  num: BigNumberish,
  leftShift: number,
  rightShift: number
) => {
  const left = Number(formatUnits(num.toString(), leftShift)).toFixed(
    rightShift
  );
  return parseUnits(left, rightShift);
};
