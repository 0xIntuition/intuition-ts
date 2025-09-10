import {defineChain} from 'viem'

export const intuitionTestnet = defineChain({
  blockExplorers: {
    default: {
      name: 'Intuition Explorer',
      url: 'https://testnet.explorer.intuition.systems',
    },
  },
  contracts: {
    multicall3: {
      address: '0x66bf587EdFbd5408121bDb125a1B6F9b830F64AD',
    },
  },
  id: 13_579,
  name: 'intuition-testnet',
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
})

export const supportedNetworks = [intuitionTestnet]

export function getNetworkByName(name: string) {
  return supportedNetworks.find((n) => n.name.toLowerCase() === name.toLowerCase())
}
