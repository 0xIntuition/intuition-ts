import { Suspense } from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@0xintuition/1ui'

import LoadingLogo from '@components/loading-logo'
import { useGetCurrentEpoch } from '@lib/hooks/useGetCurrentEpoch'
import type { Question } from '@lib/services/questions'
import { Link } from '@remix-run/react'

import { QuestionCardWrapper } from './question-card-wrapper'

interface EpochAccordionProps {
  epochs: Array<{
    id: number
    name: string
    questions: Question[]
    total_points_available: number
    progress?: {
      completed_count: number
      total_points: number
    }
  }>
  onStartQuestion: (
    questionId: number,
    predicateId: number,
    objectId: number,
  ) => void
}

export function EpochAccordion({
  epochs,
  onStartQuestion,
}: EpochAccordionProps) {
  const { data: currentEpochData } = useGetCurrentEpoch()

  // Early return if no epochs
  if (!epochs?.length || !epochs[0]?.questions) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <LoadingLogo size={100} />
      </div>
    )
  }

  const defaultValue = currentEpochData?.epoch
    ? `epoch-${currentEpochData.epoch.id}`
    : `epoch-${epochs[0].id}`

  console.log('defaultValue', defaultValue)
  console.log('epochs', `epoch-${epochs[0].id}`)

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full space-y-4"
      defaultValue={defaultValue}
    >
      {epochs.map((epoch) => (
        <AccordionItem
          key={epoch.id}
          value={`epoch-${epoch.id}`}
          className="border rounded-lg bg-background-muted px-4"
        >
          <AccordionTrigger className="hover:no-underline">
            <div className="flex justify-between w-full items-center">
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold">{epoch.name}</span>
                <Link
                  to={`/quests/questions/${epoch.id}`}
                  className="text-sm text-primary/70 hover:text-primary"
                >
                  View All
                </Link>
              </div>
              {epoch.progress && (
                <div className="flex gap-4 text-sm text-primary/70">
                  <span>
                    {epoch.progress.completed_count} / {epoch.questions.length}{' '}
                    Completed
                  </span>
                  <span>
                    {epoch.progress.total_points} /{' '}
                    {epoch.total_points_available} IQ Earned
                  </span>
                </div>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-6 md:grid-cols-2 py-4">
              {epoch.questions.map((question) => (
                <Suspense key={question.id} fallback={<div>Loading...</div>}>
                  <QuestionCardWrapper
                    question={question}
                    onStart={() =>
                      onStartQuestion(
                        question.id,
                        question.predicate_id,
                        question.object_id,
                      )
                    }
                  />
                </Suspense>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
