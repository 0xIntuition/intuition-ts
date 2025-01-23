import { useCallback, useEffect, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  StepIndicator,
} from '@0xintuition/1ui'
import { GetTripleQuery, useGetListDetailsQuery } from '@0xintuition/graphql'

import { CURRENT_ENV } from '@consts/general'
import { getSpecialPredicate } from '@lib/utils/app'
import logger from '@lib/utils/logger'
import { usePrivy } from '@privy-io/react-auth'
import { useNavigate } from '@remix-run/react'
import { useQueryClient } from '@tanstack/react-query'
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

export function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const queryClient = useQueryClient()
  const { user: privyUser } = usePrivy()
  const userWallet = privyUser?.wallet?.address
  const navigate = useNavigate()

  const [state, setState] = useState<OnboardingState>(INITIAL_STATE)
  const [topics, setTopics] = useState<Topic[]>([])
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [steps, setSteps] = useState<Step[]>(STEPS_CONFIG)
  const [txState, setTxState] = useState<TransactionStateType>()

  const predicateId =
    getSpecialPredicate(CURRENT_ENV).tagPredicate.id.toString()
  const objectId =
    getSpecialPredicate(CURRENT_ENV).web3Wallet.vaultId.toString()

  logger('current env', CURRENT_ENV)
  logger('predicateId', predicateId)
  logger('objectId', objectId)

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
      queryClient.refetchQueries({
        queryKey: [
          'get-list-details',
          {
            predicateId,
            objectId,
            searchTerm,
          },
        ],
      })
    }
  }, [isOpen, queryClient, searchTerm])

  const handleTransition = useCallback(
    (updateFn: (prev: OnboardingState) => OnboardingState) => {
      setIsTransitioning(true)
      setTimeout(() => {
        setState(updateFn)
        setIsTransitioning(false)
      }, 300)
    },
    [],
  )

  useEffect(() => {
    if (isOpen) {
      setState(INITIAL_STATE)
    }
  }, [isOpen])

  useEffect(() => {
    if (!listData?.globalTriples) {
      return
    }

    const newTopics = listData.globalTriples.map((triple) => ({
      id: triple.vault_id,
      name: triple.subject.label ?? '',
      image: triple.subject.image ?? undefined,
      triple: triple as unknown as GetTripleQuery['triple'],
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

  useEffect(() => {
    if (!isOpen) {
      const MODAL_ANIMATION_DURATION = 300
      setTimeout(() => {
        setState(INITIAL_STATE)
      }, MODAL_ANIMATION_DURATION)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen, queryClient])

  useEffect(() => {
    if (isOpen) {
      document.body.style.paddingRight = 'var(--removed-body-scroll-bar-size)'
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.paddingRight = ''
      document.body.style.overflow = ''
    }
  }, [isOpen])

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

  const updateStepStatus = (stepId: StepId, status: Step['status']) => {
    setSteps((prev) =>
      prev.map((step) => (step.id === stepId ? { ...step, status } : step)),
    )
  }

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

  const awardPoints = async (accountId: string, redirectUrl?: string) => {
    try {
      setIsLoading(true)
      const formData = new FormData()
      formData.append('accountId', accountId)
      formData.append('type', 'minigame1')
      if (redirectUrl) {
        formData.append('redirectUrl', redirectUrl)
      }

      const response = await fetch('/actions/reward-points', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to award points')
      }

      queryClient.invalidateQueries({
        queryKey: ['account-points', userWallet?.toLowerCase()],
      })

      if (redirectUrl) {
        await new Promise((resolve) => setTimeout(resolve, 3000))
        onClose()
        navigate(redirectUrl)
      }
    } catch (error) {
      logger('Error awarding points:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    logger('Form submitted')
  }, [])

  const onStakingSuccess = () => {
    handleTransition((prev) => ({
      ...prev,
      currentStep: STEPS.REWARD,
    }))
    updateStepStatus(STEPS.SIGNAL, 'completed')
    updateStepStatus(STEPS.REWARD, 'current')

    if (!userWallet) {
      logger('Missing userWallet')
      return
    }
  }

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
        triple: listData
          ?.globalTriples[0] as unknown as GetTripleQuery['triple'],
      },
    }))
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

  logger('txState.status', txState?.status)

  return (
    <ClientOnly>
      {() => (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="p-0 bg-gradient-to-br from-[#060504] to-[#101010] md:max-w-[720px] w-full border-none">
            <div
              className={`transition-opacity duration-300 ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
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
                    redirectUrl="/quests/questions/question/1"
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
                        ? onClose
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
