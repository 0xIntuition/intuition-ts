import {
  ActivePositionCard,
  DialogHeader,
  DialogTitle,
  Icon,
  Identity,
  IdentityTag,
  Text,
  Trunctacular,
} from '@0xintuition/1ui'
import { IdentityPresenter, TagEmbeddedPresenter } from '@0xintuition/api'

import { TransactionState } from '@components/transaction-state'
import logger from '@lib/utils/logger'
import { formatBalance } from '@lib/utils/misc'
import { type FetcherWithComponents } from '@remix-run/react'
import { TransactionActionType, TransactionStateType } from 'types/transaction'

import SaveActions from './save-actions'
import SaveReview from './save-review'

interface SaveFormProps {
  tag: IdentityPresenter | TagEmbeddedPresenter
  identity: IdentityPresenter
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

export default function SaveForm({
  identity,
  tag,
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
}: SaveFormProps) {
  logger('user_assets in save form', user_assets)
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
              <div className="flex-col justify-center items-start gap-1 inline-flex">
                <div className="justify-center items-center gap-2 inline-flex">
                  <Text variant="base" weight="medium">
                    Save identity to your list
                  </Text>
                  <Icon
                    name="circle-question-mark"
                    className="w-4 h-4 relative text-neutral-50/30"
                  />
                  {/* // TODO: [ENG-2525] -- add tooltip and content */}
                  <div className="w-4 h-4 relative" />
                </div>
                <Text variant="small" className="text-neutral-50/50">
                  Save this identity to your list by staking on the claim.
                </Text>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="h-full w-full flex-col pt-5 px-10 pb-10 gap-5 inline-flex">
            <div className="flex items-center w-full mr-2.5 gap-5 ">
              <div className="flex flex-col gap-1">
                <Text
                  variant="caption"
                  weight="regular"
                  className="text-neutral-50/50"
                >
                  List:
                </Text>
                <IdentityTag imgSrc={tag?.image} variant={Identity.nonUser}>
                  {tag?.display_name}
                </IdentityTag>
              </div>
              <div className="flex flex-col gap-1">
                <Text
                  variant="caption"
                  weight="regular"
                  className="text-neutral-50/50"
                >
                  Identity:
                </Text>
                <IdentityTag
                  imgSrc={identity?.image}
                  variant={Identity.nonUser}
                >
                  <Trunctacular value={identity?.display_name} />
                </IdentityTag>
              </div>
            </div>
            <div className="flex flex-row items-center justify-center">
              <div className="w-full bg-neutral-50/5 rounded-lg border border-neutral-300/10 flex-col justify-start items-start inline-flex">
                <ActivePositionCard
                  value={Number(formatBalance(user_assets, 18, 4))}
                  claimPosition={`${user_assets > '0' ? 'claimFor' : ''}`}
                />
              </div>
            </div>
            <div className="rounded-t-lg bg-primary-950/15 w-full">
              <SaveActions
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
          <SaveReview
            mode={mode}
            val={val}
            dispatch={dispatch}
            state={state}
            tag={tag}
            identity={identity}
            user_assets={user_assets}
            entry_fee={entry_fee}
            exit_fee={exit_fee}
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-96">
          <TransactionState
            status={state.status}
            txHash={state.txHash}
            type={mode === 'save' ? 'save' : 'unsave'}
          />
        </div>
      )}
    </>
  )
}
