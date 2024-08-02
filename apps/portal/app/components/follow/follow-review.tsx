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
import { ClaimPresenter, IdentityPresenter } from '@0xintuition/api'

import { formatBalance, formatDisplayBalance } from '@lib/utils/misc'
import { BLOCK_EXPLORER_URL, IPFS_GATEWAY_URL, PATHS } from 'consts'
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
                  ? Number(formatBalance(user_assets, 18, 4))
                  : Number(val),
                2,
              )}{' '}
              ETH on follow claim
            </Text>
            <Claim
              subject={{
                variant: claim.subject?.is_user
                  ? Identity.user
                  : Identity.nonUser,
                label:
                  claim.subject?.user?.display_name ??
                  claim.subject?.display_name ??
                  claim.subject?.identity_id ??
                  '',
                imgSrc: claim.subject?.is_user
                  ? claim.subject?.user?.image
                  : claim.subject?.image,
                id: claim.subject?.identity_id,
                description: claim.subject?.is_user
                  ? claim.subject?.user?.description
                  : claim.subject?.description,
                ipfsLink:
                  claim.subject?.is_user === true
                    ? `${BLOCK_EXPLORER_URL}/address/${claim.subject?.identity_id}`
                    : `${IPFS_GATEWAY_URL}/${claim.subject?.identity_id?.replace('ipfs://', '')}`,
                link:
                  claim.subject?.is_user === true
                    ? `${PATHS.PROFILE}/${claim.subject?.identity_id}`
                    : `${PATHS.IDENTITY}/${claim.subject?.identity_id?.replace('ipfs://', '')}`,
              }}
              predicate={{
                variant: claim.predicate?.is_user ? 'user' : 'non-user',
                label:
                  claim.predicate?.user?.display_name ??
                  claim.predicate?.display_name ??
                  claim.predicate?.identity_id ??
                  '',
                imgSrc: claim.predicate?.is_user
                  ? claim.predicate?.user?.image
                  : claim.predicate?.image,
                id: claim.predicate?.identity_id,
                description: claim.predicate?.is_user
                  ? claim.predicate?.user?.description
                  : claim.predicate?.description,
                ipfsLink:
                  claim.predicate?.is_user === true
                    ? `${BLOCK_EXPLORER_URL}/address/${claim.predicate?.identity_id}`
                    : `${IPFS_GATEWAY_URL}/${claim.predicate?.identity_id?.replace('ipfs://', '')}`,
                link:
                  claim.predicate?.is_user === true
                    ? `${PATHS.PROFILE}/${claim.predicate?.identity_id}`
                    : `${PATHS.IDENTITY}/${claim.predicate?.identity_id?.replace('ipfs://', '')}`,
              }}
              object={{
                variant: claim.object?.is_user ? 'user' : 'non-user',
                label:
                  claim.object?.user?.display_name ??
                  claim.object?.display_name ??
                  claim.object?.identity_id ??
                  '',
                imgSrc: claim.object?.is_user
                  ? claim.object?.user?.image
                  : claim.object?.image,
                id: claim.object?.identity_id,
                description: claim.object?.is_user
                  ? claim.object?.user?.description
                  : claim.object?.description,
                ipfsLink:
                  claim.object?.is_user === true
                    ? `${BLOCK_EXPLORER_URL}/address/${claim.object?.identity_id}`
                    : `${IPFS_GATEWAY_URL}/${claim.object?.identity_id?.replace('ipfs://', '')}`,
                link:
                  claim.object?.is_user === true
                    ? `${PATHS.PROFILE}/${claim.object?.identity_id}`
                    : `${PATHS.IDENTITY}/${claim.object?.identity_id?.replace('ipfs://', '')}`,
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
