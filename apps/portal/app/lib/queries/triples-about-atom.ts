import {
  Exact,
  fetcher,
  GetTriplesWithPositionsQueryVariables,
  InputMaybe,
  Scalars,
  Triples_Bool_Exp,
  Triples_Order_By,
} from '@0xintuition/graphql'

import { useQuery } from '@tanstack/react-query'

// Define the query document
export const GetTriplesAboutIdentityDocument = `
  query GetTriplesAboutIdentity($limit: Int, $offset: Int, $orderBy: [triples_order_by!], $where: triples_bool_exp, $address: String) {
    total: triples_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    triples(limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
      id
      vault_id
      counter_vault_id
      subject {
      data
        id
        vault_id
        label
        image
        value {
        thing {
          description
        }
        organization {
          description
        }
        person {
          description
        }
      }
      }
      predicate {
      data
        id
        vault_id
        label
        image
        value {
        thing {
          description
        }
        organization {
          description
        }
        person {
          description
        }
      }
      }
      object {
      data
        id
        vault_id
        label
        image
        value {
        thing {
          description
        }
        organization {
          description
        }
        person {
          description
        }
      }
      }
      vault {
        total_shares
        position_count
        positions(where: {account_id: {_eq: $address}}) {
          account {
            id
            label
            image
          }
          shares
        }
      }
      counter_vault {
        total_shares
        position_count
        positions(where: {account_id: {_eq: $address}}) {
          account {
            id
            label
            image
          }
          shares
        }
      }
    }
  }
`

// Define types for the query variables and response
export type GetTriplesAboutIdentityQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<Triples_Order_By> | Triples_Order_By>
  where?: InputMaybe<Triples_Bool_Exp>
  address?: InputMaybe<Scalars['String']['input']>
}>

export type GetTriplesAboutIdentityQuery = {
  __typename?: 'query_root'
  total: {
    __typename?: 'triples_aggregate'
    aggregate?: {
      __typename?: 'triples_aggregate_fields'
      count: number
    } | null
  }
  triples: Array<{
    __typename?: 'triples'
    id: string
    vault_id: string
    counter_vault_id: string
    subject: {
      __typename?: 'atoms'
      id: string
      vault_id: string
      label?: string | null
      image?: string | null
      data: string
      value: {
        thing: {
          description: string
        }
        organization: {
          description: string
        }
        person: {
          description: string
        }
      }
    }
    predicate: {
      __typename?: 'atoms'
      id: string
      vault_id: string
      label?: string | null
      image?: string | null
      data: string
      value: {
        thing: {
          description: string
        }
        organization: {
          description: string
        }
        person: {
          description: string
        }
      }
    }
    object: {
      __typename?: 'atoms'
      id: string
      vault_id: string
      label?: string | null
      image?: string | null
      data: string
      value: {
        thing: {
          description: string
        }
        organization: {
          description: string
        }
        person: {
          description: string
        }
      }
    }
    vault?: {
      __typename?: 'vaults'
      total_shares: string
      position_count: number
      positions: Array<{
        __typename?: 'positions'
        shares: string
        account?: {
          __typename?: 'accounts'
          id: string
          label: string
          image?: string | null
        } | null
      }>
    } | null
    counter_vault?: {
      __typename?: 'vaults'
      total_shares: string
      position_count: number
      positions: Array<{
        __typename?: 'positions'
        shares: string
        account?: {
          __typename?: 'accounts'
          id: string
          label: string
          image?: string | null
        } | null
      }>
    } | null
  }>
}

// Create the custom hook
export function useGetTriplesAboutIdentityQuery<
  TData = GetTriplesAboutIdentityQuery,
  TError = unknown,
>(
  variables?: GetTriplesWithPositionsQueryVariables,
  options?: Omit<
    Parameters<typeof useQuery<GetTriplesAboutIdentityQuery, TError, TData>>[0],
    'queryKey' | 'queryFn'
  > & {
    queryKey?: string[]
  },
) {
  return useQuery<GetTriplesAboutIdentityQuery, TError, TData>({
    queryKey:
      options?.queryKey ||
      (variables === undefined
        ? ['get-triples-about-identity']
        : ['get-triples-about-identity', variables]),
    queryFn: () =>
      fetcher<
        GetTriplesAboutIdentityQuery,
        GetTriplesAboutIdentityQueryVariables
      >(GetTriplesAboutIdentityDocument, variables)(),
    ...options,
  })
}
