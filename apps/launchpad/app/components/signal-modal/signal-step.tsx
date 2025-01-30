import { useEffect, useState } from 'react'

import {
  Badge,
  Button,
  Icon,
  Text,
  TextVariant,
  TextWeight,
  toast,
} from '@0xintuition/1ui'

import SignalToast from '@components/survey-modal/signal-toast'
import { MIN_DEPOSIT, MULTIVAULT_CONTRACT_ADDRESS } from '@consts/general'
import { multivaultAbi } from '@lib/abis/multivault'
import { useStakeMutation } from '@lib/hooks/mutations/useStakeMutation'
import { useGetMultiVaultConfig } from '@lib/hooks/useGetMultiVaultConfig'
import { useGetVaultDetails } from '@lib/hooks/useGetVaultDetails'
import { useGetWalletBalance } from '@lib/hooks/useGetWalletBalance'
import {
  transactionReducer,
  useGenericTxState,
} from '@lib/hooks/useTransactionReducer'
import { usePrivy } from '@privy-io/react-auth'
import { Link, useLocation } from '@remix-run/react'
import { useQueryClient } from '@tanstack/react-query'
import {
  AtomType,
  TransactionActionType,
  TransactionStateType,
  TripleType,
  VaultDetailsType,
} from 'app/types'
import { ArrowBigDown, ArrowBigUp, Book, List } from 'lucide-react'
import { Address, decodeEventLog, formatUnits } from 'viem'
import { usePublicClient } from 'wagmi'

import SubmitButton from '../submit-button'
import { SuccessStep } from './success-step'

const initialTxState: TransactionStateType = {
  status: 'idle',
  txHash: undefined,
  error: undefined,
}

export interface SignalStepProps {
  vaultId: string
  counterVaultId?: string
  atom?: AtomType
  triple?: TripleType
  vaultDetailsProp?: VaultDetailsType
  open: boolean
  initialTicks?: number
  isSimplifiedRedeem?: boolean
  onClose: () => void
}

