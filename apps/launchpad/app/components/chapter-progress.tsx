import { Card, cn, Text, TextVariant } from '@0xintuition/1ui'

import { motion } from 'framer-motion'
import { Clock, Lock } from 'lucide-react'

interface ChapterStage {
  status: 'completed' | 'expired' | 'in_progress' | 'locked'
  progress: number
}

interface ChapterProgressProps {
  stages: ChapterStage[]
  currentStageIndex: number
  title: string
  currentChapter?: number
}

export default function ChapterProgress({
  stages,
  currentStageIndex,
  title,
  currentChapter,
}: ChapterProgressProps) {
  // Calculate total progress including expired stages
  const totalProgress = Math.min(
    stages.reduce((acc, stage, index) => {
      const stageWeight = 100 / stages.length
      if (index < currentStageIndex) {
        // Past stages contribute their final progress
        return acc + (stage.progress * stageWeight) / 100
      } else if (index === currentStageIndex) {
        // Current stage contributes its current progress
        return acc + (stage.progress * stageWeight) / 100
      }
      return acc
    }, 0),
    100,
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card className="flex flex-row w-full gap-6 p-6 rounded-lg bg-white/5 backdrop-blur-md backdrop-saturate-150 border border-border/10">
        <motion.div
          className="flex flex-col justify-between items-start min-w-[120px]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="space-y-2 w-full">
            <Text className="text-2xl whitespace-nowrap">
              {title} {currentChapter}
            </Text>
          </div>
          <Text variant={TextVariant.footnote} className="text-primary/70">
            {Math.round(totalProgress)}% Complete
          </Text>
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
                    'w-10 h-10 rounded flex items-center justify-center z-10 text-primary primary-gradient-subtle border border-border/10',
                    {
                      'bg-primary/10 border-success':
                        stage.status === 'completed',
                      'bg-primary/10 border-warning':
                        stage.status === 'expired',
                      'bg-primary/10 border-info':
                        stage.status === 'in_progress',
                      'opacity-50': stage.status === 'locked',
                    },
                  )}
                >
                  {stage.status === 'locked' ? (
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  ) : stage.status === 'expired' ? (
                    <Clock className="w-4 h-4 text-warning" />
                  ) : (
                    <span className="font-medium font-serif">
                      {toRoman(index + 1)}
                    </span>
                  )}
                </div>
                <Text
                  variant={TextVariant.footnote}
                  className={cn('text-center min-h-[1rem] text-xs', {
                    'text-success': stage.status === 'completed',
                    'text-warning': stage.status === 'expired',
                    'text-info': stage.status === 'in_progress',
                    'text-primary/50': stage.status === 'locked',
                  })}
                >
                  {stage.status === 'locked'
                    ? 'Locked'
                    : stage.status === 'expired'
                      ? `${stage.progress}%`
                      : stage.status === 'completed'
                        ? 'Complete'
                        : `${stage.progress}%`}
                </Text>
              </motion.div>
            ))}
          </div>

          {/* Progress Line */}
          <div className="relative h-4 w-full">
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
                <div key={index} className="w-10">
                  <motion.div
                    className={cn('w-2 h-2 rounded-full m-auto', {
                      'bg-success': stage.status === 'completed',
                      'bg-warning': stage.status === 'expired',
                      'bg-primary': stage.status === 'in_progress',
                      'bg-primary/50': stage.status === 'locked',
                      'opacity-0': index === stages.length - 1 || index === 0, // Make last dot invisible
                    })}
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

// Helper function to convert numbers to Roman numerals
function toRoman(num: number): string {
  const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
  return roman[num - 1] || num.toString()
}
