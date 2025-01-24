import { Avatar, Button } from '@0xintuition/1ui'

import { AggregateIQ } from '@components/aggregate-iq'
import { ErrorPage } from '@components/error-page'
import { SkillRadarChart } from '@components/skill-radar-chart'
import { skills } from '@lib/data/mock-rewards'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

export function ErrorBoundary() {
  return <ErrorPage routeName="rewards" />
}

const totalIQ = skills.reduce((sum, skill) => sum + skill.points, 0)
const user = { name: 'JP', avatar: '/placeholder.svg?height=40&width=40' }

export default function Rewards() {
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
      <AggregateIQ totalIQ={totalIQ} />

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
