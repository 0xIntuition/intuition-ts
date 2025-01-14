import { useState } from 'react'

import { Dialog, DialogContent } from '@0xintuition/1ui'

import StakeToast from '@components/onboarding-modal/stake-toast'
import {
  CURRENT_ENV,
  MIN_DEPOSIT,
  MULTIVAULT_CONTRACT_ADDRESS,
} from '@consts/general'
import { multivaultAbi } from '@lib/abis/multivault'
import { useGetWalletBalance } from '@lib/hooks/useGetWalletBalance'
import { getSpecialPredicate } from '@lib/utils/app'
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
import { TopicsStep } from './topics-step'

interface OnboardingModalProps {
  isOpen: boolean
  onClose: () => void
}

export function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState<Step>(STEPS.INTRO)
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)

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
      tagPredicateId: getSpecialPredicate(CURRENT_ENV).tagPredicate.id,
      globalWhere: {
        predicate_id: {
          _eq: getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId,
        },
        object_id: {
          _eq: getSpecialPredicate(CURRENT_ENV).web3Wallet.vaultId,
        },
      },
    },
    {
      queryKey: [
        'get-list-details',
        {
          predicateId: getSpecialPredicate(CURRENT_ENV).tagPredicate.id,
          objectId: getSpecialPredicate(CURRENT_ENV).web3Wallet.vaultId,
        },
      ],
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
      return prev
    })
  }

  const handleBack = () => {
    setCurrentStep((prev) => {
      if (prev === STEPS.TOPICS) {
        return STEPS.INTRO
      }
      return prev
    })
  }

  const handleSelectWallet = (walletId: string) => {
    setSelectedWallet(walletId)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 bg-gradient-to-br from-[#060504] to-[#101010] max-w-[640px] w-full border-none">
        {currentStep === STEPS.INTRO && <IntroStep onNext={handleNext} />}
        {currentStep === STEPS.TOPICS && (
          <TopicsStep
            onNext={handleNext}
            onBack={handleBack}
            selectedWallet={selectedWallet}
            onSelectWallet={handleSelectWallet}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
