import { useEffect, useState } from 'react'

import { Badge, Button, Icon, Text, TextVariant, toast } from '@0xintuition/1ui'

import StakeToast from '@components/onboarding-modal/stake-toast'
import { MIN_DEPOSIT, MULTIVAULT_CONTRACT_ADDRESS } from '@consts/general'
import { multivaultAbi } from '@lib/abis/multivault'
import { useCreateTripleMutation } from '@lib/hooks/mutations/useCreateTripleMutation'
import { useStakeMutation } from '@lib/hooks/mutations/useStakeMutation'
import { useCreateTripleConfig } from '@lib/hooks/useCreateTripleConfig'
import { useGetVaultDetails } from '@lib/hooks/useGetVaultDetails'
import { useGetWalletBalance } from '@lib/hooks/useGetWalletBalance'
import {
  transactionReducer,
  useGenericTxState,
} from '@lib/hooks/useTransactionReducer'
import { usePrivy } from '@privy-io/react-auth'
import { useLocation } from '@remix-run/react'
import { useQueryClient } from '@tanstack/react-query'
import { TransactionActionType, TransactionStateType } from 'app/types'
import { ArrowBigDown, ArrowBigUp, Loader2 } from 'lucide-react'
import { Address, decodeEventLog, formatUnits } from 'viem'
import { usePublicClient } from 'wagmi'

import { StakeStepProps } from './types'

const initialTxState: TransactionStateType = {
  status: 'idle',
  txHash: undefined,
  error: undefined,
}

