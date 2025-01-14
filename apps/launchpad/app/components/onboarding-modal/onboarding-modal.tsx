import { useCallback, useEffect, useState } from 'react'

import { Dialog, DialogContent, toast } from '@0xintuition/1ui'
import { GetTripleQuery, useGetListDetailsQuery } from '@0xintuition/graphql'

import StakeToast from '@components/onboarding-modal/stake-toast'
import { MIN_DEPOSIT, MULTIVAULT_CONTRACT_ADDRESS } from '@consts/general'
import { multivaultAbi } from '@lib/abis/multivault'
import { useGetWalletBalance } from '@lib/hooks/useGetWalletBalance'
import { usePrivy } from '@privy-io/react-auth'
import { useLocation } from '@remix-run/react'
import { useQueryClient } from '@tanstack/react-query'
import { ClientOnly } from 'remix-utils/client-only'
import { Address, decodeEventLog, formatUnits } from 'viem'
import { usePublicClient } from 'wagmi'

import { useStakeMutation } from '../../lib/hooks/mutations/useStakeMutation'
import { useGetVaultDetails } from '../../lib/hooks/useGetVaultDetails'
import { transactionReducer } from '../../lib/hooks/useTransactionReducer'
import { useGenericTxState } from '../../lib/utils/use-tx-reducer'
import {
  TransactionActionType,
  TransactionStateType,
} from '../../types/transaction'
import { STEPS } from './constants'
import { IntroStep } from './intro-step'
import { StakeStep } from './stake-step'
import { TopicsStep } from './topics-step'
import { OnboardingModalProps, OnboardingState, Topic } from './types'

const STORAGE_KEY = 'onboarding-progress'

const initialTxState: TransactionStateType = {
  status: 'idle',
  txHash: undefined,
  error: undefined,
}

const INITIAL_STATE: OnboardingState = {
  currentStep: STEPS.INTRO,
  ticks: 1,
}

