import { useEffect, useMemo, useState } from 'react'

import { Button, Text, TextVariant, toast } from '@0xintuition/1ui'

import { FeesText } from '@components/fees-text'
import SignalToast from '@components/survey-modal/signal-toast'
import { MIN_DEPOSIT, MULTIVAULT_CONTRACT_ADDRESS } from '@consts/general'
import { multivaultAbi } from '@lib/abis/multivault'
import { useStakeMutation } from '@lib/hooks/mutations/useStakeMutation'
import { useGetMultiVaultConfig } from '@lib/hooks/useGetMultiVaultConfig'
import { useGetVaultDetails } from '@lib/hooks/useGetVaultDetails'
import {
  transactionReducer,
  useGenericTxState,
} from '@lib/hooks/useTransactionReducer'
import logger from '@lib/utils/logger'
import { Link, useLocation, useRevalidator } from '@remix-run/react'
import { useQueryClient } from '@tanstack/react-query'
import {
  AtomType,
  TransactionActionType,
  TransactionStateType,
  TripleType,
  VaultDetailsType,
} from 'app/types'
import { ArrowBigDown, ArrowBigUp, Book } from 'lucide-react'
import { Address, decodeEventLog, formatUnits } from 'viem'
import { usePublicClient } from 'wagmi'

import SubmitButton from '../submit-button'
import { SuccessStep } from './success-step'

const initialTxState: TransactionStateType = {
  status: 'idle',
  txHash: undefined,
  error: undefined,
}

export interface EcosystemSignalStepProps {
  vaultId: string
  counterVaultId?: string
  atom?: AtomType
  triple?: TripleType
  vaultDetailsProp?: VaultDetailsType
  open: boolean
  initialTicks?: number
  isSimplifiedRedeem?: boolean
  userWallet: string
  walletBalance: string
  onClose: () => void
}

