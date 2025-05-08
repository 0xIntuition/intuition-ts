import { useEffect, useMemo, useState } from 'react'

import { Button, Text, TextVariant, toast } from '@0xintuition/1ui'

import { FeesText } from '@components/fees-text'
import SignalToast from '@components/survey-modal/signal-toast'
import { TurnstileField } from '@components/turnstile-field'
import { MIN_DEPOSIT, MULTIVAULT_CONTRACT_ADDRESS } from '@consts/general'
import { multivaultAbi } from '@lib/abis/multivault'
import { useCreateTripleMutation } from '@lib/hooks/mutations/useCreateTripleMutation'
import { useStakeMutation } from '@lib/hooks/mutations/useStakeMutation'
import { useGetMultiVaultConfig } from '@lib/hooks/useGetMultiVaultConfig'
import { useGetWalletBalance } from '@lib/hooks/useGetWalletBalance'
import {
  transactionReducer,
  useGenericTxState,
} from '@lib/hooks/useTransactionReducer'
import logger from '@lib/utils/logger'
import { usePrivy } from '@privy-io/react-auth'
import { Link, useLocation } from '@remix-run/react'
import { useQueryClient } from '@tanstack/react-query'
import { TransactionActionType, TransactionStateType } from 'app/types'
import { ArrowBigDown, ArrowBigUp, Book } from 'lucide-react'
import { Address, decodeEventLog } from 'viem'
import { usePublicClient } from 'wagmi'

import SubmitButton from '../submit-button'
import { SignalStepProps } from './types'

const initialTxState: TransactionStateType = {
  status: 'idle',
  txHash: undefined,
  error: undefined,
}

