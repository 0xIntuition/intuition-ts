import { Card, cn, Text, TextVariant } from '@0xintuition/1ui'

import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'

interface ChapterProgressProps {
  totalStages: number
  currentStage: number
}

export default function ChapterProgress({
  totalStages = 5,
  currentStage = 2,
}: ChapterProgressProps) {
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
            {/* <Text className="text-2xl uppercase font-serif">
              {currentChapter}
            </Text>
            <Text className="w-fit text-accent theme-border rounded-lg px-2">
              Next: {nextChapter}
            </Text> */}
          </div>
          <Text variant={TextVariant.footnote} className="text-primary/70">
            57% Complete
          </Text>
          {/* <Text variant={TextVariant.footnote} className="text-primary/70">
            {timeLeft}
          </Text> */}
        </motion.div>

        <motion.div
          className="relative w-full"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Stage Indicators */}
          <div className="flex justify-between">
            {Array.from({ length: totalStages }).map((_, index) => (
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
                    `w-10 h-10 rounded flex items-center justify-center z-10 text-primary primary-gradient-subtle border border-border/10`,
                    index < currentStage
                      ? 'bg-primary/10 border-success'
                      : 'opacity-50',
                  )}
                >
                  {index < currentStage ? (
                    <span className="font-medium">{toRoman(index + 1)}</span>
                  ) : (
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
                <Text
                  variant={TextVariant.footnote}
                  className={cn(
                    index < currentStage ? 'text-primary' : 'text-primary/50',
                  )}
                >
                  {index < currentStage ? 'Complete' : 'Locked'}
                </Text>
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
                    width: `${(currentStage / (totalStages - 1)) * 100}%`,
                  }}
                  transition={{ delay: 1.4, duration: 0.8, ease: 'easeOut' }}
                />
                <Text className="absolute inset-0 flex items-center justify-between text-xs text-primary/50">
                  {Array.from({ length: totalStages }).map((_, index) => (
                    <motion.span
                      key={index}
                      className="w-1.5 h-1.5 rounded-full bg-primary"
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

// Helper function to convert numbers to Roman numerals
function toRoman(num: number): string {
  const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
  return roman[num - 1] || num.toString()
}
