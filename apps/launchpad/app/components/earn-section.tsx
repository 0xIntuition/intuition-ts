import { motion } from 'framer-motion'

import { EarnCard } from './earn-card'

interface Quest {
  id: string
  earnIQ?: number
  title: string
  icon: React.ReactNode
  description: string
  buttonText: string
  link: string
}

interface EarnSectionProps {
  quests: Quest[]
}

export const EarnSection = ({ quests }: EarnSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {quests.map((quest) => (
          <motion.div
            key={quest.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <EarnCard
              title={quest.title}
              icon={quest.icon}
              description={quest.description}
              earnIQ={quest.earnIQ}
              buttonText={quest.buttonText}
              link={quest.link}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
