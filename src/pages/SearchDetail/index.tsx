import { useContractKit } from "@celo-tools/use-contractkit";
import React from "react";
import { useParams } from "react-router-dom";
import { Box } from "theme-ui";
import NOM from "src/abis/nomspace/Nom.json";
import { AbiItem, hexToBytes } from "web3-utils";
import { Nom } from "src/generated/Nom";
import { ethers } from "ethers";

export const SearchDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const { kit } = useContractKit();

  const nom = new kit.web3.eth.Contract(
    NOM.abi as AbiItem[],
    "0xABf8faBbC071F320F222A526A2e1fBE26429344d"
  ) as unknown as Nom;

  React.useEffect(() => {
    nom.methods
      .resolve(ethers.utils.formatBytes32String(name))
      .call()
      .then((resolution: string) => console.log("Resolution: ", resolution));

    nom.methods
      .nameOwner(ethers.utils.formatBytes32String(name))
      .call()
      .then((owner: string) => console.log("Owner: ", owner));
  }, []);

  return <Box>Search {name}</Box>;
};
