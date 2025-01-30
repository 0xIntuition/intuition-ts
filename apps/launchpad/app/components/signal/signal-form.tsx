import {
  ActivePositionCard,
  Tabs,
  TabsList,
  TabsTrigger,
} from '@0xintuition/1ui'

import { TransactionState } from '@components/transaction-state'
import { MIN_DEPOSIT } from '@consts/general'
import { stakeModalAtom } from '@lib/state/store'
import { formatBalance } from '@lib/utils/misc'
import { AtomType, TripleType, VaultDetailsType } from 'app/types'
import { TransactionStateType } from 'app/types/transaction'
import { useAtom } from 'jotai'
import { formatUnits } from 'viem'

import SignalActions from './signal-actions'
import SignalInput from './signal-input'
import SignalReview from './signal-review'

interface SignalFormProps {
  userWallet: string
  triple?: TripleType | null
  atom?: AtomType | null
  shares: string
  current_share_price: string
  user_assets: string
  vaultDetails?: VaultDetailsType
  direction?: 'for' | 'against'
  val: string
  setVal: (val: string) => void
  mode: string | undefined
  state: TransactionStateType
  isLoading: boolean
  modalType: 'atom' | 'triple' | null | undefined
  showErrors: boolean
  setShowErrors: (show: boolean) => void
  validationErrors: string[]
  setValidationErrors: (errors: string[]) => void
}

export default function SignalForm({
  userWallet,
  triple,
  atom,
  shares,
  current_share_price,
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
}: SignalFormProps) {
  const [stakeModalState, setStakeModalState] = useAtom(stakeModalAtom)

  return (
    <>
      {state.status === 'idle' ? (
        <>
          <div className="h-full w-full flex-col flex-grow">
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
                  <SignalInput
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
                  <SignalActions
                    action={mode}
                    setVal={setVal}
                    minDeposit={
                      (vaultDetails &&
                        formatUnits(BigInt(vaultDetails.min_deposit), 18)) ??
                      MIN_DEPOSIT
                    }
                    shares={shares}
                    price={current_share_price}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : state.status === 'review-transaction' ? (
        <div className="h-full flex flex-col">
          <SignalReview
            mode={mode}
            val={val}
            state={state}
            modalType={modalType}
            triple={triple}
            atom={atom}
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
