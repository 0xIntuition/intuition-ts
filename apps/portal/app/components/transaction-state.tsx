import React from 'react'

import {
  Icon,
  TransactionStatusCard,
  TransactionStatusIndicator,
  TransactionStatusType,
  TransactionType,
} from '@0xintuition/1ui'

import { BLOCK_EXPLORER_URL } from '@lib/utils/constants'
import { Link } from '@remix-run/react'

interface TransactionStateProps {
  status: TransactionStatusType
  txHash?: `0x${string}`
  type: TransactionType
  successButton?: React.ReactNode
}

export function TransactionState({
  status,
  txHash,
  type,
  successButton,
}: TransactionStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-96">
      <TransactionStatusIndicator status={status} type={type} />
      {status !== 'complete' ? (
        <TransactionStatusCard status={status} />
      ) : (
        <div className="flex flex-col gap-1 items-center gap-2.5">
          {txHash && (
            <div className="flex flex-col items-center">
              <Link
                to={`${BLOCK_EXPLORER_URL}/tx/${txHash}`}
                target="_blank"
                className="flex flex-row items-center gap-1 text-xxs text-blue-500 transition-colors duration-300 hover:text-blue-400"
              >
                View on Basescan
                <Icon name="square-arrow-top-right" className="h-3 w-3" />
              </Link>
              {successButton}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default TransactionState
