import { Button, Text, TextVariant, TextWeight } from '@0xintuition/1ui'
import {
  fetcher,
  GetFeeTransfersDocument,
  GetFeeTransfersQuery,
  GetFeeTransfersQueryVariables,
  useGetFeeTransfersQuery,
} from '@0xintuition/graphql'

import { EarnSection } from '@components/earn-section'
import { LevelIndicator } from '@components/level-indicator'
import { PageHeader } from '@components/page-header'
import { ActsProgress } from '@components/points-card/acts-progress'
import { ZERO_ADDRESS } from '@consts/general'
import { calculateLevelAndProgress } from '@consts/levels'
import {
  calculateLevelProgressForIndex,
  CATEGORY_MAX_POINTS,
} from '@consts/points'
import { usePoints } from '@lib/hooks/usePoints'
import { fetchPoints } from '@lib/services/points'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { getUser } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { Code, Compass, Scroll } from 'lucide-react'
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

const earnCards = [
  {
    id: '1',
    earnIQ: 500,
    title: 'Earn IQ with Quests',
    icon: <Scroll className="w-4 h-4" />,
    description: 'Complete quests to obtain IQ reward points',
    buttonText: 'View Quests',
  },
  {
    id: '2',
    earnIQ: 750,
    title: 'Earn IQ in the Ecosystem',
    icon: <Compass className="w-4 h-4" />,
    description: 'Explore and use apps from our product hub',
    buttonText: 'Explore',
  },
  {
    id: '3',
    earnIQ: 1250,
    title: 'Start Building on Intuition',
    icon: <Code className="w-4 h-4" />,
    description: 'Build your own apps and tools on Intuition',
    buttonText: 'Start Building',
  },
]

export default function RewardsRoute() {
  const { initialParams } = useLoaderData<typeof loader>()
  const address = initialParams?.address?.toLowerCase()

  const { data: points } = usePoints(address)
  const { data: protocolFees } = useGetFeeTransfersQuery({
    address: address ?? ZERO_ADDRESS,
    cutoff_timestamp: 1733356800,
  })

  console.log('points', points)

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

  const { level, progress } = calculateLevelAndProgress(combinedTotal)

  const actCategories = [
    {
      name: 'Launchpad',
      totalPoints: points?.launchpad_quests ?? 0,
      levels: CATEGORY_MAX_POINTS.LAUNCHPAD.map((maxPoints, index) => {
        const categoryPoints = points?.launchpad_quests ?? 0
        return {
          points: maxPoints,
          percentage: calculateLevelProgressForIndex(
            categoryPoints,
            index,
            CATEGORY_MAX_POINTS.LAUNCHPAD,
          ),
          isLocked: false,
        }
      }),
    },
    {
      name: 'Portal',
      totalPoints: points?.portal_quests ?? 0,
      levels: CATEGORY_MAX_POINTS.PORTAL.map((maxPoints, index) => {
        const categoryPoints = points?.portal_quests ?? 0
        return {
          points: maxPoints,
          percentage: calculateLevelProgressForIndex(
            categoryPoints,
            index,
            CATEGORY_MAX_POINTS.PORTAL,
          ),
          isLocked: false,
        }
      }),
    },
    {
      name: 'Protocol',
      totalPoints: protocolPointsTotal,
      levels: CATEGORY_MAX_POINTS.PROTOCOL.map((maxPoints, index) => {
        return {
          points: maxPoints,
          percentage: calculateLevelProgressForIndex(
            protocolPointsTotal,
            index,
            CATEGORY_MAX_POINTS.PROTOCOL,
          ),
          isLocked: false,
        }
      }),
    },
    {
      name: 'Relic',
      totalPoints: points?.relic_points ?? 0,
      levels: CATEGORY_MAX_POINTS.RELIC.map((maxPoints, index) => {
        const categoryPoints = points?.relic_points ?? 0
        return {
          points: maxPoints,
          percentage: calculateLevelProgressForIndex(
            categoryPoints,
            index,
            CATEGORY_MAX_POINTS.RELIC,
          ),
          isLocked: false,
        }
      }),
    },
    {
      name: 'Community',
      totalPoints: points?.community ?? 0,
      levels: CATEGORY_MAX_POINTS.COMMUNITY.map((maxPoints, index) => {
        const categoryPoints = points?.community ?? 0
        return {
          points: maxPoints,
          percentage: calculateLevelProgressForIndex(
            categoryPoints,
            index,
            CATEGORY_MAX_POINTS.COMMUNITY,
          ),
          isLocked: false,
        }
      }),
    },
    {
      name: 'Social',
      totalPoints: 0,
      levels: CATEGORY_MAX_POINTS.SOCIAL.map((maxPoints) => ({
        points: maxPoints,
        percentage: 0,
        isLocked: true,
      })),
    },
  ]

  return (
    <>
      <PageHeader title="Rewards" />
      <div className="flex flex-col items-center text-center space-y-4">
        <LevelIndicator level={level} progress={progress} />

        <div>
          <Text variant={TextVariant.heading1} weight={TextWeight.semibold}>
            {combinedTotal.toLocaleString()}
          </Text>
          <Text variant={TextVariant.body} className="text-primary/70">
            IQ Points Earned
          </Text>
        </div>

        <Link to="/quests" prefetch="intent">
          <Button variant="secondary" className="mt-4 px-6">
            Earn with Quests
          </Button>
        </Link>
      </div>

      <div className="flex-shrink-0 w-full space-y-8">
        <ActsProgress categories={actCategories} />
        <EarnSection quests={earnCards} />
      </div>
    </>
  )
}
