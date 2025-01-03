export type AtomType = 'Thing' | 'Person' | 'Account' | 'Organization' | 'Book'

export interface AtomValue {
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
}

export interface Creator {
  id: string
  label: string
  image?: string
}

export interface VaultPosition {
  id: string
  account: {
    id: string
    label: string
  }
  shares: string
}

export interface AtomVault {
  total_shares: string
  current_share_price: string
  position_count: number
  positions: VaultPosition[]
  positions_aggregate: {
    aggregate: {
      count: number
      sum: {
        shares: string
      }
    }
  }
}

export interface Atom {
  id: string
  vault_id: string
  label: string
  type: AtomType
  image?: string
  emoji?: string
  data?: string
  wallet_id?: string
  value?: AtomValue
  vault?: AtomVault
  creator?: Creator
  block_timestamp?: string
  transaction_hash?: string
  stake: number // For visualization purposes
}

export interface Triple {
  id: string
  subject_id: string
  predicate_id: string
  object_id: string
  vault_id: string
  counter_vault_id: string
  subject: Atom
  predicate: Atom
  object: Atom
  vault: AtomVault
  counter_vault: AtomVault
  creator?: Creator
  block_timestamp?: string
  transaction_hash?: string
  stake: number // For visualization purposes
}

export interface Staker {
  id: string
  address: string
  stake: number
}

export interface KnowledgeGraphData {
  atoms: Atom[]
  predicates: Atom[]
  triples: Array<{
    id: string
    subject_id: string
    predicate_id: string
    object_id: string
    vault_id: string
    counter_vault_id: string
    subject: Atom
    predicate: Atom
    object: Atom
    vault: AtomVault
    counter_vault: AtomVault
    creator: Creator
    block_timestamp: string
    transaction_hash: string
    stake: number
  }>
  stakers: Staker[]
}
