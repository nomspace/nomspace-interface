export type NFT = {
  address: string;
  name: string;
  chainId: number;
  imagePrefix?: string;
  imageExt?: string;
};

const nftTokenList: Record<number, NFT[]> = {
  42220: [
    {
      address: "0x8237f38694211F25b4c872F147F027044466Fa80",
      name: "Nomstronaut",
      chainId: 42220,
      imagePrefix:
        "https://ipfs.io/ipfs/bafybeic5njlcdwf54zompsphejih6ghy2754d3hlfewbtexdkc3abtksdq/output/",
      imageExt: "png",
    },
    {
      address: "0x9f46B8290A6D41B28dA037aDE0C3eBe24a5D1160",
      name: "Celo Punks",
      chainId: 42220,
      imagePrefix:
        "https://ipfs.io/ipfs/QmdKZj1v7cVYuFPZjg5xCVGrsDzW4rB29SzZZahHBDi3dw/",
      imageExt: "png",
    },
    {
      address: "0x07b6C9D6bB32655A70D97a38a9274da349A1EFAf",
      name: "Celo Punks Neon",
      chainId: 42220,
      imagePrefix:
        "https://ipfs.io/ipfs/QmY6v4NUE8vrh7PwEn5SseWTYWQFpuCEfKtKCnWtBMK6RV/punk_",
      imageExt: "png",
    },
    {
      address: "0x6fc1c8d59fdc261c55273f9b8e64b7e88c45e208",
      name: "Celo Toadz",
      chainId: 42220,
      imagePrefix:
        "https://celotoadz.mypinata.cloud/ipfs/QmcSKGeRgN4RQ2Zsj1i8fMjXtkZN1vGKyC3SNSWnF2SSF3/",
      imageExt: "png",
    },
    {
      address: "0x1ecd77075f7504ba849d47dce4cdc9695f1fe942",
      name: "Celo Apes",
      chainId: 42220,
      imagePrefix:
        "https://ipfs.io/ipfs/bafybeiasnbk7bztvmytiqf2a5aw5jmivvnxhrdwtp72ihbpjrlh33g32ee/apes/",
      imageExt: "png",
    },
    {
      address: "0x501f7ea7b1aa25ff7d2feb3a2e96979ba754204b",
      name: "Celo Shapes",
      chainId: 42220,
      imagePrefix:
        "https://ipfs.io/ipfs/QmbpQ6GjZFc9HdeMnmtxjqgGa3RURArEniqbPWY46JT2XZ/",
      imageExt: "png",
    },
  ],
  44787: [
    {
      address: "0xe7571Bb9FC7368254289996Db73d3B1eC99E23A1",
      name: "Celo Punks",
      chainId: 44787,
    },
  ],
  43114: [
    {
      address: "0xF70576a5255fcCfE6551f3eC8De74c9E002E1A82",
      imagePrefix: "https://avaxpunks.com/punks/",
      imageExt: "png",
      name: "Avalanche Punks",
      chainId: 43114,
    },
  ],
};

export default nftTokenList;
