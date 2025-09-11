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

const intuitionDeployments: {
  [key: string]: {
    [chainId: number]: Address
  }
} = {
  MultiVault: {
    [intuitionTestnet.id]: '0xB92EA1B47E4ABD0a520E9138BB59dBd1bC6C475B',
  },
}

export { intuitionDeployments, intuitionTestnet }
