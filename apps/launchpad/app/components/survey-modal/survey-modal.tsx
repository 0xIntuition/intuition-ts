import {
  startTransition,
  useCallback,
  useEffect,
  useMemo,
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

import { CURRENT_ENV } from '@consts/general'
import { getSpecialPredicate } from '@lib/utils/app'
import logger from '@lib/utils/logger'
import { usePrivy } from '@privy-io/react-auth'
import { useLocation, useNavigate } from '@remix-run/react'
import { useQueryClient } from '@tanstack/react-query'
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

export function OnboardingModal({
  isOpen,
  onClose,
  predicateId,
  objectId,
  question,
  mode,
  preferencesPredicateId,
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
  const [hasAwardedPoints, setHasAwardedPoints] = useState(false)
  const [hasExistingCompletion, setHasExistingCompletion] = useState(false)

  const transition = useStepTransition(setState)
  const { isTransitioning, handleTransition, resetTransition } = transition
  const navigate = useNavigate()
  const location = useLocation()

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
      orderBy: {
        vault: {
          total_shares: 'desc',
        },
      },
      limit: mode === 'preferences' ? 1000 : 50,
      offset: 0,
    },
    {
      queryKey: [
        'get-list-details',
        {
          predicateId,
          objectId,
          searchTerm,
          mode,
        },
      ],
    },
  )

  // Extract subject IDs from listData to use as object IDs in preferences query
  const subjectIds = useMemo(() => {
    if (!listData?.globalTriples) {
      return []
    }
    return listData.globalTriples.map((triple) => triple.subject.id)
  }, [listData])

  // Query for preferences data when in preferences mode
  const { data: preferencesData, isLoading: isLoadingPreferences } =
    useGetListDetailsQuery(
      {
        tagPredicateId: preferencesPredicateId || 0,
        globalWhere: {
          predicate_id: {
            _eq: preferencesPredicateId || 0,
          },
          object_id: {
            _in: subjectIds,
          },
          subject_id: {
            _eq: getSpecialPredicate(CURRENT_ENV).iPredicate.vaultId,
          },
          subject: {
            label: {
              _ilike: searchTerm ? `%${searchTerm}%` : undefined,
            },
          },
        },
        orderBy: {
          vault: {
            total_shares: 'desc',
          },
        },
        limit: 1000,
        offset: 0,
      },
      {
        queryKey: [
          'get-preferences-data',
          {
            preferencesPredicateId,
            subjectIds,
            searchTerm,
          },
        ],
        enabled:
          mode === 'preferences' &&
          !!preferencesPredicateId &&
          subjectIds.length > 0,
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
      enabled: Boolean(searchTerm) && mode !== 'preferences',
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

    if (mode === 'preferences' && preferencesData?.globalTriples) {
      // In preferences mode, create topics that display list items but use preferences triples
      const newTopics: Topic[] = listData.globalTriples.map((listTriple) => {
        // Find the corresponding preferences triple for this list item
        const preferencesTriple = preferencesData.globalTriples.find(
          (prefTriple) => prefTriple.object.id === listTriple.subject.id,
        )

        return {
          id: listTriple.subject.vault_id,
          name: listTriple.subject.label ?? '',
          image: listTriple.subject.image ?? undefined,
          triple: (preferencesTriple || listTriple) as TripleType,
          selected: false,
          totalSignals:
            preferencesTriple?.vault?.positions_aggregate?.aggregate?.count ||
            listTriple.vault?.positions_aggregate?.aggregate?.count,
        }
      })
      setTopics(newTopics)
    } else {
      // In questions mode, create topics from list triples normally
      const newTopics: Topic[] = listData.globalTriples.map((triple) => ({
        id: triple.subject.vault_id,
        name: triple.subject.label ?? '',
        image: triple.subject.image ?? undefined,
        triple: triple as TripleType,
        selected: false,
      }))
      setTopics(newTopics)
    }

    setSteps((prev) => {
      if (listData.globalTriples.length > 0) {
        return prev.filter((step) => step.id !== STEPS.CREATE)
      }
      return prev
    })

    return () => {
      setTopics([])
    }
  }, [listData?.globalTriples, preferencesData?.globalTriples, mode])

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

    // In preferences mode, don't allow selection of atoms that aren't in the preferences list
    if (mode === 'preferences') {
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
          triple: undefined,
        }

        setTopics((prev) => [
          ...prev.map((t) => ({ ...t, selected: false })),
          newTopic,
        ])

        // Set up metadata for triple creation since this is a new atom
        const metadata: NewAtomMetadata = {
          name: selectedAtom.label ?? '',
          image: selectedAtom.image ?? undefined,
          vaultId: selectedAtom.vault_id,
        }

        handleTransition((prev) => ({
          ...prev,
          selectedTopic: newTopic,
          newAtomMetadata: metadata,
          currentStep: STEPS.SIGNAL,
        }))

        updateStepStatus(STEPS.TOPICS, 'completed')
        updateStepStatus(STEPS.SIGNAL, 'current')
      }
    }
  }

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
      if (!userWallet) {
        return
      }

      // Reset points awarded state first
      setHasAwardedPoints(false)
      setHasExistingCompletion(false)

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
    },
    [handleTransition, userWallet],
  )

  const awardPoints = async (accountId: string): Promise<boolean> => {
    try {
      logger('Starting points award process:', {
        accountId,
        questionId: question.id,
        epochId: question?.epoch_id,
        pointAwardAmount: question.point_award_amount,
        subjectId,
        mode,
      })

      setIsLoading(true)

      const formData = new FormData()
      formData.append('accountId', accountId)
      formData.append('questionId', question.id?.toString() ?? '')
      formData.append('epochId', question?.epoch_id?.toString() ?? '')
      formData.append(
        'pointAwardAmount',
        question.point_award_amount?.toString() ?? '',
      )

      if (mode === 'preferences') {
        // In preferences mode:
        // - subjectId should be the "I" predicate vault_id
        // - objectId should be the preference target (what the user selected)
        const iPredicate = getSpecialPredicate(CURRENT_ENV).iPredicate
        formData.append('subjectId', iPredicate.vaultId.toString())
        formData.append('objectId', subjectId ?? '')
      } else {
        // In questions mode:
        // - subjectId is the selected list item
        // - objectId is not needed (backward compatibility)
        formData.append('subjectId', subjectId ?? '')
      }

      const response = await fetch('/actions/reward-question-points', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      logger('Award points response:', data)

      if (!response.ok) {
        const errorData = data
        logger('Award points request failed:', {
          status: response.status,
          errorData,
        })
        const error =
          errorData?.error ||
          errorData?.details ||
          `Failed to award points: ${response.status}`
        throw new Error(error)
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to award points')
      }

      logger('Successfully awarded points')

      // Invalidate relevant queries
      logger('Invalidating queries...')
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [
            'question-completion',
            accountId.toLowerCase(),
            question.id,
          ],
        }),
        queryClient.invalidateQueries({
          queryKey: [
            'epoch-progress',
            accountId.toLowerCase(),
            question?.epoch_id,
          ],
        }),
      ])

      return true
    } catch (error) {
      logger('Error in awardPoints:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = useCallback(() => {
    const isFlowComplete =
      state.currentStep === STEPS.REWARD &&
      txState?.status === 'complete' &&
      !isLoading && // Only consider complete if not still loading
      (hasAwardedPoints || hasExistingCompletion) // Allow closing for both new and existing completions

    // Only close if we're not in the reward step or points have been awarded/existed
    if (state.currentStep !== STEPS.REWARD || (isFlowComplete && userWallet)) {
      onClose()

      // Reduced from 300ms to 150ms to match transition duration
      setTimeout(() => {
        setState(INITIAL_STATE)
        setSteps(STEPS_CONFIG)
        resetTransition()

        if (isFlowComplete && question?.id && question?.epoch_id) {
          const basePath = mode === 'preferences' ? 'preferences' : 'questions'
          const targetPath = `/quests/${basePath}/${question.epoch_id}/${question.id}`
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
    hasAwardedPoints,
    hasExistingCompletion,
    onClose,
    resetTransition,
    question?.id,
    question?.epoch_id,
    location.pathname,
    navigate,
    mode,
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
    // Disable atom creation in preferences mode
    if (mode === 'preferences') {
      return
    }

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
  }, [handleTransition, mode])

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
                // Prevent closing if points haven't been awarded yet
                if (state.currentStep === STEPS.REWARD && !hasAwardedPoints) {
                  e.preventDefault()
                }
              }}
              onEscapeKeyDown={(e) => {
                // Prevent closing if points haven't been awarded yet
                if (state.currentStep === STEPS.REWARD && !hasAwardedPoints) {
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
                      isLoadingPreferences={isLoadingPreferences}
                      onToggleTopic={handleTopicSelect}
                      onCreateClick={handleCreateClick}
                      question={question}
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      atomsData={atomsData}
                      isSearching={isSearching}
                      mode={mode}
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
                        objectLabel={question?.object_label ?? ''}
                        setTxState={setTxState}
                        onStakingSuccess={onStakingSuccess}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                        isOpen={isOpen}
                        mode={mode}
                        preferencesPredicateId={preferencesPredicateId}
                      />
                    )}

                  {state.currentStep === STEPS.REWARD &&
                    state.selectedTopic && (
                      <RewardStep
                        isOpen={state.currentStep === STEPS.REWARD}
                        selectedTopic={state.selectedTopic}
                        newAtomMetadata={state.newAtomMetadata}
                        txHash={txState?.txHash}
                        userWallet={userWallet}
                        pointAwardAmount={question?.point_award_amount}
                        awardPoints={awardPoints}
                        questionId={question?.id}
                        epochId={question?.epoch_id}
                        onExistingCompletionChange={setHasExistingCompletion}
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
                      state.currentStep !== STEPS.REWARD
                        ? handleNext
                        : state.currentStep === STEPS.REWARD &&
                            (hasAwardedPoints || hasExistingCompletion)
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
                          : state.currentStep === STEPS.REWARD
                            ? !hasAwardedPoints && !hasExistingCompletion
                            : state.currentStep === STEPS.CREATE
                    }
                    disableBack={
                      isLoading ||
                      (txState?.status && txState?.status !== 'idle') ||
                      (state.currentStep === STEPS.REWARD && !hasAwardedPoints)
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
        )
      }}
    </ClientOnly>
  )
}
