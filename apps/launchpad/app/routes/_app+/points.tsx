import {
  AggregatedMetrics,
  PageHeader,
  Text,
  TextVariant,
  TextWeight,
} from '@0xintuition/1ui'
import {
  calculateProtocolPoints,
  fetcher,
  GetFeeTransfersDocument,
  GetFeeTransfersQuery,
  GetFeeTransfersQueryVariables,
  POINTS_CUTOFF_TIMESTAMP,
  useGetFeeTransfersQuery,
} from '@0xintuition/graphql'

import logger from '@lib/utils/logger'
import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { fetchRelicCounts } from 'app/lib/services/relics'

export async function loader({ request }: LoaderFunctionArgs) {
  logger('request', request)

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['get-fee-transfers-user'],
    queryFn: () =>
      fetcher<GetFeeTransfersQuery, GetFeeTransfersQueryVariables>(
        GetFeeTransfersDocument,
        {
          address: '0xB95ca3D3144e9d1DAFF0EE3d35a4488A4A5C9Fc5'.toLowerCase(),
          cutoff_timestamp: POINTS_CUTOFF_TIMESTAMP,
        },
      ),
  })

  const [relicCounts] = await Promise.all([
    fetchRelicCounts(
      '0xB95ca3D3144e9d1DAFF0EE3d35a4488A4A5C9Fc5'.toLowerCase(),
    ),
  ])

  return {
    dehydratedState: dehydrate(queryClient),
    relicHoldCount: relicCounts.holdCount,
    mintCount: relicCounts.mintCount,
  }
}

export default function Points() {
  const { relicHoldCount, mintCount } = useLoaderData<typeof loader>()
  const { data: feeData } = useGetFeeTransfersQuery(
    {
      address: '0xB95ca3D3144e9d1DAFF0EE3d35a4488A4A5C9Fc5'.toLowerCase(),
      cutoff_timestamp: POINTS_CUTOFF_TIMESTAMP,
    },
    {
      queryKey: ['get-fee-transfers-user'],
    },
  )

  const protocolPoints = feeData ? calculateProtocolPoints(feeData) : null
  const nftMintPoints = mintCount * 2000000
  const nftHoldPoints = relicHoldCount * 250000
  const totalNftPoints = nftMintPoints + nftHoldPoints

  return (
    <div className="flex-1 p-10 max-lg:p-6">
      <div className="mx-auto max-w-[1280px] flex flex-col gap-8">
        <PageHeader title="Points" lastUpdated={'3s'} />

        <div className="flex flex-col rounded-xl overflow-hidden theme-border">
          <div className="py-4 bg-gradient-to-b from-[#060504] to-[#101010]">
            <AggregatedMetrics
              metrics={[
                { label: 'Portal', value: '0' },
                {
                  label: 'Protocol',
                  value: protocolPoints?.totalPoints ?? '0',
                },
                { label: 'NFT', value: totalNftPoints },
                { label: 'Referrals', value: '0', hideOnMobile: true },
                { label: 'Community', value: '0' },
              ]}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Text variant={TextVariant.headline} weight={TextWeight.medium}>
            Points Distribution
          </Text>
          {/* Additional points-specific components will go here */}
        </div>
      </div>
    </div>
  )
}
