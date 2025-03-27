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
import { useGetAtomsQuery, useGetListDetailsQuery } from '@0xintuition/graphql'

import { usePrivy } from '@privy-io/react-auth'
import { useLocation, useNavigate } from '@remix-run/react'
import { useQueryClient } from '@tanstack/react-query'
import { TripleType } from 'app/types'
import { ClientOnly } from 'remix-utils/client-only'

import { TransactionStateType } from '../../types/transaction'
import { CreateStep } from '../survey-modal/create-step'
import { SignalStep } from '../survey-modal/signal-step'
import { SuccessStep } from '../survey-modal/success-step'
import { TopicsStep } from '../survey-modal/topics-step'
import {
  NewAtomMetadata,
  QuestModalProps,
  QuestState,
  Step,
  StepId,
  STEPS,
  StepStatus,
  Topic,
} from './types'

const STORAGE_KEY = 'quest-progress'

const STEPS_CONFIG: Step[] = [
  { id: STEPS.TOPICS, label: 'Select', status: 'current' },
  { id: STEPS.CREATE, label: 'Create', status: 'upcoming' },
  { id: STEPS.SIGNAL, label: 'Signal', status: 'upcoming' },
  { id: STEPS.SUCCESS, label: 'Success', status: 'upcoming' },
]

const INITIAL_STATE: QuestState = {
  currentStep: STEPS.TOPICS,
  ticks: 1,
  showCreateStep: false,
}

interface StepTransition {
  isTransitioning: boolean
  handleTransition: (updateFn: (prev: QuestState) => QuestState) => void
  resetTransition: () => void
}

/**
 * Custom hook to manage step transitions with proper cleanup
 */
