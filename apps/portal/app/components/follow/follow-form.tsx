import {
  Badge,
  Claim,
  DialogHeader,
  DialogTitle,
  Icon,
  IdentityTag,
} from '@0xintuition/1ui'
import { ClaimPresenter, IdentityPresenter } from '@0xintuition/api'

import { formatBalance } from '@lib/utils/misc'
import { type FetcherWithComponents } from '@remix-run/react'
import {
  type StakeTransactionAction,
  type StakeTransactionState,
} from 'types/stake-transaction'
import { SessionUser } from 'types/user'

import StakeInput from '../stake/stake-input'
import StakeActions from './follow-actions'
import StakeReview from './follow-review'

interface StakeFormProps {
  user: SessionUser
  walletBalance: string
  identity?: IdentityPresenter
  claim?: ClaimPresenter
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
  isLoading: boolean
  modalType: 'identity' | 'claim' | null | undefined
  showErrors: boolean
  setShowErrors: (show: boolean) => void
  validationErrors: string[]
  setValidationErrors: (errors: string[]) => void
}

export default function StakeForm({
  user,
  walletBalance,
  identity,
  claim,
  user_conviction,
  conviction_price,
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
  isLoading,
  modalType,
  showErrors,
  setShowErrors,
  validationErrors,
  setValidationErrors,
}: StakeFormProps) {
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
                {modalType === 'identity' ? (
                  <IdentityTag
                    imgSrc={identity?.user?.image ?? identity?.image}
                    variant={identity?.user ? 'user' : 'non-user'}
                  >
                    {identity?.user?.display_name ?? identity?.display_name}
                  </IdentityTag>
                ) : (
                  <Claim
                    subject={{
                      imgSrc:
                        claim?.subject?.user?.image ?? claim?.subject?.image,
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
                      imgSrc:
                        claim?.object?.user?.image ?? claim?.object?.image,
                      label:
                        claim?.object?.user?.display_name ??
                        claim?.object?.display_name,
                      variant: claim?.object?.user ? 'user' : 'default',
                    }}
                  />
                )}
                <Badge>
                  <Icon name="wallet" className="h-4 w-4" />
                  {(+walletBalance).toFixed(2)} ETH
                </Badge>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="pt-2.5">
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
              <StakeInput
                val={val}
                setVal={setVal}
                wallet={user.details?.wallet?.address ?? ''}
                isLoading={isLoading}
                validationErrors={validationErrors}
                setValidationErrors={setValidationErrors}
                showErrors={showErrors}
                setShowErrors={setShowErrors}
              />
              <div className="flex h-3 flex-col items-start justify-center gap-2 self-stretch" />
              <StakeActions
                action={mode}
                setVal={setVal}
                walletBalance={walletBalance ?? '0'}
                userConviction={user_conviction ?? '0'}
                price={conviction_price ?? '0'}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <StakeReview
            mode={mode}
            val={val}
            dispatch={dispatch}
            state={state}
            direction={direction!}
            modalType={modalType}
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
