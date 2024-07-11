import { useEffect, useState } from 'react'

import {
  Button,
  Claim,
  DialogHeader,
  DialogTitle,
  Icon,
} from '@0xintuition/1ui'
import { ClaimPresenter, IdentityPresenter } from '@0xintuition/api'

import { formatBalance, formatDisplayBalance } from '@lib/utils/misc'
import { TransactionActionType, TransactionStateType } from 'types/transaction'

interface FollowReviewProps {
  val: string
  mode: string | undefined
  dispatch: (action: TransactionActionType) => void
  state: TransactionStateType
  isError?: boolean
  identity: IdentityPresenter
  claim: ClaimPresenter
  user_assets: string
  entry_fee: string
  exit_fee: string
}

export default function FollowReview({
  val,
  mode,
  dispatch,
  state,
  isError,
  identity,
  claim,
  user_assets,
  entry_fee,
  exit_fee,
}: FollowReviewProps) {
  const [statusText, setStatusText] = useState<string>('')
  useEffect(() => {
    const newText = isError
      ? 'Transaction failed'
      : state.status === 'transaction-pending' || state.status === 'confirm'
        ? 'Attestation in progress'
        : state.status === 'transaction-confirmed' ||
            state.status === 'complete'
          ? mode === 'follow'
            ? 'Deposited successfully'
            : 'Redeemed successfully'
          : state.status === 'error'
            ? 'Transaction failed'
            : mode === 'follow'
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
            <Icon name="arrow-left" className="h-4 w-4" />
          </Button>
        </DialogTitle>
      </DialogHeader>
      <div className="h-full px-10 pb-10 flex-col justify-center items-center gap-5 inline-flex">
        <div className="self-stretch flex-col justify-center items-center gap-5 flex">
          <Icon name="await-action" className="h-10 w-10 text-neutral-50/30" />
          <div className="gap-5 flex flex-col items-center">
            <span className="text-xl font-medium text-white/70 leading-[30px]">
              {mode === 'follow' ? 'Deposit' : 'Redeem'}{' '}
              {formatDisplayBalance(
                mode === 'unfollow'
                  ? Number(formatBalance(user_assets, 18, 4))
                  : Number(val),
                2,
              )}{' '}
              ETH on follow claim
            </span>
            <Claim
              subject={{
                imgSrc: claim?.subject?.user?.image ?? claim?.subject?.image,
                label: !claim
                  ? 'I'
                  : claim?.subject?.user?.display_name ??
                    claim?.subject?.display_name ??
                    '',
                variant: 'non-user',
              }}
              predicate={{
                imgSrc: claim?.predicate?.image,
                label: !claim
                  ? 'am following'
                  : claim?.predicate?.display_name ?? '',
                variant: 'non-user',
              }}
              object={{
                imgSrc: !claim
                  ? identity?.user?.image
                  : claim?.object?.user?.image ?? claim?.object?.image,
                label: !claim
                  ? identity?.user?.display_name ?? ''
                  : claim?.object?.user?.display_name ??
                    claim?.object?.display_name ??
                    '',
                variant: !claim
                  ? identity?.user
                    ? 'user'
                    : 'default'
                  : claim?.object?.user
                    ? 'user'
                    : 'default',
              }}
            />
            <span className="text-neutral-50/50 text-base font-normal leading-normal m-auto">
              Estimated Fees:{' '}
              {(
                (mode === 'follow' ? +val : +formatBalance(user_assets, 18)) *
                (mode === 'follow' ? +entry_fee : +exit_fee)
              ).toFixed(6)}{' '}
              ETH
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
