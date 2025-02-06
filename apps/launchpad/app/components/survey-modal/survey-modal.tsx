import {
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  StepIndicator,
} from '@0xintuition/1ui'
import { useGetListDetailsQuery } from '@0xintuition/graphql'

import logger from '@lib/utils/logger'
import { usePrivy } from '@privy-io/react-auth'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { TripleType } from 'app/types'
import { ClientOnly } from 'remix-utils/client-only'

import { TransactionStateType } from '../../types/transaction'
import { CreateStep } from './create-step'
import { RewardStep } from './reward-step'
import { SignalStep } from './signal-step'
import { TopicsStep } from './topics-step'
import {
  NewAtomMetadata,
  OnboardingModalProps,
  OnboardingState,
  Step,
  StepId,
  STEPS,
  Topic,
} from './types'

const STORAGE_KEY = 'onboarding-progress'

const STEPS_CONFIG: Step[] = [
  { id: STEPS.TOPICS, label: 'Select', status: 'current' },
  { id: STEPS.CREATE, label: 'Create', status: 'upcoming' },
  { id: STEPS.SIGNAL, label: 'Signal', status: 'upcoming' },
  { id: STEPS.REWARD, label: 'Reward', status: 'upcoming' },
]

const INITIAL_STATE: OnboardingState = {
  currentStep: STEPS.TOPICS,
  ticks: 1,
  showCreateStep: false,
}

interface StepTransition {
  isTransitioning: boolean
  handleTransition: (
    updateFn: (prev: OnboardingState) => OnboardingState,
  ) => void
  resetTransition: () => void
}

/**
 * Custom hook to manage step transitions with proper cleanup
 */
