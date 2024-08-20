import { ChainEnv, DEFAULT_CHAIN_ENV } from './environment'
import logger from './logger'

export type SpecialObjectConfig = {
  id: string
  vaultId: number
  displayName?: string
  type: 'identity' | 'claim'
}

export type SpecialPredicateMap = {
  tagPredicate: SpecialObjectConfig
  iPredicate: SpecialObjectConfig
  amFollowingPredicate: SpecialObjectConfig
  thingPredicate: SpecialObjectConfig
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
