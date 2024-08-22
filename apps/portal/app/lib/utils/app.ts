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
        displayName: 'am following',
        type: 'identity',
      },
      thingPredicate: {
        id: 'b369445b-2310-4a89-8335-8c5c61e1b464',
        vaultId: 2,
        displayName: 'Thing',
        type: 'identity',
      },
    },
    staging: {
      tagPredicate: {
        id: '55b339a3-6280-482c-9e55-a1d55750a840',
        vaultId: 4,
        displayName: 'has tag',
        type: 'identity',
      },
      iPredicate: {
        id: 'd993a496-e009-4ae9-bb28-546d4377d6a0',
        vaultId: 11,
        displayName: 'I',
        type: 'identity',
      },
      amFollowingPredicate: {
        id: 'e498ca71-ef74-4cc9-90e4-2d42b8a02a18',
        vaultId: 3,
        displayName: 'am following',
        type: 'identity',
      },
      thingPredicate: {
        id: 'da4882fc-1d45-4c96-a7ab-cf1ff251cbb2',
        vaultId: 2,
        displayName: 'Thing',
        type: 'identity',
      },
    },
    production: {
      tagPredicate: {
        id: '55b339a3-6280-482c-9e55-a1d55750a840',
        vaultId: 4,
        displayName: 'has tag',
        type: 'identity',
      },
      iPredicate: {
        id: 'd993a496-e009-4ae9-bb28-546d4377d6a0',
        vaultId: 11,
        displayName: 'I',
        type: 'identity',
      },
      amFollowingPredicate: {
        id: 'e498ca71-ef74-4cc9-90e4-2d42b8a02a18',
        vaultId: 3,
        displayName: 'am following',
        type: 'identity',
      },
      thingPredicate: {
        id: 'da4882fc-1d45-4c96-a7ab-cf1ff251cbb2',
        vaultId: 2,
        displayName: 'Thing',
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
    staging: [45, 708, 765],
    production: [45, 708, 765],
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
        id: 'b1f186ba-4789-47d3-a4d0-cb54eb86f70b',
        vaultId: 13,
        displayName: 'Intuition',
        type: 'identity',
      },
      stakeClaimFallbackClaim: {
        id: '369d24ff-6d65-4094-9a27-3867cec6927f',
        vaultId: 15,
        displayName: 'Intuition has tag Trustworthy',
        type: 'claim',
      },
      counterstakeClaimFallbackClaim: {
        id: '78e03073-effb-4d6a-964b-eea55b1d08b4',
        vaultId: 19,
        displayName: 'Bitcoin Created By Craig Wright',
        type: 'claim',
      },
      discoverListFallbackAtom: {
        id: 'c1bfa201-9a0f-4d37-af07-1bcb019860f4',
        vaultId: 45,
        displayName: 'Top Web3 Developer Tooling',
        type: 'identity',
      },
    },
    production: {
      stakeAtomFallbackAtom: {
        id: 'b1f186ba-4789-47d3-a4d0-cb54eb86f70b',
        vaultId: 13,
        displayName: 'Intuition',
        type: 'identity',
      },
      stakeClaimFallbackClaim: {
        id: '369d24ff-6d65-4094-9a27-3867cec6927f',
        vaultId: 15,
        displayName: 'Intuition has tag Trustworthy',
        type: 'claim',
      },
      counterstakeClaimFallbackClaim: {
        id: '78e03073-effb-4d6a-964b-eea55b1d08b4',
        vaultId: 19,
        displayName: 'Bitcoin Created By Craig Wright',
        type: 'claim',
      },
      discoverListFallbackAtom: {
        id: 'c1bfa201-9a0f-4d37-af07-1bcb019860f4',
        vaultId: 45,
        displayName: 'Top Web3 Developer Tooling',
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
