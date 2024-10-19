import {
  client,
  GET_TRIPLES_QUERY,
  GetTriplesQuery,
} from '@0xintuition/graphql'

import { useQuery } from '@tanstack/react-query'

const DEFAULT_LIMIT = 30

const where = (filterString?: string) => ({
  _and: {
    ...(filterString && {
      _or: [{ subject: { label: { _ilike: `%${filterString}%` } } }],
    }),
  },
})

export const useTriples = ({
  token,
  filterString,
}: {
  token: string
  filterString?: string
}) => {
  if (!token) return null

  const { status, error, data, isLoading, isSuccess, isError } = useQuery<
    GetTriplesQuery,
    Error
  >({
    queryKey: [token, { filterString }],
    queryFn: () =>
      client({ token }).request(GET_TRIPLES_QUERY, {
        limit: DEFAULT_LIMIT,
        offset: 0,
        where: where(filterString),
      }),
  })

  return {
    status,
    error,
    isSuccess,
    data,
    isLoading,
    isError,
  }
}
