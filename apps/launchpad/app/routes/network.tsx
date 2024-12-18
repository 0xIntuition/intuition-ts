import {
  fetcher,
  GetStatsDocument,
  GetStatsQuery,
  GetStatsQueryVariables,
  useGetStatsQuery,
} from '@0xintuition/graphql'

import logger from '@lib/utils/logger'
import { LoaderFunctionArgs } from '@remix-run/node'
import { dehydrate, QueryClient } from '@tanstack/react-query'

export async function loader({ request }: LoaderFunctionArgs) {
  logger('request', request)
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['get-stats'],
    queryFn: () =>
      fetcher<GetStatsQuery, GetStatsQueryVariables>(GetStatsDocument, {}),
  })

  return {
    dehydratedState: dehydrate(queryClient),
  }
}

export default function Network() {
  const { data: systemStats } = useGetStatsQuery(
    {},
    {
      queryKey: ['get-stats'],
    },
  )
  logger('systemStats', systemStats)
  return <div>Network Page</div>
}
