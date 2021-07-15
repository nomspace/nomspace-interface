import { useContractKit } from "@celo-tools/use-contractkit";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button } from "theme-ui";
import NOM from "src/abis/nomspace/Nom.json";
import { AbiItem, toWei } from "web3-utils";
import { Nom } from "src/generated/Nom";
import { ethers } from "ethers";

export const SearchDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const { kit, performActions, network } = useContractKit();

  console.log("network", network);

  const AlfajoresAddress = "0x36C976Da6A6499Cad683064F849afa69CD4dec2e";
  const MainnetAddress = "0xABf8faBbC071F320F222A526A2e1fBE26429344d";

  const [resolution, setResolution] = useState("");
  const [owner, setOwner] = useState("");
  const [expiration, setExpiration] = useState("");

  const nom = new kit.web3.eth.Contract(
    NOM.abi as AbiItem[],
    AlfajoresAddress
  ) as unknown as Nom;

  React.useEffect(() => {
    nom.methods
      .resolve(ethers.utils.formatBytes32String(name))
      .call()
      .then((resolution: string) => {
        console.log("Resolution: ", resolution);
        setResolution(resolution);
      });

    // TODO: nom.getPastEvents() <--- find all names the user owns.

    nom.methods
      .nameOwner(ethers.utils.formatBytes32String(name))
      .call()
      .then((owner: string) => {
        console.log("Owner: ", owner);
        setOwner(owner);
        const reserved = parseInt(owner, 16) !== 0;
        console.log("Reserved: ", reserved);
      });

    nom.methods
      .expirations(ethers.utils.formatBytes32String(name))
      .call()
      .then((expiration: string) => {
        console.log("Expiration: ", expiration);
        setExpiration(expiration);
      });
  }, [name, nom.methods]);

  return (
    <div>
      <Box>Search {name}</Box>
      <Box>Resolution: {resolution}</Box>
      <Box>Owner: {owner}</Box>
      <Box>Can be reserved: {parseInt(owner, 16) === 0 ? "True" : "False"}</Box>
      <Box>
        Expiration:{" "}
        {new Date(parseInt(expiration) * 1000).toLocaleDateString("en-US")}
      </Box>
      <Button
        onClick={() => {
          performActions((kit) => {
            // kit is connected to a wallet
            const nom = new kit.web3.eth.Contract(
              NOM.abi as AbiItem[],
              AlfajoresAddress
            ) as unknown as Nom;

            nom.methods
              .reserve(ethers.utils.formatBytes32String(name), 600)
              .send({ from: kit.defaultAccount, gas: 210000 })
              .then((txn) => {
                console.log("Transaction: ", txn);
              });
          });
        }}
      >
        Reserve
      </Button>
    </div>
  );
};
