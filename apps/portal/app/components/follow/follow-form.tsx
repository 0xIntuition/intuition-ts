import {
  ActivePositionCard,
  Badge,
  DialogHeader,
  DialogTitle,
  Icon,
  IdentityTag,
  TransactionStatusCard,
  TransactionStatusIndicator,
} from '@0xintuition/1ui'
import { ClaimPresenter, IdentityPresenter } from '@0xintuition/api'

import { BLOCK_EXPLORER_URL } from '@lib/utils/constants'
import { formatBalance } from '@lib/utils/misc'
import { Link, type FetcherWithComponents } from '@remix-run/react'
import { HelpCircleIcon } from 'lucide-react'
import { TransactionActionType, TransactionStateType } from 'types/transaction'

import FollowActions from './follow-actions'
import FollowReview from './follow-review'

interface FollowFormProps {
  walletBalance: string
  identity: IdentityPresenter
  claim: ClaimPresenter
  user_conviction: string
  conviction_price: string
  user_assets: string
  entry_fee: string
  exit_fee: string
  val: string
  setVal: (val: string) => void
  mode: string | undefined
  dispatch: (action: TransactionActionType) => void
  state: TransactionStateType
  fetchReval: FetcherWithComponents<unknown>
  formRef: React.RefObject<HTMLFormElement>
  showErrors: boolean
  setShowErrors: (show: boolean) => void
  validationErrors: string[]
  setValidationErrors: (errors: string[]) => void
}

export default function FollowForm({
  walletBalance,
  identity,
  claim,
  user_assets,
  entry_fee,
  exit_fee,
  val,
  setVal,
  mode,
  dispatch,
  state,
  fetchReval,
  formRef,
  showErrors,
  setShowErrors,
  validationErrors,
  setValidationErrors,
}: FollowFormProps) {
  return (
    <>
      <fetchReval.Form
        hidden
        ref={formRef}
        action={`/actions/reval`}
        method="post"
      >
        <input type="hidden" name="eventName" value="attest" />
      </fetchReval.Form>
      {state.status === 'idle' ? (
        <>
          <DialogHeader>
            <DialogTitle className="justify-between">
              <div className=" flex items-center justify-between w-full mr-2.5">
                <IdentityTag
                  imgSrc={identity?.user?.image ?? identity?.image}
                  variant={identity?.user ? 'user' : 'non-user'}
                >
                  {identity?.user?.display_name ?? identity?.display_name}
                </IdentityTag>
                <Badge>
                  <Icon name="wallet" className="h-4 w-4" />
                  {(+walletBalance).toFixed(2)} ETH
                </Badge>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="pt-2.5">
            <div className="flex-col justify-center items-start gap-1 inline-flex">
              <div className="justify-center items-center gap-1 inline-flex">
                <div className="text-center text-neutral-50 text-base font-medium leading-normal flex items-center gap-2">
                  Follow User{' '}
                  <HelpCircleIcon className="w-4 h-4 relative text-neutral-50/30" />
                </div>
                <div className="w-4 h-4 relative" />
              </div>
              <div className="text-center text-neutral-50/50 text-xs font-normal leading-[18px]">
                Create or strengthen your connection.
              </div>
            </div>
            <div className="flex flex-row items-center justify-center mt-4">
              <div className="w-[396px] bg-neutral-50/5 rounded-lg border border-neutral-300/10 flex-col justify-start items-start inline-flex">
                <ActivePositionCard
                  value={Number(formatBalance(user_assets, 18, 4))}
                  claimPosition={`${user_assets > '0' ? 'claimFor' : ''}`}
                />
              </div>
            </div>
            <div className="rounded-t-lg bg-primary-950/15 px-4 pt-2.5">
              <FollowActions
                setVal={setVal}
                validationErrors={validationErrors}
                setValidationErrors={setValidationErrors}
                showErrors={showErrors}
                setShowErrors={setShowErrors}
              />
            </div>
          </div>
        </>
      ) : state.status === 'review-transaction' ? (
        <>
          <FollowReview
            mode={mode}
            val={val}
            dispatch={dispatch}
            state={state}
            identity={identity}
            claim={claim}
            user_assets={user_assets}
            entry_fee={entry_fee}
            exit_fee={exit_fee}
          />
        </>
      ) : (
        <>
          <TransactionStatusIndicator status={state.status} />
          {state.status !== 'complete' ? (
            <TransactionStatusCard status={state.status} />
          ) : (
            <Link
              to={`${BLOCK_EXPLORER_URL}/tx/${state.txHash}`}
              target="_blank"
              className="flex flex-row items-center gap-1 mx-auto leading-tight text-blue-500 transition-colors duration-300 hover:text-blue-400"
            >
              View on Basescan{' '}
              <Icon name="square-arrow-top-right" className="h-3 w-3" />
            </Link>
          )}
        </>
      )}
    </>
  )
}
