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

import LoadingLogo from '@components/loading-logo'
import { useGetCurrentEpoch } from '@lib/hooks/useGetCurrentEpoch'
import type { Question } from '@lib/services/questions'
import { Link } from '@remix-run/react'

import { QuestionRowWrapper } from './question-row-wrapper'

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
      className="w-full space-y-4 rounded-lg bg-white/5 backdrop-blur-md backdrop-saturate-150 border border-border/10"
      defaultValue={defaultValue}
    >
      {epochs.map((epoch) => (
        <AccordionItem
          key={epoch.id}
          value={`epoch-${epoch.id}`}
          className="rounded-lg px-4 first:rounded-b-none last:rounded-b-lg"
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
                <div className="flex items-center gap-4">
                  <div className="relative h-2 w-32">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#000000] to-[#FFFFFF]/10 rounded-full overflow-hidden p-[1px]">
                      <div className="bg-[#191919] rounded-full h-full w-full overflow-hidden p-[1px]">
                        <div
                          className="h-full bg-gradient-to-r from-success to-success/70 rounded-full transition-all duration-300"
                          style={{
                            width: `${(epoch.progress.completed_count / epoch.questions.length) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <Text
                    variant={TextVariant.footnote}
                    weight={TextWeight.semibold}
                    className="flex flex-row items-center gap-1 text-primary/70"
                  >
                    <Text
                      variant={TextVariant.bodyLarge}
                      weight={TextWeight.semibold}
                      className={cn(
                        epoch.progress.total_points !== 0 && 'text-success',
                      )}
                    >
                      {epoch.progress.total_points}
                    </Text>{' '}
                    of {epoch.total_points_available} IQ Earned
                  </Text>
                </div>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4 py-4">
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
