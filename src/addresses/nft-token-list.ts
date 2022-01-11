export type NFT = {
  address: string;
  name: string;
  chainId: number;
};

const nftTokenList: Record<number, NFT[]> = {
  42220: [
    {
      address: "0x9f46B8290A6D41B28dA037aDE0C3eBe24a5D1160",
      name: "Celo Punks",
      chainId: 42220,
    },
  ],
  44787: [
    {
      address: "0xe7571Bb9FC7368254289996Db73d3B1eC99E23A1",
      name: "Celo Punks",
      chainId: 44787,
    },
  ],
};

export default nftTokenList;