const useStepTransition = (
  setState: React.Dispatch<React.SetStateAction<OnboardingState>>,
): StepTransition => {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timeoutRef = useRef<number>()
  const rafRef = useRef<number>()
  const updateFnRef = useRef<
    ((prev: OnboardingState) => OnboardingState) | null
  >(null)

  const handleTransition = useCallback(
    (updateFn: (prev: OnboardingState) => OnboardingState) => {
      // Store the update function for later
      updateFnRef.current = updateFn
      setIsTransitioning(true)

      // Wait for fade out before updating state
      rafRef.current = requestAnimationFrame(() => {
        timeoutRef.current = window.setTimeout(() => {
          // Update state after fade out
          setState(updateFnRef.current!)
          updateFnRef.current = null

          // Wait a frame before starting fade in
          rafRef.current = requestAnimationFrame(() => {
            setIsTransitioning(false)
          })
        }, 150) // Match the CSS transition duration
      })
    },
    [setState],
  )

  const resetTransition = useCallback(() => {
    setIsTransitioning(false)
    updateFnRef.current = null
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Cleanup timeouts and animation frames
  useEffect(() => {
    return () => {
      resetTransition()
    }
  }, [resetTransition])

  return { isTransitioning, handleTransition, resetTransition }
}

export function OnboardingModal({
  isOpen,
  onClose,
  questionId,
  predicateId,
  objectId,
}: OnboardingModalProps) {
  const queryClient = useQueryClient()
  const { user: privyUser } = usePrivy()
  const userWallet = privyUser?.wallet?.address

  const [state, setState] = useState<OnboardingState>(INITIAL_STATE)
  const [topics, setTopics] = useState<Topic[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [steps, setSteps] = useState<Step[]>(STEPS_CONFIG)
  const [txState, setTxState] = useState<TransactionStateType>()
  const [subjectId, setSubjectId] = useState<string>()

  const transition = useStepTransition(setState)
  const { isTransitioning, handleTransition, resetTransition } = transition

  const { data: currentEpoch } = useQuery({
    queryKey: ['current-epoch'],
    queryFn: async () => {
      const response = await fetch('/resources/get-current-epoch')
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch current epoch')
      }
      return data.epoch
    },
  })

  const { data: listData, isLoading: isLoadingList } = useGetListDetailsQuery(
    {
      tagPredicateId: predicateId,
      globalWhere: {
        subject: {
          label: {
            _ilike: searchTerm ? `%${searchTerm}%` : undefined,
          },
        },
        predicate_id: {
          _eq: predicateId,
        },
        object_id: {
          _eq: objectId,
        },
      },
    },
    {
      queryKey: [
        'get-list-details',
        {
          predicateId,
          objectId,
          searchTerm,
        },
      ],
    },
  )

  useEffect(() => {
    if (isOpen) {
      setState(INITIAL_STATE)
      setSearchTerm('')
      resetTransition()

      queryClient.refetchQueries({
        queryKey: [
          'get-list-details',
          {
            predicateId,
            objectId,
            searchTerm: '',
          },
        ],
      })

      document.body.style.paddingRight = 'var(--removed-body-scroll-bar-size)'
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.paddingRight = ''
      document.body.style.overflow = ''

      const timer = setTimeout(() => {
        setState(INITIAL_STATE)
        setSearchTerm('')
        resetTransition()
      }, 300) // Animation duration

      return () => clearTimeout(timer)
    }
  }, [isOpen, queryClient, predicateId, objectId, resetTransition])

  useEffect(() => {
    if (!listData?.globalTriples) {
      return
    }

    const newTopics = listData.globalTriples.map((triple) => ({
      id: triple.vault_id,
      name: triple.subject.label ?? '',
      image: triple.subject.image ?? undefined,
      triple: triple as TripleType,
      selected: false,
    }))
    setTopics(newTopics)

    setSteps((prev) => {
      if (newTopics.length > 0) {
        return prev.filter((step) => step.id !== STEPS.CREATE)
      }
      return prev
    })

    return () => {
      setTopics([])
    }
  }, [listData?.globalTriples])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ state, topics }))
  }, [state, topics])

  const handleNext = useCallback(() => {
    if (state.currentStep === STEPS.TOPICS) {
      const selectedTopic = topics.find((topic) => topic.selected)
      if (selectedTopic) {
        handleTransition((prev) => ({
          ...prev,
          selectedTopic,
          currentStep: STEPS.SIGNAL,
        }))
        updateStepStatus(STEPS.TOPICS, 'completed')
        updateStepStatus(STEPS.SIGNAL, 'current')
      }
    } else if (state.currentStep === STEPS.CREATE) {
      handleTransition((prev) => ({
        ...prev,
        currentStep: STEPS.SIGNAL,
      }))
      updateStepStatus(STEPS.CREATE, 'completed')
      updateStepStatus(STEPS.SIGNAL, 'current')
    }
  }, [state.currentStep, topics, handleTransition])

  const handleBack = useCallback(() => {
    if (state.currentStep === STEPS.SIGNAL) {
      const previousStep = state.showCreateStep ? STEPS.CREATE : STEPS.TOPICS
      handleTransition((prev) => ({
        ...prev,
        currentStep: previousStep,
      }))
      updateStepStatus(previousStep, 'current')
      updateStepStatus(STEPS.SIGNAL, 'upcoming')

      if (previousStep === STEPS.TOPICS) {
        setSearchTerm('')
        queryClient.refetchQueries({
          queryKey: [
            'get-list-details',
            {
              predicateId,
              objectId,
              searchTerm: '',
            },
          ],
        })
      }
    } else if (state.currentStep === STEPS.CREATE) {
      handleTransition((prev) => ({
        ...prev,
        currentStep: STEPS.TOPICS,
      }))
      updateStepStatus(STEPS.TOPICS, 'current')
      updateStepStatus(STEPS.CREATE, 'upcoming')

      setSearchTerm('')
      queryClient.refetchQueries({
        queryKey: [
          'get-list-details',
          {
            predicateId,
            objectId,
            searchTerm: '',
          },
        ],
      })
    }
  }, [
    state.currentStep,
    state.showCreateStep,
    handleTransition,
    queryClient,
    predicateId,
    objectId,
  ])

  const toggleTopic = useCallback((id: string) => {
    setTopics((currentTopics) => {
      return currentTopics.map((topic) => ({
        ...topic,
        selected: topic.id === id,
      }))
    })
  }, [])

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value)
    },
    [],
  )

  const updateStepStatus = useCallback(
    (stepId: StepId, status: Step['status']) => {
      setSteps((prev) =>
        prev.map((step) => (step.id === stepId ? { ...step, status } : step)),
      )
    },
    [],
  )

  const handleStepClick = useCallback(
    (stepId: StepId) => {
      const clickedStep = steps.find((s) => s.id === stepId)
      if (clickedStep?.status === 'completed') {
        handleTransition((prev) => ({
          ...prev,
          currentStep: stepId,
        }))

        setSteps((prev) =>
          prev.map((step) => {
            if (step.id === stepId) {
              return { ...step, status: 'current' }
            }
            if (step.id === state.currentStep) {
              return { ...step, status: 'upcoming' }
            }
            return step
          }),
        )
      }
    },
    [steps, state.currentStep, handleTransition],
  )

  const onStakingSuccess = useCallback(
    (subject_id: string) => {
      startTransition(() => {
        setSteps((prev) => {
          const newSteps = prev.map((step) => {
            if (step.id === STEPS.SIGNAL) {
              return { ...step, status: 'completed' as const }
            }
            if (step.id === STEPS.REWARD) {
              return { ...step, status: 'current' as const }
            }
            return step
          })
          return newSteps
        })

        handleTransition((prev) => ({
          ...prev,
          currentStep: STEPS.REWARD,
        }))

        setSubjectId(subject_id)
      })

      if (!userWallet) {
        logger('Missing userWallet')
        return
      }
    },
    [handleTransition, userWallet],
  )

  const awardPoints = async (accountId: string) => {
    try {
      setIsLoading(true)
      const formData = new FormData()
      formData.append('accountId', accountId)
      formData.append('questionId', questionId?.toString() ?? '')
      formData.append('epochId', currentEpoch?.id?.toString() ?? '')
      formData.append('pointAwardAmount', '200') // TODO: Get from question data
      formData.append('subjectId', subjectId ?? '')

      const response = await fetch('/actions/reward-question-points', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to award points')
      }

      // Invalidate relevant queries
      queryClient.invalidateQueries({
        queryKey: ['question-completion', accountId.toLowerCase(), questionId],
      })
      queryClient.invalidateQueries({
        queryKey: ['epoch-progress', accountId.toLowerCase(), currentEpoch?.id],
      })
    } catch (error) {
      logger('Error awarding points:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = useCallback(() => {
    // Reset all state
    setState(INITIAL_STATE)
    setTopics([])
    setSearchTerm('')
    setSteps(STEPS_CONFIG)
    resetTransition()
    onClose()
  }, [resetTransition, onClose])

  const onCreationSuccess = (metadata: NewAtomMetadata) => {
    handleTransition((prev) => ({
      ...prev,
      currentStep: STEPS.SIGNAL,
      newAtomMetadata: metadata,
      selectedTopic: {
        id: metadata.vaultId,
        name: metadata.name,
        image: metadata.image,
        selected: true,
        triple: listData?.globalTriples[0] as TripleType,
      },
    }))
    setSubjectId(metadata.vaultId)
    updateStepStatus(STEPS.CREATE, 'completed')
    updateStepStatus(STEPS.SIGNAL, 'current')
  }

  const handleCreateClick = useCallback(() => {
    setSteps((prev) => {
      const createStep = STEPS_CONFIG.find((step) => step.id === STEPS.CREATE)
      if (!prev.some((step) => step.id === STEPS.CREATE) && createStep) {
        const topicsIndex = prev.findIndex((step) => step.id === STEPS.TOPICS)
        return [
          ...prev.slice(0, topicsIndex + 1),
          createStep,
          ...prev.slice(topicsIndex + 1),
        ]
      }
      return prev
    })

    handleTransition((prev) => ({
      ...prev,
      currentStep: STEPS.CREATE,
      showCreateStep: true,
    }))

    updateStepStatus(STEPS.TOPICS, 'completed')
    updateStepStatus(STEPS.CREATE, 'current')
  }, [handleTransition])

  return (
    <ClientOnly>
      {() => (
        <Dialog open={isOpen} onOpenChange={handleClose}>
          <DialogContent className="p-0 bg-gradient-to-br from-[#060504] to-[#101010] md:max-w-[720px] w-full border-none">
            <div
              className={`transition-all duration-150 ease-in-out ${
                isTransitioning
                  ? 'opacity-0 translate-y-1'
                  : 'opacity-100 translate-y-0'
              }`}
            >
              {state.currentStep === STEPS.TOPICS && (
                <TopicsStep
                  topics={topics}
                  isLoadingList={isLoadingList}
                  onToggleTopic={toggleTopic}
                  onSearchChange={handleSearchChange}
                  onCreateClick={handleCreateClick}
                />
              )}

              {state.currentStep === STEPS.CREATE && (
                <CreateStep onCreationSuccess={onCreationSuccess} />
              )}

              {state.currentStep === STEPS.SIGNAL && state.selectedTopic && (
                <SignalStep
                  selectedTopic={state.selectedTopic}
                  newAtomMetadata={state.newAtomMetadata}
                  predicateId={predicateId}
                  objectId={objectId}
                  setTxState={setTxState}
                  onStakingSuccess={onStakingSuccess}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              )}

              {state.currentStep === STEPS.REWARD &&
                state.selectedTopic &&
                txState &&
                txState.txHash && (
                  <RewardStep
                    isOpen={state.currentStep === STEPS.REWARD}
                    selectedTopic={state.selectedTopic}
                    newAtomMetadata={state.newAtomMetadata}
                    txHash={txState.txHash}
                    userWallet={userWallet}
                    awardPoints={awardPoints}
                    questionId={questionId}
                    epochId={currentEpoch?.id}
                  />
                )}
            </div>
            <DialogFooter className="w-full items-center">
              <div className="flex flex-row justify-between px-5 py-5 w-full rounded-b-xl bg-[#0A0A0A]">
                <StepIndicator<StepId>
                  steps={steps}
                  onStepClick={handleStepClick}
                  showNavigation
                  onNext={
                    state.currentStep !== STEPS.REWARD
                      ? handleNext
                      : state.currentStep === STEPS.REWARD
                        ? handleClose
                        : undefined
                  }
                  onBack={
                    state.currentStep === STEPS.SIGNAL ||
                    state.currentStep === STEPS.CREATE
                      ? handleBack
                      : undefined
                  }
                  disableNext={
                    state.currentStep === STEPS.TOPICS
                      ? !topics.some((t) => t.selected)
                      : state.currentStep === STEPS.SIGNAL
                        ? txState?.status !== 'complete'
                        : state.currentStep === STEPS.CREATE
                  }
                  disableBack={
                    isLoading || (txState?.status && txState?.status !== 'idle')
                  }
                  customNextButton={
                    state.currentStep === STEPS.REWARD
                      ? { content: 'Finish' }
                      : undefined
                  }
                />
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </ClientOnly>
  )
}
