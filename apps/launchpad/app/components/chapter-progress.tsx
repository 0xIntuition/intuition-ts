import { Card, cn, Text } from '@0xintuition/1ui'

import { toRoman } from '@lib/utils/misc'
import { motion } from 'framer-motion'

interface ChapterStage {
  status: 'completed' | 'in_progress' | 'locked'
}

interface ChapterProgressProps {
  stages: ChapterStage[]
  currentStageIndex: number
  title: string
}

export default function ChapterProgress({
  stages,
  currentStageIndex,
  title,
}: ChapterProgressProps) {
  // Calculate total progress based on completed chapters and current chapter
  const totalProgress = Math.min(
    ((currentStageIndex +
      (stages[currentStageIndex]?.status === 'in_progress' ? 0.5 : 0)) /
      (stages.length - 1)) *
      100,
    100,
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card className="flex flex-col sm:flex-row w-full gap-4 sm:gap-6 p-4 sm:p-6 rounded-lg bg-white/5 backdrop-blur-md backdrop-saturate-150 border border-border/10">
        <motion.div
          className="flex flex-col justify-between items-start min-w-[120px]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="space-y-2 w-full">
            <Text className="text-xl sm:text-2xl whitespace-nowrap">
              {title}
            </Text>
          </div>
        </motion.div>

        <motion.div
          className="relative w-full"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Stage Indicators */}
          <div className="flex justify-between mb-3">
            {stages.map((stage, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center gap-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <div
                  className={cn(
                    'w-8 h-8 sm:w-10 sm:h-10 rounded flex items-center justify-center z-10 text-primary primary-gradient-subtle border border-border/10',
                    {
                      'bg-primary/10 border-success':
                        stage.status === 'completed',
                      'bg-primary/10 border-border/10':
                        stage.status === 'in_progress',
                      'opacity-50': stage.status === 'locked',
                    },
                  )}
                >
                  <span className="font-medium font-serif text-sm sm:text-base">
                    {toRoman(index + 1)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Progress Line */}
          <div className="relative h-3 sm:h-4 w-full">
            {/* Background Track */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#000000] to-[#FFFFFF]/10 rounded-full overflow-hidden p-0.5">
              <div className="bg-[#191919] rounded-full h-full w-full overflow-hidden p-0.5">
                {/* Progress Fill */}
                <motion.div
                  className="h-full bg-gradient-to-r from-success to-success/70 rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${totalProgress}%`,
                  }}
                  transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Dot Markers */}
            <div className="absolute inset-0 flex justify-between items-center px-0">
              {stages.map((stage, index) => (
                <div key={index} className="w-8 sm:w-10">
                  <motion.div
                    className={cn(
                      'w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full m-auto',
                      {
                        'bg-success': stage.status === 'completed',
                        'bg-primary': stage.status === 'in_progress',
                        'bg-primary/50': stage.status === 'locked',
                        'opacity-0': index === stages.length - 1 || index === 0, // Make last dot invisible
                      },
                    )}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  )
}
