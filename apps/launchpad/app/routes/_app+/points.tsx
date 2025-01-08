import {
  AggregatedMetrics,
  PageHeader,
  Text,
  TextVariant,
  TextWeight,
} from '@0xintuition/1ui'
import { UsersService } from '@0xintuition/api'
import {
  fetcher,
  GetFeeTransfersDocument,
  GetFeeTransfersQuery,
  GetFeeTransfersQueryVariables,
  useGetFeeTransfersQuery,
} from '@0xintuition/graphql'

import { requireWallet } from '@lib/auth'
import logger from '@lib/utils/logger'
import { invariant } from '@lib/utils/misc'
import {
  calculateProtocolPoints,
  POINTS_CUTOFF_TIMESTAMP,
} from '@lib/utils/points'
import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { fetchRelicCounts } from 'app/lib/services/relics'

import { fetchWrapper } from '../../.server/api'

export async function loader({ request }: LoaderFunctionArgs) {
  const { wallet } = await requireWallet(request)
  logger('wallet', wallet)
  logger('request', request)

  invariant(wallet, 'Wallet is required')
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['get-fee-transfers-user'],
    queryFn: () =>
      fetcher<GetFeeTransfersQuery, GetFeeTransfersQueryVariables>(
        GetFeeTransfersDocument,
        {
          address: wallet.toLowerCase(),
          cutoff_timestamp: POINTS_CUTOFF_TIMESTAMP,
        },
      ),
  })

  const [relicCounts] = await Promise.all([
    fetchRelicCounts(wallet.toLowerCase()),
  ])

  // This is using legacy API. TODO: Update to use GraphQL when these are available.
  const userTotals = await fetchWrapper({
    method: UsersService.getUserTotals,
    args: {
      id: wallet.toLowerCase(),
    },
  })

  return {
    wallet,
    dehydratedState: dehydrate(queryClient),
    relicHoldCount: relicCounts.holdCount,
    mintCount: relicCounts.mintCount,
    userTotals,
  }
}

export default function Points() {
  const { wallet, relicHoldCount, mintCount, userTotals } =
    useLoaderData<typeof loader>()
  const { data: feeData } = useGetFeeTransfersQuery(
    {
      address: wallet.toLowerCase(),
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
                { label: 'Portal', value: userTotals?.quest_points ?? '0' },
                {
                  label: 'Protocol',
                  value: protocolPoints?.totalPoints ?? '0',
                },
                { label: 'NFT', value: totalNftPoints },
                {
                  label: 'Referrals',
                  value: userTotals?.referral_points ?? '0',
                  hideOnMobile: true,
                },
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