export function StakeStep({
  selectedTopic,
  newAtomMetadata,
  predicateId,
  objectId,
  setTxState,
  onStakingSuccess,
  isLoading,
  setIsLoading,
}: StakeStepProps) {
  const [ticks, setTicks] = useState(1)
  const [lastTxHash, setLastTxHash] = useState<string | undefined>(undefined)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [showErrors, setShowErrors] = useState(false)

  const publicClient = usePublicClient()
  const queryClient = useQueryClient()
  const location = useLocation()
  const { user: privyUser } = usePrivy()
  const contract = MULTIVAULT_CONTRACT_ADDRESS
  const userWallet = privyUser?.wallet?.address
  const walletBalance = useGetWalletBalance(userWallet as `0x${string}`)
  const { state: txState, dispatch } = useGenericTxState<
    TransactionStateType,
    TransactionActionType
  >(transactionReducer, initialTxState)

  const { data: vaultDetails, isLoading: isLoadingVault } = useGetVaultDetails(
    contract,
    selectedTopic?.triple?.vault_id,
    !newAtomMetadata && selectedTopic?.triple?.counter_vault_id,
    {
      queryKey: [
        'get-vault-details',
        contract,
        selectedTopic?.triple?.vault_id,
        !newAtomMetadata && selectedTopic?.triple?.counter_vault_id,
      ],
      enabled: !!selectedTopic?.triple?.vault_id,
    },
  )
  const { data: tripleConfig, isLoading: isLoadingCreateTripleConfig } =
    useCreateTripleConfig()
  const tripleCost = tripleConfig
    ? formatUnits(BigInt(tripleConfig?.fees.tripleCost), 18)
    : 0
  const min_deposit = vaultDetails
    ? formatUnits(BigInt(vaultDetails?.min_deposit), 18)
    : MIN_DEPOSIT
  const val =
    newAtomMetadata && min_deposit && tripleCost
      ? (ticks * +min_deposit + +tripleCost).toString()
      : (ticks * +min_deposit).toString()

  console.log('val', val)
  console.log('newAtomMetadata', newAtomMetadata)
  console.log('selectedTopic', selectedTopic)
  console.log('tripleConfig', tripleConfig)
  console.log('tripleCost', tripleCost)
  console.log('min_deposit', min_deposit)

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
    console.log('newAtomMetadata', newAtomMetadata)
    console.log('tripleCost', tripleCost)
    if (newAtomMetadata && tripleCost) {
      if (!privyUser?.wallet?.address) {
        console.log('Missing required dependencies')
        return
      }

      console.log('val in handleAction', val)
      try {
        const txHash = await createTriple({
          val,
          userWallet: privyUser?.wallet?.address,
          subjectId: newAtomMetadata.vaultId,
          predicateId,
          objectId,
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

          onStakingSuccess()
        }
      } catch (error) {
        dispatch({
          type: 'TRANSACTION_ERROR',
          error: 'Error processing transaction',
        })
      }
    } else {
      if (!privyUser?.wallet?.address || !selectedTopic?.triple) {
        console.log('Missing required dependencies')
        return
      }

      try {
        const txHash = await stake({
          val,
          userWallet: privyUser?.wallet?.address,
          vaultId: selectedTopic?.triple?.vault_id ?? '',
          triple: selectedTopic?.triple,
          conviction_price: vaultDetails?.conviction_price,
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

          onStakingSuccess()
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
          <StakeToast
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

  console.log('isLoadingCreateTripleConfig', isLoadingCreateTripleConfig)
  console.log('isLoadingVault', isLoadingVault)
  console.log(
    'stakeAwaitingWalletConfirmation',
    stakeAwaitingWalletConfirmation,
  )
  console.log(
    'stakeAwaitingOnChainConfirmation',
    stakeAwaitingOnChainConfirmation,
  )
  console.log(
    'createTripleAwaitingWalletConfirmation',
    createTripleAwaitingWalletConfirmation,
  )
  console.log(
    'createTripleAwaitingOnChainConfirmation',
    createTripleAwaitingOnChainConfirmation,
  )
  console.log('txState.status', txState.status)

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
        txState.status === 'awaiting' ||
        isLoadingVault ||
        isLoadingCreateTripleConfig,
    )
  }, [
    isLoadingVault,
    stakeAwaitingWalletConfirmation,
    stakeAwaitingOnChainConfirmation,
    createTripleAwaitingWalletConfirmation,
    createTripleAwaitingOnChainConfirmation,
    txState.status,
    isLoadingCreateTripleConfig,
  ])

  const handleStakeButtonClick = async () => {
    const errors = []

    if (+val < +min_deposit) {
      errors.push(`Minimum stake is ${min_deposit} ETH`)
    }
    if (+val > +walletBalance) {
      errors.push(
        `Insufficient balance. You have ${(+walletBalance).toFixed(2)} ETH`,
      )
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

  if (!userWallet) {
    return null
  }

  console.log('newAtomMetadata', newAtomMetadata)
  console.log('selectedTopic', selectedTopic)

  return (
    <div className="flex flex-col gap-4 p-8">
      <Text variant="headline" className="text-center mb-8">
        Stake on {newAtomMetadata?.name ?? selectedTopic?.triple?.subject.label}{' '}
        {/* {selectedTopic?.triple?.predicate.label}{' '}
        {selectedTopic?.triple?.object.label} */}
      </Text>

      <div
        className={`flex w-full items-center gap-4 rounded-lg border transition-colors h-[72px] border-[#1A1A1A]`}
      >
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

        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center gap-2 justify-end">
            <Button
              variant="text"
              onClick={() => setTicks(Math.max(1, ticks - 1))}
              disabled={ticks <= 1 || isLoading}
            >
              <ArrowBigDown className="text-destructive fill-destructive" />
            </Button>
            <Text variant="title" className="w-8 text-center">
              {ticks}
            </Text>
            <Button
              variant="text"
              onClick={() => setTicks(ticks + 1)}
              disabled={isLoading}
            >
              <ArrowBigUp className="text-success fill-success" />
            </Button>
          </div>
        </div>
      </div>

      {showErrors && validationErrors.length > 0 && (
        <div className="flex flex-col gap-2">
          {validationErrors.map((error, index) => (
            <Text key={index} variant="body" className="text-destructive">
              {error}
            </Text>
          ))}
        </div>
      )}

      <div className="flex justify-end mt-8">
        <div className="flex flex-row gap-2">
          <Badge className="flex items-center gap-1 px-2">
            <Icon name="wallet" className="h-4 w-4 text-secondary/50" />
            <Text
              variant={TextVariant.caption}
              className="text-nowrap text-secondary/50"
            >
              {(+walletBalance).toFixed(2)} ETH
            </Text>
          </Badge>
          <Button
            variant="primary"
            onClick={handleStakeButtonClick}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin h-4 w-4" /> Processing...
              </>
            ) : (
              `Stake ${Number(val).toFixed(5)} ETH`
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
