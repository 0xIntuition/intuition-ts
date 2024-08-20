import { ChainEnv, DEFAULT_CHAIN_ENV } from './environment'
import logger from './logger'

export type SpecialObjectConfig = {
  id: string
  vaultId: number
  displayName: string
  type: 'identity' | 'claim'
}

export type SpecialPredicateMap = {
  tagPredicate: SpecialObjectConfig
  iPredicate: SpecialObjectConfig
  amFollowingPredicate: SpecialObjectConfig
  thingPredicate: SpecialObjectConfig
}

export type QuestObjectMap = {
  stakeAtomFallbackAtom: SpecialObjectConfig
  stakeClaimFallbackClaim: SpecialObjectConfig
  counterstakeClaimFallbackClaim: SpecialObjectConfig
  discoverListFallbackAtom: SpecialObjectConfig
}

export const getSpecialPredicate = (
  chainEnv: ChainEnv,
): SpecialPredicateMap => {
  const specialPredicates: Record<ChainEnv, SpecialPredicateMap> = {
    development: {
      tagPredicate: {
        id: '6eab2a76-687e-4f23-9429-276eb14e6c6c',
        vaultId: 3,
        displayName: 'has tag',
        type: 'identity',
      },
      iPredicate: {
        id: '6b8c8a43-6338-4a96-a3b6-fc8cc4910600',
        vaultId: 13,
        displayName: 'I',
        type: 'identity',
      },
      amFollowingPredicate: {
        id: '6eab2a76-687e-4f23-9429-276eb14e6c6c',
        vaultId: 4,
        displayName: 'has tag',
        type: 'identity',
      },
      thingPredicate: {
        id: 'b369445b-2310-4a89-8335-8c5c61e1b464',
        vaultId: 4,
        displayName: 'am following',
        type: 'identity',
      },
    },
    staging: {
      tagPredicate: {
        id: '',
        vaultId: 0,
        displayName: '',
        type: 'identity',
      },
      iPredicate: {
        id: '',
        vaultId: 0,
        displayName: '',
        type: 'identity',
      },
      amFollowingPredicate: {
        id: '',
        vaultId: 0,
        displayName: '',
        type: 'identity',
      },
      thingPredicate: {
        id: '',
        vaultId: 0,
        displayName: '',
        type: 'identity',
      },
    },
    production: {
      tagPredicate: {
        id: '',
        vaultId: 0,
        displayName: '',
        type: 'identity',
      },
      iPredicate: {
        id: '',
        vaultId: 0,
        displayName: '',
        type: 'identity',
      },
      amFollowingPredicate: {
        id: '',
        vaultId: 0,
        displayName: '',
        type: 'identity',
      },
      thingPredicate: {
        id: '',
        vaultId: 0,
        displayName: '',
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

export const getFeaturedListObjectIds = (chainEnv: ChainEnv): number[] => {
  const featuredListObjectIds: Record<ChainEnv, number[]> = {
    development: [33, 22],
    staging: [0, 0],
    production: [0, 0],
  }
  if (!chainEnv) {
    console.error(
      `No chain environment specified. Defaulting to ${DEFAULT_CHAIN_ENV}.`,
    )
    return featuredListObjectIds[DEFAULT_CHAIN_ENV]
  }
  if (!(chainEnv in featuredListObjectIds)) {
    logger(`No config for provided environment: ${chainEnv}.`)
    return featuredListObjectIds[DEFAULT_CHAIN_ENV]
  }
  return featuredListObjectIds[chainEnv as ChainEnv]
}

export const getQuestObjects = (chainEnv: ChainEnv) => {
  const questObjects: Record<ChainEnv, QuestObjectMap> = {
    development: {
      stakeAtomFallbackAtom: {
        id: 'fd805a60-fbe8-4a1c-91cc-2bebf4a7f3a8',
        vaultId: 533,
        displayName: 'Solidity',
        type: 'identity',
      },
      stakeClaimFallbackClaim: {
        id: '5219ae05-738f-4cb9-8bae-7fa70fe6c4f0',
        vaultId: 0,
        displayName: 'Solidity Rules Ethereum',
        type: 'claim',
      },
      counterstakeClaimFallbackClaim: {
        id: '823ac20c-cbc4-4b53-9c37-fef0cb39749b',
        vaultId: 0,
        displayName: 'Anchovy is Best Pizza',
        type: 'claim',
      },
      discoverListFallbackAtom: {
        id: '92a3b107-ee1c-4edc-8e38-191446e10ed1',
        vaultId: 0,
        displayName: 'Best Web3 Projects',
        type: 'identity',
      },
    },
    // repeat for staging and production with initial values
    staging: {
      stakeAtomFallbackAtom: {
        id: '',
        vaultId: 0,
        displayName: '',
        type: 'identity',
      },
      stakeClaimFallbackClaim: {
        id: '',
        vaultId: 0,
        displayName: '',
        type: 'claim',
      },
      counterstakeClaimFallbackClaim: {
        id: '',
        vaultId: 0,
        displayName: '',
        type: 'claim',
      },
      discoverListFallbackAtom: {
        id: '',
        vaultId: 0,
        displayName: '',
        type: 'identity',
      },
    },
    production: {
      stakeAtomFallbackAtom: {
        id: '',
        vaultId: 0,
        displayName: '',
        type: 'identity',
      },
      stakeClaimFallbackClaim: {
        id: '',
        vaultId: 0,
        displayName: '',
        type: 'claim',
      },
      counterstakeClaimFallbackClaim: {
        id: '',
        vaultId: 0,
        displayName: '',
        type: 'claim',
      },
      discoverListFallbackAtom: {
        id: '',
        vaultId: 0,
        displayName: '',
        type: 'identity',
      },
    },
  }

  if (!chainEnv) {
    console.error(
      `No chain environment specified. Defaulting to ${DEFAULT_CHAIN_ENV}.`,
    )
    return questObjects[DEFAULT_CHAIN_ENV]
  }
  if (!(chainEnv in questObjects)) {
    logger(`No config for provided environment: ${chainEnv}.`)
    return questObjects[DEFAULT_CHAIN_ENV]
  }
  return questObjects[chainEnv as ChainEnv]
}