export function SignalStep({
  vaultId,
  counterVaultId,
  atom,
  triple,
  vaultDetailsProp,
  open,
  initialTicks = 0,
  isSimplifiedRedeem = false,
  onClose,
}: SignalStepProps) {
  const [ticks, setTicks] = useState(initialTicks)
  const [currentInitialTicks, setCurrentInitialTicks] = useState(initialTicks)
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

  const publicClient = usePublicClient()
  const location = useLocation()
  const { user: privyUser } = usePrivy()
  const contract = MULTIVAULT_CONTRACT_ADDRESS
  const userWallet = privyUser?.wallet?.address
  const walletBalance = useGetWalletBalance(userWallet as `0x${string}`)
  const queryClient = useQueryClient()

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

  const activeVaultId = getActiveVaultId()

  const { state: txState, dispatch } = useGenericTxState<
    TransactionStateType,
    TransactionActionType
  >(transactionReducer, initialTxState)

  const { data: vaultDetailsData, isLoading: isLoadingVaultDetails } =
    useGetVaultDetails(contract, activeVaultId || '', counterVaultId, {
      queryKey: [
        'get-vault-details',
        contract,
        activeVaultId || '',
        counterVaultId,
        ticks >= 0 ? 'for' : 'against',
      ],
      enabled: open && !!activeVaultId,
      // Don't update the UI with new data while showing success
      notifyOnChangeProps: showSuccess ? ['isLoading'] : undefined,
    })

  const { data: multiVaultConfig, isLoading: isLoadingConfig } =
    useGetMultiVaultConfig(contract)

  const vaultDetails = vaultDetailsData ?? vaultDetailsProp
  const min_deposit = multiVaultConfig?.formatted_min_deposit ?? MIN_DEPOSIT
  const userConviction = formatUnits(
    BigInt(vaultDetails?.user_conviction ?? '0'),
    18,
  )
  const convictionPrice = formatUnits(
    BigInt(vaultDetails?.conviction_price ?? '0'),
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
    if (userConviction && convictionPrice) {
      const actualEthValue = (
        Number(userConviction) * Number(convictionPrice)
      ).toString()
      setActualValue(actualEthValue)
      const calculatedTicks = Math.ceil(
        (Number(userConviction) * Number(convictionPrice)) / +MIN_DEPOSIT,
      )

      // Only update if the calculated value is significantly different
      // For negative positions, maintain the negative sign
      if (Math.abs(calculatedTicks - Math.abs(initialTicks)) > 0.1) {
        const newTicks = initialTicks < 0 ? -calculatedTicks : calculatedTicks
        setTicks(newTicks)
        setCurrentInitialTicks(Math.abs(calculatedTicks))
      }
      setHasInitialized(true)
    }
  }, [userConviction, convictionPrice, MIN_DEPOSIT, initialTicks])

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
    setTicks(initialTicks)
    setCurrentInitialTicks(Math.abs(initialTicks))
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
    }
  }, [isSimplifiedRedeem])

  // Early validation
  if (!userWallet || (!vaultId && !counterVaultId)) {
    return null
  }

  // Button handlers
  const handleUpvote = () => {
    // Only show error if trying to go positive while having negative position
    if (initialTicks < 0 && ticks >= 0) {
      setValidationErrors(['Must redeem all downvotes before upvoting'])
      setShowErrors(true)
      return
    }
    // Clear errors if no new errors are being set
    setValidationErrors([])
    setShowErrors(false)
    setTicks(ticks + 1)
  }

  const handleDownvote = () => {
    // Only show error if trying to go negative while having positive position
    if (initialTicks > 0 && ticks <= 0) {
      setValidationErrors(['Must redeem all upvotes before downvoting'])
      setShowErrors(true)
      return
    }
    // Clear errors if no new errors are being set
    setValidationErrors([])
    setShowErrors(false)
    setTicks(ticks - 1)
  }

  console.log('activeVaultId', activeVaultId)
  const handleAction = async () => {
    if (!privyUser?.wallet?.address || !activeVaultId) {
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
        userWallet: privyUser?.wallet?.address,
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

        // Store the final state when success is shown
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

  const handleClose = async () => {
    // Close the modal first
    onClose()
    // Then invalidate queries after a short delay to ensure modal is closed
    setTimeout(() => {
      queryClient.invalidateQueries()
    }, 100)
  }

  const handleStakeButtonClick = async () => {
    const errors = []

    // Check if trying to cross zero without redeeming
    const isAttemptingToSwitchDirection =
      (initialTicks > 0 && ticks <= 0) || (initialTicks < 0 && ticks >= 0)

    if (isAttemptingToSwitchDirection && ticks !== 0) {
      errors.push('Must redeem all positions before switching vote direction')
    }

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
          onClose={handleClose}
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
        <div className="flex flex-col gap-4 p-8">
          <div className="flex flex-col gap-2 mb-8">
            <div className="flex flex-row items-center justify-between">
              <Text variant={TextVariant.headline} weight={TextWeight.semibold}>
                {isSimplifiedRedeem ? (
                  <>
                    Redeem your signal for{' '}
                    {atom?.label ?? triple?.subject.label}
                  </>
                ) : (
                  <>
                    Cast your signal on {atom?.label ?? triple?.subject.label}
                  </>
                )}
              </Text>
              <Badge className="flex items-center gap-1 px-2">
                <Icon name="wallet" className="h-4 w-4 text-secondary/50" />
                <Text
                  variant={TextVariant.caption}
                  className="text-nowrap text-secondary/50"
                >
                  {(+walletBalance).toFixed(2)} ETH
                </Text>
              </Badge>
            </div>
            <Text
              variant={TextVariant.footnote}
              className="text-primary/70 flex flex-row gap-1 items-center"
            >
              <Book className="h-4 w-4 text-primary/70" />
              Learn how signals shape your preferences in our{' '}
              <Link
                to="https://tech.docs.intuition.systems/primitives-signal"
                target="_blank"
                rel="noreferrer"
                className="text-primary font-semibold hover:text-accent"
              >
                documentation
              </Link>
            </Text>
          </div>

          {!isSimplifiedRedeem ? (
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
                <div className="flex flex-col gap-0.5">
                  <Text variant={TextVariant.headline}>
                    {atom?.label ?? triple?.subject.label}
                  </Text>
                  <Text
                    variant={TextVariant.small}
                    className="text-primary/70 flex flex-row gap-1 items-center"
                  >
                    <List className="h-3 w-3 text-primary/70" /> in list{' '}
                    {triple?.object.label}
                  </Text>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full pr-6">
                <div className="flex items-center justify-end">
                  <Text
                    variant={TextVariant.headline}
                    weight={TextWeight.semibold}
                    className={`w-8 text-center ${
                      hasInitialized
                        ? ticks < 0
                          ? 'text-destructive'
                          : ticks > 0
                            ? 'text-success'
                            : 'text-primary'
                        : initialTicks < 0
                          ? 'text-destructive'
                          : initialTicks > 0
                            ? 'text-success'
                            : 'text-primary'
                    }`}
                  >
                    {hasInitialized ? Math.abs(ticks) : Math.abs(initialTicks)}
                  </Text>
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
                      disabled={isLoading || !hasInitialized}
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
              <Text variant="caption" className="text-end text-primary/70">
                Standard fees apply.{' '}
                <Link
                  to="https://tech.docs.intuition.systems/fees"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary font-semibold hover:text-accent"
                >
                  Learn more
                </Link>
              </Text>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
