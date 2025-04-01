import {
  Atoms_Bool_Exp,
  Atoms_Order_By,
  Exact,
  fetcher,
  InputMaybe,
  Triples_Bool_Exp,
} from '@0xintuition/graphql'

import { useQuery } from '@tanstack/react-query'

// Define the query document
export const GetListsDocument = `
query GetLists(
  $where: atoms_bool_exp
  $triplesWhere: triples_bool_exp
  $limit: Int
  $offset: Int
  $orderBy: [atoms_order_by!]
) {
  atoms_aggregate(where: $where) {
    aggregate {
      count
    }
  }
  atoms(
    where: $where
    limit: $limit
    offset: $offset
    order_by: $orderBy
  ) {
    id
    label
    image
    as_object_triples_aggregate(where: $triplesWhere) {
      aggregate {
        count
      }
    }
  }
}
`

// Define types for the query variables and response
export type GetListsQueryVariables = Exact<{
  where?: InputMaybe<Atoms_Bool_Exp>
  triplesWhere?: InputMaybe<Triples_Bool_Exp>
  limit?: InputMaybe<number>
  offset?: InputMaybe<number>
  orderBy?: InputMaybe<Array<Atoms_Order_By>>
}>

export type GetListsQuery = {
  __typename?: 'query_root'
  atoms_aggregate: {
    __typename?: 'atoms_aggregate'
    aggregate?: {
      __typename?: 'atoms_aggregate_fields'
      count: number
    } | null
  }
  atoms: Array<{
    __typename?: 'atoms'
    id: string
    label?: string | null
    image?: string | null
    as_object_triples_aggregate: {
      __typename?: 'triples_aggregate'
      aggregate?: {
        __typename?: 'triples_aggregate_fields'
        count: number
      } | null
    }
  }>
}

// Create the custom hook
export function useGetListsQuery<TData = GetListsQuery, TError = unknown>(
  variables?: GetListsQueryVariables,
  options?: Omit<
    Parameters<typeof useQuery<GetListsQuery, TError, TData>>[0],
    'queryKey' | 'queryFn'
  > & {
    queryKey?: string[]
  },
) {
  return useQuery<GetListsQuery, TError, TData>({
    queryKey:
      options?.queryKey ||
      (variables === undefined ? ['get-lists'] : ['get-lists', variables]),
    queryFn: () =>
      fetcher<GetListsQuery, GetListsQueryVariables>(
        GetListsDocument,
        variables,
      )(),
    ...options,
  })
}
