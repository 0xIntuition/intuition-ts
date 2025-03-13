import { AtomType } from './atom'
import { VaultType } from './vault'

export type TripleType = {
  __typename?: 'triples'
  id: string | number
  vault_id: string | number
  counter_vault_id: string | number

  // Transaction data (from TripleMetadata/TripleTxn)
  subject_id?: string | number
  predicate_id?: string | number
  object_id?: string | number
  block_number?: string | number
  block_timestamp?: string | number
  transaction_hash?: string
  creator_id?: string

  // Entity data
  subject: AtomType
  predicate: AtomType
  object: AtomType
  creator?: {
    id: string
    label?: string | null
    image?: string | null
  }

  // Vault data
  vault?: VaultType & {
    allPositions?: {
      aggregate?: {
        count: number
        sum?: {
          shares: string | number
        }
      }
    }
    positions_aggregate?: {
      aggregate?: {
        count: number
        sum?: {
          shares: string | number
        }
      }
    }
    positions?: Array<{
      id?: string | number
      account: {
        id: string
        label?: string | null
        image?: string | null
      }
      shares: string | number
    }>
  }
  counter_vault?: VaultType & {
    allPositions?: {
      aggregate?: {
        count: number
        sum?: {
          shares: string | number
        }
      }
    }
    positions_aggregate?: {
      aggregate?: {
        count: number
        sum?: {
          shares: string | number
        }
      }
    }
    positions?: Array<{
      id?: string | number
      account: {
        id: string
        label?: string | null
        image?: string | null
      }
      shares: string | number
    }>
  }

  // Claim-specific fields
  user_conviction_for?: string
  user_conviction_against?: string
  for_conviction_price?: string
  against_conviction_price?: string
  user_assets_for?: string
  user_assets_against?: string
}

// Helper type for arrays of triples
export type TripleArrayType = Array<TripleType>

// Helper function to ensure a triple matches our type
export function isTripleType(obj: unknown): obj is TripleType {
  return Boolean(
    obj &&
      typeof obj === 'object' &&
      obj !== null &&
      'id' in obj &&
      'vault_id' in obj &&
      'counter_vault_id' in obj,
  )
}
