import { useEffect, useRef, useState } from 'react'

import { SegmentedControl, SegmentedControlItem } from '@0xintuition/1ui'

import { useFetcher, type FetcherWithComponents } from '@remix-run/react'
import { useQueryClient } from '@tanstack/react-query'
import {
  type StakeTransactionAction,
  type StakeTransactionState,
} from 'types/stake-transaction'
import { SessionUser } from 'types/user'
import type { VaultDetails } from 'types/vault'
import { useBalance, useBlockNumber } from 'wagmi'

import DisabledIcon from '../svg/disabled-icon'
import StakeActions from './stake-actions'
import StakeInput from './stake-input'
import StakeReview from './stake-review'

interface StakeFormProps {
  user: SessionUser
  vault_id: string
  user_conviction: string
  conviction_price: string
  direction?: 'for' | 'against'
  val: string
  setVal: (val: string) => void
  mode: string
  setMode: (mode: string) => void
  ethOrConviction: 'eth' | 'conviction'
  setEthOrConviction: (ethOrConviction: 'eth' | 'conviction') => void
  dispatch: (action: StakeTransactionAction) => void
  state: StakeTransactionState
  fetchReval: FetcherWithComponents<unknown>
  formRef: React.RefObject<HTMLFormElement>
  isLoading: boolean
  isModal?: boolean
  disabled?: boolean
  showErrors: boolean
  setShowErrors: (show: boolean) => void
  validationErrors: string[]
  setValidationErrors: (errors: string[]) => void
}

export default function StakeForm({
  user,
  vault_id,
  user_conviction,
  conviction_price,
  direction,
  val,
  setVal,
  mode,
  setMode,
  ethOrConviction,
  setEthOrConviction,
  dispatch,
  state,
  fetchReval,
  formRef,
  isLoading,
  isModal,
  disabled,
  showErrors,
  setShowErrors,
  validationErrors,
  setValidationErrors,
}: StakeFormProps) {
  const queryClient = useQueryClient()
  const { data: blockNumber } = useBlockNumber({ watch: true })
  const { data: balance, queryKey } = useBalance({
    address: user.details?.wallet?.address as `0x${string}`,
  })

  useEffect(() => {
    if (blockNumber && blockNumber % 5n === 0n)
      queryClient.invalidateQueries({ queryKey })
  }, [blockNumber, queryClient, queryKey])

  const walletBalance = balance?.formatted ?? ''

  const [latestVaultDetails, setLatestVaultDetails] = useState<VaultDetails>()

  const {
    conviction_price: latest_conviction_price,
    user_conviction: latest_user_conviction,
  } = latestVaultDetails ?? {}

  const vaultContractDataFetcher = useFetcher<VaultDetails>()
  const vaultContractDataResourceUrl = `/resources/stake?vid=${vault_id}`
  const vaultContractDataLoadRef = useRef(vaultContractDataFetcher.load)

  useEffect(() => {
    vaultContractDataLoadRef.current = vaultContractDataFetcher.load
  })
  useEffect(() => {
    vaultContractDataLoadRef.current(vaultContractDataResourceUrl)
  }, [])

  useEffect(() => {
    if (vaultContractDataFetcher.data) {
      setLatestVaultDetails(vaultContractDataFetcher.data)
    }
  }, [vaultContractDataFetcher.data])

  const tabs = [
    { value: 'deposit', label: 'Deposit' },
    { value: 'redeem', label: 'Redeem' },
  ]
  const [selectedTab, setSelectedTab] = useState(tabs[0].value)

  return !disabled ? (
    <>
      <fetchReval.Form
        hidden
        ref={formRef}
        action={`/actions/reval`}
        method="post"
      >
        <input type="hidden" name="eventName" value="attest" />
      </fetchReval.Form>
      <div className={`flex flex-col ${isModal && 'h-[250px]'}`}>
        <div className="flex w-full flex-col items-start justify-start gap-1 px-2.5">
          <div className="flex w-full flex-row items-start justify-start">
            {state.status === 'idle' ? (
              <div className="rounded-t-lg bg-primary-950/15 px-4 pt-2.5">
                <SegmentedControl className="w-fit">
                  {tabs.map((option, index) => (
                    <SegmentedControlItem
                      key={index}
                      isActive={selectedTab === option.value}
                      onClick={() => {
                        setSelectedTab(option.value)
                        setMode(option.value)
                        setVal('')
                      }}
                    >
                      {option.label}
                    </SegmentedControlItem>
                  ))}
                </SegmentedControl>
                <div
                  className={`${selectedTab === 'deposit' ? 'hidden' : 'flex flex-col'}`}
                >
                  <StakeInput
                    val={val}
                    setVal={setVal}
                    wallet={user.details?.wallet?.address ?? ''}
                    isLoading={isLoading}
                    action={'redeem'}
                    ethOrConviction={ethOrConviction}
                    validationErrors={validationErrors}
                    setValidationErrors={setValidationErrors}
                    showErrors={showErrors}
                    setShowErrors={setShowErrors}
                  />
                  <div className="flex h-3 flex-col items-start justify-center gap-2 self-stretch" />
                  <StakeActions
                    action={'deposit'}
                    setVal={setVal}
                    walletBalance={walletBalance ?? '0'}
                    userConviction={
                      latest_user_conviction ?? user_conviction ?? '0'
                    }
                    price={latest_conviction_price ?? conviction_price ?? '0'}
                    ethOrConviction={ethOrConviction}
                    setEthOrConviction={setEthOrConviction}
                  />
                </div>
                <div
                  className={`${selectedTab === 'redeem' ? 'hidden' : 'flex flex-col'}`}
                >
                  <StakeInput
                    val={val}
                    setVal={setVal}
                    wallet={user.details?.wallet?.address ?? ''}
                    isLoading={isLoading}
                    action={'redeem'}
                    ethOrConviction={ethOrConviction}
                    validationErrors={validationErrors}
                    setValidationErrors={setValidationErrors}
                    showErrors={showErrors}
                    setShowErrors={setShowErrors}
                  />
                  <div className="flex h-3 flex-col items-start justify-center gap-2 self-stretch" />
                  <StakeActions
                    action={'deposit'}
                    setVal={setVal}
                    walletBalance={walletBalance ?? '0'}
                    userConviction={
                      latest_user_conviction ?? user_conviction ?? '0'
                    }
                    price={latest_conviction_price ?? conviction_price ?? '0'}
                    ethOrConviction={ethOrConviction}
                    setEthOrConviction={setEthOrConviction}
                  />
                </div>
              </div>
            ) : (
              <>
                <StakeReview
                  mode={mode}
                  val={val}
                  dispatch={dispatch}
                  state={state}
                  direction={direction!}
                  isModal={isModal}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="flex w-full flex-col items-start justify-start gap-1 px-2">
        <div className="flex h-[203px] w-full flex-col items-center justify-center gap-4 rounded-t-lg bg-primary-950/15 px-4">
          <DisabledIcon className="h-[74px] w-[74px] text-primary-900" />
          <p className="text-xxs text-muted-foreground">
            You already have an active position
          </p>
        </div>
      </div>
    </>
  )
}