export function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const [state, setState] = useState<OnboardingState>(INITIAL_STATE)
  const [topics, setTopics] = useState<Topic[]>([])
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [lastTxHash, setLastTxHash] = useState<string | undefined>(undefined)
  const { state: txState, dispatch } = useGenericTxState<
    TransactionStateType,
    TransactionActionType
  >(transactionReducer, initialTxState)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [showErrors, setShowErrors] = useState(false)

  const publicClient = usePublicClient()
  const queryClient = useQueryClient()
  const location = useLocation()
  const { user: privyUser } = usePrivy()
  const contract = MULTIVAULT_CONTRACT_ADDRESS
  const userWallet = privyUser?.wallet?.address
  const walletBalance = useGetWalletBalance(userWallet as `0x${string}`)

  // Fetch wallet list
  const { data: listData } = useGetListDetailsQuery(
    {
      tagPredicateId: 3,
      globalWhere: {
        predicate_id: {
          _eq: 3,
        },
        object_id: {
          _eq: 620,
        },
      },
    },
    {
      queryKey: ['get-list-details', { predicateId: 3, objectId: 620 }],
    },
  )

  // Get vault details for selected wallet
  const { data: vaultDetails, isLoading: isLoadingVault } = useGetVaultDetails(
    contract,
    state.selectedTopic?.triple?.vault_id,
    state.selectedTopic?.triple?.counter_vault_id,
  )

  const min_deposit = vaultDetails
    ? formatUnits(BigInt(vaultDetails?.min_deposit), 18)
    : MIN_DEPOSIT
  const val = (state.ticks * +min_deposit).toString()

  const {
    mutateAsync: stake,
    txReceipt,
    awaitingWalletConfirmation,
    awaitingOnChainConfirmation,
    isError,
    reset,
  } = useStakeMutation(contract, 'deposit')

  // Shared transition handler
  const handleTransition = useCallback(
    (updateFn: (prev: OnboardingState) => OnboardingState) => {
      setIsTransitioning(true)
      setTimeout(() => {
        setState(updateFn)
        setIsTransitioning(false)
      }, 300)
    },
    [],
  )

  // Update topics when list data changes
  useEffect(() => {
    if (!listData?.globalTriples) {
      return
    }

    const newTopics = listData.globalTriples.map((triple) => ({
      id: triple.vault_id,
      name: triple.subject.label ?? '',
      image: triple.subject.image ?? undefined,
      triple: triple as unknown as GetTripleQuery['triple'],
      selected: false,
    }))
    setTopics(newTopics)
    setState(INITIAL_STATE)

    // Cleanup on unmount/hot reload
    return () => {
      setTopics([])
      setState(INITIAL_STATE)
    }
  }, [listData?.globalTriples])

  // Save progress when state or topics change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ state, topics }))
  }, [state, topics])

  // Reset state on close
  useEffect(() => {
    if (!isOpen) {
      setTopics([])
      setState(INITIAL_STATE)
      reset()
    }
  }, [isOpen, reset])

  const handleNext = useCallback(() => {
    if (state.currentStep === STEPS.TOPICS) {
      const selectedTopic = topics.find((topic) => topic.selected)
      if (selectedTopic) {
        handleTransition((prev) => ({
          ...prev,
          selectedTopic,
          currentStep: STEPS.STAKE,
        }))
      }
    } else {
      handleTransition((prev) => ({
        ...prev,
        currentStep: prev.currentStep + 1,
      }))
    }
  }, [state.currentStep, topics, handleTransition])

  const handleBack = useCallback(() => {
    handleTransition((prev) => ({
      ...prev,
      currentStep: prev.currentStep - 1,
    }))
  }, [handleTransition])

  const toggleTopic = useCallback((id: string) => {
    setTopics((currentTopics) => {
      return currentTopics.map((topic) => ({
        ...topic,
        selected: topic.id === id,
      }))
    })
  }, [])

  const handleAction = async () => {
    if (!privyUser?.wallet?.address || !state.selectedTopic?.triple) {
      console.log('Missing required dependencies')
      return
    }

    try {
      const txHash = await stake({
        val,
        userWallet: privyUser?.wallet?.address,
        vaultId: state.selectedTopic?.triple?.vault_id ?? '',
        triple: state.selectedTopic?.triple,
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
            state.selectedTopic?.triple?.vault_id,
            state.selectedTopic?.triple?.counter_vault_id,
          ],
        })
        onClose()
      }
    } catch (error) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        error: 'Error processing transaction',
      })
    }
  }

  const action = handleAction

  useEffect(() => {
    if (isError) {
      reset()
      setIsLoading(false)
    }
  }, [isError, reset])

  useEffect(() => {
    let assets = ''
    const receipt = txReceipt
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
      txReceipt &&
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

      if (
        topics.args.sender === (privyUser?.wallet?.address as `0x${string}`)
      ) {
        assets = (topics.args as BuyArgs).senderAssetsAfterTotalFees.toString()

        toast.custom(() => (
          <StakeToast
            action={action}
            assets={assets}
            txHash={txReceipt.transactionHash}
          />
        ))
        setLastTxHash(txReceipt.transactionHash)
      }
    }
  }, [txReceipt, privyUser?.wallet?.address, reset, lastTxHash])

  useEffect(() => {
    if (awaitingWalletConfirmation) {
      dispatch({ type: 'APPROVE_TRANSACTION' })
    }
    if (awaitingOnChainConfirmation) {
      dispatch({ type: 'TRANSACTION_PENDING' })
    }
    if (isError) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        error: 'Error processing transaction',
      })
    }
  }, [
    awaitingWalletConfirmation,
    awaitingOnChainConfirmation,
    isError,
    dispatch,
  ])

  useEffect(() => {
    setIsLoading(
      !!awaitingWalletConfirmation ||
        !!awaitingOnChainConfirmation ||
        txState.status === 'confirm' ||
        txState.status === 'transaction-pending' ||
        txState.status === 'transaction-confirmed' ||
        txState.status === 'approve-transaction' ||
        txState.status === 'awaiting' ||
        isLoadingVault,
    )
  }, [
    isLoadingVault,
    awaitingWalletConfirmation,
    awaitingOnChainConfirmation,
    txState.status,
  ])

  const handleStakeButtonClick = async () => {
    if (+val < +min_deposit || +val > +walletBalance) {
      setShowErrors(true)
      return
    }
    action()
  }

  useEffect(() => {
    dispatch({ type: 'START_TRANSACTION' })
  }, [location])

  const handleClose = () => {
    onClose()
    setIsLoading(false)
    setShowErrors(false)
    setValidationErrors([])
    setTimeout(() => {
      dispatch({ type: 'START_TRANSACTION' })
      reset()
    }, 500)
  }

  useEffect(() => {
    if (isOpen) {
      setIsLoading(false)
      setShowErrors(false)
      setValidationErrors([])
    }
  }, [isOpen, dispatch])

  return (
    <ClientOnly>
      {() => (
        <Dialog open={isOpen} onOpenChange={handleClose}>
          <DialogContent className="p-0 bg-gradient-to-br from-[#060504] to-[#101010] max-w-[640px] w-full border-none">
            <div
              className={`transition-opacity duration-300 ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {state.currentStep === STEPS.INTRO && (
                <IntroStep onNext={handleNext} />
              )}

              {state.currentStep === STEPS.TOPICS && (
                <TopicsStep
                  topics={topics}
                  onToggleTopic={toggleTopic}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}

              {state.currentStep === STEPS.STAKE && state.selectedTopic && (
                <StakeStep
                  selectedTopic={state.selectedTopic}
                  ticks={state.ticks}
                  val={val}
                  walletBalance={walletBalance}
                  onTicksChange={(ticks: number) =>
                    setState((prev) => ({ ...prev, ticks }))
                  }
                  onStake={handleStakeButtonClick}
                  onBack={handleBack}
                  isLoading={isLoading || isLoadingVault}
                  validationErrors={validationErrors}
                  showErrors={showErrors}
                  txState={txState}
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </ClientOnly>
  )
}
