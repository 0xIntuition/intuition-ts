import React from 'react'

import {
  Icon,
  TransactionStatusCard,
  TransactionStatusIndicator,
  TransactionStatusType,
  TransactionType,
} from '@0xintuition/1ui'

import { Link } from '@remix-run/react'
import clsx from 'clsx'
import { BLOCK_EXPLORER_URL } from 'consts'

interface TransactionStateProps {
  status: TransactionStatusType
  txHash?: `0x${string}`
  type: TransactionType
  ipfsLink?: string
  successButton?: React.ReactNode
}

export function TransactionState({
  status,
  txHash,
  type,
  ipfsLink,
  successButton,
}: TransactionStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-96">
      <div className={clsx({ 'mb-10': status !== 'complete' })}>
        <TransactionStatusIndicator status={status} type={type} />
      </div>
      {status !== 'complete' ? (
        <TransactionStatusCard status={status} />
      ) : (
        <div className="flex flex-col items-center">
          {txHash && (
            <div className="flex flex-col items-center mt-2.5">
              <Link
                to={`${BLOCK_EXPLORER_URL}/tx/${txHash}`}
                target="_blank"
                className="flex flex-row items-center gap-1 text-xxs text-blue-500 transition-colors duration-300 hover:text-blue-400"
              >
                View on Basescan
                <Icon name="square-arrow-top-right" className="h-3 w-3" />
              </Link>
              {type === 'identity' && ipfsLink && (
                <Link
                  to={ipfsLink}
                  target="_blank"
                  className="flex flex-row items-center gap-1 text-xxs text-blue-500 transition-colors duration-300 hover:text-blue-400 mt-2.5"
                >
                  View on IPFS
                  <Icon name="square-arrow-top-right" className="h-3 w-3" />
                </Link>
              )}
              {successButton && <div className="mt-10">{successButton}</div>}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
