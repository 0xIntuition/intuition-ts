import { AtomType } from './atom'
import { VaultType } from './vault'

export type TripleType = {
  __typename?: 'triples'
  term_id: string | number
  counter_term_id?: string | number

  // Transaction data (from TripleMetadata/TripleTxn)
  subject_id?: string | number
  predicate_id?: string | number
  object_id?: string | number
  block_number?: string | number
  created_at?: string
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

  // Term with vault data (from TripleMetadata/TripleVaultDetails)
  term?: {
    vaults?: Array<{
      total_shares?: string | number
      current_share_price?: string | number
      position_count?: number
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
    }>
  }
  counter_term?: {
    vaults?: Array<{
      total_shares?: string | number
      current_share_price?: string | number
      position_count?: number
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
    'term_id' in obj &&
    'subject' in obj &&
    'predicate' in obj &&
    'object' in obj,
  )
}
