import { useState } from 'react'

import { Text, TextVariant, TextWeight } from '@0xintuition/1ui'
import {
  fetcher,
  GetFeeTransfersDocument,
  GetFeeTransfersQuery,
  GetFeeTransfersQueryVariables,
  useGetFeeTransfersQuery,
} from '@0xintuition/graphql'

import { EarnSection } from '@components/earn-section'
import { LevelIndicator } from '@components/level-indicator'
import { LoadingState } from '@components/loading-state'
import { MasteryCard } from '@components/mastery-card'
import { MasteryPreview } from '@components/mastery-preview'
import { ZERO_ADDRESS } from '@consts/general'
import { calculateLevelAndProgress } from '@consts/levels'
import {
  calculateLevelProgressForIndex,
  CATEGORY_MAX_POINTS,
} from '@consts/points'
import { usePoints } from '@lib/hooks/usePoints'
import { fetchPoints } from '@lib/services/points'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
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
    earnIQ: 100000,
    title: 'Earn IQ with Quests',
    icon: <Scroll className="w-4 h-4" />,
    description: 'Complete quests to obtain IQ reward points',
    buttonText: 'View Quests',
    link: '/quests',
  },
  {
    id: '2',
    title: 'Earn IQ in the Ecosystem',
    icon: <Compass className="w-4 h-4" />,
    description: 'Explore and use apps from our product hub',
    buttonText: 'Explore',
    link: '/discover',
  },
  {
    id: '3',
    title: 'Start Building on Intuition',
    icon: <Code className="w-4 h-4" />,
    description: 'Build your own apps and tools on Intuition',
    buttonText: 'Start Building',
    link: 'https://tech.docs.intuition.systems/',
  },
]

export default function RewardsRoute() {
  const { initialParams } = useLoaderData<typeof loader>()
  const address = initialParams?.address?.toLowerCase()

  const { data: points, isLoading: isLoadingPoints } = usePoints(address)
  const { data: protocolFees, isLoading: isLoadingFees } =
    useGetFeeTransfersQuery({
      address: address ?? ZERO_ADDRESS,
      cutoff_timestamp: 1733356800,
    })
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    'Launchpad',
  )

  const isLoading = isLoadingPoints || isLoadingFees

  if (isLoading) {
    return <LoadingState />
  }

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
      image: '/images/lore/6-choosing-your-path.webp',
      align: 'bottom',
      totalPoints: points?.launchpad_quests_points ?? 0,
      levels: CATEGORY_MAX_POINTS.LAUNCHPAD.map((maxPoints, index) => {
        const categoryPoints = points?.launchpad_quests_points ?? 0
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
      image: '/images/lore/2-3.webp',
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
      image: '/images/lore/3-transcendence.webp',
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
      image: '/images/lore/2-lost-origins.webp',
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
      image: '/images/lore/7-1.webp',
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
      image: '/images/lore/6-1.webp',
      totalPoints: 0,
      levels: CATEGORY_MAX_POINTS.SOCIAL.map((maxPoints) => ({
        points: maxPoints,
        percentage: 0,
        isLocked: true,
      })),
    },
  ]

  return (
    <div className="relative z-10">
      <div className="flex flex-col items-center text-center space-y-4 mb-12">
        <LevelIndicator level={level} progress={progress} />

        <div>
          <Text variant={TextVariant.heading2} weight={TextWeight.semibold}>
            {combinedTotal.toLocaleString()}
          </Text>
          <Text variant={TextVariant.body} className="text-primary/70">
            IQ Points Earned
          </Text>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {actCategories.map((category) => {
          return (
            <MasteryCard
              key={category.name}
              title={category.name}
              progress={
                category.levels.filter((l) => l.percentage === 100).length
              }
              maxProgress={category.levels.length}
              isLocked={category.name === 'Social'}
              isSelected={selectedCategory === category.name}
              onClick={() => setSelectedCategory(category.name)}
              backgroundPattern={category.image}
              align={category.align}
            />
          )
        })}
      </div>

      {selectedCategory && (
        <MasteryPreview
          title={
            actCategories.find((c) => c.name === selectedCategory)?.name ?? ''
          }
          background={
            actCategories.find((c) => c.name === selectedCategory)?.image
          }
          description={getCategoryDescription(selectedCategory)}
          progress={
            actCategories
              .find((c) => c.name === selectedCategory)
              ?.levels.filter((l) => l.percentage === 100).length ?? 0
          }
          maxProgress={
            actCategories.find((c) => c.name === selectedCategory)?.levels
              .length ?? 0
          }
          levels={
            actCategories.find((c) => c.name === selectedCategory)?.levels ?? []
          }
          actionButton={
            selectedCategory === 'Launchpad'
              ? { text: 'Earn More IQ', to: '../quests' }
              : undefined
          }
          totalPoints={
            actCategories.find((c) => c.name === selectedCategory)?.totalPoints
          }
          className="mb-8"
        />
      )}

      <div className="space-y-8">
        <Text
          variant={TextVariant.heading2}
          weight={TextWeight.semibold}
          className="mb-4"
        >
          Ways to Earn
        </Text>
        <EarnSection quests={earnCards} />
      </div>
    </div>
  )
}

function getCategoryDescription(category: string): string {
  switch (category) {
    case 'Launchpad':
      return 'Complete quests and challenges in the Launchpad to earn IQ.'
    case 'Portal':
      return 'Explore and interact with the Portal to earn IQ.'
    case 'Protocol':
      return 'Engage with the protocol and earn IQ through network participation.'
    case 'Relic':
      return 'Discover and collect relics to earn IQ.'
    case 'Community':
      return 'Participate in community events and discussions to earn IQ.'
    case 'Social':
      return 'Connect and share with other members of the community to earn IQ.'
    default:
      return ''
  }
}
