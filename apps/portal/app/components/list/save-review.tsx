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
import { IdentityPresenter, TagEmbeddedPresenter } from '@0xintuition/api'

import { formatBalance, formatDisplayBalance } from '@lib/utils/misc'
import { BLOCK_EXPLORER_URL, IPFS_GATEWAY_URL, PATHS } from 'consts'
import { TransactionActionType, TransactionStateType } from 'types/transaction'

interface SaveReviewProps {
  val: string
  mode: string | undefined
  dispatch: (action: TransactionActionType) => void
  state: TransactionStateType
  isError?: boolean
  tag: TagEmbeddedPresenter
  identity: IdentityPresenter
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
                variant: identity.is_user ? Identity.user : Identity.nonUser,
                label:
                  identity.user?.display_name ??
                  identity.display_name ??
                  identity.identity_id ??
                  '',
                imgSrc: identity.is_user
                  ? identity.user?.image
                  : identity.image,
                id: identity.identity_id,
                description: identity.is_user
                  ? identity.user?.description
                  : identity.description,
                ipfsLink:
                  identity.is_user === true
                    ? `${BLOCK_EXPLORER_URL}/${identity.identity_id}`
                    : `${IPFS_GATEWAY_URL}/${identity.identity_id?.replace('ipfs://', '')}`,
                link:
                  identity.is_user === true
                    ? `${PATHS.PROFILE}/${identity.identity_id}`
                    : `${PATHS.IDENTITY}/${identity.identity_id?.replace('ipfs://', '')}`,
              }}
              predicate={{
                variant: Identity.nonUser,
                label: 'has tag',
                imgSrc: '',
                id: 'QmakZTBNcZandAb7Pj42MkptLmTZuGXoMZKKvugqTcy76P',
                description: '',
                ipfsLink: `${IPFS_GATEWAY_URL}/QmakZTBNcZandAb7Pj42MkptLmTZuGXoMZKKvugqTcy76P`,
                link: `${PATHS.IDENTITY}/QmakZTBNcZandAb7Pj42MkptLmTZuGXoMZKKvugqTcy76P`,
              }}
              object={{
                variant: Identity.nonUser,
                label: tag.display_name ?? tag.identity_id ?? '',
                imgSrc: tag.image,
                id: tag.identity_id,
                description: '',
                ipfsLink: '',
                link: '',
              }}
              link=""
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
