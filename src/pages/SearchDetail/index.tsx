import { useContractKit } from "@celo-tools/use-contractkit";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "theme-ui";
import NOM from "src/abis/nomspace/Nom.json";
import { AbiItem } from "web3-utils";
import { Nom } from "src/generated/Nom";
import { ethers } from "ethers";

export const SearchDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const { kit } = useContractKit();

  const [resolution, setResolution] = useState("");
  const [owner, setOwner] = useState("");

  const nom = new kit.web3.eth.Contract(
    NOM.abi as AbiItem[],
    "0xABf8faBbC071F320F222A526A2e1fBE26429344d"
  ) as unknown as Nom;

  React.useEffect(() => {
    nom.methods
      .resolve(ethers.utils.formatBytes32String(name))
      .call()
      .then((resolution: string) => {
        console.log("Resolution: ", resolution);
        setResolution(resolution);
      });

    nom.methods
      .nameOwner(ethers.utils.formatBytes32String(name))
      .call()
      .then((owner: string) => {
        console.log("Owner: ", owner);
        setOwner(owner);
        const reserved = parseInt(owner, 16) !== 0;
        console.log("Reserved: ", reserved);
      });
  }, [name, nom.methods]);

  return (
    <div>
      <Box>Search {name}</Box>
      <Box>Resolution: {resolution}</Box>
      <Box>Owner: {owner}</Box>
      <Box>Can be reserved: {parseInt(owner, 16) === 0 ? "True" : "False"}</Box>
    </div>
  );
};
