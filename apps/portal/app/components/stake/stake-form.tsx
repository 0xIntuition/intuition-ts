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
import { formatBalance } from '@lib/utils/misc'
import { type FetcherWithComponents } from '@remix-run/react'
import { BLOCK_EXPLORER_URL, IPFS_GATEWAY_URL, PATHS } from 'consts'
import { useAtom } from 'jotai'
import { TransactionActionType, TransactionStateType } from 'types/transaction'

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
                    subject={{
                      variant: claim?.subject?.is_user
                        ? Identity.user
                        : Identity.nonUser,
                      label:
                        claim?.subject?.user?.display_name ??
                        claim?.subject?.display_name ??
                        claim?.subject?.identity_id ??
                        '',
                      imgSrc: claim?.subject?.is_user
                        ? claim?.subject?.user?.image
                        : claim?.subject?.image,
                      id: claim?.subject?.identity_id,
                      description: claim?.subject?.is_user
                        ? claim?.subject?.user?.description
                        : claim?.subject?.description,
                      ipfsLink:
                        claim?.subject?.is_user === true
                          ? `${BLOCK_EXPLORER_URL}/address/${claim?.subject?.identity_id}`
                          : `${IPFS_GATEWAY_URL}/${claim?.subject?.identity_id?.replace('ipfs://', '')}`,
                      link:
                        claim?.subject?.is_user === true
                          ? `${PATHS.PROFILE}/${claim?.subject?.identity_id}`
                          : `${PATHS.IDENTITY}/${claim?.subject?.identity_id?.replace('ipfs://', '')}`,
                    }}
                    predicate={{
                      variant: claim?.predicate?.is_user
                        ? Identity.user
                        : Identity.nonUser,
                      label:
                        claim?.predicate?.user?.display_name ??
                        claim?.predicate?.display_name ??
                        claim?.predicate?.identity_id ??
                        '',
                      imgSrc: claim?.predicate?.is_user
                        ? claim?.predicate?.user?.image
                        : claim?.predicate?.image,
                      id: claim?.predicate?.identity_id,
                      description: claim?.predicate?.is_user
                        ? claim?.predicate?.user?.description
                        : claim?.predicate?.description,
                      ipfsLink:
                        claim?.predicate?.is_user === true
                          ? `${BLOCK_EXPLORER_URL}/address/${claim?.predicate?.identity_id}`
                          : `${IPFS_GATEWAY_URL}/${claim?.predicate?.identity_id?.replace('ipfs://', '')}`,
                      link:
                        claim?.predicate?.is_user === true
                          ? `${PATHS.PROFILE}/${claim?.predicate?.identity_id}`
                          : `${PATHS.IDENTITY}/${claim?.predicate?.identity_id?.replace('ipfs://', '')}`,
                    }}
                    object={{
                      variant: claim?.object?.is_user ? 'user' : 'non-user',
                      label:
                        claim?.object?.user?.display_name ??
                        claim?.object?.display_name ??
                        claim?.object?.identity_id ??
                        '',
                      imgSrc: claim?.object?.is_user
                        ? claim?.object?.user?.image
                        : claim?.object?.image,
                      id: claim?.object?.identity_id,
                      description: claim?.object?.is_user
                        ? claim?.object?.user?.description
                        : claim?.object?.description,
                      ipfsLink:
                        claim?.object?.is_user === true
                          ? `${BLOCK_EXPLORER_URL}/address/${claim?.object?.identity_id}`
                          : `${IPFS_GATEWAY_URL}/${claim?.object?.identity_id?.replace('ipfs://', '')}`,
                      link:
                        claim?.object?.is_user === true
                          ? `${PATHS.PROFILE}/${claim?.object?.identity_id}`
                          : `${PATHS.IDENTITY}/${claim?.object?.identity_id?.replace('ipfs://', '')}`,
                    }}
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
