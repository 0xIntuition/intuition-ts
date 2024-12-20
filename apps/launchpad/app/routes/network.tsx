import { NetworkStats, PageHeader, Skeleton } from '@0xintuition/1ui'
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
import { formatUnits } from 'viem'

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

  const stats = systemStats?.stats[0]

  return (
    <div className="flex-1 p-10 max-lg:p-6">
      <div className="mx-auto max-w-[1280px] flex flex-col gap-8">
        <PageHeader title="Network" lastUpdated={'3s'} />
        <div className="flex flex-col rounded-xl overflow-hidden theme-border">
          <Skeleton className="h-[695px] w-full animate-none rounded-b-none" />
          <div className="py-4 bg-gradient-to-b from-[#060504] to-[#101010]">
            <NetworkStats
              tvl={+formatUnits(stats?.contract_balance ?? 0, 18)}
              atomsCount={stats?.total_atoms ?? 0}
              triplesCount={stats?.total_triples ?? 0}
              signalsCount={stats?.total_signals ?? 0}
              usersCount={stats?.total_accounts ?? 0}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
