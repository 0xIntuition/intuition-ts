import { useEffect, useState } from 'react'

import {
  Card,
  CardContent,
  Text,
  TextVariant,
  TextWeight,
} from '@0xintuition/1ui'

import { motion, useAnimation } from 'framer-motion'
import { Award, BrainCircuit, Calendar, Sparkle } from 'lucide-react'

interface AggregateIQProps {
  totalIQ: number
}

export function AggregateIQ({ totalIQ }: AggregateIQProps) {
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
      <Card className="flex flex-row w-full gap-6 p-6 rounded-lg theme-border bg-secondary/5 backdrop-blur-md backdrop-saturate-150 border border-white/10">
        <div className="absolute inset-0 shadow-inner-pop" />
        <CardContent className="relative p-0 w-full">
          <motion.div
            className="flex items-start gap-4 mb-6"
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
            className="relative flex flex-row gap-4 pb-6"
            animate={controls}
          >
            <div className="p-3 rounded-xl bg-analytics-copper/10 shadow-pop-lg">
              <BrainCircuit className="w-12 h-12 text-analytics-copper" />
            </div>
            <Text variant={TextVariant.heading2} weight={TextWeight.bold}>
              {count.toLocaleString()}
            </Text>
          </motion.div>
          <div className="mt-6 grid grid-cols-3 gap-4 w-full">
            {[
              {
                label: 'Daily Gain',
                icon: <Sparkle className="w-4 h-4" />,
                value: '+124',
                subtext: '+25% in the last month',
              },
              {
                label: 'Weekly Average',
                icon: <Calendar className="w-4 h-4" />,
                value: '+892',
                subtext: '+10% in the last month',
              },
              {
                label: 'Rank',
                icon: <Award className="w-4 h-4" />,
                value: '#42',
                subtext: '+2 in the last month',
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-analytics-white p-4 shadow-pop-lg border-t border-border/10"
              >
                <div className="text-sm text-analytics-shadow/60 mb-1 flex items-center gap-2">
                  {stat.icon} {stat.label}
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Text
                    variant={TextVariant.headline}
                    weight={TextWeight.semibold}
                  >
                    {stat.value}
                  </Text>
                  <Text variant={TextVariant.small} className="text-primary/50">
                    {stat.subtext}
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
