import { Card } from '@0xintuition/1ui'
import { useGetAtomQuery } from '@0xintuition/graphql'

import { Question } from '@lib/graphql/types'
import { useQuestionCompletion } from '@lib/hooks/useQuestionCompletion'
import { useQuestionData } from '@lib/hooks/useQuestionData'
import { atomDetailsModalAtom } from '@lib/state/store'
import { usePrivy } from '@privy-io/react-auth'
import { useAtom } from 'jotai'
import { formatUnits } from 'viem'

import { AuthCover } from './auth-cover'
import LoadingLogo from './loading-logo'
import { MinigameCard } from './minigame-card'

interface MinigameCardProps {
  onStart: () => void
  className?: string
  question: Question
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
  question,
}: MinigameCardProps) {
  const { ready, authenticated, user } = usePrivy()
  const [, setAtomDetailsModal] = useAtom(atomDetailsModalAtom)
  const { isLoading: isQuestionDataLoading, ...questionData } = useQuestionData(
    {
      questionId: question.id,
    },
  )

  const { data: completion } = useQuestionCompletion(
    user?.wallet?.address,
    question.id,
  )

  // Get the user's selected atom if they've completed the question
  const { data: atomData } = useGetAtomQuery(
    { id: completion?.subject_id ?? 0 },
    { enabled: !!completion?.subject_id },
  )

  const handleAtomClick = (id: number) => {
    const rowData = questionData.listData?.globalTriples?.find(
      (triple) => triple.subject.vault_id === String(atomData?.atom?.vault_id),
    )

    if (rowData) {
      // Calculate TVL values
      const forTvl =
        +formatUnits(
          rowData.vault?.positions_aggregate?.aggregate?.sum?.shares ?? 0n,
          18,
        ) * +formatUnits(rowData.vault?.current_share_price ?? 0n, 18)

      const againstTvl =
        +formatUnits(
          rowData.counter_vault?.positions_aggregate?.aggregate?.sum?.shares ??
            0n,
          18,
        ) * +formatUnits(rowData.counter_vault?.current_share_price ?? 0n, 18)

      setAtomDetailsModal({
        isOpen: true,
        atomId: id,
        data: {
          id: String(id),
          image: rowData.subject.image || '',
          name: rowData.subject.label || '',
          list: rowData.object.label || '',
          users: Number(
            rowData.vault?.positions_aggregate?.aggregate?.count ?? 0,
          ),
          forTvl,
          againstTvl,
        },
      })
    }
  }

  if (!ready || isQuestionDataLoading) {
    return <LoadingCard />
  }

  const resultsLink = `/quests/questions/question/${question.id}`

  return (
    <AuthCover
      buttonContainerClassName="h-full flex items-center justify-center"
      className={className}
    >
      <MinigameCard
        title={questionData.title}
        description={`${questionData.atoms.toLocaleString()} atoms • ${questionData.totalUsers.toLocaleString()} users`}
        image={questionData.listData?.globalTriples?.[0]?.object?.image ?? ''}
        points={completion ? questionData.pointAwardAmount : 0}
        pointAwardAmount={questionData.pointAwardAmount}
        onStart={onStart}
        className="w-full"
        hideCTA={!authenticated}
        isLoading={isQuestionDataLoading}
        resultsLink={resultsLink}
        completedAtom={
          atomData?.atom
            ? {
                id: atomData.atom.id,
                label: atomData.atom.label || '',
                image: atomData.atom.image || undefined,
                vault_id: String(atomData.atom.vault_id),
              }
            : undefined
        }
        onCompletedAtomClick={handleAtomClick}
      />
    </AuthCover>
  )
}
