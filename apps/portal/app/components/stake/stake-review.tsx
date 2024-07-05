import { useEffect, useState } from 'react'

import {
  Button,
  Claim,
  DialogHeader,
  DialogTitle,
  IdentityTag,
} from '@0xintuition/1ui'
import { ClaimPresenter, IdentityPresenter } from '@0xintuition/api'

import { formatDisplayBalance } from '@lib/utils/misc'
import { ArrowLeft } from 'lucide-react'
import {
  type StakeTransactionAction,
  type StakeTransactionState,
} from 'types/stake-transaction'

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
  entry_fee: string
  exit_fee: string
}

export default function StakeReview({
  val,
  mode,
  dispatch,
  state,
  isError,
  modalType,
  identity,
  claim,
  entry_fee,
  exit_fee,
}: StakeReviewProps) {
  const [statusText, setStatusText] = useState<string>('')

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

  return (
    <>
      <DialogHeader>
        <DialogTitle className="justify-between">
          <Button
            onClick={(e) => {
              e.preventDefault()
              dispatch({ type: 'START_TRANSACTION' })
            }}
            variant="ghost"
            size="icon"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </DialogTitle>
      </DialogHeader>
      <div className="flex w-full flex-col gap-5 px-2">
        <div
          className={`flex h-full w-full flex-col items-center justify-center gap-2 px-2 pt-5`}
        >
          <div className="gap-5 flex flex-col items-center">
            <span className="text-xl font-medium text-white/70 leading-[30px]">
              {mode === 'deposit' ? 'Deposit' : 'Redeem'}{' '}
              {formatDisplayBalance(Number(val), 2)} ETH on{' '}
              {modalType === 'identity' ? 'identity' : 'claim'}
            </span>
            {modalType === 'identity' ? (
              <IdentityTag
                imgSrc={identity?.user?.image ?? identity?.image}
                variant={identity?.user ? 'user' : 'default'}
              >
                {identity?.user?.display_name ?? identity?.display_name}
              </IdentityTag>
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
              Estimated Fees:{' '}
              {(+val * (mode === 'deposit' ? +entry_fee : +exit_fee)).toFixed(
                6,
              )}{' '}
              ETH
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
