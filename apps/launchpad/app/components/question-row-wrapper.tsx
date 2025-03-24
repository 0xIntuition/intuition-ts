import { Card } from '@0xintuition/1ui'
import { useGetAtomQuery } from '@0xintuition/graphql'

import { Question } from '@lib/graphql/types'
import { useQuestionCompletion } from '@lib/hooks/useQuestionCompletion'
import { useQuestionData } from '@lib/hooks/useQuestionData'
import { atomDetailsModalAtom } from '@lib/state/store'
import { usePrivy } from '@privy-io/react-auth'
import { useAtom } from 'jotai'

import LoadingLogo from './loading-logo'
import { QuestionRow } from './question-row'

interface QuestionRowProps {
  onStart: () => void
  className?: string
  question: Question
}

function LoadingRow() {
  return (
    <div className="relative">
      <Card className="h-24 rounded-lg border-none bg-gradient-to-br from-[#060504] to-[#101010] blur-sm brightness-50"></Card>
      <div className="absolute inset-0 flex items-center justify-center">
        <LoadingLogo size={40} />
      </div>
    </div>
  )
}

export function QuestionRowWrapper({ onStart, question }: QuestionRowProps) {
  const { ready, user } = usePrivy()
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
    const rowData = questionData.listData?.globalTriples?.find(
      (triple) => triple.subject.vault_id === String(atomData?.atom?.vault_id),
    )

    if (rowData) {
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
          forTvl: 0,
          againstTvl: 0,
        },
      })
    }
  }

  if (!ready || isQuestionDataLoading) {
    return <LoadingRow />
  }

  const resultsLink = `/quests/questions/${question.epoch_id}/${question.id}`

  return (
    <QuestionRow
      title={questionData.title}
      description={`${questionData.atoms.toLocaleString()} atoms`}
      image={questionData.listData?.globalTriples?.[0]?.object?.image ?? ''}
      points={completion ? pointsAwarded : 0}
      pointAwardAmount={questionData.pointAwardAmount}
      isActive={questionData.enabled}
      onStart={onStart}
      className="w-full"
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
  )
}
