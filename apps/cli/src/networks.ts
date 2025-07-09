import {defineChain} from 'viem'

export const base = defineChain({
  blockExplorers: {
    default: {name: 'Basescan', url: 'https://basescan.org'},
  },
  id: 8453,
  name: 'Base',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  network: 'base',
  rpcUrls: {
    default: {http: ['https://mainnet.base.org']},
    public: {http: ['https://mainnet.base.org']},
  },
})

export const baseSepolia = defineChain({
  blockExplorers: {
    default: {name: 'Basescan', url: 'https://sepolia.basescan.org'},
  },
  id: 84_532,
  name: 'Base Sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  network: 'base-sepolia',
  rpcUrls: {
    default: {http: ['https://sepolia.base.org']},
    public: {http: ['https://sepolia.base.org']},
  },
})

export const supportedNetworks = [base, baseSepolia]

export function getNetworkByName(name: string) {
  return supportedNetworks.find((n) => n.name.toLowerCase() === name.toLowerCase() || n.network === name.toLowerCase())
}
