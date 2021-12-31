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
const BUCKET_SIZE = 1000;

export const getPastEvents = async (
  contract: any,
  eventName: string,
  fromBlock: number,
  toBlock: number,
  filter?: any
) => {
  console.log("Fetching events");
  const startBlock = fromBlock || 0;
  const bucketSize = 50_000;
  const promises = [];
  for (
    let i = Math.floor(startBlock / bucketSize);
    i < Math.ceil(toBlock / bucketSize);
    i++
  ) {
    promises.push(
      contract.getPastEvents(eventName, {
        fromBlock: Math.max(i * bucketSize, startBlock),
        toBlock: Math.min((i + 1) * bucketSize, toBlock) - 1,
        filter,
      })
    );
  }
  const events = await Promise.all(promises).then((es) => es.flat());
  console.info(`Fetched ${events.length} ${eventName} events`);
  return events;
};

const getResolutions = async (multicall: any, nom: any, reserveEvents: any) => {
  console.log("Fetching resolutions");
  const total = reserveEvents.length;
  let i = 0;
  const promises = [];
  while (i < total) {
    promises.push(
      multicall.methods
        .aggregate(
          reserveEvents
            .slice(i, i + BUCKET_SIZE)
            .map((e: any) => [
              nom.options.address,
              nom.methods.resolve(e.returnValues.name).encodeABI(),
            ])
        )
        .call()
        .then((cr: any) =>
          cr.returnData.map((address: string) =>
            address.replace("0x000000000000000000000000", "0x")
          )
        )
    );
    i += BUCKET_SIZE;
  }
  return await Promise.all(promises).then((es) => es.flat());
};

const getOwners = async (multicall: any, nom: any, reserveEvents: any) => {
  console.log("Fetching owners");
  const total = reserveEvents.length;
  let i = 0;
  const promises = [];
  while (i < total) {
    promises.push(
      multicall.methods
        .aggregate(
          reserveEvents
            .slice(i, i + BUCKET_SIZE)
            .map((e: any) => [
              nom.options.address,
              nom.methods.nameOwner(e.returnValues.name).encodeABI(),
            ])
        )
        .call()
        .then((cr: any) =>
          cr.returnData.map((address: string) =>
            address.replace("0x000000000000000000000000", "0x")
          )
        )
    );
    i += BUCKET_SIZE;
  }

  return await Promise.all(promises).then((es) => es.flat());
};

const getExpirations = async (multicall: any, nom: any, reserveEvents: any) => {
  console.log("Fetching expirations");
  const total = reserveEvents.length;
  let i = 0;
  const promises = [];
  while (i < total) {
    promises.push(
      multicall.methods
        .aggregate(
          reserveEvents
            .slice(i, i + BUCKET_SIZE)
            .map((e: any) => [
              nom.options.address,
              nom.methods.expirations(e.returnValues.name).encodeABI(),
            ])
        )
        .call()
        .then((cr: any) =>
          cr.returnData.map((expiration: string) => parseInt(expiration, 16))
        )
    );
    i += BUCKET_SIZE;
  }

  return await Promise.all(promises).then((es) => es.flat());
};

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

    const latestBlock = await kit.web3.eth.getBlockNumber();
    const reserveEvents = await getPastEvents(
      nom,
      "NameOwnerChanged",
      CREATION_BLOCK,
      latestBlock,
      {
        previousOwner: ZERO_ADDRESS,
      }
    );

    const names = reserveEvents.map((e) =>
      ethers.utils.toUtf8String(e.returnValues.name)
    );

    const totalReserved = reserveEvents.length;
    const numUniqueUsers = Object.keys(
      reserveEvents.reduce(
        (acc, curr) => ({ ...acc, [curr.returnValues.newOwner]: true }),
        {}
      )
    ).length;

    const [resolutions, owners, expirations] = await Promise.all([
      getResolutions(multicall, nom, reserveEvents),
      getOwners(multicall, nom, reserveEvents),
      getExpirations(multicall, nom, reserveEvents),
    ]);

    const zipped = ["name,owner,resolution,expiration"];
    for (let i = 0; i < names.length; i++) {
      zipped.push(
        [names[i], owners[i], resolutions[i], expirations[i]].join(",")
      );
    }
    console.log(zipped.join("\n"));

    return { totalReserved, numUniqueUsers };
  }, [kit.web3.eth, network.chainId]);

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
