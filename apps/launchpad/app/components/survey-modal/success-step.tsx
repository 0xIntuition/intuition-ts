import { useEffect, useState } from 'react'

import { Text, TextVariant } from '@0xintuition/1ui'

import { BLOCK_EXPLORER_URL } from '@consts/general'
import { useReward } from 'react-rewards'

import { NewAtomMetadata } from './types'

interface SuccessStepProps {
  isOpen: boolean
  newAtomMetadata?: NewAtomMetadata
  txHash?: string
}

export function SuccessStep({ isOpen, txHash }: SuccessStepProps) {
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
    <div className="p-8 h-[360px]">
      <div className="flex flex-col items-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center relative">
          <svg
            className="w-8 h-8 text-white"
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

        <h2 className="text-2xl font-bold">Transaction Complete</h2>

        <Text
          variant={TextVariant.body}
          className="text-primary/70 text-center"
        >
          {`Your answer has been woven into Intuition's living memory, guiding the
          path for future seekers.`}
        </Text>

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