export function EcosystemSignalStep({
  vaultId,
  counterVaultId,
  atom,
  triple,
  vaultDetailsProp,
  open,
  initialTicks = 0,
  isSimplifiedRedeem = false,
  onClose,
  userWallet,
  walletBalance,
}: EcosystemSignalStepProps) {
  const [ticks, setTicks] = useState(initialTicks)
  const [currentInitialTicks, setCurrentInitialTicks] = useState(initialTicks)
  const [initialDirection] = useState(Math.sign(initialTicks))
  const [hasInitialized, setHasInitialized] = useState(false)
  const [actualValue, setActualValue] = useState<string>('0')
  const [lastTxHash, setLastTxHash] = useState<string | undefined>(undefined)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [showErrors, setShowErrors] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successTxHash, setSuccessTxHash] = useState<string | undefined>(
    undefined,
  )
  const [finalMode, setFinalMode] = useState<'deposit' | 'redeem' | undefined>()
  const [finalTicks, setFinalTicks] = useState<number>(0)
  const [inputValue, setInputValue] = useState(initialTicks.toString())

  const publicClient = usePublicClient()
  const location = useLocation()
  const contract = MULTIVAULT_CONTRACT_ADDRESS
  const queryClient = useQueryClient()

  // Helper function to validate ticks and prevent crossing zero
  const validateTicksChange = (newTicks: number): boolean => {
    // Check if trying to cross zero
    if (
      (initialTicks > 0 && newTicks < 0) ||
      (initialTicks < 0 && newTicks > 0)
    ) {
      const errorMessage =
        initialTicks > 0
          ? 'Must redeem all upvotes before downvoting'
          : 'Must redeem all downvotes before upvoting'
      setValidationErrors([errorMessage])
      setShowErrors(true)
      return false
    }

    // Check if at zero and trying to go in opposite direction
    if (
      ticks === 0 &&
      ((initialTicks > 0 && newTicks < 0) || (initialTicks < 0 && newTicks > 0))
    ) {
      const errorMessage =
        initialTicks > 0
          ? 'Must redeem all upvotes before downvoting'
          : 'Must redeem all downvotes before upvoting'
      setValidationErrors([errorMessage])
      setShowErrors(true)
      return false
    }

    return true
  }

  // Determine which vault to use based on initial position or new direction
  const getActiveVaultId = () => {
    // If there's an initial position, stick with that vault
    if (initialTicks !== 0) {
      return initialTicks < 0 ? counterVaultId : vaultId
    }

    // For new positions, only switch vaults if there's no existing conviction
    if (ticks < 0 && !vaultDetailsProp?.user_conviction) {
      return counterVaultId
    }

    return vaultId
  }

  const revalidator = useRevalidator()

  const activeVaultId = getActiveVaultId()

  const { state: txState, dispatch } = useGenericTxState<
    TransactionStateType,
    TransactionActionType
  >(transactionReducer, initialTxState)

  const { data: vaultDetailsData, isLoading: isLoadingVaultDetails } =
    useGetVaultDetails(contract, vaultId || '', counterVaultId, {
      queryKey: ['get-vault-details', contract, vaultId, counterVaultId],
      enabled: open && !!vaultId,
    })

  const { data: multiVaultConfig, isLoading: isLoadingConfig } =
    useGetMultiVaultConfig(contract)

  // Log MultiVault config only once when it's loaded
  useEffect(() => {
    if (multiVaultConfig && !isLoadingConfig) {
      logger('[SignalModal] MultiVault config loaded:', {
        contract,
        configId: Math.random().toString(36).substring(7), // Add a random ID to identify unique loads
        timestamp: new Date().toISOString(),
      })
    }
  }, [multiVaultConfig, isLoadingConfig, contract])

  const FEE_ADJUSTMENT = useMemo(() => {
    return (
      1 -
      +(multiVaultConfig?.entry_fee ?? 0) /
        +(multiVaultConfig?.fee_denominator ?? 1)
    )
  }, [multiVaultConfig])

  const vaultDetails = vaultDetailsData ?? vaultDetailsProp
  const min_deposit = multiVaultConfig?.formatted_min_deposit ?? MIN_DEPOSIT
  const userConviction = formatUnits(
    BigInt(
      initialTicks < 0
        ? vaultDetails?.user_conviction_against ?? '0'
        : vaultDetails?.user_conviction ?? '0',
    ),
    18,
  )
  const convictionPrice = formatUnits(
    BigInt(
      initialTicks < 0
        ? vaultDetails?.against_conviction_price ?? '0'
        : vaultDetails?.conviction_price ?? '0',
    ),
    18,
  )

  // Determine if we're moving towards or away from 0
  const isMovingTowardsZero =
    (initialTicks > 0 && ticks < initialTicks) ||
    (initialTicks < 0 && ticks > initialTicks)

  const mode: 'deposit' | 'redeem' | undefined = isSimplifiedRedeem
    ? 'redeem'
    : ticks === initialTicks
      ? undefined
      : isMovingTowardsZero
        ? 'redeem'
        : 'deposit'

  const valuePerTick =
    currentInitialTicks > 0 ? Number(userConviction) / currentInitialTicks : 0

  // Calculate value based on the number of ticks being changed
  const ticksToChange = isMovingTowardsZero
    ? Math.abs(ticks - initialTicks)
    : Math.abs(ticks) - Math.abs(initialTicks)

  const val =
    isSimplifiedRedeem || ticks === 0
      ? actualValue
      : mode === 'deposit'
        ? (ticksToChange * +min_deposit).toString()
        : mode === 'redeem'
          ? (ticksToChange * valuePerTick).toString()
          : '0'

  const {
    mutateAsync: stake,
    txReceipt: stakeTxReceipt,
    awaitingWalletConfirmation: stakeAwaitingWalletConfirmation,
    awaitingOnChainConfirmation: stakeAwaitingOnChainConfirmation,
    isError: stakeIsError,
    reset: stakeReset,
  } = useStakeMutation(contract, mode as 'deposit' | 'redeem')

  // All effects
  useEffect(() => {
    // For new positions (no conviction), initialize once we have vault details
    if (initialTicks === 0 && vaultDetails && !hasInitialized) {
      setHasInitialized(true)
      return
    }

    // For existing positions, calculate ticks based on conviction
    if (userConviction && convictionPrice && Number(userConviction) > 0) {
      const actualEthValue = (
        Number(userConviction) * Number(convictionPrice)
      ).toString()
      setActualValue(actualEthValue)
      const calculatedTicks = Math.ceil(
        (Number(userConviction) * Number(convictionPrice)) /
          (+MIN_DEPOSIT * FEE_ADJUSTMENT),
      )

      if (Math.abs(calculatedTicks - Math.abs(currentInitialTicks)) > 0.1) {
        const newTicks =
          initialDirection < 0 ? -calculatedTicks : calculatedTicks

        // Validate the calculated ticks
        if (validateTicksChange(newTicks)) {
          setTicks(newTicks)
          setInputValue(newTicks.toString())
          setCurrentInitialTicks(Math.abs(calculatedTicks))
        } else {
          // If validation fails, force to 0
          setTicks(0)
          setInputValue('0')
          setCurrentInitialTicks(0)
        }
      }
      setHasInitialized(true)
    }
  }, [
    userConviction,
    convictionPrice,
    MIN_DEPOSIT,
    currentInitialTicks,
    initialDirection,
    initialTicks,
    vaultDetails,
    hasInitialized,
  ])

  useEffect(() => {
    if (stakeIsError) {
      stakeReset()
      setIsLoading(false)
    }
  }, [stakeIsError, stakeReset, setIsLoading])

  useEffect(() => {
    dispatch({ type: 'START_TRANSACTION' })
  }, [location, dispatch])

  useEffect(() => {
    // Validate the initialTicks to ensure they don't cross zero
    if (validateTicksChange(initialTicks)) {
      setTicks(initialTicks)
      setCurrentInitialTicks(Math.abs(initialTicks))
      setInputValue(initialTicks.toString())
    } else {
      // If validation fails, force to 0
      setTicks(0)
      setCurrentInitialTicks(0)
      setInputValue('0')
    }
  }, [initialTicks])

  useEffect(() => {
    let assets = ''
    const receipt = stakeTxReceipt
    const actionType = mode === 'deposit' ? 'Deposited' : 'Redeemed'

    type BuyArgs = {
      sender: Address
      receiver?: Address
      owner?: Address
      senderAssetsAfterTotalFees: bigint
      sharesForReceiver: bigint
      entryFee: bigint
      id: bigint
    }

    type SellArgs = {
      sender: Address
      receiver?: Address
      owner?: Address
      shares: bigint
      assetsForReceiver: bigint
      exitFee: bigint
      id: bigint
    }

    type EventLogArgs = BuyArgs | SellArgs

    if (
      stakeTxReceipt &&
      receipt?.logs[0]?.data &&
      receipt?.transactionHash !== lastTxHash
    ) {
      try {
        const decodedLog = decodeEventLog({
          abi: multivaultAbi,
          data: receipt?.logs[0].data,
          topics: receipt?.logs[0].topics,
        })

        const topics = decodedLog as unknown as {
          eventName: string
          args: EventLogArgs
        }

        if (
          topics?.args?.sender?.toLowerCase() === userWallet?.toLowerCase() &&
          (topics.args as BuyArgs)?.senderAssetsAfterTotalFees
        ) {
          assets = (
            topics.args as BuyArgs
          ).senderAssetsAfterTotalFees.toString()

          toast.custom(() => (
            <SignalToast
              action={actionType}
              assets={assets}
              txHash={stakeTxReceipt.transactionHash}
            />
          ))
          setLastTxHash(stakeTxReceipt.transactionHash)
        }
      } catch (error) {
        console.error('Error decoding transaction log:', error)
      }
    }
  }, [stakeTxReceipt, userWallet, mode, lastTxHash])

  useEffect(() => {
    if (stakeAwaitingWalletConfirmation) {
      dispatch({ type: 'APPROVE_TRANSACTION' })
    }
    if (stakeAwaitingOnChainConfirmation) {
      dispatch({ type: 'TRANSACTION_PENDING' })
    }
    if (stakeIsError) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        error: 'Error processing transaction',
      })
    }
  }, [
    stakeAwaitingWalletConfirmation,
    stakeAwaitingOnChainConfirmation,
    stakeIsError,
    dispatch,
  ])

  useEffect(() => {
    setIsLoading(
      !!stakeAwaitingWalletConfirmation ||
        !!stakeAwaitingOnChainConfirmation ||
        txState.status === 'confirm' ||
        txState.status === 'transaction-pending' ||
        txState.status === 'transaction-confirmed' ||
        txState.status === 'approve-transaction' ||
        txState.status === 'awaiting' ||
        isLoadingVaultDetails ||
        isLoadingConfig,
    )
  }, [
    stakeAwaitingWalletConfirmation,
    stakeAwaitingOnChainConfirmation,
    txState.status,
    isLoadingVaultDetails,
    isLoadingConfig,
    setIsLoading,
  ])

  // If in simplified redeem mode, force ticks to 0 for full redeem
  useEffect(() => {
    if (isSimplifiedRedeem) {
      setTicks(0)
      setInputValue('0')
      // Clear any validation errors
      setValidationErrors([])
      setShowErrors(false)
    }
  }, [isSimplifiedRedeem])

  // Early validation
  if (!userWallet || (!vaultId && !counterVaultId)) {
    return null
  }

  // Button handlers
  const handleUpvote = () => {
    const newValue = ticks + 1
    if (!validateTicksChange(newValue)) {
      return
    }

    // Clear errors if no new errors are being set
    setValidationErrors([])
    setShowErrors(false)
    setTicks(newValue)
    setInputValue(newValue.toString())
  }

  const handleDownvote = () => {
    if (ticks === 0) {
      return
    }
    const newValue = ticks - 1
    if (!validateTicksChange(newValue)) {
      return
    }

    // Clear errors if no new errors are being set
    setValidationErrors([])
    setShowErrors(false)
    setTicks(newValue)
    setInputValue(newValue.toString())
  }

  const handleAction = async () => {
    if (!userWallet || !activeVaultId) {
      return
    }

    try {
      const txHash = await stake({
        val:
          mode === 'deposit'
            ? val
            : val > userConviction
              ? userConviction
              : val,
        userWallet,
        vaultId: activeVaultId,
        triple,
        atom,
        mode,
        contract,
      })

      if (publicClient && txHash) {
        dispatch({ type: 'TRANSACTION_PENDING' })
        const receipt = await publicClient.waitForTransactionReceipt({
          hash: txHash,
        })

        dispatch({
          type: 'TRANSACTION_COMPLETE',
          txHash,
          txReceipt: receipt,
        })

        // Invalidate relevant queries
        await queryClient.invalidateQueries()
        revalidator.revalidate()

        // Store the final state and show success after a delay
        setFinalMode(mode)
        setFinalTicks(ticks)
        setSuccessTxHash(txHash)
        setShowSuccess(true)
      }
    } catch (error) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        error: 'Error processing transaction',
      })
    }
  }

  const handleStakeButtonClick = async () => {
    const errors = []

    if (mode === 'deposit') {
      if (+val < +min_deposit) {
        errors.push(`Minimum stake is ${min_deposit} ETH`)
      }
      if (+val > +walletBalance) {
        errors.push(`Insufficient balance`)
      }
    } else if (mode === 'redeem') {
      if (+userConviction <= 0) {
        errors.push('No shares to redeem')
      }
    }

    if (errors.length > 0) {
      setValidationErrors(errors)
      setShowErrors(true)
      return
    }

    handleAction()
  }

  return (
    <>
      {showSuccess ? (
        <SuccessStep
          isOpen={showSuccess}
          name={atom?.label ?? triple?.subject?.label ?? ''}
          txHash={successTxHash}
          onClose={onClose}
          mode={finalMode}
          isFullRedeem={finalMode === 'redeem' && finalTicks === 0}
          direction={
            finalMode === 'redeem'
              ? initialTicks >= 0
                ? 'for'
                : 'against'
              : finalTicks >= 0
                ? 'for'
                : 'against'
          }
        />
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 mb-8">
            <Text variant={TextVariant.footnote} className="text-primary/70">
              <span className="inline-flex items-center gap-1">
                <Book className="h-4 w-4 text-primary/70 flex-shrink-0" />
                <span>
                  Learn how signals shape your preferences in our{' '}
                  <Link
                    to="https://tech.docs.intuition.systems/primitives-signal"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary font-semibold hover:text-accent"
                  >
                    documentation
                  </Link>
                </span>
              </span>
            </Text>
          </div>

          {!isSimplifiedRedeem ? (
            <div className="flex w-full items-center gap-4 rounded-lg border transition-colors h-[72px] border-[#1A1A1A]">
              <div className="flex items-center gap-4 w-full">
                <div className="w-14 h-14 rounded bg-[#1A1A1A] flex-shrink-0 ml-1">
                  {atom?.image && (
                    <img
                      src={atom?.image ?? ''}
                      alt={atom?.label ?? ''}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-0.5 w-full">
                  <Text variant={TextVariant.headline}>
                    {atom?.value?.account?.label ?? atom?.label}
                  </Text>
                </div>
              </div>

              <div className="flex flex-col gap-2 pr-6">
                <div className="flex items-center justify-end">
                  <input
                    type="text"
                    value={inputValue}
                    pattern="[1-9][0-9]*"
                    onChange={(e) => {
                      const newValue = e.target.value

                      if (newValue === '' || /^[0-9]\d*$/.test(newValue)) {
                        // For empty or minus sign, just update the input value
                        if (newValue === '' || newValue === '-') {
                          setInputValue(newValue)
                          if (newValue === '') {
                            setTicks(1) // Default to 1 for empty input
                          }
                          return
                        }

                        // For actual numbers, validate the change
                        const parsedValue = parseInt(newValue, 10)
                        if (!isNaN(parsedValue)) {
                          if (parsedValue === 0) {
                            // Zero is always allowed
                            setInputValue(newValue)
                            setTicks(parsedValue)
                            return
                          }

                          if (!validateTicksChange(parsedValue)) {
                            // If validation fails, force to 0
                            setInputValue('0')
                            setTicks(0)
                            return
                          }

                          // Valid change
                          setInputValue(newValue)
                          setTicks(parsedValue)
                        }
                      }
                      // Ignore invalid input
                    }}
                    onBlur={() => {
                      // Ensure value is valid when focus is lost
                      if (
                        inputValue === '' ||
                        inputValue === '-' ||
                        parseInt(inputValue, 10) === 0
                      ) {
                        // If we're at 0, that's valid - don't force back to 1
                        if (parseInt(inputValue, 10) === 0) {
                          setInputValue('0')
                          setTicks(0)
                          return
                        }

                        // For empty or invalid inputs, set to 1 or -1 based on initial direction
                        const defaultValue = initialTicks < 0 ? -1 : 1
                        if (validateTicksChange(defaultValue)) {
                          setInputValue(defaultValue.toString())
                          setTicks(defaultValue)
                        } else {
                          // If validation fails, force to 0
                          setInputValue('0')
                          setTicks(0)
                        }
                        return
                      }

                      // Double-check for cross-zero validation
                      const parsedValue = parseInt(inputValue, 10)
                      if (!validateTicksChange(parsedValue)) {
                        // If validation fails, force to 0
                        setInputValue('0')
                        setTicks(0)
                      }
                    }}
                    disabled={isLoading || !hasInitialized}
                    className={`w-12 h-8 text-center ${
                      parseInt(inputValue, 10) > 0
                        ? 'text-success'
                        : inputValue === '' || inputValue === '0'
                          ? 'text-primary/70'
                          : 'text-destructive'
                    } bg-transparent border border-[#1A1A1A] rounded focus:outline-none focus:border-accent font-semibold`}
                    aria-label="Number of votes to allocate"
                  />
                  <div className="flex flex-col">
                    <Button
                      variant="text"
                      onClick={handleUpvote}
                      disabled={isLoading || !hasInitialized}
                      className="h-6 p-0 disabled:opacity-30"
                    >
                      <ArrowBigUp className="text-success fill-success h-5 w-5" />
                    </Button>
                    <Button
                      variant="text"
                      onClick={handleDownvote}
                      disabled={isLoading || !hasInitialized || ticks === 0}
                      className="h-6 p-0 disabled:opacity-30"
                    >
                      <ArrowBigDown className="text-destructive fill-destructive h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex w-full items-center gap-4 rounded-lg border transition-colors h-[72px] border-[#1A1A1A]">
                <div className="flex items-center gap-4 w-full">
                  <div className="w-14 h-14 rounded bg-[#1A1A1A] flex-shrink-0 ml-1">
                    {(atom?.image || triple?.subject.image) && (
                      <img
                        src={atom?.image ?? triple?.subject.image ?? ''}
                        alt={atom?.label ?? triple?.subject.label ?? ''}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                  </div>
                  <Text variant="title">
                    {atom?.label ?? triple?.subject.label}
                  </Text>
                </div>
              </div>
            </div>
          )}

          <div className="h-6">
            {showErrors && validationErrors.length > 0 && (
              <div className="flex flex-col gap-2">
                {validationErrors.map((error, index) => (
                  <Text
                    key={index}
                    variant={TextVariant.footnote}
                    className="text-destructive"
                  >
                    {error}
                  </Text>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-row gap-2 justify-end mt-8">
            <div className="flex flex-col gap-2">
              <SubmitButton
                loading={isLoading}
                onClick={handleStakeButtonClick}
                buttonText={
                  isSimplifiedRedeem
                    ? `Redeem ${Number(actualValue).toFixed(5)} ETH`
                    : !mode
                      ? 'No changes to apply'
                      : mode === 'deposit'
                        ? `Stake ${Number(val).toFixed(5)} ETH`
                        : `Redeem ${Number(val).toFixed(5)} ETH`
                }
                disabled={!mode || isLoading}
                loadingText={'Processing...'}
              />
              <FeesText />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
