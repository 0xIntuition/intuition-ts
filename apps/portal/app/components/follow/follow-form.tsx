import {
  Badge,
  DialogHeader,
  DialogTitle,
  Icon,
  IdentityTag,
} from '@0xintuition/1ui'
import { ClaimPresenter, IdentityPresenter } from '@0xintuition/api'

import { formatBalance } from '@lib/utils/misc'
import { type FetcherWithComponents } from '@remix-run/react'
import { HelpCircleIcon } from 'lucide-react'
import {
  type StakeTransactionAction,
  type StakeTransactionState,
} from 'types/stake-transaction'

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
  direction?: 'for' | 'against'
  val: string
  setVal: (val: string) => void
  mode: string | undefined
  dispatch: (action: StakeTransactionAction) => void
  state: StakeTransactionState
  fetchReval: FetcherWithComponents<unknown>
  formRef: React.RefObject<HTMLFormElement>
  modalType: 'identity' | 'claim' | null | undefined
}

export default function FollowForm({
  walletBalance,
  identity,
  claim,
  user_assets,
  entry_fee,
  exit_fee,
  direction,
  val,
  setVal,
  mode,
  dispatch,
  state,
  fetchReval,
  formRef,
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
            <DialogTitle>
              <div className="flex flex-row items-center justify-between">
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
            <div className="w-[396px] h-[46px] flex-col justify-start items-start gap-1 inline-flex">
              <div className="justify-start items-center gap-1 inline-flex">
                <div className="text-center text-neutral-50 text-base font-medium leading-normal">
                  Follow User <HelpCircleIcon className="w-4 h-4" />
                </div>
                <div className="w-4 h-4 relative" />
              </div>
              <div className="text-center text-neutral-50/50 text-xs font-normal leading-[18px]">
                Create or strengthen your connection.
              </div>
            </div>
            <div className="flex flex-row items-center justify-center">
              <div className="w-[316px] bg-neutral-50/5 rounded-lg border border-neutral-300/10 flex-col justify-start items-start inline-flex">
                <div className="self-stretch px-5 py-2.5 justify-between items-center inline-flex">
                  <div className="flex-col justify-center items-start gap-1 inline-flex">
                    <div className="text-white/50 text-sm font-normal leading-tight">
                      Your Active Position
                    </div>
                  </div>
                  <div className="justify-start items-center gap-1 flex">
                    <div className="justify-start items-start gap-2.5 flex">
                      <div className="text-white text-sm font-medium leading-tight">
                        {formatBalance(BigInt(user_assets ?? '0'), 18, 4)} ETH
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-t-lg bg-primary-950/15 px-4 pt-2.5">
              <FollowActions setVal={setVal} />
            </div>
          </div>
        </>
      ) : (
        <>
          <FollowReview
            mode={mode}
            direction={direction}
            val={val}
            dispatch={dispatch}
            state={state}
            identity={identity}
            claim={claim}
            entry_fee={entry_fee}
            exit_fee={exit_fee}
          />
        </>
      )}
    </>
  )
}
