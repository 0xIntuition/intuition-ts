import { defineChain, type Address } from 'viem'

const intuitionTestnet = defineChain({
  id: 13579,
  name: 'Intuition testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Test Trust',
    symbol: 'tTRUST',
  },
  rpcUrls: {
    default: {
      http: ['https://testnet.rpc.intuition.systems/http'],
      webSocket: ['wss://testnet.rpc.intuition.systems/ws'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Intuition Explorer',
      url: 'https://testnet.explorer.intuition.systems',
    },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
    },
  },
})

const intuitionMainnet = defineChain({
  id: 13579,
  name: 'Intuition Network',
  nativeCurrency: {
    decimals: 18,
    name: 'Intuition',
    symbol: 'TRUST',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.intuition.systems/http'],
      webSocket: ['wss://rpc.intuition.systems/ws'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Intuition Explorer',
      url: 'https://explorer.intuition.systems',
    },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
    },
  },
})

const intuitionDeployments: {
  [key: string]: {
    [chainId: number]: Address
  }
} = {
  MultiVault: {
    [intuitionTestnet.id]: '0x2Ece8D4dEdcB9918A398528f3fa4688b1d2CAB91',
  },
}

export { intuitionDeployments, intuitionTestnet }
