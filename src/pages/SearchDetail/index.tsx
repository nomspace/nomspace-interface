import React from "react";
import { useNom } from "hooks/useNom";
import {
  useContractKit,
  useGetConnectedSigner,
  useProvider,
} from "@celo-tools/use-contractkit";
import { useParams, useHistory } from "react-router-dom";
import { Box, Button, Card, Divider, Flex, Heading, Spinner } from "theme-ui";
import { ethers } from "ethers";
import { BlockText } from "components/BlockText";
import { shortenAddress } from "utils/address";
import { Nom } from "generated/Nom";
import { NOM, USD } from "config";
import { toastTx } from "utils/toastTx";
import { toast } from "react-toastify";
import { isAddress, parseUnits } from "ethers/lib/utils";
import { QRNameModal } from "components/QRNameModal";
import { SearchBar } from "components/SearchBar";
import { ZERO_ADDRESS } from "utils/constants";
import { formatName } from "utils/name";
import QRCode from "qrcode.react";
import { BlockscoutAddressLink } from "components/BlockscoutAddressLink";
import { ERC20__factory, Nom__factory } from "generated";

export const SearchDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const nameFormatted = formatName(name);

  const { address, network } = useContractKit();
  const provider = useProvider();
  const getConnectedSigner = useGetConnectedSigner();
  const [nom, refetchNom] = useNom(nameFormatted);
  const [changeResLoading, setChangeResLoading] = React.useState(false);
  const [changeOwnerLoading, setChangeOwnerLoading] = React.useState(false);
  const [showQR, setShowQR] = React.useState(false);
  const history = useHistory();
  const sendCUSD = React.useCallback(
    async (amount: string) => {
      const usdAddress = USD[network.chainId];
      if (!usdAddress || !nom) return;
      const signer = await getConnectedSigner();
      const usd = ERC20__factory.connect(usdAddress, signer);
      const decimals = await usd.decimals();
      const gasPrice = await provider.getGasPrice();
      const tx = await usd.transfer(
        nom.resolution,
        parseUnits(amount, decimals),
        { gasPrice: gasPrice }
      );
      toastTx(tx.hash);
    },
    [getConnectedSigner, network.chainId, nom, provider]
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
                    const nomAddress = NOM[network.chainId];
                    if (!nomAddress) return;
                    const signer = await getConnectedSigner();
                    const nom = Nom__factory.connect(
                      nomAddress,
                      signer
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
                      const gasPrice = await provider.getGasPrice();
                      const tx = await nom.changeResolution(
                        ethers.utils.formatBytes32String(nameFormatted),
                        nextResolution,
                        { gasPrice }
                      );
                      toastTx(tx.hash);
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
                      const nomAddress = NOM[network.chainId];
                      if (!nomAddress) return;
                      const signer = await getConnectedSigner();
                      const nom = Nom__factory.connect(nomAddress, signer);
                      const nextOwner = prompt("Enter new owner address");
                      if (!nextOwner || !isAddress(nextOwner)) {
                        alert("Invalid address. Please try again.");
                        return;
                      }

                      try {
                        setChangeOwnerLoading(true);
                        const gasPrice = await provider.getGasPrice();
                        const tx = await nom.changeNameOwner(
                          ethers.utils.formatBytes32String(nameFormatted),
                          nextOwner,
                          { gasPrice }
                        );
                        toastTx(tx.hash);
                        refetchNom();
                      } catch (e: any) {
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
                  {new Date(nom.expiration * 1000).toLocaleDateString("en-US")}
                </BlockText>
                <Button
                  sx={{ p: 1, fontSize: 1, ml: 2 }}
                  onClick={() => {
                    history.push(`/${name}/extend`);
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
                  history.push(`/${name}/reserve`);
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
