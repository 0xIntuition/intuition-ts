import { Card, cn, Text, TextVariant } from '@0xintuition/1ui'

import { toRoman } from '@lib/utils/misc'
import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'

interface ActLevel {
  points: number
  percentage: number
  isLocked?: boolean
}

interface ActCategory {
  name: string
  totalPoints: number
  levels: ActLevel[]
}

interface ActsProgressProps {
  categories: ActCategory[]
}

const ProgressBar: React.FC<{ progress: number; isLocked?: boolean }> = ({
  progress,
  isLocked,
}) => (
  <div className="relative flex-1 h-2 bg-[#191919] rounded-full overflow-hidden">
    <motion.div
      className={cn('h-full rounded-full', {
        'bg-gradient-to-r from-success to-success/70': !isLocked,
        'bg-muted': isLocked,
      })}
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    />
  </div>
)

const LevelRow: React.FC<{
  level: number
  points: number
  percentage: number
  isLocked?: boolean
}> = ({ level, percentage, isLocked }) => (
  <div className="flex items-center gap-4 py-2">
    <motion.div
      className="flex flex-col items-center gap-1"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
    >
      <div
        className={cn(
          'w-10 h-10 rounded-md flex items-center justify-center z-10 text-primary primary-gradient-subtle border border-border/10',
          {
            'border-success/80': percentage === 100,
            'opacity-50': isLocked || percentage === 0,
          },
        )}
      >
        <div
          className={cn(
            'w-full h-full rounded-md flex items-center justify-center',
            {
              'bg-success/50': percentage === 100,
            },
          )}
        >
          {isLocked ? (
            <Lock className="w-4 h-4 text-muted-foreground" />
          ) : (
            <span className="font-medium font-serif">{toRoman(level)}</span>
          )}
        </div>
      </div>
    </motion.div>

    <div className="flex-1 flex items-center gap-4">
      {/* <Text
        variant={TextVariant.body}
        className={cn({
          'text-muted-foreground': isLocked || percentage === 0,
        })}
      >
        {isLocked ? 'Locked' : `${truncateNumber(points)}`}
      </Text> */}

      <ProgressBar progress={percentage} isLocked={isLocked} />

      <Text
        variant={TextVariant.body}
        className={cn('w-10 text-right', {
          'text-muted-foreground': isLocked || percentage === 0,
        })}
      >
        {percentage}%
      </Text>
    </div>
  </div>
)

const CategorySection: React.FC<ActCategory> = ({
  name,
  totalPoints,
  levels,
}) => (
  <div className="space-y-2 min-w-[300px]">
    <div className="flex items-baseline justify-between">
      <Text variant={TextVariant.headline}>{name}</Text>
      <Text variant={TextVariant.body} className="text-primary/70">
        {totalPoints.toLocaleString()} IQ Earned
      </Text>
    </div>

    <div className="space-y-1">
      {levels.map((level, index) => (
        <LevelRow
          key={index}
          level={index + 1}
          points={level.points}
          percentage={level.percentage}
          isLocked={level.isLocked}
        />
      ))}
    </div>
  </div>
)

export const ActsProgress: React.FC<ActsProgressProps> = ({ categories }) => (
  <Card className="p-6 bg-white/5 backdrop-blur-md backdrop-saturate-150 border border-border/10">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {categories.map((category, index) => (
        <CategorySection key={index} {...category} />
      ))}
    </div>
  </Card>
)
