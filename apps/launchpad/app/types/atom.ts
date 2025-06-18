import { VaultType } from './vault'

export type AtomValueType = {
  person?: {
    name: string
    image?: string
    description?: string
    url?: string
  }
  thing?: {
    name: string
    image?: string
    description?: string
    url?: string
  }
  organization?: {
    name: string
    image?: string
    description?: string
    url?: string
  }
  account?: {
    label?: string | null
    image?: string | null
  }
}

export type AtomType = {
  __typename?: 'atoms'
  term_id: string | number
  label?: string | null
  data?: string | null
  wallet_id?: string
  image?: string | null
  emoji?: string | null
  type: string
  value?: AtomValueType

  // Transaction data (from AtomMetadata/AtomTxn)
  block_number?: string | number
  created_at?: string
  transaction_hash?: string
  creator_id?: string

  // Creator data
  creator?: {
    id: string
    label?: string | null
    image?: string | null
  }

  // Term with vault data (from AtomVaultDetails)
  term?: {
    total_market_cap?: string | number
    total_assets?: string | number
    vaults?: Array<{
      position_count?: number
      total_shares?: string | number
      current_share_price?: string | number
      positions_aggregate?: {
        aggregate?: {
          count: number
          sum?: {
            shares: string | number
          }
        }
        nodes?: Array<{
          account: {
            id: string
          }
          shares: string | number
        }>
      }
      positions?: Array<{
        id: string | number
        account: {
          id: string
          label?: string | null
        }
        shares: string | number
      }>
    }>
  }

  // Triple relationships (from AtomTriple fragment)
  as_subject_triples?: Array<{
    term_id: string | number
    object: {
      data?: string | null
      term_id: string | number
      image?: string | null
      label?: string | null
      emoji?: string | null
      type: string
      creator?: {
        id: string
        label?: string | null
        image?: string | null
      }
    }
    predicate: {
      data?: string | null
      term_id: string | number
      image?: string | null
      label?: string | null
      emoji?: string | null
      type: string
      creator?: {
        id: string
        label?: string | null
        image?: string | null
      }
    }
  }>
  as_predicate_triples?: Array<{
    term_id: string | number
    subject: {
      data?: string | null
      term_id: string | number
      image?: string | null
      label?: string | null
      emoji?: string | null
      type: string
      creator?: {
        id: string
        label?: string | null
        image?: string | null
      }
    }
    object: {
      data?: string | null
      term_id: string | number
      image?: string | null
      label?: string | null
      emoji?: string | null
      type: string
      creator?: {
        id: string
        label?: string | null
        image?: string | null
      }
    }
  }>
  as_object_triples?: Array<{
    term_id: string | number
    subject: {
      data?: string | null
      term_id: string | number
      image?: string | null
      label?: string | null
      emoji?: string | null
      type: string
      creator?: {
        id: string
        label?: string | null
        image?: string | null
      }
    }
    predicate: {
      data?: string | null
      term_id: string | number
      image?: string | null
      label?: string | null
      emoji?: string | null
      type: string
      creator?: {
        id: string
        label?: string | null
        image?: string | null
      }
    }
  }>
}

// Helper type for arrays of atoms
export type AtomArrayType = Array<AtomType>

// Helper function to ensure an atom matches our type
export function isAtomType(obj: unknown): obj is AtomType {
  return Boolean(
    obj &&
    typeof obj === 'object' &&
    obj !== null &&
    'term_id' in obj &&
    'type' in obj,
  )
}
