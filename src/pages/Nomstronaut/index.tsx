import React from "react";
import { useNom } from "src/hooks/useNom";
import { useContractKit } from "@celo-tools/use-contractkit";
import { useHistory } from "react-router-dom";
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
import { normalize } from "eth-ens-namehash";
import styled from "@emotion/styled";
import gif from "src/images/gif.gif";

export const StyledImg = styled.img`
  width: 200px;
  height: 200px;
  @media only screen and (min-width: 767px) {
    width: 350px;
    height: 350px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const Nomstronaut: React.FC = () => {
  const name = 'this';
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

  let isNormal = false;
  try {
    isNormal = !!normalize(name);
  } catch (e) {}

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
      <Box sx={{ textAlign: "center" }}>
        <Card sx={{ width: "100%", maxWidth: "800px" }} py={4} px={3}>
          <Heading as="h2" mb={4}>
            Nomstronaut NFT
          </Heading>
          <Flex sx={{ alignItems: "center", flexDirection: "column", mb: 2 }}>
            <StyledImg alt={"CeloPunk"} src={gif} />
            {/* <QRCode value={`celo://wallet/pay?address=${address}`} /> */}
            <Flex sx={{ alignItems: "center" }}>
              <BlockText mt={5}>
                Total minted: 343/6000
              </BlockText>
              {/* {changeResLoading ? (
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
              )} */}
            </Flex>
          </Flex>
          {/* {nom.owner !== ZERO_ADDRESS && isOwner && (
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
          <br /> */}
          {
            <Flex sx={{ mt: 3, justifyContent: "center", flexWrap: "wrap" }}>
              <Button
                mr={2}
                mb={1}
                onClick={async () => {
                  await sendCUSD("1");
                }}
              >
                Mint 1 Nomstronaut
              </Button>
              <Button
                mr={2}
                mb={1}
                onClick={async () => {
                  await sendCUSD("5");
                }}
              >
                Mint 5 Nomstronauts
              </Button>
              <Button
                mr={2}
                mb={1}
                onClick={async () => {
                  await sendCUSD("10");
                }}
              >
                Mint 10 Nomstronauts
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
                Custom Amount
              </Button>
            </Flex>
          }
          <Flex sx={{ justifyContent: "center", mt: 3 }}>
            {isNormal ? (
              nom.owner === ZERO_ADDRESS ? (
                <Button
                  onClick={() => {
                    history.push(`/${name}/reserve`);
                  }}
                >
                  Reserve
                </Button>
              ) : nom.owner === address ? (
                <BlockText>You own this name!</BlockText>
              ) : (
                <BlockText>
                  Contract Address{" "}
                  <BlockscoutAddressLink address={nom.owner}>
                    {shortenAddress("0x9f46B8290A6D41B28dA037aDE0C3eBe24a5D1160")}
                  </BlockscoutAddressLink>
                </BlockText>
              )
            ) : (
              <BlockText>
                This name is invalid and not available for reservation.
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
