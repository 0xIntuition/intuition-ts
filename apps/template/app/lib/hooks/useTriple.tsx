import { client, GET_TRIPLE_QUERY, GetTripleQuery } from '@0xintuition/graphql'

import { useQuery } from '@tanstack/react-query'

export const useTriple = ({
  token,
  tripleId,
}: {
  token: string
  tripleId: number
}) => {
  if (!token) return null

  const { status, error, data, isLoading, isSuccess, isError } = useQuery<
    GetTripleQuery,
    Error
  >({
    queryKey: [token, tripleId],
    queryFn: () =>
      client({ token }).request(GET_TRIPLE_QUERY, {
        tripleId,
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
