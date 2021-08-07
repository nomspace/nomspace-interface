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
import { DEFAULT_GAS_PRICE, NOM } from "src/config";
import { AbiItem } from "web3-utils";
import { toastTx } from "src/utils/toastTx";
import { toast } from "react-toastify";
import { isAddress } from "ethers/lib/utils";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export const SearchDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const { address, getConnectedKit, network } = useContractKit();

  const [nom, refetchNom] = useNom(name);
  const [changeResLoading, setChangeResLoading] = React.useState(false);
  const [changeOwnerLoading, setChangeOwnerLoading] = React.useState(false);
  const [reserveLoading, setReserveLoading] = React.useState(false);
  if (nom == null) {
    return <Spinner />;
  }
  const isOwner = address && nom.owner.toLowerCase() === address.toLowerCase();

  return (
    <Card py={4} px={3}>
      <Heading as="h2" mb={4}>
        {name}.nom
      </Heading>
      <BlockText variant="primary">Resolution</BlockText>
      <BlockText mb={2}>{shortenAddress(nom.resolution, 5)}</BlockText>
      {changeResLoading ? (
        <Spinner />
      ) : (
        <Button
          onClick={async () => {
            const kit = await getConnectedKit();
            // kit is connected to a wallet
            const nom = new kit.web3.eth.Contract(
              NomMetadata.abi as AbiItem[],
              NOM[network.chainId]
            ) as unknown as Nom;
            const nextResolution = prompt("Enter new owner address");
            if (!nextResolution || !isAddress(nextResolution)) {
              alert("Invalid address. Please try again.");
              return;
            }

            try {
              setChangeResLoading(true);
              const tx = await nom.methods
                .changeResolution(
                  ethers.utils.formatBytes32String(name),
                  nextResolution
                )
                .send({
                  from: kit.defaultAccount,
                  gasPrice: DEFAULT_GAS_PRICE,
                  gas: 2e7,
                });
              toastTx(tx.transactionHash);
              refetchNom();
            } catch (e) {
              toast(e.message);
            } finally {
              setChangeResLoading(false);
            }
          }}
          mb={4}
          disabled={!isOwner}
        >
          Change
        </Button>
      )}
      <BlockText variant="primary">Owner</BlockText>
      <BlockText mb={2}>{shortenAddress(nom.owner, 5)}</BlockText>
      {changeOwnerLoading ? (
        <Spinner />
      ) : (
        <Button
          onClick={async () => {
            const kit = await getConnectedKit();
            // kit is connected to a wallet
            const nom = new kit.web3.eth.Contract(
              NomMetadata.abi as AbiItem[],
              NOM[network.chainId]
            ) as unknown as Nom;
            const nextOwner = prompt("Enter new owner address");
            if (!nextOwner || !isAddress(nextOwner)) {
              alert("Invalid address. Please try again.");
              return;
            }

            try {
              setChangeOwnerLoading(true);
              const tx = await nom.methods
                .changeNameOwner(
                  ethers.utils.formatBytes32String(name),
                  nextOwner
                )
                .send({
                  from: kit.defaultAccount,
                  gasPrice: DEFAULT_GAS_PRICE,
                  gas: 2e7,
                });
              toastTx(tx.transactionHash);
              refetchNom();
            } catch (e) {
              toast(e.message);
            } finally {
              setChangeOwnerLoading(false);
            }
          }}
          mb={4}
          disabled={!isOwner}
        >
          Transfer
        </Button>
      )}
      <BlockText variant="primary">Expiration</BlockText>
      <BlockText>
        {new Date(parseInt(nom.expiration) * 1000).toLocaleDateString("en-US")}
      </BlockText>
      <Flex sx={{ justifyContent: "center", mt: 6 }}>
        {nom.owner === ZERO_ADDRESS ? (
          reserveLoading ? (
            <Spinner />
          ) : (
            <Button
              onClick={async () => {
                const kit = await getConnectedKit();
                // kit is connected to a wallet
                const nom = new kit.web3.eth.Contract(
                  NomMetadata.abi as AbiItem[],
                  NOM[network.chainId]
                ) as unknown as Nom;

                try {
                  setReserveLoading(true);
                  const tx = await nom.methods
                    .reserve(ethers.utils.formatBytes32String(name), 600)
                    .send({
                      from: kit.defaultAccount,
                      gasPrice: DEFAULT_GAS_PRICE,
                      gas: 2e7,
                    });
                  toastTx(tx.transactionHash);
                  refetchNom();
                } catch (e) {
                  toast(e.message);
                } finally {
                  setReserveLoading(false);
                }
              }}
            >
              Reserve
            </Button>
          )
        ) : (
          <BlockText>Name has already been reserved.</BlockText>
        )}
      </Flex>
    </Card>
  );
};
