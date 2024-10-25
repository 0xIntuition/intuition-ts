import {
  client,
  GetTripleDocument,
  GetTripleQuery,
  GetTriplesDocument,
} from '@0xintuition/graphql'

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
      client({ token }).request(GetTripleDocument, {
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
