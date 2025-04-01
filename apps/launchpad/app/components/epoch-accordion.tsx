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

import { QuestionCardWrapper as EcosystemQuestionCardWrapper } from './ecosystem-question-card/question-card-wrapper'
import { QuestionRowWrapper as EcosystemQuestionRowWrapper } from './ecosystem-question-card/question-row-wrapper'
import { QuestionCardWrapper } from './question-card-wrapper'
import { QuestionRowWrapper } from './question-row-wrapper'

interface EpochAccordionProps {
  epochs: Array<{
    id: number
    name: string
    questions: Question[]
    total_points: number
    start_date: string
    end_date: string
    is_active: boolean
    type?: string
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

  // Sort epochs by id in ascending order
  const sortedEpochs = [...epochs].sort((a, b) => a.id - b.id)

  const defaultValue = currentEpochData?.epoch
    ? `epoch-${currentEpochData.epoch.id}`
    : `epoch-${sortedEpochs[sortedEpochs.length - 1].id}`

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full space-y-4"
      defaultValue={defaultValue}
    >
      {sortedEpochs.map((epoch) => (
        <AccordionItem
          key={epoch.id}
          value={`epoch-${epoch.id}`}
          className={cn(
            'relative overflow-hidden rounded-lg transition-all duration-200',
            'bg-white/5 backdrop-blur-md backdrop-saturate-150 group border border-border/10',
            !epoch.is_active && 'opacity-90',
          )}
        >
          <AccordionTrigger className="hover:no-underline w-full px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex flex-col w-full gap-2 sm:gap-4">
              {/* Header Section */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start w-full gap-2 sm:gap-0">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Text
                    weight={TextWeight.semibold}
                    className="text-left text-lg sm:text-lg"
                  >
                    {epoch.name}
                  </Text>
                  {/* TODO: Hidden because base week route structure was different and users were getting redirected to questions (triple) flow */}
                  {epoch.type !== 'ecosystem' && (
                    <Link
                      to={`/quests/questions/${epoch.id}`}
                      className="text-xs sm:text-sm text-primary/70 hover:text-primary"
                    >
                      View All
                    </Link>
                  )}
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
                  <div className="flex flex-col sm:flex-row sm:justify-between text-sm mb-2 gap-1 sm:gap-0">
                    <Text
                      variant={TextVariant.footnote}
                      weight={TextWeight.medium}
                      className="flex items-center gap-1 sm:gap-2 text-primary/70 text-sm sm:text-base"
                    >
                      <MessageCircleQuestion className="w-3 h-3 sm:w-4 sm:h-4" />
                      {epoch.progress.completed_count} of{' '}
                      {epoch.questions.length} Questions Completed
                    </Text>
                    <Text
                      variant={TextVariant.footnote}
                      weight={TextWeight.medium}
                      className="text-primary/70 flex flex-row gap-1 items-center text-sm sm:text-base"
                    >
                      <Text
                        variant={TextVariant.body}
                        weight={TextWeight.semibold}
                        className="text-success"
                      >
                        {epoch.progress.total_points}
                      </Text>{' '}
                      / {epoch.total_points} IQ Earned
                    </Text>
                  </div>
                  <div className="h-1 bg-background rounded-full overflow-hidden">
                    <div
                      className="h-full bg-success transition-all duration-300"
                      style={{
                        width: `${Math.min(100, (epoch.progress.total_points / epoch.questions.reduce((sum, q) => sum + q.point_award_amount, 0)) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </AccordionTrigger>

          <AccordionContent>
            <div className="flex flex-col gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4">
              {epoch.questions.map((question) => (
                <Suspense key={question.id} fallback={<div>Loading...</div>}>
                  <div className="md:hidden">
                    {epoch.type === 'ecosystem' ? (
                      <EcosystemQuestionCardWrapper
                        question={question}
                        onStart={() =>
                          onStartQuestion(
                            question,
                            question.predicate_id,
                            question.object_id,
                          )
                        }
                      />
                    ) : (
                      <QuestionCardWrapper
                        question={question}
                        onStart={() =>
                          onStartQuestion(
                            question,
                            question.predicate_id,
                            question.object_id,
                          )
                        }
                      />
                    )}
                  </div>
                  <div className="hidden md:block">
                    {epoch.type === 'ecosystem' ? (
                      <EcosystemQuestionRowWrapper
                        question={question}
                        onStart={() =>
                          onStartQuestion(
                            question,
                            question.predicate_id,
                            question.object_id,
                          )
                        }
                      />
                    ) : (
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
                    )}
                  </div>
                </Suspense>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
