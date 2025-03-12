import {
  fetcher,
  GetSignalsDocument,
  GetSignalsQuery,
  GetSignalsQueryVariables,
} from '@0xintuition/graphql'

import { QueryClient } from '@tanstack/react-query'

export async function getActivity({
  queryClient,
}: {
  queryClient: QueryClient
}) {
  const activityLimit = 10
  const activityOffset = 0

  await queryClient.prefetchQuery({
    queryKey: ['get-signals-global', { activityLimit, activityOffset }],
    queryFn: () =>
      fetcher<GetSignalsQuery, GetSignalsQueryVariables>(GetSignalsDocument, {
        limit: activityLimit,
        offset: activityOffset,
        addresses: [],
        orderBy: [{ block_timestamp: 'desc' }],
      }),
  })

  return { queryKey: ['get-signals-global', { activityLimit, activityOffset }] }
}
