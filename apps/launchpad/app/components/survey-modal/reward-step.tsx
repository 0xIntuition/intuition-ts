import { useEffect, useState } from 'react'

import { BLOCK_EXPLORER_URL } from '@consts/general'
import { useReward } from 'react-rewards'

import { NewAtomMetadata, Topic } from './types'

interface RewardStepProps {
  isOpen: boolean
  selectedTopic: Topic
  newAtomMetadata?: NewAtomMetadata
  txHash?: string
  userWallet?: string
  awardPoints?: (accountId: string, redirectUrl?: string) => void
  redirectUrl?: string
}

export function RewardStep({
  isOpen,
  selectedTopic,
  txHash,
  userWallet,
  awardPoints,
  redirectUrl,
}: RewardStepProps) {
  const [rewardReady, setRewardReady] = useState(false)
  const [hasRewardAnimated, setHasRewardAnimated] = useState(false)
  const [hasAwardedPoints, setHasAwardedPoints] = useState(false)
  const [confettiTriggered, setConfettiTriggered] = useState(false)

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
      isOpen && !hasAwardedPoints && userWallet && awardPoints

    if (shouldAwardPoints) {
      setHasAwardedPoints(true)
      awardPoints(userWallet.toLowerCase(), redirectUrl)
    }
  }, [isOpen, hasAwardedPoints, userWallet, awardPoints, redirectUrl])

  useEffect(() => {
    if (isOpen && !hasRewardAnimated && rewardReady && !confettiTriggered) {
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
    }
  }, [isOpen, hasRewardAnimated, rewardReady, confettiTriggered, triggerReward])

  return (
    <div className="p-8">
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
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Stake Successful!</h2>
          <p className="text-gray-400">
            You&apos;ve successfully set {selectedTopic.name} as your preferred{' '}
            Web3 Wallet
          </p>
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
