import { Button, Text, TextVariant } from '@0xintuition/1ui'
import {
  fetcher,
  GetFeeTransfersDocument,
  GetFeeTransfersQuery,
  GetFeeTransfersQueryVariables,
  useGetFeeTransfersQuery,
} from '@0xintuition/graphql'

import { LevelIndicator } from '@components/level-indicator'
import { PageHeader } from '@components/page-header'
import { PointsEarnedCard } from '@components/points-card/points-card'
import { ZERO_ADDRESS } from '@consts/general'
import { usePoints } from '@lib/hooks/usePoints'
import { fetchPoints } from '@lib/services/points'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { getUser } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { formatUnits } from 'viem'

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUser(request)
  const address = user?.wallet?.address?.toLowerCase()
  const queryClient = new QueryClient()

  if (address) {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ['get-points', { address }],
        queryFn: async () => {
          const response = await fetchPoints(address.toLowerCase())
          return response
        },
      }),
      queryClient.prefetchQuery({
        queryKey: ['get-protocol-fees', { address }],
        queryFn: async () => {
          const response = fetcher<
            GetFeeTransfersQuery,
            GetFeeTransfersQueryVariables
          >(GetFeeTransfersDocument, {
            address,
            cutoff_timestamp: 1733356800,
          })
          return response
        },
      }),
    ])
  }

  return json({
    dehydratedState: dehydrate(queryClient),
    initialParams: {
      address,
    },
    level: 12,
  })
}

export default function RewardsRoute() {
  const { initialParams } = useLoaderData<typeof loader>()
  const address = initialParams?.address?.toLowerCase()

  const { data: points } = usePoints(address)
  const { data: protocolFees } = useGetFeeTransfersQuery({
    address: address ?? ZERO_ADDRESS,
    cutoff_timestamp: 1733356800,
  })

  const feesPaidBeforeCutoff = formatUnits(
    protocolFees?.before_cutoff?.aggregate?.sum?.amount ?? 0n,
    18,
  )
  const feesPaidAfterCutoff = formatUnits(
    protocolFees?.after_cutoff?.aggregate?.sum?.amount ?? 0n,
    18,
  )

  const protocolPointsBeforeCutoff =
    Number(feesPaidBeforeCutoff || '0') * 10000000
  const protocolPoitnsAfterCutoff = Number(feesPaidAfterCutoff || '0') * 2000000
  const protocolPointsTotal = Math.round(
    protocolPointsBeforeCutoff + protocolPoitnsAfterCutoff,
  )

  const combinedTotal = (points?.total_points ?? 0) + protocolPointsTotal

  return (
    <>
      <PageHeader title="Rewards" />
      <div className="flex flex-col items-center text-center space-y-4">
        <LevelIndicator level={12} />

        <div>
          <Text variant={TextVariant.heading1} className="text-5xl font-bold">
            {combinedTotal.toLocaleString('en-US', {
              minimumFractionDigits: 2,
            })}
          </Text>
          <Text variant={TextVariant.body} className="text-muted-foreground">
            IQ Points Earned
          </Text>
        </div>

        <Link to="/quests" prefetch="intent">
          <Button variant="secondary" className="mt-4 px-6">
            Earn with Quests
          </Button>
        </Link>
      </div>

      <div className="flex-shrink-0 w-full">
        <PointsEarnedCard
          totalPoints={combinedTotal}
          activities={[
            {
              name: 'Launchpad',
              points: points?.launchpad_quests ?? 0,
            },
            {
              name: 'Portal',
              points: points?.portal_quests ?? 0,
            },
            {
              name: 'Protocol',
              points: protocolPointsTotal,
            },
            {
              name: 'Relic',
              points: points?.relic_points ?? 0,
            },
            {
              name: 'Referrals',
              points: points?.referral_points ?? 0,
            },
            {
              name: 'Community',
              points: 0,
              disabled: true,
            },
            {
              name: 'Social',
              points: 0,
              disabled: true,
            },
          ]}
        />
      </div>
    </>
  )
}
