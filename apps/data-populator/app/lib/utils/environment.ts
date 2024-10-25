import { Transport } from 'viem'
import { base, baseSepolia, type mainnet } from 'viem/chains'

import { multivaultContractsMap, transportsMap } from './chains'
import logger from './logger'

type ChainId = typeof base.id | typeof baseSepolia.id | typeof mainnet.id

export type ChainConfig = {
  chainId: ChainId
  name: string
  transport: Transport
  contractAddress: `0x${string}`
}

export type ChainEnv = 'development' | 'staging' | 'production'

export const DEFAULT_CHAIN_ENV = 'development'

export const getChainEnvConfig = (env: string): ChainConfig => {
  const chainOptions: Record<ChainEnv, ChainConfig> = {
    development: {
      chainId: baseSepolia.id,
      name: baseSepolia.name,
      transport: transportsMap(baseSepolia.id),
      contractAddress: multivaultContractsMap(baseSepolia.id),
    },
    staging: {
      chainId: base.id,
      name: base.name,
      transport: transportsMap(base.id),
      contractAddress: multivaultContractsMap(base.id),
    },
    production: {
      chainId: base.id,
      name: base.name,
      transport: transportsMap(base.id),
      contractAddress: multivaultContractsMap(base.id),
    },
  }

  if (!env) {
    console.error(
      `No chain environment specified. Defaulting to ${DEFAULT_CHAIN_ENV}.`,
    )
    return chainOptions[DEFAULT_CHAIN_ENV]
  }
  if (!(env in chainOptions)) {
    logger(`No config for provided environment: ${env}.`)
    return chainOptions[DEFAULT_CHAIN_ENV]
  }
  return chainOptions[env as ChainEnv]
}
