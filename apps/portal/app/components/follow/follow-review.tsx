import { useEffect, useState } from 'react'

import {
  Button,
  Claim,
  DialogHeader,
  DialogTitle,
  Icon,
  Identity,
  Text,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { getSpecialPredicate } from '@lib/utils/app'
import { formatBalance, formatDisplayBalance } from '@lib/utils/misc'
import { CURRENT_ENV } from 'app/consts'
import {
  TransactionActionType,
  TransactionStateType,
} from 'app/types/transaction'

interface FollowReviewProps {
  val: string
  mode: string | undefined
  dispatch: (action: TransactionActionType) => void
  state: TransactionStateType
  isError?: boolean
  identity: IdentityPresenter
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
      <div className="flex flex-grow flex-col justify-center items-center h-[358px]">
        <div className="flex flex-col justify-center items-center gap-5">
          <Icon name="await-action" className="h-20 w-20 text-neutral-50/30" />
          <div className="gap-5 flex flex-col items-center">
            <Text
              variant="headline"
              weight="medium text-white/70 leading-[30x]"
            >
              {mode === 'follow' ? 'Deposit' : 'Redeem'}{' '}
              {formatDisplayBalance(
                mode === 'unfollow'
                  ? Number(formatBalance(user_assets, 18))
                  : Number(val),
                2,
              )}{' '}
              ETH on follow claim
            </Text>
            <Claim
              size="md"
              subject={{
                variant: Identity.nonUser,
                label: getSpecialPredicate(CURRENT_ENV).iPredicate.displayName,
                shouldHover: false,
              }}
              predicate={{
                variant: Identity.nonUser,
                label:
                  getSpecialPredicate(CURRENT_ENV).amFollowingPredicate
                    .displayName,
                shouldHover: false,
              }}
              object={{
                variant: Identity.user,
                imgSrc: identity.user?.image ?? identity.image,
                label: identity.user?.display_name ?? identity.display_name,
                shouldHover: false,
              }}
            />
            <Text
              variant="base"
              weight="normal"
              className="m-auto text-neutral-50/50 leading-normal"
            >
              Estimated Fees:{' '}
              {(
                (mode === 'follow' ? +val : +formatBalance(user_assets, 18)) *
                (mode === 'follow' ? +entry_fee : +exit_fee)
              ).toFixed(6)}{' '}
              ETH
            </Text>
          </div>
        </div>
      </div>
    </>
  )
}
