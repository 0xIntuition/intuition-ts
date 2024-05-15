import { createConfig } from '@privy-io/wagmi'
import { base, baseSepolia, mainnet } from 'viem/chains'
import { Config, http } from 'wagmi'
import { CURRENT_ENV } from './constants'

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

const productionOriginUrl =
  typeof window !== 'undefined'
    ? window.ENV?.PRODUCTION_ORIGIN_URL
    : process.env.PRODUCTION_ORIGIN_URL

const stagingOriginUrl =
  typeof window !== 'undefined'
    ? window.ENV?.STAGING_ORIGIN_URL
    : process.env.STAGING_ORIGIN_URL

export const wagmiConfig: Config = createConfig({
  chains: [mainnet, base, baseSepolia],
  transports: {
    [mainnet.id]: http(alchemyMainnetRpcUrl, {
      fetchOptions: {
        headers: {
          Origin:
            CURRENT_ENV === 'production'
              ? productionOriginUrl
              : stagingOriginUrl,
        },
      },
    }),
    [base.id]: http(alchemyBaseRpcUrl, {
      fetchOptions: {
        headers: {
          Origin:
            CURRENT_ENV === 'production'
              ? productionOriginUrl
              : stagingOriginUrl,
        },
      },
    }),
    [baseSepolia.id]: http(alchemyBaseSepoliaRpcUrl, {
      fetchOptions: {
        headers: {
          Origin:
            CURRENT_ENV === 'production'
              ? productionOriginUrl
              : stagingOriginUrl,
        },
      },
    }),
  },
})
