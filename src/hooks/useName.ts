import { useParams } from "react-router-dom";
import { normalize, hash } from "eth-ens-namehash";

export const useName = (): {
  name: string | undefined;
  namehash: string | undefined;
} => {
  const { name } = useParams<{ name: string }>();
  try {
    return { name: normalize(name), namehash: hash(`${name}.nom`) };
  } catch (e) {
    console.warn(e);
  }
  return { name: undefined, namehash: undefined };
};
