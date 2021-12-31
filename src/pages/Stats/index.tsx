import { useContractKit, useProvider } from "@celo-tools/use-contractkit";
import React from "react";
import { Flex, Heading } from "theme-ui";
import { NOM } from "config";
import { useAsyncState } from "hooks/useAsyncState";
import { BlockText } from "components/BlockText";
import { Contract, ethers } from "ethers";
import { Multicall__factory, Nom__factory } from "generated";
import { ZERO_ADDRESS } from "utils/constants";

// TODO: THIS IS BROKEN, NEEDS FIXING

const CREATION_BLOCK = 7240250;
const BUCKET_SIZE = 1000;

const getPastEvents = async (
  contract: Contract,
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
  const { network, kit } = useContractKit();
  const provider = useProvider();
  const call = React.useCallback(async () => {
    const nomAddress = NOM[network.chainId];
    if (!nomAddress) return;
    const nom = Nom__factory.connect(nomAddress, provider);
    const multicall = Multicall__factory.connect(
      "0x75f59534dd892c1f8a7b172d639fa854d529ada3",
      provider
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
        (acc, curr) => ({ ...acc, [curr.args.newOwner]: true }),
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
  }, [kit.web3.eth, network.chainId, provider]);

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
