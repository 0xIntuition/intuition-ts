import { Card } from '@0xintuition/1ui'
import { useGetAtomQuery } from '@0xintuition/graphql'

import { Question } from '@lib/graphql/types'
import { useEcosystemQuestionData } from '@lib/hooks/useEcosystemQuestionData'
import { useQuestionCompletion } from '@lib/hooks/useQuestionCompletion'
import { atomDetailsModalAtom } from '@lib/state/store'
import { usePrivy } from '@privy-io/react-auth'
import { useAtom } from 'jotai'

import LoadingLogo from '../loading-logo'
import { QuestionCard } from './question-card'

interface QuestionCardProps {
  onStart: () => void
  className?: string
  question: Question
}

function LoadingCard() {
  return (
    <>
      <Card
        className={`relative h-[400px] rounded-lg border-none w-full md:min-w-[480px] overflow-hidden`}
        style={{
          backgroundImage: `linear-gradient(to bottom right, rgba(6, 5, 4, 0.9), rgba(16, 16, 16, 0.9)))`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingLogo size={100} />
        </div>
      </Card>
    </>
  )
}

export function QuestionCardWrapper({ onStart, question }: QuestionCardProps) {
  const { ready, user } = usePrivy()
  const [, setAtomDetailsModal] = useAtom(atomDetailsModalAtom)
  const { isLoading: isQuestionDataLoading, ...questionData } =
    useEcosystemQuestionData({
      questionId: question.id,
    })

  const { data: completion } = useQuestionCompletion(
    user?.wallet?.address,
    question.id,
  )

  let pointsAwarded = 0
  if (completion) {
    pointsAwarded = completion.points_awarded
  }

  // Get the user's selected atom if they've completed the question
  const { data: atomData } = useGetAtomQuery(
    { id: completion?.subject_id ?? 0 },
    { enabled: !!completion?.subject_id },
  )

  const handleAtomClick = (id: number) => {
    const rowData = questionData.atomsData?.atoms?.find(
      (atom) => atom.vault_id === String(atomData?.atom?.vault_id),
    )

    if (rowData) {
      setAtomDetailsModal({
        isOpen: true,
        atomId: id,
        data: {
          id: String(id),
          image: rowData.image || '',
          name: rowData.label || '',
          list: 'Base', // TODO: FIX ME
          users: Number(
            rowData.vault?.positions_aggregate?.aggregate?.count ?? 0,
          ),
          forTvl: 0,
          againstTvl: 0,
        },
      })
    }
  }

  if (!ready || isQuestionDataLoading) {
    return <LoadingCard />
  }

  const resultsLink = `/quests/ecosystems/${question.epoch_id}/${question.id}`

  return (
    <QuestionCard
      title={questionData.title}
      description={`${questionData.atoms.toLocaleString()} atoms • ${questionData.totalUsers.toLocaleString()} users`}
      image={questionData.atomsData?.atoms?.[0]?.image ?? ''}
      points={completion ? pointsAwarded : 0}
      pointAwardAmount={questionData.pointAwardAmount}
      onStart={onStart}
      className="w-full"
      isActive={questionData.enabled}
      isLoading={isQuestionDataLoading}
      resultsLink={resultsLink}
      completedAtom={
        atomData?.atom
          ? {
              id: atomData.atom.id,
              label:
                atomData.atom.value?.account?.label ||
                atomData.atom.label ||
                '',
              image: atomData.atom.image || undefined,
              vault_id: String(atomData.atom.vault_id),
            }
          : undefined
      }
      onCompletedAtomClick={handleAtomClick}
    />
  )
}
