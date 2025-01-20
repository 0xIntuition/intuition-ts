import { Button, Card, Text } from '@0xintuition/1ui'

import { useNavigate } from '@remix-run/react'

interface MinigameCardProps {
  className?: string
  onStart: () => void
  title: string
  description: string
  points: number
  hideCTA?: boolean
  isLoading?: boolean
  resultsLink?: string
}

export function MinigameCard({
  className,
  onStart,
  title,
  description,
  points,
  hideCTA = false,
  isLoading = false,
  resultsLink,
}: MinigameCardProps) {
  const navigate = useNavigate()

  return (
    <Card
      className={`relative h-[400px] rounded-lg border-none bg-gradient-to-br from-[#060504] to-[#101010] min-w-[480px] ${className}`}
    >
      <div className="absolute inset-0 flex flex-col justify-between p-8">
        <div className="space-y-2">
          <Text variant="headline" weight="medium" className="text-foreground">
            {title}
          </Text>
          <Text variant="body" weight="medium" className="text-foreground/70">
            {description}
          </Text>
        </div>

        {!hideCTA && (
          <div className="flex flex-col items-center">
            <Button
              onClick={points > 0 ? () => navigate(resultsLink || '') : onStart}
              variant="primary"
              size="lg"
              className="min-w-[200px]"
              disabled={isLoading}
            >
              {isLoading
                ? 'Loading...'
                : points > 0
                  ? 'View Results'
                  : 'Earn 200 IQ Points'}
            </Button>
          </div>
        )}

        <div className="flex justify-end items-center">
          {points > 0 && (
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold bg-gradient-to-r from-[#34C578] to-[#00FF94] bg-clip-text text-transparent">
                {points}
              </span>
              <span className="text-md font-semibold text-muted-foreground">
                IQ Earned
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
