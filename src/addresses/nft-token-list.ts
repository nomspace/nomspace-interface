export type NFT = {
  address: string;
  name: string;
  chainId: number;
};

const nftTokenList: Record<number, NFT[]> = {
  42220: [
    {
      address: "0x8237f38694211F25b4c872F147F027044466Fa80",
      name: "Nomstronaut",
      chainId: 42220,
    },
    {
      address: "0x9f46B8290A6D41B28dA037aDE0C3eBe24a5D1160",
      name: "Celo Punks",
      chainId: 42220,
    },
    {
      address: "0x07b6C9D6bB32655A70D97a38a9274da349A1EFAf",
      name: "Celo Punks Neon",
      chainId: 42220,
    },
    {
      address: "0x6fc1c8d59fdc261c55273f9b8e64b7e88c45e208",
      name: "Celo Toadz",
      chainId: 42220,
    },
    {
      address: "0x1ecd77075f7504ba849d47dce4cdc9695f1fe942",
      name: "Celo Apes",
      chainId: 42220,
    },
    {
      address: "0x501f7ea7b1aa25ff7d2feb3a2e96979ba754204b",
      name: "Celo Shapes",
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
