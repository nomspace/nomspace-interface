import React from "react";
import { useNom } from "src/hooks/useNom";
import { useContractKit } from "@celo-tools/use-contractkit";
import { useParams, useHistory } from "react-router-dom";
import { Box, Button, Card, Flex, Heading, Spinner } from "theme-ui";
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
import { QrCode } from "phosphor-react";
import { QRNameModal } from "src/components/QRNameModal";
import { SearchBar } from "src/components/SearchBar";
import { ZERO_ADDRESS } from "src/constants";
import { formatName } from "src/utils/name";

export const SearchDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const nameFormatted = formatName(name);

  const { address, getConnectedKit, network } = useContractKit();
  const [nom, refetchNom] = useNom(nameFormatted);
  const [changeResLoading, setChangeResLoading] = React.useState(false);
  const [changeOwnerLoading, setChangeOwnerLoading] = React.useState(false);
  const [showQR, setShowQR] = React.useState(false);
  const history = useHistory();

  if (nom == null) {
    return <Spinner />;
  }
  const isOwner = address && nom.owner.toLowerCase() === address.toLowerCase();

  return (
    <Flex sx={{ alignItems: "center", flexDirection: "column" }}>
      <Box sx={{ width: "100%", maxWidth: "800px" }} mb={4}>
        <SearchBar size="small" />
      </Box>
      <Card sx={{ width: "100%", maxWidth: "800px" }} py={4} px={3}>
        <Flex mb={4}>
          <Heading as="h2" mr={2}>
            {name}.nom
          </Heading>
          {nom.resolution !== ZERO_ADDRESS && (
            <Box sx={{ cursor: "pointer" }} onClick={() => setShowQR(true)}>
              <QrCode size={32} />
            </Box>
          )}
        </Flex>
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
                    ethers.utils.formatBytes32String(nameFormatted),
                    nextResolution
                  )
                  .send({
                    from: kit.defaultAccount,
                    gasPrice: DEFAULT_GAS_PRICE,
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
                    ethers.utils.formatBytes32String(nameFormatted),
                    nextOwner
                  )
                  .send({
                    from: kit.defaultAccount,
                    gasPrice: DEFAULT_GAS_PRICE,
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
        <BlockText mb={2}>
          {new Date(parseInt(nom.expiration) * 1000).toLocaleDateString(
            "en-US"
          )}
        </BlockText>
        {nom.owner !== ZERO_ADDRESS && isOwner && (
          <Button
            onClick={() => {
              history.push(`/search/${name}/extend`);
            }}
          >
            Extend
          </Button>
        )}
        <Flex sx={{ justifyContent: "center", mt: 6 }}>
          {nom.owner === ZERO_ADDRESS ? (
            <Button
              onClick={() => {
                history.push(`/search/${name}/reserve`);
              }}
            >
              Reserve
            </Button>
          ) : (
            <BlockText>Name has already been reserved.</BlockText>
          )}
        </Flex>
      </Card>
      {nom.resolution && nom.resolution !== ZERO_ADDRESS && (
        <QRNameModal
          name={name}
          address={nom.resolution}
          isOpen={showQR}
          setIsOpen={setShowQR}
        />
      )}
    </Flex>
  );
};
