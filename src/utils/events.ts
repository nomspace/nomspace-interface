import { Contract, Event, EventFilter } from "ethers";
import localforage from "localforage";

const BUCKET_SIZE = 100_000;

export const getPastEvents = async (
  contract: Contract,
  filter: EventFilter,
  fromBlock: number,
  bucketSize: number = BUCKET_SIZE
): Promise<Event[]> => {
  const latestBlock = await contract.provider.getBlockNumber();
  const key = JSON.stringify(filter);
  const cachedEvents = await localforage.getItem<string>(key);
  const events = cachedEvents ? JSON.parse(cachedEvents) : [];
  let i =
    events.length > 0 ? events[events.length - 1].blockNumber + 1 : fromBlock;
  while (i < latestBlock) {
    events.push(...(await contract.queryFilter(filter, i, i + bucketSize - 1)));
    i += bucketSize;
  }
  await localforage.setItem(key, JSON.stringify(events));
  return events;
};
