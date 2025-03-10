import {
  fetcher,
  GetStatsDocument,
  GetStatsQuery,
  GetStatsQueryVariables,
} from '@0xintuition/graphql'

import { QueryClient } from '@tanstack/react-query'

export async function getSystemStats({
  queryClient,
}: {
  queryClient: QueryClient
}) {
  await queryClient.prefetchQuery({
    queryKey: ['get-stats'],
    queryFn: () =>
      fetcher<GetStatsQuery, GetStatsQueryVariables>(GetStatsDocument, {}),
  })
  return { queryKey: ['get-stats'] }
}
