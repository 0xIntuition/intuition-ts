import { useEffect, useState } from 'react'

import { Badge, Claim, Identity } from '@0xintuition/1ui'
import { ClaimPresenter, IdentityPresenter } from '@0xintuition/api'

import { formatDisplayBalance } from '@lib/utils/misc'
import { Link } from '@remix-run/react'
import { AnimatePresence, motion } from 'framer-motion'
import { Loader2Icon } from 'lucide-react'
import {
  type StakeTransactionAction,
  type StakeTransactionState,
} from 'types/stake-transaction'

import BackIcon from '../svg/back-icon'
import CheckCircleIcon from '../svg/check-circle-icon'
import XCircleIcon from '../svg/x-circle-icon'

interface StakeReviewProps {
  val: string
  mode: string | undefined
  dispatch: (action: StakeTransactionAction) => void
  state: StakeTransactionState
  direction: 'for' | 'against'
  isError?: boolean
  modalType: 'identity' | 'claim' | null | undefined
  identity?: IdentityPresenter
  claim?: ClaimPresenter
}

export default function StakeReview({
  val,
  mode,
  dispatch,
  state,
  direction,
  isError,
  modalType,
  identity,
  claim,
}: StakeReviewProps) {
  const [statusText, setStatusText] = useState<string>('')
  const [statusIcon, setStatusIcon] = useState<React.ReactNode>(null)

  useEffect(() => {
    const newText = isError
      ? 'Transaction failed'
      : state.status === 'pending' || state.status === 'confirm'
        ? 'Attestation in progress'
        : state.status === 'confirmed' || state.status === 'complete'
          ? mode === 'deposit'
            ? 'Deposited successfully'
            : 'Redeemed successfully'
          : state.status === 'error'
            ? 'Transaction failed'
            : mode === 'deposit'
              ? 'Deposit'
              : 'Redeem'
    if (newText !== statusText) {
      setStatusText(newText)
    }
  }, [isError, state.status, mode, statusText])

  useEffect(() => {
    let newIcon: React.ReactNode = null

    if (state.status === 'pending' || state.status === 'confirm') {
      newIcon = <Loader2Icon className="h-3 w-3 animate-spin text-green-500" />
    } else if (state.status === 'confirmed' || state.status === 'complete') {
      newIcon = <CheckCircleIcon className="h-3 w-3 text-green-500" />
    } else if (state.status === 'error') {
      newIcon = <XCircleIcon className="h-3 w-3 text-red-500" />
    }

    setStatusIcon(newIcon)
  }, [state.status])
  return (
    <>
      <div className="flex w-full flex-col gap-5 px-2">
        <div
          className={`flex h-full w-full flex-col items-center justify-center gap-2 px-2 pt-5`}
        >
          <div className="flex flex-row gap-2">
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault()
                dispatch({ type: 'START_TRANSACTION' })
              }}
              prefetch="intent"
              className={`${state.status !== 'review' && 'hidden'}`}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <BackIcon className="h-6 w-6 text-primary-500 transition-colors duration-300 hover:text-primary-100" />
              </motion.div>
            </Link>
            <Badge
              className={`pointer-events-none flex flex-row items-center justify-center gap-1 rounded-full !px-2.5 !py-1 text-xxs font-medium transition-colors duration-300 ease-in-out ${
                state.status !== 'review'
                  ? 'bg-primary-50/[3%] text-primary-100'
                  : direction === 'for'
                    ? 'bg-green-500/25 text-green-500'
                    : direction === 'against'
                      ? 'bg-red-500/25 text-red-500'
                      : 'bg-primary-50 text-primary-900'
              }`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  className="flex flex-row items-center gap-1"
                  key={statusText}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span>{statusText}</span>
                  <motion.div
                    key="statusIcon"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {statusIcon}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </Badge>
          </div>
          <span className="text-xl font-medium text-white/70 leading-[30px]">
            {mode === 'deposit' ? 'Deposit' : 'Redeem'}{' '}
            {formatDisplayBalance(Number(val), 2)} ETH on{' '}
            {modalType === 'identity' ? 'identity' : 'claim'}
          </span>
          {modalType === 'identity' ? (
            <Identity
              imgSrc={identity?.user?.image ?? identity?.image}
              variant={identity?.user ? 'user' : 'default'}
            >
              {identity?.user?.display_name ?? identity?.display_name}
            </Identity>
          ) : (
            <Claim
              subject={{
                imgSrc: claim?.subject?.user?.image ?? claim?.subject?.image,
                label:
                  claim?.subject?.user?.display_name ??
                  claim?.subject?.display_name,
                variant: claim?.subject?.user ? 'user' : 'default',
              }}
              predicate={{
                imgSrc: claim?.predicate?.image,
                label: claim?.predicate?.display_name,
              }}
              object={{
                imgSrc: claim?.object?.user?.image ?? claim?.object?.image,
                label:
                  claim?.object?.user?.display_name ??
                  claim?.object?.display_name,
                variant: claim?.object?.user ? 'user' : 'default',
              }}
            />
          )}
          <span className="text-neutral-50/50 text-base font-normal leading-normal m-auto">
            Estimated Fees: 0.0001 ETH
          </span>
        </div>
      </div>
    </>
  )
}
