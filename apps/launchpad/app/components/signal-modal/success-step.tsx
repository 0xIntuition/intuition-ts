import { Button, Text, TextVariant } from '@0xintuition/1ui'

import { BLOCK_EXPLORER_URL } from '@consts/general'
import { ArrowBigDown, ArrowBigUp, ArrowDownToLine } from 'lucide-react'

interface SuccessStepProps {
  isOpen: boolean
  name: string
  direction: 'for' | 'against'
  txHash?: string
  onClose: () => void
  mode?: 'deposit' | 'redeem'
  isFullRedeem?: boolean
}

export function SuccessStep({
  name,
  direction,
  txHash,
  onClose,
  mode = 'deposit',
  isFullRedeem = false,
}: SuccessStepProps) {
  const getSuccessMessage = () => {
    if (mode === 'redeem') {
      return isFullRedeem
        ? `You've successfully redeemed all your signal for ${name}`
        : `You've successfully redeemed part of your signal for ${name}`
    }
    return direction === 'for'
      ? `You've successfully upvoted ${name}`
      : `You've successfully downvoted ${name}`
  }

  const getIconColor = () => {
    if (mode === 'redeem') {
      return 'text-yellow-500'
    }
    return direction === 'for' ? 'text-success' : 'text-destructive'
  }

  const getBackgroundColor = () => {
    if (mode === 'redeem') {
      return 'bg-yellow-500/10'
    }
    return direction === 'for' ? 'bg-success/10' : 'bg-destructive/10'
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-8">
        <div className="flex flex-col items-center space-y-6">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center ${getBackgroundColor()}`}
          >
            {mode === 'redeem' ? (
              <ArrowDownToLine className={`w-8 h-8 ${getIconColor()}`} />
            ) : direction === 'for' ? (
              <ArrowBigUp
                className={`w-8 h-8 ${getIconColor()} fill-current`}
              />
            ) : (
              <ArrowBigDown
                className={`w-8 h-8 ${getIconColor()} fill-current`}
              />
            )}
          </div>

          <div className="text-center space-y-2">
            <h2 className={`text-2xl font-bold ${getIconColor()}`}>
              {mode === 'redeem'
                ? 'Redemption Successful!'
                : 'Signal Successful!'}
            </h2>
            <Text variant={TextVariant.body} className="text-gray-400">
              {getSuccessMessage()}
            </Text>
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
      <div className="p-4">
        <Button variant="primary" className="w-full" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  )
}
