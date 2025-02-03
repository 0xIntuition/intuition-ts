import { Avatar, Button } from '@0xintuition/1ui'
import { fetcher } from '@0xintuition/graphql'

import { AggregateIQ } from '@components/aggregate-iq'
import { ErrorPage } from '@components/error-page'
import { SkillRadarChart } from '@components/skill-radar-chart'
import { useRelicPoints } from '@lib/hooks/useRelicPoints'
import {
  fetchGraphQL,
  GetRelicPointsDocument,
  GetRelicPointsQuery,
  GetRelicPointsQueryVariables,
} from '@lib/services/relics'
import { usePrivy } from '@privy-io/react-auth'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { getUser } from '@server/auth'
import { QueryClient } from '@tanstack/react-query'
import { skills } from 'app/data/mock-rewards'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUser(request)
  const url = new URL(request.url)

  const queryClient = new QueryClient()
  const userAddress = user?.wallet?.address

  // if (userAddress) {
  //   await queryClient.prefetchQuery({
  //     queryKey: ['get-relic-points', { address: userAddress }],
  //     queryFn: () =>
  //       fetchGraphQL<GetRelicPointsQuery, GetRelicPointsQueryVariables>(
  //         GetRelicPointsDocument,
  //         {
  //           address: userAddress,
  //         },
  //       ),
  //   })

  //   // Get the prefetched data from the query client
  //   const prefetchedData = (await queryClient.getQueryData([
  //     'get-relic-points',
  //     { address: userAddress },
  //   ])) as GetRelicPointsQuery | undefined

  //   console.log('Prefetched relic points:', prefetchedData?.relic_points)
  // }

  return json({})
}

export function ErrorBoundary() {
  return <ErrorPage routeName="rewards" />
}

const user = { name: 'JP', avatar: '/placeholder.svg?height=40&width=40' }

export default function Rewards() {
  const { user: privyUser } = usePrivy()
  const userAddress = privyUser?.wallet?.address?.toLowerCase()

  console.log('Component rendering with address:', userAddress)

  const { data: relicPoints, isError, error } = useRelicPoints(userAddress)

  console.log('Hook result:', {
    data: relicPoints,
    isError,
    error,
  })

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
      <AggregateIQ totalIQ={0} />

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