const useStepTransition = (
  setState: React.Dispatch<React.SetStateAction<QuestState>>,
): StepTransition => {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timeoutRef = useRef<number>()
  const rafRef = useRef<number>()
  const updateFnRef = useRef<((prev: QuestState) => QuestState) | null>(null)

  const handleTransition = useCallback(
    (updateFn: (prev: QuestState) => QuestState) => {
      // Store the update function for later
      updateFnRef.current = updateFn
      setIsTransitioning(true)

      // Wait for fade out before updating state
      rafRef.current = requestAnimationFrame(() => {
        timeoutRef.current = window.setTimeout(() => {
          if (!updateFnRef.current) {
            setIsTransitioning(false)
            return
          }

          try {
            // Update state after fade out
            setState((prevState) => {
              if (!prevState) {
                return INITIAL_STATE
              }
              const newState = updateFnRef.current!(prevState)
              return newState
            })
          } catch (error) {
            setIsTransitioning(false)
            return
          }

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

export function AddEntryModal({
  isOpen,
  onClose,
  predicateId,
  objectId,
  question,
}: QuestModalProps) {
  const queryClient = useQueryClient()
  const { user: privyUser } = usePrivy()
  const userWallet = privyUser?.wallet?.address

  const [state, setState] = useState<QuestState>(INITIAL_STATE)
  const [topics, setTopics] = useState<Topic[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [steps, setSteps] = useState<Step[]>(STEPS_CONFIG)
  const [txState, setTxState] = useState<TransactionStateType>()
  const [, setSubjectId] = useState<string>()

  const transition = useStepTransition(setState)
  const { isTransitioning, handleTransition, resetTransition } = transition
  const navigate = useNavigate()
  const location = useLocation()

  const { data: listData, isLoading: isLoadingList } = useGetListDetailsQuery(
    {
      tagPredicateId: predicateId,
      globalWhere: {
        predicate_id: {
          _eq: predicateId,
        },
        object_id: {
          _eq: objectId,
        },
      },
      orderBy: {
        vault: {
          total_shares: 'desc',
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

  const { data: atomsData, isLoading: isSearching } = useGetAtomsQuery(
    {
      where: {
        label: { _ilike: searchTerm ? `%${searchTerm}%` : undefined },
      },
      limit: 25,
      orderBy: {
        vault: {
          position_count: 'desc',
        },
      },
    },
    {
      queryKey: ['atoms', searchTerm],
      enabled: Boolean(searchTerm),
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
    } else {
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
      id: triple.subject.vault_id,
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

  const handleTopicSelect = (id: string) => {
    // First check if this atom exists in topics list
    const existingTopic = topics.find((t) => t.id === id)
    if (existingTopic) {
      // Use existing topic with its triple
      setTopics((prev) =>
        prev.map((t) => ({
          ...t,
          selected: t.id === id,
        })),
      )
      handleTransition((prev) => ({
        ...prev,
        selectedTopic: existingTopic,
        currentStep: STEPS.SIGNAL,
        newAtomMetadata: undefined, // Ensure we clear any existing newAtomMetadata
      }))
      updateStepStatus(STEPS.TOPICS, 'completed')
      updateStepStatus(STEPS.SIGNAL, 'current')
      return
    }

    // If we get here, this is a new atom from search results
    if (searchTerm) {
      const selectedAtom = atomsData?.atoms?.find(
        (atom) => atom.vault_id === id,
      )
      if (selectedAtom) {
        // Create a new topic
        const newTopic: Topic = {
          id: selectedAtom.vault_id,
          name: selectedAtom.label ?? '',
          image: selectedAtom.image ?? undefined,
          selected: true,
          // We don't have a triple yet, it will be created when signaling
        }

        setTopics((prev) => [...prev, newTopic])
        handleTransition((prev) => ({
          ...prev,
          selectedTopic: newTopic,
          currentStep: STEPS.SIGNAL,
        }))
        updateStepStatus(STEPS.TOPICS, 'completed')
        updateStepStatus(STEPS.SIGNAL, 'current')
      }
    }
  }

  const updateStepStatus = (stepId: StepId, status: StepStatus) => {
    setSteps((prev) =>
      prev.map((step) => (step.id === stepId ? { ...step, status } : step)),
    )
  }

  const handleStepClick = (stepId: StepId) => {
    // Only allow clicking on completed steps
    const stepIndex = steps.findIndex((s) => s.id === stepId)
    const currentStepIndex = steps.findIndex((s) => s.id === state.currentStep)

    if (
      stepIndex < currentStepIndex &&
      steps[stepIndex].status === 'completed'
    ) {
      handleTransition((prev) => ({
        ...prev,
        currentStep: stepId,
      }))

      // Update step statuses
      setSteps((prev) =>
        prev.map((step, idx) => {
          if (idx < stepIndex) {
            return { ...step, status: 'completed' }
          } else if (idx === stepIndex) {
            return { ...step, status: 'current' }
          }
          return { ...step, status: 'upcoming' }
        }),
      )
    }
  }

  const handleNext = () => {
    const currentIndex = steps.findIndex((s) => s.id === state.currentStep)
    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1]
      handleTransition((prev) => ({
        ...prev,
        currentStep: nextStep.id,
      }))

      updateStepStatus(state.currentStep, 'completed')
      updateStepStatus(nextStep.id, 'current')
    }
  }

  const handleBack = () => {
    const currentIndex = steps.findIndex((s) => s.id === state.currentStep)
    if (currentIndex > 0) {
      const prevStep = steps[currentIndex - 1]
      handleTransition((prev) => ({
        ...prev,
        currentStep: prevStep.id,
      }))

      updateStepStatus(state.currentStep, 'upcoming')
      updateStepStatus(prevStep.id, 'current')
    }
  }

  const onStakingSuccess = useCallback(
    (subject_id: string) => {
      if (!userWallet) {
        return
      }

      startTransition(() => {
        setSteps((prev) => {
          const newSteps = prev.map((step) => {
            if (step.id === STEPS.SIGNAL) {
              return { ...step, status: 'completed' as const }
            }
            if (step.id === STEPS.SUCCESS) {
              return { ...step, status: 'current' as const }
            }
            return step
          })
          return newSteps
        })

        handleTransition((prev) => ({
          ...prev,
          currentStep: STEPS.SUCCESS,
        }))

        setSubjectId(subject_id)
      })
    },
    [handleTransition, userWallet],
  )

  const handleClose = useCallback(() => {
    const isFlowComplete =
      state.currentStep === STEPS.SUCCESS &&
      txState?.status === 'complete' &&
      !isLoading

    // Only close if we're not in the success step or the flow is complete
    if (state.currentStep !== STEPS.SUCCESS || (isFlowComplete && userWallet)) {
      onClose()

      // Reduced from 300ms to 150ms to match transition duration
      setTimeout(() => {
        setState(INITIAL_STATE)
        setSteps(STEPS_CONFIG)
        resetTransition()

        if (isFlowComplete && question?.id && question?.epoch_id) {
          const targetPath = `/quests/questions/${question.epoch_id}/${question.id}`
          if (location.pathname !== targetPath) {
            navigate(targetPath)
          }
        }
      }, 150)
    }
  }, [
    state.currentStep,
    txState?.status,
    isLoading,
    userWallet,
    onClose,
    resetTransition,
    question?.id,
    question?.epoch_id,
    location.pathname,
    navigate,
  ])

  const onCreationSuccess = (metadata: NewAtomMetadata) => {
    // Ensure we have valid state before transition
    if (!state) {
      return
    }

    handleTransition((prev) => {
      const newState = {
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
      }
      return newState
    })

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
      {() => {
        // Safeguard against null state
        if (!state) {
          return null
        }

        return (
          <Dialog open={isOpen} onOpenChange={handleClose} modal={true}>
            <DialogContent
              className="p-0 bg-gradient-to-br from-[#060504] to-[#101010] md:max-w-[720px] w-full border-none flex flex-col"
              onPointerDownOutside={(e) => {
                // Prevent closing if transaction is in progress
                if (
                  state.currentStep === STEPS.SUCCESS &&
                  txState?.status !== 'complete'
                ) {
                  e.preventDefault()
                }
              }}
              onEscapeKeyDown={(e) => {
                // Prevent closing if transaction is in progress
                if (
                  state.currentStep === STEPS.SUCCESS &&
                  txState?.status !== 'complete'
                ) {
                  e.preventDefault()
                }
              }}
            >
              <div className="flex-1">
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
                      onToggleTopic={handleTopicSelect}
                      onCreateClick={handleCreateClick}
                      question={question}
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      atomsData={atomsData}
                      isSearching={isSearching}
                    />
                  )}

                  {state.currentStep === STEPS.CREATE && (
                    <CreateStep
                      onCreationSuccess={onCreationSuccess}
                      initialName={searchTerm}
                    />
                  )}

                  {state.currentStep === STEPS.SIGNAL &&
                    state.selectedTopic && (
                      <SignalStep
                        selectedTopic={state.selectedTopic}
                        newAtomMetadata={state.newAtomMetadata}
                        predicateId={predicateId}
                        objectId={objectId}
                        objectLabel={
                          listData?.globalTriples?.[0]?.object.label ?? ''
                        }
                        setTxState={setTxState}
                        onStakingSuccess={onStakingSuccess}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                        isOpen={isOpen}
                      />
                    )}

                  {state.currentStep === STEPS.SUCCESS &&
                    state.selectedTopic && (
                      <SuccessStep
                        isOpen={state.currentStep === STEPS.SUCCESS}
                        newAtomMetadata={state.newAtomMetadata}
                        txHash={txState?.txHash}
                      />
                    )}
                </div>
              </div>
              <DialogFooter className="w-full items-center md:px-4">
                <div className="flex flex-row justify-between px-5 py-5 w-full">
                  <StepIndicator<StepId>
                    steps={steps}
                    onStepClick={handleStepClick}
                    showNavigation
                    onNext={
                      state.currentStep !== STEPS.SUCCESS
                        ? handleNext
                        : state.currentStep === STEPS.SUCCESS &&
                            txState?.status === 'complete'
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
                          : state.currentStep === STEPS.SUCCESS
                            ? txState?.status !== 'complete'
                            : state.currentStep === STEPS.CREATE
                    }
                    disableBack={
                      isLoading ||
                      (txState?.status && txState?.status !== 'idle') ||
                      state.currentStep === STEPS.SUCCESS
                    }
                    customNextButton={
                      state.currentStep === STEPS.SUCCESS
                        ? { content: 'Finish' }
                        : undefined
                    }
                  />
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )
      }}
    </ClientOnly>
  )
}
