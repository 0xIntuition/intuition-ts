import { Button, Card, Text } from '@0xintuition/1ui'

import type { Minigame } from '@lib/types/minigame'

interface MinigameCardProps {
  className?: string
  onStart: () => void
  game: Minigame
}

export function MinigameCard({ className, onStart, game }: MinigameCardProps) {
  return (
    <Card
      className={`relative h-[400px] rounded-lg border-none bg-gradient-to-br from-[#060504] to-[#101010] min-w-[480px] ${className}`}
    >
      <div className="absolute inset-0 flex flex-col justify-between p-8">
        <div className="space-y-2">
          <Text className="text-2xl font-bold text-white">{game.title}</Text>
          <Text className="text-neutral-400">
            {game.totalAtoms.toLocaleString()} atoms •{' '}
            {game.totalUsers.toLocaleString()} users
          </Text>
        </div>

        <div className="flex flex-col items-center">
          <Button onClick={onStart} variant="primary" size="lg">
            Earn {game.points} Points
          </Button>
        </div>

        <div className="flex justify-start">
          <Text className="text-4xl font-bold text-white">
            ${game.totalEarned.toFixed(1)}
          </Text>
        </div>
      </div>
    </Card>
  )
}
