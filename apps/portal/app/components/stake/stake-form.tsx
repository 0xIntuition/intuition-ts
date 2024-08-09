import {
  ActivePositionCard,
  Badge,
  Claim,
  DialogHeader,
  DialogTitle,
  Icon,
  Identity,
  IdentityTag,
  Tabs,
  TabsList,
  TabsTrigger,
  Trunctacular,
} from '@0xintuition/1ui'
import { ClaimPresenter, IdentityPresenter } from '@0xintuition/api'

import { TransactionState } from '@components/transaction-state'
import { stakeModalAtom } from '@lib/state/store'
import {
  formatBalance,
  getAtomDescription,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
  getAtomLink,
} from '@lib/utils/misc'
import { type FetcherWithComponents } from '@remix-run/react'
import { PATHS } from 'app/consts'
import {
  TransactionActionType,
  TransactionStateType,
} from 'app/types/transaction'
import { useAtom } from 'jotai'

import StakeActions from './stake-actions'
import StakeInput from './stake-input'
import StakeReview from './stake-review'

interface StakeFormProps {
  userWallet: string
  walletBalance: string
  identity?: IdentityPresenter
  claim?: ClaimPresenter
  user_conviction: string
  conviction_price: string
  user_assets: string
  min_deposit: string
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
  userWallet,
  walletBalance,
  identity,
  claim,
  user_conviction,
  conviction_price,
  user_assets,
  min_deposit,
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
            <DialogTitle>
              <div className="flex items-center justify-between w-full pr-2.5">
                {modalType === 'identity' ? (
                  <IdentityTag
                    imgSrc={identity?.user?.image ?? identity?.image}
                    variant={identity?.user ? Identity.user : Identity.nonUser}
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
                    size="default"
                    link={`${PATHS.CLAIM}/${claim?.claim_id}`}
                    subject={{
                      variant: claim?.subject?.is_user
                        ? Identity.user
                        : Identity.nonUser,
                      label: getAtomLabel(claim?.subject as IdentityPresenter),
                      imgSrc: getAtomImage(claim?.subject as IdentityPresenter),
                      id: claim?.subject?.identity_id,
                      description: getAtomDescription(
                        claim?.subject as IdentityPresenter,
                      ),
                      ipfsLink: getAtomIpfsLink(
                        claim?.subject as IdentityPresenter,
                      ),
                      link: getAtomLink(claim?.subject as IdentityPresenter),
                    }}
                    predicate={{
                      variant: claim?.predicate?.is_user
                        ? Identity.user
                        : Identity.nonUser,
                      label: getAtomLabel(
                        claim?.predicate as IdentityPresenter,
                      ),
                      imgSrc: getAtomImage(
                        claim?.predicate as IdentityPresenter,
                      ),
                      id: claim?.predicate?.identity_id,
                      description: getAtomDescription(
                        claim?.predicate as IdentityPresenter,
                      ),
                      ipfsLink: getAtomIpfsLink(
                        claim?.predicate as IdentityPresenter,
                      ),
                      link: getAtomLink(claim?.predicate as IdentityPresenter),
                    }}
                    object={{
                      variant: claim?.object?.is_user
                        ? Identity.user
                        : Identity.nonUser,
                      label: getAtomLabel(claim?.object as IdentityPresenter),
                      imgSrc: getAtomImage(claim?.object as IdentityPresenter),
                      id: claim?.object?.identity_id,
                      description: getAtomDescription(
                        claim?.object as IdentityPresenter,
                      ),
                      ipfsLink: getAtomIpfsLink(
                        claim?.object as IdentityPresenter,
                      ),
                      link: getAtomLink(claim?.object as IdentityPresenter),
                    }}
                    maxIdentityLength={8}
                  />
                )}
                <Badge className="flex items-center gap-2">
                  <Icon name="wallet" className="h-4 w-4" />
                  <span className="text-sm text-nowrap">
                    {(+walletBalance).toFixed(2)} ETH
                  </span>
                </Badge>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="h-full w-full flex-col pt-5 px-10 pb-10 gap-5 inline-">
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
                value={Number(formatBalance(user_assets, 18, 6))}
                claimPosition={
                  direction !== undefined
                    ? direction === 'for'
                      ? 'claimFor'
                      : 'claimAgainst'
                    : undefined
                }
              />
              <div className="rounded-t-lg bg-primary-950/15 px-4 pt-5">
                <StakeInput
                  val={val}
                  setVal={setVal}
                  wallet={userWallet ?? ''}
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
                  minDeposit={min_deposit ?? '0'}
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
        <div className="flex flex-col items-center justify-center min-h-96">
          <TransactionState
            status={state.status}
            txHash={state.txHash}
            type={mode === 'deposit' ? 'deposit' : 'redeem'}
          />
        </div>
      )}
    </>
  )
}
