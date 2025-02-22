import { useEffect, useState } from 'react'

import {
  Card,
  CardContent,
  cn,
  Text,
  TextVariant,
  TextWeight,
} from '@0xintuition/1ui'

import { motion, useAnimation } from 'framer-motion'
import { Award, BrainCircuit, ListCheck, Sparkle } from 'lucide-react'

interface AggregateIQProps {
  totalIQ: number
  address?: string
  rank?: number
  totalUsers?: number
  earnedIQ?: number
  totalCompletedQuestions?: number
}

export function AggregateIQ({
  totalIQ,
  address,
  rank,
  totalUsers,
  earnedIQ,
  totalCompletedQuestions,
}: AggregateIQProps) {
  const [count, setCount] = useState(0)
  const controls = useAnimation()

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = totalIQ / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= totalIQ) {
        clearInterval(timer)
        setCount(totalIQ)
        controls.start({ scale: [1, 1.05, 1], transition: { duration: 0.3 } })
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [totalIQ, controls])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card className="flex flex-row w-full gap-4 sm:gap-6 rounded-lg bg-white/5 backdrop-blur-md backdrop-saturate-150 p-4 sm:p-6 border border-border/10">
        <div className="absolute inset-0 shadow-inner-pop" />
        <CardContent className="relative p-0 w-full">
          <motion.div
            className="flex items-start gap-4 mb-4 sm:mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div>
              <Text
                variant={TextVariant.headline}
                weight={TextWeight.semibold}
                className="mb-1"
              >
                Total Intuition IQ
              </Text>
              <Text variant={TextVariant.body} className="text-primary/50">
                Across all skill trees
              </Text>
            </div>
          </motion.div>

          <motion.div
            className="relative flex flex-row gap-4 pb-4 sm:pb-6"
            animate={controls}
          >
            <motion.div
              className={cn('flex items-center gap-4', !address && 'blur-sm')}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-2 sm:p-3 rounded-xl bg-analytics-copper/10 shadow-pop-lg">
                <BrainCircuit className="w-8 h-8 sm:w-12 sm:h-12 text-analytics-copper" />
              </div>
              <Text variant={TextVariant.heading2} weight={TextWeight.bold}>
                {count.toLocaleString()}
              </Text>
            </motion.div>
          </motion.div>
          <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full">
            {[
              {
                label: 'IQ Earned on Launchpad',
                icon: <Sparkle className="w-4 h-4" />,
                value: earnedIQ ?? 0,
                subtext: '+25% in the last month',
              },
              {
                label: 'Questions Completed',
                icon: <ListCheck className="w-4 h-4" />,
                value: totalCompletedQuestions ?? 0,
                subtext: '+10% in the last month',
              },
              {
                label: 'Launchpad Rank',
                icon: <Award className="w-4 h-4" />,
                value: rank ?? 0,
                subtext: totalUsers
                  ? `Top ${Math.round(((rank ?? 0) / totalUsers) * 100)}%`
                  : 'Not ranked',
              },
            ].map((metric) => (
              <div
                key={metric.label}
                className="bg-analytics-white p-3 sm:p-4 shadow-pop-lg border-t border-border/10"
              >
                <div className="text-sm text-analytics-shadow/60 mb-1 flex items-center gap-2">
                  {metric.icon} {metric.label}
                </div>
                <div
                  className={cn(
                    'flex flex-row items-center gap-2',
                    !address && 'blur-sm',
                  )}
                >
                  <Text
                    variant={TextVariant.headline}
                    weight={TextWeight.semibold}
                  >
                    {metric.value}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
