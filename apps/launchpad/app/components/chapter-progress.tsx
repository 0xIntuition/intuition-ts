import { useEffect, useState } from 'react'

import { Card, Text } from '@0xintuition/1ui'

import { Lock } from 'lucide-react'

interface ChapterProgressProps {
  currentChapter: string
  nextChapter: string
  totalStages: number
  currentStage: number
  endTime: Date
}

export default function ChapterProgress({
  currentChapter = 'CHAPTER I: GENESIS',
  nextChapter = 'Chapter II: Population',
  totalStages = 7,
  currentStage = 2,
  endTime = new Date(Date.now() + 172800000), // 2 days from now
}: ChapterProgressProps) {
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const difference = endTime.getTime() - now.getTime()

      if (difference <= 0) {
        setTimeLeft('Completed')
        clearInterval(timer)
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      )
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`)
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime])

  return (
    <Card className="w-full p-6 rounded-lg border-none bg-gradient-to-br from-[#060504] to-[#101010]">
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-2">
          <Text className="text-2xl uppercase font-serif">
            {currentChapter}
          </Text>
          <Text className="w-fit text-accent theme-border rounded-lg px-2">
            Next: {nextChapter}
          </Text>
        </div>
        <div className="text-accent text-xl font-medium tabular-nums">
          {timeLeft}
        </div>
      </div>

      <div className="relative mt-8">
        {/* Stage Indicators */}
        <div className="flex justify-between">
          {Array.from({ length: totalStages }).map((_, index) => (
            <div
              key={index}
              className={`w-10 h-10 rounded flex items-center justify-center z-10 text-primary primary-gradient-subtle border border-border/10`}
            >
              {index < 3 ? (
                <span className="font-medium">{toRoman(index + 1)}</span>
              ) : (
                <Lock className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>
        {/* Progress Line */}
        <div className="flex p-4">
          <div className="relative h-4 w-full bg-gradient-to-b from-[#000000] to-[#FFFFFF]/10 rounded-full overflow-hidden p-0.5">
            <div className="bg-[#191919] rounded-full h-full w-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-[#017CC2] to-[#0F4BA5] transition-all duration-300 rounded-full"
                style={{
                  width: `${(currentStage / (totalStages - 1)) * 100}%`,
                }}
              />
              <Text className="absolute inset-0 flex items-center justify-between text-xs text-primary/50">
                {Array.from({ length: totalStages }).map((_, index) => (
                  <span
                    key={index}
                    className="w-1.5 h-1.5 rounded-full bg-primary"
                  />
                ))}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

// Helper function to convert numbers to Roman numerals
function toRoman(num: number): string {
  const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
  return roman[num - 1] || num.toString()
}
