import { IPFS_GATEWAY_URL } from '@consts/general'

import { ChainEnv, DEFAULT_CHAIN_ENV } from './environment'
import logger from './logger'

export type SpecialObjectConfig = {
  id: number
  vaultId: number
  displayName: string
  type: 'identity' | 'claim'
}

export type SpecialPredicateMap = {
  tagPredicate: SpecialObjectConfig
  iPredicate: SpecialObjectConfig
  amFollowingPredicate: SpecialObjectConfig
  thingPredicate: SpecialObjectConfig
  web3Wallet: SpecialObjectConfig
}

export const getSpecialPredicate = (
  chainEnv: ChainEnv,
): SpecialPredicateMap => {
  const specialPredicates: Record<ChainEnv, SpecialPredicateMap> = {
    development: {
      tagPredicate: {
        id: 3,
        vaultId: 3,
        displayName: 'has tag',
        type: 'identity',
      },
      iPredicate: {
        id: 13,
        vaultId: 13,
        displayName: 'I',
        type: 'identity',
      },
      amFollowingPredicate: {
        id: 4,
        vaultId: 4,
        displayName: 'am following',
        type: 'identity',
      },
      thingPredicate: {
        id: 2,
        vaultId: 2,
        displayName: 'Thing',
        type: 'identity',
      },
      web3Wallet: {
        id: 620,
        vaultId: 620,
        displayName: 'Web3 Wallet',
        type: 'identity',
      },
    },
    staging: {
      tagPredicate: {
        id: 4,
        vaultId: 4,
        displayName: 'has tag',
        type: 'identity',
      },
      iPredicate: {
        id: 11,
        vaultId: 11,
        displayName: 'I',
        type: 'identity',
      },
      amFollowingPredicate: {
        id: 3,
        vaultId: 3,
        displayName: 'am following',
        type: 'identity',
      },
      thingPredicate: {
        id: 2,
        vaultId: 2,
        displayName: 'Thing',
        type: 'identity',
      },
      web3Wallet: {
        id: 40259,
        vaultId: 40259,
        displayName: 'Web3 Wallet',
        type: 'identity',
      },
    },
    production: {
      tagPredicate: {
        id: 4,
        vaultId: 4,
        displayName: 'has tag',
        type: 'identity',
      },
      iPredicate: {
        id: 11,
        vaultId: 11,
        displayName: 'I',
        type: 'identity',
      },
      amFollowingPredicate: {
        id: 3,
        vaultId: 3,
        displayName: 'am following',
        type: 'identity',
      },
      thingPredicate: {
        id: 2,
        vaultId: 2,
        displayName: 'Thing',
        type: 'identity',
      },
      web3Wallet: {
        id: 40259,
        vaultId: 40259,
        displayName: 'Web3 Wallet',
        type: 'identity',
      },
    },
  }

  if (!chainEnv) {
    console.error(
      `No chain environment specified. Defaulting to ${DEFAULT_CHAIN_ENV}.`,
    )
    return specialPredicates[DEFAULT_CHAIN_ENV]
  }
  if (!(chainEnv in specialPredicates)) {
    logger(`No config for provided environment: ${chainEnv}.`)
    return specialPredicates[DEFAULT_CHAIN_ENV]
  }
  return specialPredicates[chainEnv as ChainEnv]
}

export const ipfsUrl = (hash: string) => {
  const cleanHash = hash.replace('ipfs://', '')
  return `${IPFS_GATEWAY_URL}/${cleanHash}`
}
