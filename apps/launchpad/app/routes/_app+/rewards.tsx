import { Avatar, Button } from '@0xintuition/1ui'
import {
  fetcher,
  GetFeeTransfersDocument,
  GetFeeTransfersQuery,
  GetFeeTransfersQueryVariables,
  useGetFeeTransfersQuery,
} from '@0xintuition/graphql'

import { AggregateIQ } from '@components/aggregate-iq'
import { ErrorPage } from '@components/error-page'
import { SkillRadarChart } from '@components/skill-radar-chart'
import { ZERO_ADDRESS } from '@consts/general'
import { usePoints } from '@lib/hooks/usePoints'
import { useRelicPoints } from '@lib/hooks/useRelicPoints'
import { fetchPoints, fetchRelicPoints } from '@lib/services/points'
import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getUser } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { skills } from 'app/data/mock-rewards'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { formatUnits } from 'viem'

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUser(request)
  const address = user?.wallet?.address?.toLowerCase()

  const url = new URL(request.url)
  const activityLimit = parseInt(url.searchParams.get('activityLimit') || '10')
  const activityOffset = parseInt(url.searchParams.get('activityOffset') || '0')

  const queryClient = new QueryClient()

  if (address) {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ['get-relic-points', { address }],
        queryFn: async () => {
          const response = await fetchRelicPoints(address.toLowerCase())
          return response
        },
      }),
      queryClient.prefetchQuery({
        queryKey: ['get-points', { address }],
        queryFn: async () => {
          const response = await fetchPoints(address.toLowerCase())
          return response
        },
      }),
      await queryClient.prefetchQuery({
        queryKey: ['get-protocol-fees', { address }],
        queryFn: async () => {
          const response = await fetcher<
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

  return {
    dehydratedState: dehydrate(queryClient),
    initialParams: {
      address,
      activityLimit,
      activityOffset,
    },
  }
}

export function ErrorBoundary() {
  return <ErrorPage routeName="rewards" />
}

const user = { name: 'JP', avatar: '' }

export default function Rewards() {
  const { initialParams } = useLoaderData<typeof loader>()
  const address = initialParams?.address?.toLowerCase()

  const { data: points } = usePoints(address)
  const { data: relicPoints } = useRelicPoints(address)

  const { data: protocolFees } = useGetFeeTransfersQuery({
    address: address ?? ZERO_ADDRESS,
    cutoff_timestamp: 1733356800,
  })

  const feesPaidBeforeCutoff = formatUnits(
    protocolFees?.before_cutoff?.aggregate?.sum?.amount,
    18,
  )
  const feesPaidAfterCutoff = formatUnits(
    protocolFees?.after_cutoff?.aggregate?.sum?.amount,
    18,
  )
  const protocolPointsBeforeCutoff = Number(feesPaidBeforeCutoff) * 10000000
  const protocolPoitnsAfterCutoff = Number(feesPaidAfterCutoff) * 2000000
  const protocolPointsTotal = Math.round(
    protocolPointsBeforeCutoff + protocolPoitnsAfterCutoff,
  )
  const combinedTotal =
    (relicPoints?.totalPoints ?? 0) +
    (points?.totalPoints ?? 0) +
    protocolPointsTotal

  return (
    <div className="space-y-8 text-foreground p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center border-none bg-gradient-to-br from-[#060504] to-[#101010] rounded-lg p-6 text-palette-neutral-900 shadow-pop-lg"
      >
        <div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold mb-2"
          >
            Welcome back, {user.name}!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg opacity-90"
          >
            Ready to boost your Intuition today?
          </motion.p>
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <Avatar className="w-24 h-24" src={user.avatar} name={user.name} />
        </motion.div>
      </motion.div>
      <AggregateIQ totalIQ={combinedTotal} />
      <div className="space-y-6 border-none bg-gradient-to-br from-[#060504] to-[#101010] rounded-lg p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Your Skills</h2>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="primary" size="lg">
              View All Skills
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
        <p className="text-lg">
          Master your abilities and unlock your full potential
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center"
        >
          <div className="w-full max-w-2xl">
            <SkillRadarChart skills={skills} />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
