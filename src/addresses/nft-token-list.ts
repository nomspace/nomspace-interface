//import { GlobalNom } from "../hooks/useNom";

export type NFT = {
  address: string,
  name: string,
  chainId: number,
  imagePrefix?: string,
  imageExt?: string,
};

//const [nom] = GlobalNom.useContainer();

// const options = {
//   method: 'GET',
//   headers: {
//     Accept: 'application/json',
//     'X-API-Key': '6EooDy7rzViLSuSC2Qa0DjQgSFtWN9uusfSdTodhahwmJr1gbYI3BsiWDTh8Fg9qxX6kId84iS3hv3Dd0QAo9K00YmAeAm7cCxKhzNDRHu2K61Ow0pfo5NVmtfA8aAoS'
//   }
// };

// var obj:any; 
// fetch(`https://api.poap.tech/actions/scan/${nom?.resolution}`, options)
//   .then(response => response.json())
//   .then(response => obj = response)
//   .catch(err => console.error(err));

// const poapURL = obj != null ? obj[0]?.event.image_url : null 

const nftTokenList: Record<number, NFT[]> = {
  42220: [
    {
      address: "0x8237f38694211F25b4c872F147F027044466Fa80",
      name: "Nomstronauts",
      chainId: 42220,
      imagePrefix:
        "https://ipfs.io/ipfs/bafybeifigjz7vn6czinttkewenz7qbsitoa4zormghjanpitpdlpw4mmki/output/",
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
      address: "0x50826Faa5b20250250E09067e8dDb1AFa2bdf910",
      name: "Womxn of Celo",
      chainId: 42220,
    },
    {
      address: "0x501f7ea7b1aa25ff7d2feb3a2e96979ba754204b",
      name: "Celo Shapes",
      chainId: 42220,
      imagePrefix:
        "https://ipfs.io/ipfs/QmbpQ6GjZFc9HdeMnmtxjqgGa3RURArEniqbPWY46JT2XZ/",
      imageExt: "png",
    },
    {
      address: "0x1F25F8Df9E33033668d6F04DAE0bDE4854E9F1A5",
      name: "Knoxer",
      chainId: 42220,
      imagePrefix:
        "https://ipfs.io/ipfs/QmTDzVspMNFLEQ2QAUwRBkEb1aTdxZFwU2JE7z6DmnMipE/",
      imageExt: "jpg",
    },
    {
      address: "0xc8DF51073CD581902b4fb50131d31f29343131F0",
      name: "ChinChilla Gang",
      chainId: 42220,
      imagePrefix:
        "https://ipfs.io/ipfs/Qmf4SjPj66qMwWsN34e35tjya6BA5a7abA8B2ct9DaizSC/",
      imageExt: "png",
    },
    {
      address: "0xAc80c3c8b122DB4DcC3C351ca93aC7E0927C605d",
      name: "Celostrials",
      chainId: 42220,
      imagePrefix:
        "https://ipfs.io/ipfs/Qme97ifAexrMDfjE3DZRMasWhe7D276uYsCGonyprSA2MJ/",
      imageExt: "png",
    },
    {
      address: "0xc4ea80deCA2415105746639eC16cB0cF8378996A",
      name: "Daopolis",
      chainId: 42220,
      imagePrefix:
        "https://cybertime.mypinata.cloud/ipfs/QmefdE5PdY4bSZTXP84uKG6ehjBAmyqnYTJnoMhXSe5EvW/",
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
      address: "0x3d1fc2045A031C3D9C848F3DaCCAdad191ec6794",
      name: " Alter Ego Punks",
      chainId: 43114,
    },
    {
      address: "0x72D4fEd90e52B30759989B1B7BA894B3930BD9a7",
      name: "Avalanche Riders",
      chainId: 43114,
    },
    {
      address: "0xBbD9786f178e2AEBb4b4329c41A821921ca05339",
      name: "Vending Machines NFT",
      chainId: 43114,
    },
    {
      address: "0xF70576a5255fcCfE6551f3eC8De74c9E002E1A82",
      name: "Avalanche Punks",
      chainId: 43114,
      imagePrefix: "https://avaxpunks.com/punks/",
      imageExt: "png",
    },
    {
      address: "0x3c965D9Fcaf231F434186E9Cf0C1e179307CD211",
      name: "Ava Sharks",
      chainId: 43114,
    },
    {
      address: "0x8927985B358692815E18F2138964679DcA5d3b79",
      name: "chikn",
      chainId: 43114,
    },
    {
      address: "0x6d5087B3082f73D42a32D85e38BC95dcceDe39Bb",
      name: "AvaxApes",
      chainId: 43114,
    },
    {
      address: "0x0540E4EE0C5CdBA347C2f0E011ACF8651bB70Eb9",
      name: "CryptoSeals",
      chainId: 43114,
    },
    {
      address: "0x4245a1bD84eB5f3EBc115c2Edf57E50667F98b0b",
      name: "Hoppers",
      chainId: 43114,
    },
    {
      address: "0xA69fEe085a4C38656ce9c37A064a330725307482",
      name: "Avalant",
      chainId: 43114,
    },

  ],
  137: [
    {
      address: "0x9498274b8c82b4a3127d67839f2127f2ae9753f4",
      name: "Polygon Punks",
      chainId: 137,
    },
  ],
  1: [
    {
      address: "0x22C1f6050E56d2876009903609a2cC3fEf83B415",
      name: "POAP",
      chainId: 1
    },
  ],
};

export default nftTokenList;