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
import {
  ClaimPresenter,
  IdentityPresenter,
  TagEmbeddedPresenter,
} from '@0xintuition/api'

import { formatBalance, formatDisplayBalance } from '@lib/utils/misc'
import { TransactionActionType, TransactionStateType } from 'types/transaction'

interface SaveReviewProps {
  val: string
  mode: string | undefined
  dispatch: (action: TransactionActionType) => void
  state: TransactionStateType
  isError?: boolean
  tag: TagEmbeddedPresenter
  identity: IdentityPresenter
  claim: ClaimPresenter
  user_assets: string
  entry_fee: string
  exit_fee: string
}

export default function SaveReview({
  val,
  mode,
  dispatch,
  state,
  isError,
  tag,
  identity,
  claim,
  user_assets,
  entry_fee,
  exit_fee,
}: SaveReviewProps) {
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
              {mode === 'save' ? 'Deposit' : 'Redeem'}{' '}
              {formatDisplayBalance(
                mode === 'unsave'
                  ? Number(formatBalance(user_assets, 18, 4))
                  : Number(val),
                2,
              )}{' '}
              ETH on save claim
            </Text>
            <Claim
              subject={{
                imgSrc: identity.image,
                label: identity.display_name,
                variant: Identity.nonUser,
              }}
              predicate={{
                imgSrc: claim?.predicate?.image,
                label: 'has tag',
                variant: Identity.nonUser,
              }}
              object={{
                imgSrc: tag.image,
                label: tag.display_name,
                variant: Identity.nonUser,
              }}
            />
            <Text
              variant="base"
              weight="normal"
              className="m-auto text-neutral-50/50 leading-normal"
            >
              Estimated Fees:{' '}
              {(
                (mode === 'save' ? +val : +formatBalance(user_assets, 18)) *
                (mode === 'save' ? +entry_fee : +exit_fee)
              ).toFixed(6)}{' '}
              ETH
            </Text>
          </div>
        </div>
      </div>
    </>
  )
}
