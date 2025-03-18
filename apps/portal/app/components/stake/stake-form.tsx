import { useEffect } from 'react'

import {
  ActivePositionCard,
  Claim,
  Identity,
  IdentityTag,
  Tabs,
  TabsList,
  TabsTrigger,
} from '@0xintuition/1ui'

import { TransactionState } from '@components/transaction-state'
import { MIN_DEPOSIT } from '@consts/general'
import { stakeModalAtom } from '@lib/state/store'
import {
  formatBalance,
  getAtomDescriptionGQL,
  getAtomImageGQL,
  getAtomIpfsLinkGQL,
  getAtomLabelGQL,
  getAtomLinkGQL,
} from '@lib/utils/misc'
import { VaultDetailsType } from 'app/types'
import { Atom } from 'app/types/atom'
import { TransactionStateType } from 'app/types/transaction'
import { Triple } from 'app/types/triple'
import { useAtom } from 'jotai'
import { formatUnits } from 'viem'

import StakeActions from './stake-actions'
import StakeInput from './stake-input'
import StakeReview from './stake-review'

interface StakeFormProps {
  userWallet: string
  identity?: Atom
  claim?: Triple
  user_conviction: string
  conviction_price: string
  user_assets: string
  vaultDetails?: VaultDetailsType
  direction?: 'for' | 'against'
  val: string
  setVal: (val: string) => void
  mode: string | undefined
  state: TransactionStateType
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
  user_assets,
  vaultDetails,
  direction,
  val,
  setVal,
  mode,
  state,
  isLoading,
  modalType,
  showErrors,
  setShowErrors,
  validationErrors,
  setValidationErrors,
}: StakeFormProps) {
  const [stakeModalState, setStakeModalState] = useAtom(stakeModalAtom)

  // Reset input value when mode changes
  useEffect(() => {
    if (mode !== undefined) {
      setVal('')
    }
  }, [mode, setVal])

  return (
    <>
      {state.status === 'idle' ? (
        <>
          <div className="h-full w-full flex-col flex-grow">
            <div className="items-center justify-center flex flex-row w-full px-10 pb-10">
              {modalType === 'identity' ? (
                <IdentityTag
                  imgSrc={identity?.image}
                  variant={
                    identity?.type === 'Account'
                      ? Identity.user
                      : Identity.nonUser
                  }
                >
                  {identity?.label ?? 'Identity'}
                </IdentityTag>
              ) : (
                <Claim
                  size="default"
                  subject={{
                    variant:
                      claim?.subject?.type === 'Account'
                        ? Identity.user
                        : Identity.nonUser,
                    label: getAtomLabelGQL(claim?.subject),
                    imgSrc: getAtomImageGQL(claim?.subject),
                    id: claim?.subject?.vault_id,
                    description: getAtomDescriptionGQL(claim?.subject),
                    ipfsLink: getAtomIpfsLinkGQL(claim?.subject),
                    link: getAtomLinkGQL(claim?.subject),
                  }}
                  predicate={{
                    variant:
                      claim?.predicate?.type === 'Account'
                        ? Identity.user
                        : Identity.nonUser,
                    label: getAtomLabelGQL(claim?.predicate),
                    imgSrc: getAtomImageGQL(claim?.predicate),
                    id: claim?.predicate?.vault_id,
                    description: getAtomDescriptionGQL(claim?.predicate),
                    ipfsLink: getAtomIpfsLinkGQL(claim?.predicate),
                    link: getAtomLinkGQL(claim?.predicate),
                  }}
                  object={{
                    variant:
                      claim?.object?.type === 'Account'
                        ? Identity.user
                        : Identity.nonUser,
                    label: getAtomLabelGQL(claim?.object),
                    imgSrc: getAtomImageGQL(claim?.object),
                    id: claim?.object?.vault_id,
                    description: getAtomDescriptionGQL(claim?.object),
                    ipfsLink: getAtomIpfsLinkGQL(claim?.object),
                    link: getAtomLinkGQL(claim?.object),
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
                      setVal('')
                      setShowErrors(false)
                      setValidationErrors([])
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
                      setVal('')
                      setShowErrors(false)
                      setValidationErrors([])
                      setStakeModalState({ ...stakeModalState, mode: 'redeem' })
                    }}
                    disabled={user_assets === '0'}
                    className="relative z-10"
                  />
                </TabsList>
              </Tabs>
              <div className="pt-8">
                <ActivePositionCard
                  value={Number(formatBalance(user_assets ?? 0, 18))}
                  claimPosition={direction}
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
                    minDeposit={
                      (vaultDetails &&
                        formatUnits(BigInt(vaultDetails.min_deposit), 18)) ??
                      MIN_DEPOSIT
                    }
                    userAssets={user_assets}
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
