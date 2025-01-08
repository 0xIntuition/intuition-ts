import { createConfig } from '@privy-io/wagmi'
import { base, baseSepolia, mainnet } from 'viem/chains'
import { Config, http } from 'wagmi'

declare global {
  interface Window {
    ENV?: {
      ALCHEMY_MAINNET_RPC_URL?: string
      ALCHEMY_BASE_RPC_URL?: string
      ALCHEMY_BASE_SEPOLIA_RPC_URL?: string
      ORIGIN_URL?: string
    }
  }
}

const alchemyMainnetRpcUrl =
  typeof window !== 'undefined'
    ? window.ENV?.ALCHEMY_MAINNET_RPC_URL
    : process.env.ALCHEMY_MAINNET_RPC_URL

const alchemyBaseRpcUrl =
  typeof window !== 'undefined'
    ? window.ENV?.ALCHEMY_BASE_RPC_URL
    : process.env.ALCHEMY_BASE_RPC_URL

const alchemyBaseSepoliaRpcUrl =
  typeof window !== 'undefined'
    ? window.ENV?.ALCHEMY_BASE_SEPOLIA_RPC_URL
    : process.env.ALCHEMY_BASE_SEPOLIA_RPC_URL

const originUrl =
  typeof window !== 'undefined'
    ? window.ENV?.ORIGIN_URL
    : process.env.ORIGIN_URL

const headers: HeadersInit | undefined = originUrl
  ? { Origin: originUrl }
  : undefined

export const wagmiConfig: Config = createConfig({
  chains: [mainnet, base, baseSepolia],
  transports: {
    [mainnet.id]: http(alchemyMainnetRpcUrl, {
      fetchOptions: {
        headers,
      },
    }),
    [base.id]: http(alchemyBaseRpcUrl, {
      fetchOptions: {
        headers,
      },
    }),
    [baseSepolia.id]: http(alchemyBaseSepoliaRpcUrl, {
      fetchOptions: {
        headers,
      },
    }),
  },
})
