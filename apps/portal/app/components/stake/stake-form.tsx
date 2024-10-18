import {
  ActivePositionCard,
  Claim,
  Identity,
  IdentityTag,
  Tabs,
  TabsList,
  TabsTrigger,
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
import { VaultDetailsType } from 'app/types'
import { TransactionStateType } from 'app/types/transaction'
import { useAtom } from 'jotai'

import StakeActions from './stake-actions'
import StakeInput from './stake-input'
import StakeReview from './stake-review'

interface StakeFormProps {
  userWallet: string
  identity?: IdentityPresenter
  claim?: ClaimPresenter
  user_conviction: string
  conviction_price: string
  user_assets: string
  vaultDetails: VaultDetailsType
  direction?: 'for' | 'against'
  val: string
  setVal: (val: string) => void
  mode: string | undefined
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
  identity,
  claim,
  user_conviction,
  conviction_price,
  user_assets,
  vaultDetails,
  direction,
  val,
  setVal,
  mode,
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
          <div className="h-full w-full flex-col flex-grow">
            <div className="items-center justify-center flex flex-row w-full px-10 pb-10">
              {modalType === 'identity' ? (
                <IdentityTag
                  imgSrc={identity?.user?.image ?? identity?.image}
                  variant={identity?.user ? Identity.user : Identity.nonUser}
                >
                  {identity?.user?.display_name ??
                    identity?.display_name ??
                    'Identity'}
                </IdentityTag>
              ) : (
                <Claim
                  size="default"
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
                    label: getAtomLabel(claim?.predicate as IdentityPresenter),
                    imgSrc: getAtomImage(claim?.predicate as IdentityPresenter),
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
                />
              )}
            </div>
            <div className="w-96 mx-auto">
              <Tabs defaultValue={mode}>
                <TabsList className="relative overflow-hidden">
                  <div
                    className={`absolute mx-auto inset-0 bg-[radial-gradient(ellipse_at_bottom_center,_var(--tw-gradient-stops))] ${
                      direction === 'for'
                        ? 'from-for/50 via-for/10'
                        : direction === 'against'
                          ? 'from-against/50 via-against/10'
                          : 'from-primary/20 via-primary/5'
                    } to-transparent`}
                  />
                  <TabsTrigger
                    variant="alternate"
                    value="deposit"
                    label="Deposit"
                    onClick={(e) => {
                      e.preventDefault()
                      setStakeModalState({
                        ...stakeModalState,
                        mode: 'deposit',
                      })
                    }}
                    className="relative z-10"
                  />
                  <TabsTrigger
                    variant="alternate"
                    value="redeem"
                    label="Redeem"
                    onClick={(e) => {
                      e.preventDefault()
                      setStakeModalState({ ...stakeModalState, mode: 'redeem' })
                    }}
                    disabled={user_conviction === '0'}
                    className="relative z-10"
                  />
                </TabsList>
              </Tabs>
              <div className="pt-8">
                <ActivePositionCard
                  value={Number(formatBalance(user_assets ?? 0, 18))}
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
                    minDeposit={vaultDetails.min_deposit ?? '0'}
                    userConviction={user_conviction}
                    price={conviction_price}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : state.status === 'review-transaction' ? (
        <div className="h-full flex flex-col">
          <StakeReview
            mode={mode}
            val={val}
            state={state}
            modalType={modalType}
            identity={identity}
            claim={claim}
            vaultDetails={vaultDetails}
          />
        </div>
      ) : (
        <div className="flex flex-col flex-grow">
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
