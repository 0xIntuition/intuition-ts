import {
  ActivePositionCard,
  Badge,
  Claim,
  DialogHeader,
  DialogTitle,
  Icon,
  IdentityTag,
  Tabs,
  TabsList,
  TabsTrigger,
  TransactionStatusCard,
  TransactionStatusIndicator,
  Trunctacular,
} from '@0xintuition/1ui'
import { ClaimPresenter, IdentityPresenter } from '@0xintuition/api'

import { stakeModalAtom } from '@lib/state/store'
import { BLOCK_EXPLORER_URL } from '@lib/utils/constants'
import { formatBalance } from '@lib/utils/misc'
import { Link, type FetcherWithComponents } from '@remix-run/react'
import { useAtom } from 'jotai'
import { TransactionActionType, TransactionStateType } from 'types/transaction'
import { SessionUser } from 'types/user'

import StakeActions from './stake-actions'
import StakeInput from './stake-input'
import StakeReview from './stake-review'

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
  dispatch: (action: TransactionActionType) => void
  state: TransactionStateType
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
  const [stakeModalState, setStakeModalState] = useAtom(stakeModalAtom)
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
                {modalType === 'identity' ? (
                  <IdentityTag
                    imgSrc={identity?.user?.image ?? identity?.image}
                    variant={identity?.user ? 'user' : 'non-user'}
                  >
                    <Trunctacular
                      value={
                        identity?.user?.display_name ??
                        identity?.display_name ??
                        'Identity'
                      }
                    />
                  </IdentityTag>
                ) : (
                  <Claim
                    subject={{
                      imgSrc:
                        claim?.subject?.user?.image ?? claim?.subject?.image,
                      label: (
                        <Trunctacular
                          value={
                            claim?.subject?.user?.display_name ??
                            claim?.subject?.display_name ??
                            ''
                          }
                        />
                      ),
                      variant: claim?.subject?.user ? 'user' : 'non-user',
                    }}
                    predicate={{
                      imgSrc: claim?.predicate?.image,
                      label: (
                        <Trunctacular
                          value={claim?.predicate?.display_name ?? ''}
                        />
                      ),
                    }}
                    object={{
                      imgSrc:
                        claim?.object?.user?.image ?? claim?.object?.image,
                      label: (
                        <Trunctacular
                          value={
                            claim?.object?.user?.display_name ??
                            claim?.object?.display_name ??
                            ''
                          }
                        />
                      ),
                      variant: claim?.object?.user ? 'user' : 'non-user',
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
          <div className="h-full w-full flex-col pt-5 px-10 pb-10 gap-5 inline-flex">
            <Tabs defaultValue={mode}>
              <TabsList>
                <TabsTrigger
                  variant="alternate"
                  value="deposit"
                  label="Deposit"
                  onClick={(e) => {
                    e.preventDefault()
                    setStakeModalState({ ...stakeModalState, mode: 'deposit' })
                  }}
                />
                <TabsTrigger
                  variant="alternate"
                  value="redeem"
                  label="Redeem"
                  onClick={(e) => {
                    e.preventDefault()
                    setStakeModalState({ ...stakeModalState, mode: 'redeem' })
                  }}
                />
              </TabsList>
            </Tabs>
            <div className="pt-2.5">
              <ActivePositionCard
                value={Number(formatBalance(user_assets, 18, 4))}
                claimPosition={`${direction === 'for' ? 'claimFor' : 'claimAgainst'}`}
              />
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
          </div>
        </>
      ) : state.status === 'review-transaction' ? (
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
      ) : (
        <>
          <div className="flex-grow flex flex-col justify-center items-center h-full">
            <div className="flex flex-col justify-center items-center gap-10">
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
            </div>
          </div>
        </>
      )}
    </>
  )
}
