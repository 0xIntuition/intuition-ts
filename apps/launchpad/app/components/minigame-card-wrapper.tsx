import { Card } from '@0xintuition/1ui'

import { useMinigameData } from '@lib/hooks/useMinigameData'
import type { Minigame } from '@lib/types/minigame'
import logger from '@lib/utils/logger'
import { usePrivy } from '@privy-io/react-auth'

import { usePoints } from '../lib/hooks/usePoints'
import { AuthCover } from './auth-cover'
import LoadingLogo from './loading-logo'
import { MinigameCard } from './minigame-card'

interface MinigameCardProps {
  onStart: () => void
  className?: string
}

function LoadingCard() {
  return (
    <div className="relative">
      <Card className="h-[400px] rounded-lg border-none bg-gradient-to-br from-[#060504] to-[#101010] min-w-[480px] blur-sm brightness-50"></Card>
      <div className="absolute inset-0 flex items-center justify-center">
        <LoadingLogo size={100} />
      </div>
    </div>
  )
}

export function MinigameCardWrapper({ onStart, className }: MinigameCardProps) {
  const { ready, authenticated, user } = usePrivy()
  const { isLoading: isGameDataLoading, ...gameData } = useMinigameData()
  const userWallet = user?.wallet?.address?.toLowerCase()
  const { data: points, isLoading: isPointsLoading } = usePoints(userWallet)

  logger(gameData)

  if (!ready || isGameDataLoading || isPointsLoading) {
    return <LoadingCard />
  }

  const game: Minigame = {
    id: 'game-1',
    title: gameData.title,
    points: points?.minigame1 || 0,
    totalAtoms: gameData.atoms,
    totalUsers: gameData.totalUsers,
    totalEarned: points?.minigame1 || 0,
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
