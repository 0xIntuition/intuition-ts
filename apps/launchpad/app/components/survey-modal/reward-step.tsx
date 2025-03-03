import { useEffect, useState } from 'react'

import { Button, Text, TextVariant } from '@0xintuition/1ui'

import { BLOCK_EXPLORER_URL } from '@consts/general'
import logger from '@lib/utils/logger'
import { useQuery } from '@tanstack/react-query'
import { useReward } from 'react-rewards'

import { NewAtomMetadata, Topic } from './types'

const MAX_RETRIES = 3
const RETRY_DELAY = 2000 // 2 seconds

interface RewardStepProps {
  isOpen: boolean
  selectedTopic: Topic
  newAtomMetadata?: NewAtomMetadata
  txHash?: string
  userWallet?: string
  questionId?: number | null
  epochId?: number
  pointAwardAmount?: number
  awardPoints?: (accountId: string) => Promise<boolean>
  onExistingCompletionChange?: (hasCompletion: boolean) => void
}

export function RewardStep({
  isOpen,
  txHash,
  userWallet,
  awardPoints,
  questionId,
  epochId,
  pointAwardAmount,
  onExistingCompletionChange,
}: RewardStepProps) {
  const [rewardReady, setRewardReady] = useState(false)
  const [hasRewardAnimated, setHasRewardAnimated] = useState(false)
  const [hasAwardedPoints, setHasAwardedPoints] = useState(false)
  const [confettiTriggered, setConfettiTriggered] = useState(false)
  const [isAwarding, setIsAwarding] = useState(false)
  const [awardingFailed, setAwardingFailed] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [error, setError] = useState<string>()

  const { reward: triggerReward } = useReward('rewardId', 'confetti', {
    lifetime: 1000,
    elementCount: 100,
    startVelocity: 25,
    zIndex: 1000,
    spread: 100,
    colors: ['#34C578'],
    position: 'absolute',
    onAnimationComplete: () => {
      setHasRewardAnimated(true)
      setConfettiTriggered(false)
    },
  })

  useEffect(() => {
    // Add logging for component mount and key props
    logger('RewardStep mounted with props:', {
      isOpen,
      userWallet,
      questionId,
      epochId,
      hasAwardedPoints,
      isAwarding,
      awardingFailed,
      retryCount,
      existingCompletion,
    })
  }, [])

  // Add logging for completion check query
  const { data: existingCompletion, isLoading: isCheckingCompletion } =
    useQuery({
      queryKey: [
        'question-completion',
        userWallet?.toLowerCase(),
        questionId,
        epochId,
      ],
      queryFn: async () => {
        logger('Fetching existing completion for:', {
          userWallet: userWallet?.toLowerCase(),
          questionId,
          epochId,
        })

        if (!userWallet || !questionId || !epochId) {
          logger('Missing required data for completion check:', {
            userWallet,
            questionId,
            epochId,
          })
          return null
        }

        try {
          const response = await fetch(
            `/resources/get-question-completion?accountId=${userWallet.toLowerCase()}&questionId=${questionId}`,
          )

          if (!response.ok) {
            logger('Completion check failed:', response.status)
            return null
          }

          const data = await response.json()
          logger('Completion check result:', data)
          return data.completion
        } catch (error) {
          logger('Error checking completion:', error)
          return null
        }
      },
      enabled: Boolean(userWallet && questionId && epochId),
      // Disable retries and cache to prevent race conditions
      retry: false,
      gcTime: 0,
      staleTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    })

  useEffect(() => {
    // Add logging for component mount and key props
    logger('RewardStep mounted with props:', {
      isOpen,
      userWallet,
      questionId,
      epochId,
      hasAwardedPoints,
      isAwarding,
      awardingFailed,
      retryCount,
      // Don't reference existingCompletion here since it's not defined yet
    })
  }, [])

  useEffect(() => {
    try {
      // Handle existing completion state
      if (existingCompletion) {
        logger('Found existing completion:', existingCompletion)
        setHasAwardedPoints(true)
        setIsAwarding(false)
        setAwardingFailed(false)
        if (onExistingCompletionChange) {
          onExistingCompletionChange(true)
        }
        return
      }

      // Only attempt to award points if we've confirmed there's no existing completion
      if (existingCompletion === null && !isCheckingCompletion) {
        logger('No existing completion found, proceeding with award')
        if (onExistingCompletionChange) {
          onExistingCompletionChange(false)
        }

        // Reset states when modal opens/closes
        if (!isOpen) {
          setRewardReady(false)
          setHasRewardAnimated(false)
          setHasAwardedPoints(false)
          setConfettiTriggered(false)
          setIsAwarding(false)
          setAwardingFailed(false)
          setRetryCount(0)
          setError(undefined)
          return
        }

        // Only run this once when the component mounts and conditions are met
        const shouldAwardPoints =
          isOpen &&
          !hasAwardedPoints &&
          !isAwarding &&
          !awardingFailed &&
          !!userWallet &&
          !!awardPoints &&
          !!questionId &&
          !!epochId &&
          retryCount < MAX_RETRIES

        if (shouldAwardPoints) {
          const awardPointsAsync = async () => {
            try {
              setIsAwarding(true)
              setError(undefined)

              // Add defensive check for userWallet
              if (!userWallet || !awardPoints) {
                throw new Error('Missing required data to award points')
              }

              const success = await awardPoints(userWallet.toLowerCase())

              if (success) {
                setHasAwardedPoints(true)
                setAwardingFailed(false)
                setRetryCount(0)
                setError(undefined)
                if (onExistingCompletionChange) {
                  onExistingCompletionChange(false)
                }
              } else {
                throw new Error('Failed to award points')
              }
            } catch (error) {
              const errorMessage =
                error instanceof Error
                  ? error.message
                  : 'Failed to award points'
              logger('Error awarding points:', errorMessage)

              // Only set failure state if we've hit max retries
              if (retryCount >= MAX_RETRIES - 1) {
                setAwardingFailed(true)
                setError(errorMessage)
              } else {
                // Schedule retry
                setRetryCount((prev) => prev + 1)
                setTimeout(() => {
                  setIsAwarding(false)
                }, RETRY_DELAY)
              }
            } finally {
              if (!error || retryCount >= MAX_RETRIES - 1) {
                setIsAwarding(false)
              }
            }
          }
          awardPointsAsync()
        }
      }
    } catch (err) {
      // Global error handling for the entire effect
      logger('Unexpected error in RewardStep effect:', err)
      setAwardingFailed(true)
      setError('An unexpected error occurred')
      setIsAwarding(false)
    }
  }, [
    isOpen,
    hasAwardedPoints,
    isAwarding,
    awardingFailed,
    userWallet,
    awardPoints,
    questionId,
    epochId,
    retryCount,
    existingCompletion,
    isCheckingCompletion,
    onExistingCompletionChange,
  ])

  // Add debug logging for state changes
  useEffect(() => {
    logger('Reward step state update:', {
      hasAwardedPoints,
      isAwarding,
      awardingFailed,
    })
  }, [hasAwardedPoints, isAwarding, awardingFailed])

  useEffect(() => {
    if (
      isOpen &&
      !hasRewardAnimated &&
      rewardReady &&
      !confettiTriggered &&
      hasAwardedPoints
    ) {
      const timer = setTimeout(() => {
        setConfettiTriggered(true)
        triggerReward()
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [
    isOpen,
    hasRewardAnimated,
    rewardReady,
    confettiTriggered,
    hasAwardedPoints,
    triggerReward,
  ])

  const handleRetry = async () => {
    if (!userWallet || !awardPoints) {
      logger('Missing required data for retry:', {
        userWallet,
        hasAwardPoints: !!awardPoints,
      })
      setError('Missing required data for awarding points')
      return
    }

    logger('Attempting retry...')
    setIsAwarding(true)
    setAwardingFailed(false)
    setRetryCount(0)
    setError(undefined)

    try {
      const success = await awardPoints(userWallet.toLowerCase())
      logger('Retry result:', { success })
      if (success) {
        setHasAwardedPoints(true)
        setAwardingFailed(false)
        setRetryCount(0)
        setError(undefined)
        if (onExistingCompletionChange) {
          onExistingCompletionChange(false)
        }
      } else {
        throw new Error('Failed to award points')
      }
    } catch (error) {
      logger('Retry failed:', error)
      setAwardingFailed(true)
      setRetryCount((prev) => prev + 1)
      setError(
        error instanceof Error ? error.message : 'Failed to award points',
      )
    } finally {
      setIsAwarding(false)
    }
  }

  return (
    <div className="p-8 h-[460px]">
      <div className="flex flex-col items-center space-y-6">
        <span
          id="rewardId"
          className="absolute top-[88px] left-1/2 -translate-x-1/2 pointer-events-none"
          ref={(el) => {
            if (el && !rewardReady) {
              setRewardReady(true)
            }
          }}
        />
        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center relative">
          {isAwarding ? (
            <svg
              className="w-8 h-8 text-green-500 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : awardingFailed && retryCount >= MAX_RETRIES ? (
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : hasAwardedPoints ? (
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              className="w-8 h-8 text-gray-400 animate-pulse"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">
            {isAwarding
              ? 'Awarding Points...'
              : awardingFailed && retryCount >= MAX_RETRIES
                ? 'Failed to Award Points'
                : hasAwardedPoints
                  ? 'Question Completed!'
                  : 'Preparing Reward...'}
          </h2>
          <Text variant={TextVariant.body} className="text-primary/70">
            {awardingFailed && retryCount >= MAX_RETRIES
              ? 'We encountered an issue while awarding your points. Please try again.'
              : "Your answer has been woven into Intuition's living memory, guiding the path for future seekers."}
          </Text>
          {error && (
            <Text variant={TextVariant.body} className="text-red-500 mt-2">
              Error: {error}
            </Text>
          )}
        </div>

        <div className="text-center space-y-1">
          <h3 className="text-xl text-gray-400">You earned</h3>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-4xl font-bold bg-gradient-to-r from-[#34C578] to-[#00FF94] bg-clip-text text-transparent">
              {existingCompletion
                ? existingCompletion.points_awarded
                : pointAwardAmount || 0}
            </span>
            <span className="text-2xl font-semibold text-gray-300">
              IQ POINTS
            </span>
          </div>
        </div>

        {awardingFailed && retryCount >= MAX_RETRIES && (
          <Button
            variant="secondary"
            onClick={handleRetry}
            disabled={isAwarding}
            className="mt-4"
          >
            {isAwarding ? 'Retrying...' : 'Try Again'}
          </Button>
        )}

        {txHash && (
          <div className="w-full p-4 rounded-lg bg-black/20 border border-gray-800">
            <div className="flex flex-col space-y-2">
              <span className="text-sm text-gray-400">Transaction Hash:</span>
              <a
                href={`${BLOCK_EXPLORER_URL}/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-400 hover:text-blue-300 truncate"
              >
                {txHash}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
