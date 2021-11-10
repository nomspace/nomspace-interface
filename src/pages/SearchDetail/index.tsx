import React from "react";
import { useNom } from "src/hooks/useNom";
import { useContractKit } from "@celo-tools/use-contractkit";
import { useParams, useHistory } from "react-router-dom";
import { Box, Button, Card, Divider, Flex, Heading, Spinner } from "theme-ui";
import { ethers } from "ethers";
import { BlockText } from "src/components/BlockText";
import { shortenAddress } from "src/utils/address";
import NomMetadata from "src/abis/nomspace/Nom.json";
import ERC20Metadata from "src/abis/nomspace/ERC20.json";
import { Nom } from "src/generated/Nom";
import { DEFAULT_GAS_PRICE, NOM } from "src/config";
import { AbiItem, toWei } from "web3-utils";
import { toastTx } from "src/utils/toastTx";
import { toast } from "react-toastify";
import { isAddress } from "ethers/lib/utils";
import { QRNameModal } from "src/components/QRNameModal";
import { SearchBar } from "src/components/SearchBar";
import { ZERO_ADDRESS } from "src/constants";
import { formatName } from "src/utils/name";
import QRCode from "qrcode.react";
import { BlockscoutAddressLink } from "src/components/BlockscoutAddressLink";
import { ERC20 } from "src/generated/ERC20";

export const SearchDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const nameFormatted = formatName(name);

  const { address, getConnectedKit, network } = useContractKit();
  const [nom, refetchNom] = useNom(nameFormatted);
  const [changeResLoading, setChangeResLoading] = React.useState(false);
  const [changeOwnerLoading, setChangeOwnerLoading] = React.useState(false);
  const [showQR, setShowQR] = React.useState(false);
  const history = useHistory();
  const sendCUSD = React.useCallback(
    async (amount: string) => {
      const kit = await getConnectedKit();
      if (!kit || !nom) {
        return;
      }
      const cUSD = new kit.web3.eth.Contract(
        ERC20Metadata.abi as AbiItem[],
        "0x765DE816845861e75A25fCA122bb6898B8B1282a"
      ) as unknown as ERC20;
      const tx = await cUSD.methods
        .transfer(nom.resolution, toWei(amount))
        .send({ from: kit.defaultAccount, gasPrice: toWei("0.5", "gwei") });
      toastTx(tx.transactionHash);
    },
    [getConnectedKit, nom]
  );

  if (nom == null) {
    return <Spinner />;
  }
  const isOwner = address && nom.owner.toLowerCase() === address.toLowerCase();

  return (
    <Flex
      sx={{
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: "800px" }} mb={4}>
        <SearchBar size="small" />
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Card sx={{ width: "100%", maxWidth: "800px" }} py={4} px={3}>
          <Heading as="h2" mb={4}>
            {name}.nom
          </Heading>
          <Flex sx={{ alignItems: "center", flexDirection: "column", mb: 2 }}>
            <QRCode value={`celo://wallet/pay?address=${address}`} />
            <Flex sx={{ alignItems: "center" }}>
              <BlockscoutAddressLink address={nom.resolution}>
                <BlockText mt={2}>
                  {shortenAddress(nom.resolution, 5)}
                </BlockText>
              </BlockscoutAddressLink>
              {changeResLoading ? (
                <Spinner />
              ) : (
                <Button
                  sx={{ p: 1, fontSize: 1, ml: 2, mt: 2 }}
                  onClick={async () => {
                    const kit = await getConnectedKit();
                    // kit is connected to a wallet
                    const nom = new kit.web3.eth.Contract(
                      NomMetadata.abi as AbiItem[],
                      NOM[network.chainId]
                    ) as unknown as Nom;
                    const nextResolution = prompt(
                      "Enter new resolution address"
                    );
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
                    } catch (e: any) {
                      toast(e.message);
                    } finally {
                      setChangeResLoading(false);
                    }
                  }}
                  disabled={!isOwner}
                >
                  Change
                </Button>
              )}
            </Flex>
          </Flex>
          {nom.owner !== ZERO_ADDRESS && isOwner && (
            <>
              <Divider />
              <BlockText variant="primary">Owner</BlockText>
              <Flex
                sx={{ alignItems: "center", justifyContent: "center", mb: 2 }}
              >
                <BlockText>{shortenAddress(nom.owner, 5)}</BlockText>
                {changeOwnerLoading ? (
                  <Spinner />
                ) : (
                  <Button
                    sx={{ p: 1, fontSize: 1, ml: 2 }}
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
                    disabled={!isOwner}
                  >
                    Transfer
                  </Button>
                )}
              </Flex>
            </>
          )}
          {nom.owner !== ZERO_ADDRESS && isOwner && (
            <>
              <BlockText variant="primary">Expiration</BlockText>
              <Flex
                sx={{ alignItems: "center", justifyContent: "center", mb: 2 }}
              >
                <BlockText>
                  {new Date(parseInt(nom.expiration) * 1000).toLocaleDateString(
                    "en-US"
                  )}
                </BlockText>
                <Button
                  sx={{ p: 1, fontSize: 1, ml: 2 }}
                  onClick={() => {
                    history.push(`/search/${name}/extend`);
                  }}
                >
                  Extend
                </Button>
              </Flex>
              <Divider />
            </>
          )}
          <br />
          {nom.resolution !== ZERO_ADDRESS && (
            <Flex sx={{ mt: 1, justifyContent: "center", flexWrap: "wrap" }}>
              <Button
                mr={2}
                mb={1}
                onClick={async () => {
                  await sendCUSD("1");
                }}
              >
                Tip 1 cUSD
              </Button>
              <Button
                mr={2}
                mb={1}
                onClick={async () => {
                  await sendCUSD("5");
                }}
              >
                Tip 5 cUSD
              </Button>
              <Button
                mr={2}
                mb={1}
                onClick={async () => {
                  await sendCUSD("10");
                }}
              >
                Tip 10 cUSD
              </Button>
              <Button
                mr={2}
                mb={1}
                onClick={async () => {
                  const amount = prompt("Enter a custom tip amount");
                  if (
                    amount === null ||
                    isNaN(Number(amount)) ||
                    Number(amount) <= 0
                  ) {
                    alert("Invalid amount specified");
                    return;
                  }
                  await sendCUSD(amount);
                }}
              >
                Custom tip
              </Button>
            </Flex>
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
            ) : nom.owner === address ? (
              <BlockText>You own this name!</BlockText>
            ) : (
              <BlockText>
                Name has already been reserved by{" "}
                <BlockscoutAddressLink address={nom.owner}>
                  {shortenAddress(nom.owner)}
                </BlockscoutAddressLink>
              </BlockText>
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
      </Box>
    </Flex>
  );
};
