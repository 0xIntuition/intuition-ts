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

import { AtomsWithTagsQuery, useAtomsWithTagsQuery } from '@lib/graphql'
import { WHITELISTED_ADDRESSES } from '@lib/utils/constants'
import logger from '@lib/utils/logger'
import { usePrivy } from '@privy-io/react-auth'
import { useLocation, useNavigate } from '@remix-run/react'
import { useQueryClient } from '@tanstack/react-query'
import { ClientOnly } from 'remix-utils/client-only'

import { TransactionStateType } from '../../types/transaction'
import { CreateStep } from './create-step'
import { RewardStep } from './reward-step'
import { SignalStep } from './signal-step'
import { TopicsStep } from './topics-step'
import {
  EcosystemModalProps,
  NewAtomMetadata,
  OnboardingState,
  Step,
  StepId,
  STEPS,
  Topic,
} from './types'

const STORAGE_KEY = 'onboarding-progress'
const VERIFICATION_ADDRESS = '0x6877daca5e6934982a5c511d85bf12a71a25ac1d'

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

export function EcosystemModal({
  isOpen,
  onClose,
  predicateId,
  objectId,
  question,
  tagObjectId,
}: EcosystemModalProps) {
  const queryClient = useQueryClient()
  const { user: privyUser } = usePrivy()
  const userWallet = privyUser?.wallet?.address?.toLowerCase() ?? ''

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

  const { data: searchData, isLoading: isLoadingAtoms } = useAtomsWithTagsQuery(
    {
      where: {
        _and: [
          {
            as_subject_triples: {
              predicate_id: { _eq: predicateId },
              object_id: { _eq: objectId },
            },
          },
          {
            _or: [
              {
                as_subject_triples: {
                  predicate_id: { _eq: predicateId },
                  object_id: { _eq: objectId },
                  vault: {
                    positions: {
                      account: {
                        id: {
                          _in: WHITELISTED_ADDRESSES,
                        },
                      },
                    },
                  },
                },
              },
            ],
          },
          searchTerm
            ? {
                _or: [
                  { label: { _ilike: `%${searchTerm}%` } },
                  { value: { thing: { name: { _ilike: `%${searchTerm}%` } } } },
                  {
                    value: {
                      account: { label: { _ilike: `%${searchTerm}%` } },
                    },
                  },
                ],
              }
            : {},
          tagObjectId
            ? {
                as_subject_triples: {
                  object: {
                    vault_id: { _in: [tagObjectId] },
                  },
                },
              }
            : {},
        ],
      },
      limit: 500,
      tagPredicateIds: [predicateId], // dev - has tag predicate ID
      orderBy: { vault: { total_shares: 'desc' } },
      userPositionAddress: userWallet,
      verifiedPositionAddress: VERIFICATION_ADDRESS,
    },
    {
      enabled: isOpen,
      queryKey: [
        'AtomsWithTags',
        userWallet,
        VERIFICATION_ADDRESS,
        predicateId,
        searchTerm,
        tagObjectId,
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
    if (!searchData?.atoms) {
      return
    }

    const newTopics = searchData.atoms.map((atom) => ({
      id: atom.vault_id,
      name: atom?.value?.account?.label ?? atom.label ?? '',
      image: atom.image ?? undefined,
      atom: atom as unknown as AtomsWithTagsQuery['atoms'][number],
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
  }, [searchData?.atoms])

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
      const selectedAtom = searchData?.atoms?.find(
        (atom) => atom.vault_id === id,
      )
      if (selectedAtom) {
        // Create a new topic
        const newTopic: Topic = {
          id: selectedAtom.vault_id,
          name: selectedAtom?.value?.account?.label ?? selectedAtom.label ?? '',
          image: selectedAtom.image ?? undefined,
          selected: true,
          atom: selectedAtom as unknown as AtomsWithTagsQuery['atoms'][number],
        }

        setTopics((prev) => [
          ...prev.map((t) => ({ ...t, selected: false })),
          newTopic,
        ])

        // Set up metadata for triple creation since this is a new atom
        const metadata: NewAtomMetadata = {
          name: selectedAtom?.value?.account?.label ?? selectedAtom.label ?? '',
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
      formData.append('subjectId', subjectId ?? '')

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
          const targetPath = `/quests/ecosystems/${question.epoch_id}/${question.id}`
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
          atom: searchData?.atoms.find(
            (atom) => atom.vault_id === metadata.vaultId,
          ) as AtomsWithTagsQuery['atoms'][number],
        },
      }
      return newState
    })

    setSubjectId(metadata.vaultId)
    updateStepStatus(STEPS.CREATE, 'completed')
    updateStepStatus(STEPS.SIGNAL, 'current')
  }

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
                      isLoadingList={isLoadingAtoms}
                      onToggleTopic={handleTopicSelect}
                      question={question}
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      isSearching={isLoadingAtoms}
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
                        setTxState={setTxState}
                        onStakingSuccess={onStakingSuccess}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                        isOpen={isOpen}
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
