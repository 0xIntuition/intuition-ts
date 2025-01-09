import { useEffect, useState } from 'react'

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
    <div className="w-full p-6 rounded-lg bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">
            {currentChapter}
          </h2>
          <p className="text-[#E6A068] theme-border rounded-lg px-2">
            Next: {nextChapter}
          </p>
        </div>
        <div className="text-[#E6A068] text-xl font-medium tabular-nums">
          {timeLeft}
        </div>
      </div>

      <div className="relative mt-8">
        {/* Progress Line */}
        <div className="absolute h-0.5 bg-muted w-full top-5" />
        <div
          className="absolute h-0.5 bg-blue-500 top-5 transition-all duration-500"
          style={{ width: `${(currentStage / (totalStages - 1)) * 100}%` }}
        />

        {/* Stage Indicators */}
        <div className="relative flex justify-between">
          {Array.from({ length: totalStages }).map((_, index) => (
            <div
              key={index}
              className={`w-10 h-10 rounded flex items-center justify-center z-10
                ${index < currentStage ? 'bg-blue-500 text-white' : 'bg-background border border-border/10'}
              `}
            >
              {index < 3 ? (
                <span className="font-medium">{toRoman(index + 1)}</span>
              ) : (
                <Lock className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Helper function to convert numbers to Roman numerals
function toRoman(num: number): string {
  const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
  return roman[num - 1] || num.toString()
}
