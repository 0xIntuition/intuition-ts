import { useEffect, useState } from 'react'

import { cn, Text, TextVariant, TextWeight } from '@0xintuition/1ui'

import { Clock, Lock } from 'lucide-react'

interface EpochStatusProps {
  startDate: string
  endDate: string
  isActive: boolean
  className?: string
}

function calculateTimeRemaining(endDate: string): {
  days: number
  hours: number
  minutes: number
  seconds: number
} | null {
  const end = new Date(endDate).getTime()
  const now = new Date().getTime()
  const timeLeft = end - now

  if (timeLeft <= 0) {
    return null
  }

  return {
    days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
    hours: Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((timeLeft % (1000 * 60)) / 1000),
  }
}

function getEpochStatus(
  startDate: string,
  endDate: string,
  isActive: boolean,
): 'completed' | 'active' | 'upcoming' {
  if (!isActive) {
    return 'completed'
  }

  const now = new Date().getTime()
  const start = new Date(startDate).getTime()
  const end = new Date(endDate).getTime()

  if (now > end) {
    return 'completed'
  }
  if (now < start) {
    return 'upcoming'
  }
  return 'active'
}

export function EpochStatus({
  startDate,
  endDate,
  isActive,
  className,
}: EpochStatusProps) {
  const [timeRemaining, setTimeRemaining] = useState(
    calculateTimeRemaining(endDate),
  )
  const status = getEpochStatus(startDate, endDate, isActive)

  useEffect(() => {
    if (status !== 'active') {
      return
    }

    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(endDate))
    }, 1000)

    return () => clearInterval(timer)
  }, [endDate, status])

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {status === 'upcoming' && (
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-primary/70" />
          <Text
            variant={TextVariant.footnote}
            weight={TextWeight.semibold}
            className="font-mono text-primary/70"
          >
            Starting {new Date(startDate).toLocaleDateString()}
          </Text>
        </div>
      )}
      {status === 'active' && timeRemaining && (
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-success" />
          <Text
            variant={TextVariant.footnote}
            weight={TextWeight.semibold}
            className="font-mono text-success"
          >
            Bonus Ends in {timeRemaining.days > 0 && `${timeRemaining.days}d `}
            {timeRemaining.hours.toString().padStart(2, '0')}:
            {timeRemaining.minutes.toString().padStart(2, '0')}:
            {timeRemaining.seconds.toString().padStart(2, '0')}
          </Text>
        </div>
      )}
    </div>
  )
}
