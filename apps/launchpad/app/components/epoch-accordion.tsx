import { Suspense } from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  cn,
  Text,
  TextVariant,
  TextWeight,
} from '@0xintuition/1ui'

import { EpochStatus } from '@components/epoch-status'
import LoadingLogo from '@components/loading-logo'
import { useGetCurrentEpoch } from '@lib/hooks/useGetCurrentEpoch'
import type { Question } from '@lib/services/questions'
import { Link } from '@remix-run/react'
import { MessageCircleQuestion } from 'lucide-react'

import { QuestionRowWrapper } from './question-row-wrapper'

interface EpochAccordionProps {
  epochs: Array<{
    id: number
    name: string
    questions: Question[]
    total_points_available: number
    start_date: string
    end_date: string
    is_active: boolean
    progress?: {
      completed_count: number
      total_points: number
    }
  }>
  onStartQuestion: (
    question: Question,
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
          className={cn(
            'relative overflow-hidden rounded-lg transition-all duration-200',
            'bg-white/5 backdrop-blur-md backdrop-saturate-150 group border border-border/10',
            !epoch.is_active && 'opacity-90',
          )}
        >
          <AccordionTrigger className="hover:no-underline w-full px-6 py-4">
            <div className="flex flex-col w-full gap-4">
              {/* Header Section */}
              <div className="flex justify-between items-start w-full">
                <div className="flex items-center gap-3">
                  <Text
                    variant={TextVariant.heading4}
                    weight={TextWeight.semibold}
                    className="text-left"
                  >
                    {epoch.name}
                  </Text>
                  <Link
                    to={`/quests/questions/${epoch.id}`}
                    className="text-sm text-primary/70 hover:text-primary"
                  >
                    View All
                  </Link>
                </div>
                <EpochStatus
                  startDate={epoch.start_date}
                  endDate={epoch.end_date}
                  isActive={epoch.is_active}
                />
              </div>

              {/* Progress Section */}
              {epoch.progress && (
                <div className="w-full">
                  <div className="flex justify-between text-sm mb-2">
                    <Text
                      variant={TextVariant.footnote}
                      weight={TextWeight.medium}
                      className="flex items-center gap-2 text-primary/70"
                    >
                      <MessageCircleQuestion className="w-4 h-4" />
                      {epoch.progress.completed_count} of{' '}
                      {epoch.questions.length} Questions Completed
                    </Text>
                    <Text
                      variant={TextVariant.footnote}
                      weight={TextWeight.medium}
                      className="text-primary/70 flex flex-row gap-1 items-center"
                    >
                      <Text
                        variant={TextVariant.body}
                        weight={TextWeight.semibold}
                        className="text-success"
                      >
                        {epoch.progress.total_points}
                      </Text>{' '}
                      / {epoch.total_points_available} IQ Earned
                    </Text>
                  </div>
                  <div className="h-1 bg-background rounded-full overflow-hidden">
                    <div
                      className="h-full bg-success transition-all duration-300"
                      style={{
                        width: `${(epoch.progress.completed_count / epoch.questions.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </AccordionTrigger>

          <AccordionContent>
            <div className="flex flex-col gap-4 px-6 py-4">
              {epoch.questions.map((question) => (
                <Suspense key={question.id} fallback={<div>Loading...</div>}>
                  <QuestionRowWrapper
                    question={question}
                    onStart={() =>
                      onStartQuestion(
                        question,
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
