import { Button, Card, Text } from '@0xintuition/1ui'

import type { Minigame } from '@lib/types/minigame'
import { useNavigate } from '@remix-run/react'

interface MinigameCardProps {
  className?: string
  onStart: () => void
  game: Minigame
  hideCTA?: boolean
}

export function MinigameCard({
  className,
  onStart,
  game,
  hideCTA = false,
}: MinigameCardProps) {
  const navigate = useNavigate()

  return (
    <Card
      className={`relative h-[400px] rounded-lg border-none bg-gradient-to-br from-[#060504] to-[#101010] min-w-[480px] ${className}`}
    >
      <div className="absolute inset-0 flex flex-col justify-between p-8">
        <div className="space-y-2">
          <Text variant="headline" weight="medium" className="text-foreground">
            {game.title}
          </Text>
          <Text variant="body" weight="medium" className="text-foreground/70">
            {game.totalAtoms.toLocaleString()} atoms •{' '}
            {game.totalUsers.toLocaleString()} users
          </Text>
        </div>

        {!hideCTA && (
          <div className="flex flex-col items-center">
            <Button onClick={onStart} variant="primary" size="lg">
              Earn Points
            </Button>
          </div>
        )}

        <div className="flex justify-between items-center">
          {game.points > 0 ? (
            <Text variant="body" weight="semibold" className="text-green-500">
              {game.points} points earned!
            </Text>
          ) : (
            <div />
          )}
          <Button
            variant="secondary"
            onClick={() => navigate('/minigames/game-1')}
          >
            View Game List
          </Button>
        </div>
      </div>
    </Card>
  )
}
