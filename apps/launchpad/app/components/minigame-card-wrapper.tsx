import { Card } from '@0xintuition/1ui'

import { useQuestionData } from '@lib/hooks/useQuestionData'
import logger from '@lib/utils/logger'
import { usePrivy } from '@privy-io/react-auth'

import { usePoints } from '../lib/hooks/usePoints'
import { AuthCover } from './auth-cover'
import LoadingLogo from './loading-logo'
import { MinigameCard } from './minigame-card'

interface MinigameCardProps {
  onStart: () => void
  className?: string
  questionId: number
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

export function MinigameCardWrapper({
  onStart,
  className,
  questionId,
}: MinigameCardProps) {
  const { ready, authenticated, user } = usePrivy()
  const { isLoading: isQuestionDataLoading, ...questionData } = useQuestionData(
    {
      questionId,
    },
  )
  const userWallet = user?.wallet?.address?.toLowerCase()
  const { data: points, isLoading: isPointsLoading } = usePoints(userWallet)

  logger(questionData)

  if (!ready || isQuestionDataLoading || isPointsLoading) {
    return <LoadingCard />
  }

  const gamePoints = points?.minigame1 || 0
  const resultsLink = `/quests/questions/question/${questionId}`

  return (
    <AuthCover
      buttonContainerClassName="h-full flex items-center justify-center"
      className={className}
    >
      <MinigameCard
        title={questionData.title}
        description={`${questionData.atoms.toLocaleString()} atoms • ${questionData.totalUsers.toLocaleString()} users`}
        points={gamePoints}
        onStart={onStart}
        className="w-full"
        hideCTA={!authenticated}
        isLoading={isQuestionDataLoading || isPointsLoading}
        resultsLink={resultsLink}
      />
    </AuthCover>
  )
}
