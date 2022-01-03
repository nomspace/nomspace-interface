import { useParams } from "react-router-dom";
import { normalize } from "eth-ens-namehash";

export const useName = () => {
  const { name } = useParams<{ name: string }>();
  try {
    return normalize(name);
  } catch (e) {
    console.warn(e);
  }
  return null;
};
