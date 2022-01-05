export const NETWORKS_LIST = {
  goerli: {
    chainId: `0x${Number(5).toString(16)}`,
    chainName: "Ethereum Testnet Görli",
    nativeCurrency: {
      name: "Görli Ether",
      symbol: "ETH",
      decimals: 18
    },
    rpcUrls: [
      "https://rpc.goerli.mudit.blog/",
      "https://rpc.slock.it/goerli",
      "https://goerli.prylabs.net/"
    ],
    blockExplorerUrls: ["https://goerli.etherscan.io"]
  },
  sokol: {
    chainId: `0x${Number(77).toString(16)}`,
    chainName: "POA Network Sokol",
    nativeCurrency: {
      name: "POA Sokol Ether",
      symbol: "SPOA",
      decimals: 18
    },
    rpcUrls: [
      "https://sokol.poa.network",
      "wss://sokol.poa.network/wss",
      "ws://sokol.poa.network:8546"
    ],
    blockExplorerUrls: ["https://blockscout.com/poa/sokol"]
  },
  mumbai: {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: "Polygon Testnet Mumbai",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18
    },
    rpcUrls: [
      "https://matic-mumbai.chainstacklabs.com",
      "https://rpc-mumbai.maticvigil.com",
      "https://matic-testnet-archive-rpc.bwarelabs.com"
    ],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
  }
}

export const CHAINS_ID_TO_NETWORKS_LIST = {
  5: 'goerli',
  77: 'sokol',
  80001: 'mumbai'
}