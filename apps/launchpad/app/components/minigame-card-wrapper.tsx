import { useMinigameData } from '@lib/hooks/useMinigameData'
import type { Minigame } from '@lib/types/minigame'
import logger from '@lib/utils/logger'
import { usePrivy } from '@privy-io/react-auth'

import { usePoints } from '../lib/hooks/usePoints'
import { AuthCover } from './auth-cover'
import { MinigameCard } from './minigame-card'

interface MinigameCardWrapperProps {
  gameId: string
  onStart: () => void
  className?: string
}

export function MinigameCardWrapper({
  gameId,
  onStart,
  className,
}: MinigameCardWrapperProps) {
  const { authenticated, user } = usePrivy()
  const gameData = useMinigameData(gameId)
  const userWallet = user?.wallet?.address?.toLowerCase()
  const { data: points } = usePoints(userWallet)

  logger('Points data:', points)

  const game: Minigame = {
    id: gameId,
    title: gameData.title,
    points: points?.minigame1 || 0,
    totalAtoms: gameData.atoms,
    totalUsers: gameData.users,
    totalEarned: gameData.totalEarned,
  }

  return (
    <AuthCover
      buttonContainerClassName="h-full flex items-center justify-center"
      className={className}
    >
      <MinigameCard
        game={game}
        onStart={onStart}
        className="w-full"
        hideCTA={!authenticated}
      />
    </AuthCover>
  )
}
