import { useEffect, useState } from 'react'

import { Card, CardContent } from '@0xintuition/1ui'

import { motion, useAnimation } from 'framer-motion'
import { Sparkles } from 'lucide-react'

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
      <Card className="rounded-lg overflow-hidden bg-background border border-border/10">
        <div className="absolute inset-0 bg-gradient-subtle opacity-70" />
        <div className="absolute inset-0 shadow-inner-pop" />
        <CardContent className="p-10 relative">
          <motion.div
            className="flex items-start gap-4 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="p-3 rounded-xl bg-analytics-copper/10 shadow-pop-lg">
              <Sparkles className="w-6 h-6 text-analytics-copper" />
            </div>
            <div>
              <h3
                className="text-2xl font-semibold text-analytics-shadow mb-1"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
              >
                Total Intuition IQ
              </h3>
              <p className="text-analytics-shadow/60">Across all skill trees</p>
            </div>
          </motion.div>

          <motion.div className="relative" animate={controls}>
            <span
              className="text-7xl font-bold tracking-tight"
              style={{
                background:
                  'linear-gradient(to right, var(--gradient-start, #E5E5E5), var(--gradient-end, #F59E11 ))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              {count.toLocaleString()}
            </span>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { label: 'Daily Gain', value: '+124' },
                { label: 'Weekly Average', value: '+892' },
                { label: 'Rank', value: '#42' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-analytics-white p-4 rounded-xl shadow-pop-lg"
                >
                  <div className="text-sm text-analytics-shadow/60 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-lg font-semibold text-analytics-copper">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
