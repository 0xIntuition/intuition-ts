import { cn } from '@0xintuition/1ui'

import { motion } from 'framer-motion'

interface CategoryLevel {
  name: string
  maxPoints: number[]
}

const CATEGORY_LEVELS: CategoryLevel[] = [
  {
    name: 'Portal',
    maxPoints: [10000, 30000, 60000, 105000, 135000],
  },
  {
    name: 'Protocol',
    maxPoints: [3000, 10000, 25000, 60000, 100000],
  },
  {
    name: 'NFT',
    maxPoints: [50000, 750000, 2000000, 2750000, 3000000],
  },
  {
    name: 'Community',
    maxPoints: [10000, 250000, 400000, 750000, 1450000],
  },
  {
    name: 'Launchpad',
    maxPoints: [
      15000, 35000, 50000, 80000, 100000, 130000, 160000, 190000, 230000,
      270000, 320000, 370000, 420000, 460000, 500000,
    ],
  },
]

interface LevelProgressProps {
  points: number
  category: string
}

export const LevelProgress: React.FC<LevelProgressProps> = ({
  points,
  category,
}) => {
  const categoryData = CATEGORY_LEVELS.find((c) => c.name === category)
  if (!categoryData) {
    return null
  }

  // Find current level based on points
  const currentLevel =
    categoryData.maxPoints.findIndex((max) => points < max) + 1
  const prevMax =
    currentLevel > 1 ? categoryData.maxPoints[currentLevel - 2] : 0
  const nextMax = categoryData.maxPoints[currentLevel - 1]

  // Calculate progress to next level
  const levelProgress = Math.min(
    ((points - prevMax) / (nextMax - prevMax)) * 100,
    100,
  )

  return (
    <div className="relative h-4 w-full">
      {/* Background Track */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#000000] to-[#FFFFFF]/10 rounded-full overflow-hidden p-0.5">
        <div className="bg-[#191919] rounded-full h-full w-full overflow-hidden p-0.5">
          {/* Progress Fill */}
          <motion.div
            className="h-full bg-gradient-to-r from-success to-success/70 rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: `${levelProgress}%`,
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Level Markers */}
      <div className="absolute inset-0 flex justify-between items-center px-0">
        {Array.from(
          { length: categoryData.maxPoints.length },
          (_, i) => i + 1,
        ).map((level) => (
          <motion.div
            key={level}
            className={cn('w-2 h-2 rounded-full', {
              'bg-success': level <= currentLevel - 1,
              'bg-primary': level === currentLevel,
              'bg-primary/50': level > currentLevel,
            })}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 * level, duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  )
}
