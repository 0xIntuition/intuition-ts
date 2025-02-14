import { TripleType } from './triple'

export type ListDetailsType = {
  __typename?: 'query_root'
  globalTriplesAggregate: {
    __typename?: 'triples_aggregate'
    aggregate?: {
      __typename?: 'triples_aggregate_fields'
      count: number
    } | null
  }
  globalTriples: Array<TripleType>
  // Optional user-specific fields from GetListDetailsWithUserQuery
  userTriplesAggregate?: {
    __typename?: 'triples_aggregate'
    aggregate?: {
      __typename?: 'triples_aggregate_fields'
      count: number
    } | null
  }
  userTriples?: Array<TripleType>
}

// Helper function to ensure a list details object matches our type
export function isListDetailsType(obj: unknown): obj is ListDetailsType {
  return Boolean(
    obj &&
      typeof obj === 'object' &&
      obj !== null &&
      'globalTriplesAggregate' in obj &&
      'globalTriples' in obj,
  )
}
