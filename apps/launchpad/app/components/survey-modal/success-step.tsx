import { useEffect, useState } from 'react'

import { Button, Text, TextVariant } from '@0xintuition/1ui'

import { BLOCK_EXPLORER_URL } from '@consts/general'
import { useReward } from 'react-rewards'

import { NewAtomMetadata, Topic } from './types'

interface SuccessStepProps {
  isOpen: boolean
  selectedTopic: Topic
  newAtomMetadata?: NewAtomMetadata
  txHash?: string
}

export function SuccessStep({
  isOpen,
  selectedTopic,
  txHash,
}: SuccessStepProps) {
  const [hasRewardAnimated, setHasRewardAnimated] = useState(false)
  const [confettiTriggered, setConfettiTriggered] = useState(false)

  const { reward: triggerReward } = useReward('successRewardId', 'confetti', {
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
    if (isOpen && !hasRewardAnimated && !confettiTriggered) {
      const timer = setTimeout(() => {
        setConfettiTriggered(true)
        triggerReward()
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [isOpen, hasRewardAnimated, confettiTriggered, triggerReward])

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center h-full">
      <div className="relative">
        <span id="successRewardId" />
        <div className="flex flex-col items-center justify-center space-y-6 max-w-md mx-auto">
          <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-white"
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

          <Text variant={TextVariant.heading2} className="text-white">
            Quest Completed!
          </Text>

          <Text variant={TextVariant.body} className="text-gray-300">
            You've successfully completed this quest by signaling on{' '}
            <span className="font-semibold">{selectedTopic.name}</span>.
          </Text>

          {txHash && (
            <div className="mt-4 w-full">
              <Text variant={TextVariant.small} className="text-gray-400 mb-2">
                Transaction Hash
              </Text>
              <a
                href={`${BLOCK_EXPLORER_URL}/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-400 text-sm break-all transition-colors"
              >
                {txHash}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
