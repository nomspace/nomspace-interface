import React from "react";
import { useNom } from "src/hooks/useNom";
import { useContractKit } from "@celo-tools/use-contractkit";
import { useParams } from "react-router-dom";
import { Button, Card, Flex, Heading, Spinner } from "theme-ui";
import { ethers } from "ethers";
import { BlockText } from "src/components/BlockText";
import { shortenAddress } from "src/utils/address";
import NomMetadata from "src/abis/nomspace/Nom.json";
import { Nom } from "src/generated/Nom";
import { NOM } from "src/config";
import { AbiItem } from "web3-utils";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export const SearchDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const { performActions, network } = useContractKit();

  const [nom] = useNom(name);
  if (nom == null) {
    return <Spinner />;
  }

  return (
    <Card py={4} px={3}>
      <Heading as="h2">{name}.nom</Heading>
      <BlockText variant="primary">Resolution</BlockText>
      <BlockText mb={2}>{shortenAddress(nom.resolution, 5)}</BlockText>
      <Button mb={4}>Change</Button>
      <BlockText variant="primary">Owner</BlockText>
      <BlockText mb={2}>{shortenAddress(nom.owner, 5)}</BlockText>
      <Button mb={4}>Transfer</Button>
      <BlockText variant="primary">Expiration</BlockText>
      <BlockText>
        {new Date(parseInt(nom.expiration) * 1000).toLocaleDateString("en-US")}
      </BlockText>
      <Flex sx={{ justifyContent: "center", mt: 6 }}>
        {nom.owner === ZERO_ADDRESS ? (
          <Button
            onClick={() => {
              performActions((kit) => {
                // kit is connected to a wallet
                const nom = new kit.web3.eth.Contract(
                  NomMetadata.abi as AbiItem[],
                  NOM[network.chainId]
                ) as unknown as Nom;

                nom.methods
                  .reserve(ethers.utils.formatBytes32String(name), 600)
                  .send({ from: kit.defaultAccount, gas: 210000 })
                  .then((txn) => {
                    console.log("Transaction: ", txn);
                  })
                  .catch((e) => {
                    console.log("Error when reserving: ", e);
                  });
              });
            }}
          >
            Reserve
          </Button>
        ) : (
          <BlockText>Name has already been reserved.</BlockText>
        )}
      </Flex>
    </Card>
  );
};
