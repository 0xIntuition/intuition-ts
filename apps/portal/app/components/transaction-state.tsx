import React from 'react'

import {
  Button,
  DialogHeader,
  DialogTitle,
  Icon,
  TransactionStatusCard,
  TransactionStatusIndicator,
  TransactionStatusType,
  TransactionType,
} from '@0xintuition/1ui'

import { Link } from '@remix-run/react'
import { BLOCK_EXPLORER_URL } from 'app/consts'
import clsx from 'clsx'

interface TransactionStateProps {
  status: TransactionStatusType
  txHash?: `0x${string}`
  type: TransactionType
  atomType?: 'default' | 'smartContract'
  chainName?: string
  ipfsLink?: string
  successButton?: React.ReactNode
  errorButton?: React.ReactNode
}

export function TransactionState({
  status,
  txHash,
  type,
  atomType,
  chainName,
  ipfsLink,
  successButton,
  errorButton,
}: TransactionStateProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>
          <Button variant="ghost" size="icon" disabled>
            <Icon name="arrow-left" className="h-4 w-4" />
          </Button>
        </DialogTitle>
      </DialogHeader>
      <div className="flex flex-col items-center justify-center m-auto h-full">
        <div
          className={clsx(
            'flex flex-col m-auto justify-center items-center h-full',
            {
              'gap-10': status !== 'complete',
            },
          )}
        >
          <TransactionStatusIndicator status={status} type={type} />
          {status !== 'complete' && <TransactionStatusCard status={status} />}
          {status === 'complete' && txHash && (
            <div className="flex flex-col items-center mt-2.5 gap-2.5">
              <Link
                to={`${BLOCK_EXPLORER_URL}/tx/${txHash}`}
                target="_blank"
                className="flex flex-row items-center gap-1 text-blue-500 transition-colors duration-300 hover:text-blue-400"
              >
                View Transaction on Basescan
                <Icon name="square-arrow-top-right" className="h-3 w-3" />
              </Link>
              {type === 'identity' && ipfsLink && (
                <Link
                  to={ipfsLink}
                  target="_blank"
                  className="flex flex-row items-center gap-1 text-blue-500 transition-colors duration-300 hover:text-blue-400"
                >
                  {atomType === 'smartContract'
                    ? `View Contract on ${chainName}`
                    : 'View on IPFS'}
                  <Icon name="square-arrow-top-right" className="h-3 w-3" />
                </Link>
              )}
            </div>
          )}
        </div>
        <div className="mt-auto">
          {status === 'error' && errorButton && errorButton}
          {status === 'complete' && successButton && successButton}
        </div>
      </div>
    </>
  )
}
