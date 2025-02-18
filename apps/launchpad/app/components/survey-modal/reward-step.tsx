import { useEffect, useState } from 'react'

import { Text, TextVariant } from '@0xintuition/1ui'

import { BLOCK_EXPLORER_URL } from '@consts/general'
import { useReward } from 'react-rewards'

import { NewAtomMetadata, Topic } from './types'

interface RewardStepProps {
  isOpen: boolean
  selectedTopic: Topic
  newAtomMetadata?: NewAtomMetadata
  txHash?: string
  userWallet?: string
  questionId?: number | null
  epochId?: number
  awardPoints?: (accountId: string) => Promise<boolean>
}

export function RewardStep({
  isOpen,
  txHash,
  userWallet,
  awardPoints,
  questionId,
  epochId,
}: RewardStepProps) {
  const [rewardReady, setRewardReady] = useState(false)
  const [hasRewardAnimated, setHasRewardAnimated] = useState(false)
  const [hasAwardedPoints, setHasAwardedPoints] = useState(false)
  const [confettiTriggered, setConfettiTriggered] = useState(false)
  const [isAwarding, setIsAwarding] = useState(false)
  const [awardingFailed, setAwardingFailed] = useState(false)

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
    // Only run this once when the component mounts and conditions are met
    const shouldAwardPoints =
      isOpen &&
      !hasAwardedPoints &&
      !isAwarding &&
      !awardingFailed &&
      userWallet &&
      awardPoints &&
      questionId &&
      epochId

    if (shouldAwardPoints) {
      const awardPointsAsync = async () => {
        try {
          setIsAwarding(true)
          const success = await awardPoints(userWallet.toLowerCase())
          if (success) {
            setHasAwardedPoints(true)
          } else {
            setAwardingFailed(true)
          }
        } catch (error) {
          setAwardingFailed(true)
          console.error('Failed to award points:', error)
        } finally {
          setIsAwarding(false)
        }
      }
      awardPointsAsync()
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
  ])

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

    if (!isOpen) {
      setHasRewardAnimated(false)
      setHasAwardedPoints(false)
      setConfettiTriggered(false)
      setIsAwarding(false)
      setAwardingFailed(false)
    }
  }, [
    isOpen,
    hasRewardAnimated,
    rewardReady,
    confettiTriggered,
    hasAwardedPoints,
    triggerReward,
  ])

  return (
    <div className="p-8 h-[460px]">
      <div className="flex flex-col items-center space-y-6">
        <span
          id="rewardId"
          ref={(el) => {
            if (el && !rewardReady) {
              setRewardReady(true)
            }
          }}
        />
        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
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
          ) : awardingFailed ? (
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
              : awardingFailed
                ? 'Failed to Award Points'
                : hasAwardedPoints
                  ? 'Question Completed!'
                  : 'Preparing Reward...'}
          </h2>
          <Text variant={TextVariant.body} className="text-primary/70">
            You&apos;ve successfully answered the question and earned points
          </Text>
        </div>

        <div className="text-center space-y-1">
          <h3 className="text-xl text-gray-400">You earned</h3>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-4xl font-bold bg-gradient-to-r from-[#34C578] to-[#00FF94] bg-clip-text text-transparent">
              200
            </span>
            <span className="text-2xl font-semibold text-gray-300">
              IQ POINTS
            </span>
          </div>
        </div>

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
