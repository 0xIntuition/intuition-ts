import { Card, cn, Text, TextVariant } from '@0xintuition/1ui'

import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'

interface EpochProgress {
  completion_percentage: number
  completed_count: number
  total_count: number
  total_points: number
}

interface EpochProgressProps {
  epochs: EpochProgress[]
  currentEpochIndex: number
}

// Helper function to convert numbers to Roman numerals
function toRoman(num: number): string {
  const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
  return roman[num - 1] || num.toString()
}

export default function EpochProgress({
  epochs,
  currentEpochIndex,
}: EpochProgressProps) {
  const totalEpochs = epochs.length
  const currentProgress = epochs[currentEpochIndex]?.completion_percentage ?? 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card className="flex flex-row w-full gap-6 p-6 rounded-lg bg-white/5 backdrop-blur-md backdrop-saturate-150 border border-border/10">
        <motion.div
          className="flex flex-col justify-between items-start"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="space-y-2">
            <Text className="text-2xl">Chapters</Text>
          </div>
          <Text variant={TextVariant.footnote} className="text-primary/70">
            {currentProgress}% Complete
          </Text>
        </motion.div>

        <motion.div
          className="relative w-full"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Chapter Indicators */}
          <div className="flex justify-between">
            {Array.from({ length: totalEpochs }).map((_, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center gap-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <div
                  className={cn(
                    'w-10 h-10 rounded flex items-center justify-center z-10 text-primary primary-gradient-subtle border border-border/10',
                    index <= currentEpochIndex
                      ? 'bg-primary/10 border-success'
                      : 'opacity-50',
                  )}
                >
                  {index <= currentEpochIndex ? (
                    <span className="font-medium">{toRoman(index + 1)}</span>
                  ) : (
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex flex-col items-center">
                  <Text
                    variant={TextVariant.footnote}
                    className={cn(
                      index <= currentEpochIndex
                        ? 'text-primary'
                        : 'text-primary/50',
                    )}
                  >
                    {index <= currentEpochIndex ? (
                      <>
                        {epochs[index]?.completed_count}/
                        {epochs[index]?.total_count}
                      </>
                    ) : (
                      'Locked'
                    )}
                  </Text>
                  {index <= currentEpochIndex && (
                    <Text
                      variant={TextVariant.footnote}
                      className="text-success text-xs"
                    >
                      {epochs[index]?.completion_percentage === 100
                        ? '100% IQ claimed'
                        : ''}
                    </Text>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Progress Line */}
          <motion.div
            className="flex pt-2"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="relative h-4 w-full bg-gradient-to-b from-[#000000] to-[#FFFFFF]/10 rounded-full overflow-hidden p-0.5">
              <div className="bg-[#191919] rounded-full h-full w-full overflow-hidden p-0.5">
                <motion.div
                  className="h-full bg-gradient-to-r from-success to-success/70 rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(currentEpochIndex / (totalEpochs - 1)) * 100}%`,
                  }}
                  transition={{ delay: 1.4, duration: 0.8, ease: 'easeOut' }}
                />
                <Text className="absolute inset-0 flex items-center justify-between text-xs text-primary/50">
                  {Array.from({ length: totalEpochs }).map((_, index) => (
                    <motion.span
                      key={index}
                      className={cn(
                        'w-1.5 h-1.5 rounded-full',
                        index <= currentEpochIndex
                          ? 'bg-success'
                          : 'bg-primary/50',
                      )}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.2 + index * 0.1, duration: 0.2 }}
                    />
                  ))}
                </Text>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Card>
    </motion.div>
  )
}
