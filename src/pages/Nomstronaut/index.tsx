import React from "react";
import { useContractKit } from "@celo-tools/use-contractkit";
import { Box, Button, Card, Divider, Flex, Heading, Spinner } from "theme-ui";
import { BlockText } from "src/components/BlockText";
import { shortenAddress } from "src/utils/address";
import { AbiItem, toBN, toWei } from "web3-utils";
import { toastTx } from "src/utils/toastTx";
import { BlockscoutAddressLink } from "src/components/BlockscoutAddressLink";
import styled from "@emotion/styled";
import gif from "src/images/gif.gif";
import { NomstronautAddress } from "src/config";
import NOMSTONAUT_ABI from "src/abis/nomspace/Nomstronaut.json";
import { Nomstronaut } from "src/generated/Nomstronaut";
import { useAsyncState } from "src/hooks/useAsyncState";

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

export const NomstronautView: React.FC = () => {
  const { address, getConnectedKit, kit } = useContractKit();
  const call = React.useCallback(async () => {
    const NomContract = new kit.web3.eth.Contract(
      NOMSTONAUT_ABI.abi as AbiItem[],
      NomstronautAddress
    ) as unknown as Nomstronaut;

    const numMinted = await NomContract
      .methods.totalSupply().call();

    return numMinted;
  }, [kit]);

  const [numMinted, resetNumMinted] = useAsyncState(null, call);

  const mintNom = React.useCallback(
    async (amount: string) => {
      const kit = await getConnectedKit();
      if (!kit || !address) {
        return;
      }
      const NomContract = new kit.web3.eth.Contract(
        NOMSTONAUT_ABI.abi as AbiItem[],
        NomstronautAddress
      ) as unknown as Nomstronaut;
      const amountBN = toBN(amount)
      const priceEach = toBN(toWei('.03'))
      const price = amountBN.mul(priceEach)
      const tx = await NomContract.methods
        .mint(address, amount)
        .send({ from: kit.defaultAccount, gasPrice: toWei("0.5", "gwei"), value: price});
      toastTx(tx.transactionHash);
      resetNumMinted();
    },
    [address, getConnectedKit, resetNumMinted]
  );

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
            <Flex sx={{ alignItems: "center" }}>
              <BlockText mt={5}>
                Total minted: {numMinted}/6000
              </BlockText>
            </Flex>
          </Flex>
          {
            <Flex sx={{ mt: 3, justifyContent: "center", flexWrap: "wrap" }}>
              <Button
                mr={2}
                mb={1}
                onClick={async () => {
                  await mintNom("1");
                }}
              >
                Mint 1 Nomstronaut
              </Button>
              <Button
                mr={2}
                mb={1}
                onClick={async () => {
                  await mintNom("5");
                }}
              >
                Mint 5 Nomstronauts
              </Button>
              <Button
                mr={2}
                mb={1}
                onClick={async () => {
                  await mintNom("10");
                }}
              >
                Mint 10 Nomstronauts
              </Button>
            </Flex>
          }
          <Flex sx={{ justifyContent: "center", mt: 3 }}>
            <BlockText>
              3 Celo each | Contract Address{" "}
              <BlockscoutAddressLink address={NomstronautAddress}>
                {shortenAddress(NomstronautAddress)}
              </BlockscoutAddressLink>
            </BlockText>
          </Flex>
        </Card>
      </Box>
    </Flex>
  );
};