export function SignalStep({
  selectedTopic,
  newAtomMetadata,
  predicateId,
  objectId,
  objectLabel,
  setTxState,
  onStakingSuccess,
  isLoading,
  setIsLoading,
  isOpen,
}: SignalStepProps) {
  const [ticks, setTicks] = useState(1)
  const [inputValue, setInputValue] = useState('1')
  const [lastTxHash, setLastTxHash] = useState<string | undefined>(undefined)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [showErrors, setShowErrors] = useState(false)
  const [captchaOk, setCaptchaOk] = useState(false)

  const publicClient = usePublicClient()
  const queryClient = useQueryClient()
  const location = useLocation()
  const { user: privyUser } = usePrivy()
  const contract = MULTIVAULT_CONTRACT_ADDRESS
  const userWallet = privyUser?.wallet?.address
  const walletBalance = useGetWalletBalance(userWallet as `0x${string}`, isOpen)
  const { state: txState, dispatch } = useGenericTxState<
    TransactionStateType,
    TransactionActionType
  >(transactionReducer, initialTxState)

  const { data: multiVaultConfig, isLoading: isLoadingMultiVaultConfig } =
    useGetMultiVaultConfig(contract)

  // Log MultiVault config only once when it's loaded
  useEffect(() => {
    if (multiVaultConfig && !isLoadingMultiVaultConfig) {
      logger('[SignalStep] MultiVault config loaded:', {
        contract,
        configId: Math.random().toString(36).substring(7), // Add a random ID to identify unique loads
        timestamp: new Date().toISOString(),
      })
    }
  }, [multiVaultConfig, isLoadingMultiVaultConfig, contract])

  // Memoize derived values from multiVaultConfig to prevent unnecessary recalculations
  const { tripleCost, min_deposit } = useMemo(() => {
    return {
      tripleCost: multiVaultConfig
        ? multiVaultConfig?.formatted_triple_cost
        : 0,
      min_deposit: multiVaultConfig
        ? multiVaultConfig?.formatted_min_deposit
        : MIN_DEPOSIT,
    }
  }, [multiVaultConfig])

  // Compute vote direction based on ticks value
  const voteDirection = ticks >= 0 ? 'upvote' : 'downvote'
  const absTickValue = Math.abs(ticks)

  // Memoize the val calculation to prevent unnecessary recalculations
  const val = useMemo(() => {
    return newAtomMetadata && min_deposit && tripleCost
      ? (absTickValue * +min_deposit + +tripleCost).toString()
      : (absTickValue * +min_deposit).toString()
  }, [absTickValue, min_deposit, tripleCost, newAtomMetadata])

  const {
    mutateAsync: stake,
    txReceipt: stakeTxReceipt,
    awaitingWalletConfirmation: stakeAwaitingWalletConfirmation,
    awaitingOnChainConfirmation: stakeAwaitingOnChainConfirmation,
    isError: stakeIsError,
    reset: stakeReset,
  } = useStakeMutation(contract, 'deposit')

  const {
    mutateAsync: createTriple,
    txReceipt: createTripleTxReceipt,
    awaitingWalletConfirmation: createTripleAwaitingWalletConfirmation,
    awaitingOnChainConfirmation: createTripleAwaitingOnChainConfirmation,
    isError: createTripleIsError,
    reset: createTripleReset,
  } = useCreateTripleMutation(contract)

  const handleAction = async () => {
    if (newAtomMetadata && tripleCost) {
      if (!privyUser?.wallet?.address) {
        return
      }

      try {
        // For new atoms, we're creating a triple
        const txHash = await createTriple({
          val,
          userWallet: privyUser?.wallet?.address,
          subjectId: newAtomMetadata.vaultId,
          predicateId: predicateId.toString(),
          objectId: objectId.toString(),
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

          await queryClient.refetchQueries({
            queryKey: ['get-triples', contract],
          })

          onStakingSuccess(newAtomMetadata.vaultId.toString())
        }
      } catch (error) {
        dispatch({
          type: 'TRANSACTION_ERROR',
          error: 'Error processing transaction',
        })
      }
    } else {
      if (!privyUser?.wallet?.address || !selectedTopic?.triple) {
        return
      }

      try {
        // For existing triples, determine which vault to use based on vote direction
        const vaultId =
          voteDirection === 'upvote'
            ? selectedTopic?.triple?.vault_id.toString() ?? ''
            : selectedTopic?.triple?.counter_vault_id?.toString() ?? ''

        const txHash = await stake({
          val,
          userWallet: privyUser?.wallet?.address,
          vaultId,
          triple: selectedTopic?.triple,
          mode: 'deposit',
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

          await queryClient.refetchQueries({
            queryKey: [
              'get-vault-details',
              contract,
              selectedTopic?.triple?.vault_id,
              selectedTopic?.triple?.counter_vault_id,
            ],
          })

          onStakingSuccess(
            selectedTopic?.triple?.subject?.vault_id?.toString() ?? '',
          )
        }
      } catch (error) {
        dispatch({
          type: 'TRANSACTION_ERROR',
          error: 'Error processing transaction',
        })
      }
    }
  }

  const action = handleAction

  useEffect(() => {
    if (stakeIsError) {
      stakeReset()
      setIsLoading(false)
    }
    if (createTripleIsError) {
      createTripleReset()
      setIsLoading(false)
    }
  }, [stakeIsError, stakeReset, createTripleIsError, createTripleReset])

  useEffect(() => {
    let assets = ''
    const receipt = stakeTxReceipt ?? createTripleTxReceipt
    const action = 'Deposited'

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
      receipt?.logs[0].data &&
      receipt?.transactionHash !== lastTxHash
    ) {
      const decodedLog = decodeEventLog({
        abi: multivaultAbi,
        data: receipt?.logs[0].data,
        topics: receipt?.logs[0].topics,
      })

      const topics = decodedLog as unknown as {
        eventName: string
        args: EventLogArgs
      }

      if (topics.args.sender.toLowerCase() === userWallet?.toLowerCase()) {
        assets = (topics.args as BuyArgs).senderAssetsAfterTotalFees.toString()

        toast.custom(() => (
          <SignalToast
            action={action}
            assets={assets}
            txHash={stakeTxReceipt.transactionHash}
          />
        ))
        setLastTxHash(stakeTxReceipt.transactionHash)
      }
    }
  }, [stakeTxReceipt, privyUser?.wallet?.address, stakeReset, lastTxHash])

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
        !!createTripleAwaitingWalletConfirmation ||
        !!createTripleAwaitingOnChainConfirmation ||
        txState.status === 'confirm' ||
        txState.status === 'transaction-pending' ||
        txState.status === 'transaction-confirmed' ||
        txState.status === 'approve-transaction' ||
        txState.status === 'awaiting',
    )
  }, [
    stakeAwaitingWalletConfirmation,
    stakeAwaitingOnChainConfirmation,
    createTripleAwaitingWalletConfirmation,
    createTripleAwaitingOnChainConfirmation,
    txState.status,
    setIsLoading,
  ])

  const handleStakeButtonClick = async () => {
    const errors = []

    if (+val < +min_deposit) {
      errors.push(`Minimum stake is ${min_deposit} ETH`)
    }
    if (+val > +walletBalance) {
      errors.push(`Insufficient balance`)
    }

    if (errors.length > 0) {
      setValidationErrors(errors)
      setShowErrors(true)
      return
    }

    action()
  }

  useEffect(() => {
    dispatch({ type: 'START_TRANSACTION' })
  }, [location])

  useEffect(() => {
    setTxState(txState)
  }, [setTxState, txState])

  // Update ticks when inputValue changes
  useEffect(() => {
    const parsedValue = parseInt(inputValue, 10)
    if (!isNaN(parsedValue) && parsedValue !== 0) {
      setTicks(parsedValue)
    }
  }, [inputValue])

  if (!userWallet) {
    return null
  }

  return (
    <div className="flex flex-col min-h-full">
      <div className="flex flex-col gap-4 p-8">
        <div className="flex flex-col gap-2 mb-8">
          <Text variant="headline" className="font-semibold">
            Signal{' '}
            {newAtomMetadata?.name ?? selectedTopic?.triple?.subject.label} as
            the best {selectedTopic?.triple?.object.label ?? objectLabel}
          </Text>
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

        <div className="flex w-full items-center gap-4 rounded-lg border transition-colors h-[72px] border-[#1A1A1A]">
          <div className="flex items-center gap-4 w-full">
            <div className="w-14 h-14 rounded bg-[#1A1A1A] flex-shrink-0 ml-1">
              {(newAtomMetadata?.image || selectedTopic?.image) && (
                <img
                  src={newAtomMetadata?.image ?? selectedTopic?.image}
                  alt={newAtomMetadata?.name ?? selectedTopic?.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              )}
            </div>
            <Text variant="title">
              {newAtomMetadata?.name ?? selectedTopic?.name}
            </Text>
          </div>

          <div className="flex flex-col gap-2 w-full pr-6">
            <div className="flex items-center justify-end">
              <input
                type="text"
                inputMode="numeric"
                pattern="-?[0-9]*"
                value={inputValue}
                onChange={(e) => {
                  const newValue = e.target.value

                  // Allow empty input, minus sign, or valid number pattern
                  if (
                    newValue === '' ||
                    newValue === '-' ||
                    /^-?\d+$/.test(newValue)
                  ) {
                    // Update the raw input value
                    setInputValue(newValue)

                    // Handle special cases
                    if (newValue === '') {
                      setTicks(1) // Default to 1 for empty input
                    } else if (newValue === '-') {
                      // Just keep the minus sign, don't convert to number yet
                    } else {
                      const parsedValue = parseInt(newValue, 10)
                      if (!isNaN(parsedValue) && parsedValue !== 0) {
                        setTicks(parsedValue)
                      }
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
                    setInputValue('1')
                    setTicks(1)
                  }
                }}
                disabled={isLoading}
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
                  onClick={() => {
                    const newValue = ticks + 1
                    setTicks(newValue)
                    setInputValue(newValue.toString())
                  }}
                  disabled={isLoading}
                  className="h-6 p-0 disabled:opacity-30"
                >
                  <ArrowBigUp className="text-success fill-success h-5 w-5" />
                </Button>
                <Button
                  variant="text"
                  onClick={() => {
                    const newValue = ticks - 1
                    setTicks(newValue)
                    setInputValue(newValue.toString())
                  }}
                  disabled={isLoading}
                  className="h-6 p-0 disabled:opacity-30"
                >
                  <ArrowBigDown className="text-destructive fill-destructive h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

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

        <div className="flex flex-row gap-2 justify-end mt-4">
          <div className="flex flex-col gap-2 justify-center">
            <TurnstileField
              siteKey={
                typeof window !== 'undefined'
                  ? window.ENV?.TURNSTILE_SITE_KEY
                  : undefined
              }
              onVerified={(ok) => setCaptchaOk(ok)}
            />
            <SubmitButton
              loading={isLoading}
              onClick={handleStakeButtonClick}
              buttonText={`Stake ${Number(val).toFixed(5)} ETH`}
              loadingText={'Processing...'}
              actionText="Stake"
              disabled={
                isLoading ||
                !userWallet ||
                !privyUser ||
                val === '0' ||
                val === '' ||
                !captchaOk
              }
            />
            <FeesText />
          </div>
        </div>
      </div>
    </div>
  )
}
