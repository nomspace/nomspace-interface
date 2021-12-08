import { useContractKit } from "@celo-tools/use-contractkit";
import React from "react";
import { Flex, Heading } from "theme-ui";
import NomMetadata from "src/abis/nomspace/Nom.json";
import MulticallAbi from "src/abis/Multicall.json";
import { NOM } from "src/config";
import { useAsyncState } from "src/hooks/useAsyncState";
import { Nom } from "src/generated/Nom";
import { AbiItem } from "web3-utils";
import { ZERO_ADDRESS } from "src/constants";
import { BlockText } from "src/components/BlockText";
import { ethers } from "ethers";

const CREATION_BLOCK = 7240250;
export const Stats: React.FC = () => {
  const { kit, network } = useContractKit();
  const call = React.useCallback(async () => {
    const nom = new kit.web3.eth.Contract(
      NomMetadata.abi as AbiItem[],
      NOM[network.chainId]
    ) as unknown as Nom;
    const multicall = new kit.web3.eth.Contract(
      MulticallAbi as AbiItem[],
      "0x75f59534dd892c1f8a7b172d639fa854d529ada3"
    );

    const reserveEvents = await nom.getPastEvents("NameOwnerChanged", {
      fromBlock: CREATION_BLOCK,
      toBlock: "latest",
      filter: {
        previousOwner: ZERO_ADDRESS,
      },
    });

    console.log(
      reserveEvents.map((e) => ethers.utils.toUtf8String(e.returnValues.name))
    );

    const totalReserved = reserveEvents.length;
    const numUniqueUsers = Object.keys(
      reserveEvents.reduce(
        (acc, curr) => ({ ...acc, [curr.returnValues.newOwner]: true }),
        {}
      )
    ).length;

    multicall.methods
      .aggregate(
        reserveEvents.map((e) => [
          nom.options.address,
          nom.methods.resolve(e.returnValues.name).encodeABI(),
        ])
      )
      .call()
      .then((cr: any) => {
        console.log(
          cr.returnData
            .filter(
              (address: string) =>
                address !==
                "0x0000000000000000000000000000000000000000000000000000000000000000"
            )
            .map((address: string) =>
              address.replace("000000000000000000000000", "")
            )
        );
      });

    return { totalReserved, numUniqueUsers };
  }, [kit.web3.eth.Contract, network.chainId]);

  const [stats] = useAsyncState(null, call);

  return (
    <Flex
      sx={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mt: ["33%", "10%"],
      }}
    >
      <Heading as="h2">Total Noms reserved</Heading>
      <BlockText variant="primary" mb={4}>
        {stats?.totalReserved ?? "-"}
      </BlockText>
      <Heading as="h2">Total unique users</Heading>
      <BlockText variant="primary" mb={4}>
        {stats?.numUniqueUsers ?? "-"}
      </BlockText>
    </Flex>
  );
};
