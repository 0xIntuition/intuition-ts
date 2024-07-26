import { useEffect, useReducer, useRef } from 'react'

import { Dialog, DialogContent, DialogFooter, toast } from '@0xintuition/1ui'
import { ClaimPresenter, IdentityPresenter } from '@0xintuition/api'

import { SubmissionResult } from '@conform-to/react'
import { multivaultAbi } from '@lib/abis/multivault'
import { useCreateTriple } from '@lib/hooks/useCreateTriple'
import { useIdentitySelection } from '@lib/hooks/useIdentitySelection'
import { useLoaderFetcher } from '@lib/hooks/useLoaderFetcher'
import {
  initialTransactionState,
  transactionReducer,
} from '@lib/hooks/useTransactionReducer'
import { useFetcher, useLocation } from '@remix-run/react'
import { CreateClaimLoaderData } from '@routes/resources+/create-claim'
import { TagLoaderData } from '@routes/resources+/tag'
import { useQueryClient } from '@tanstack/react-query'
import {
  CREATE_CLAIM_RESOURCE_ROUTE,
  ERROR_IN_ONCHAIN_TRANSACTION,
  ERROR_PROCESSING_TRANSACTION,
  GENERIC_ERROR_MSG,
  INSUFFICIENT_FUNDS_ERROR,
  MULTIVAULT_CONTRACT_ADDRESS,
  SEARCH_IDENTITIES_RESOURCE_ROUTE,
  TRANSACTION_REJECTED_ERROR,
  TRANSACTION_REVERTED_ERROR,
} from 'consts'
import { CLAIM_ACTIONS } from 'consts/claims'
import {
  TRANSACTION_ACTIONS,
  TRANSACTION_RECEIPT_STATUS,
  TRANSACTION_STATUS,
} from 'consts/transaction'
import { formatUnits, parseUnits } from 'viem'
import { useBalance, useBlockNumber, usePublicClient } from 'wagmi'

import useClaimState from '../../lib/hooks/useClaimState'
import CreateClaimButton from './create-claim-button'
import { CreateClaimForm } from './create-claim-form'

export interface CreateClaimModalProps {
  userWallet: string
  open: boolean
  onClose: () => void
}

export default function CreateClaimModal({
  userWallet,
  open,
  onClose,
}: CreateClaimModalProps) {
  const [transactionState, transactionDispatch] = useReducer(
    transactionReducer,
    initialTransactionState,
  )
  const { claimState, claimDispatch } = useClaimState()
  const { setSearchQuery, setIdentities } = useIdentitySelection()
  const fetchReval = useFetcher()
  const formRef = useRef(null)
  const claimFetcher = useFetcher<OffChainClaimFetcherData | null>()
  const feeFetcher = useLoaderFetcher<CreateClaimLoaderData>(
    CREATE_CLAIM_RESOURCE_ROUTE,
  )
  const identitiesFetcher = useFetcher<IdentityPresenter[] | null>()
  const claimChecker = useFetcher<TagLoaderData | null>()

  const publicClient = usePublicClient()
  const {
    writeContractAsync: writeCreateTriple,
    awaitingWalletConfirmation,
    awaitingOnChainConfirmation,
    isError,
    reset,
  } = useCreateTriple()

  const queryClient = useQueryClient()
  const { data: blockNumber } = useBlockNumber({ watch: true })
  const { data: balance, queryKey } = useBalance({
    address: userWallet as `0x${string}`,
  })

  const location = useLocation()

  const { fees } = (feeFetcher.data as CreateClaimLoaderData) ?? {}

  const walletBalance = formatUnits(balance?.value ?? 0n, 18)

  const isLoading =
    !!awaitingWalletConfirmation ||
    !!awaitingOnChainConfirmation ||
    transactionState.status === TRANSACTION_STATUS.CONFIRM ||
    transactionState.status === TRANSACTION_STATUS.TRANSACTION_PENDING ||
    transactionState.status === TRANSACTION_STATUS.TRANSACTION_CONFIRMED

  useEffect(() => {
    if (open && claimFetcher.data?.claim && !claimState.createdClaim) {
      claimDispatch({
        type: CLAIM_ACTIONS.SET_CREATED_CLAIM,
        payload: claimFetcher.data.claim,
      })
    }
  }, [open, claimFetcher.data, claimFetcher.state, claimState.createdClaim])

  useEffect(() => {
    if (claimState.createdClaim) {
      handleCreateTriple()
    }
  }, [claimState.createdClaim])

  useEffect(() => {
    if (awaitingWalletConfirmation) {
      transactionDispatch({ type: TRANSACTION_ACTIONS.APPROVE_TRANSACTION })
    }
    if (awaitingOnChainConfirmation) {
      transactionDispatch({ type: TRANSACTION_ACTIONS.TRANSACTION_PENDING })
    }
    if (isError) {
      transactionDispatch({
        type: TRANSACTION_ACTIONS.TRANSACTION_ERROR,
        error: ERROR_PROCESSING_TRANSACTION,
      })
    }
  }, [awaitingWalletConfirmation, awaitingOnChainConfirmation, isError])

  useEffect(() => {
    if (isError) {
      reset()
    }
  }, [isError, reset])

  useEffect(() => {
    if (blockNumber && blockNumber % 5n === 0n) {
      queryClient.invalidateQueries({ queryKey })
    }
  }, [blockNumber, queryClient, queryKey])

  useEffect(() => {
    if (claimState.searchQuery) {
      const searchParam = `?search=${encodeURIComponent(claimState.searchQuery)}`
      identitiesFetcher.load(
        `${SEARCH_IDENTITIES_RESOURCE_ROUTE}${searchParam}`,
      )
    }
  }, [claimState.searchQuery])

  useEffect(() => {
    if (identitiesFetcher.data) {
      claimDispatch({
        type: CLAIM_ACTIONS.SET_IDENTITIES,
        payload: identitiesFetcher.data,
      })
    }
  }, [identitiesFetcher.data])

  useEffect(() => {
    if (
      claimState.selectedIdentities.subject &&
      claimState.selectedIdentities.predicate &&
      claimState.selectedIdentities.object &&
      !claimState.claimExists
    ) {
      claimChecker.load(
        `/resources/tag?subjectId=${claimState.selectedIdentities.subject.vault_id}&predicateId=${claimState.selectedIdentities.predicate.vault_id}&objectId=${claimState.selectedIdentities.object.vault_id}`,
      )
    }
  }, [claimState.selectedIdentities])

  useEffect(() => {
    if (claimChecker.data) {
      claimDispatch({
        type: CLAIM_ACTIONS.SET_CLAIM_EXISTS,
        payload: claimChecker.data.result !== '0',
      })
    }
  }, [claimChecker.data])

  useEffect(() => {
    claimDispatch({ type: CLAIM_ACTIONS.RESET })
    transactionDispatch({ type: TRANSACTION_ACTIONS.START_TRANSACTION })
  }, [location])

  const handleCreateTriple = async () => {
    try {
      const txHash = await writeCreateTriple({
        address: MULTIVAULT_CONTRACT_ADDRESS,
        abi: multivaultAbi,
        functionName: 'createTriple',
        args: [
          claimState.selectedIdentities.subject?.vault_id,
          claimState.selectedIdentities.predicate?.vault_id,
          claimState.selectedIdentities.object?.vault_id,
        ],
        value:
          (fees?.tripleCost ? BigInt(fees.tripleCost) : 0n) +
          parseUnits(
            claimState.initialDeposit && claimState.initialDeposit !== ''
              ? claimState.initialDeposit
              : '0',
            18,
          ),
      })

      if (publicClient && txHash) {
        transactionDispatch({ type: TRANSACTION_ACTIONS.TRANSACTION_PENDING })
        const receipt = await publicClient.waitForTransactionReceipt({
          hash: txHash,
        })

        if (receipt.status === TRANSACTION_RECEIPT_STATUS.REVERTED) {
          transactionDispatch({
            type: TRANSACTION_ACTIONS.TRANSACTION_ERROR,
            error: TRANSACTION_REVERTED_ERROR,
          })
          toast.error('Transaction reverted. Please try again.')
        } else {
          transactionDispatch({
            type: TRANSACTION_ACTIONS.TRANSACTION_COMPLETE,
            txHash,
            txReceipt: receipt,
          })
          fetchReval.submit(formRef.current, {
            method: 'POST',
          })
        }
      }
    } catch (error) {
      console.error('error', error)
      if (error instanceof Error) {
        let errorMessage = ERROR_IN_ONCHAIN_TRANSACTION
        if (error.message.includes('insufficient')) {
          errorMessage = INSUFFICIENT_FUNDS_ERROR
        }
        if (error.message.includes('rejected')) {
          errorMessage = TRANSACTION_REJECTED_ERROR
        }
        transactionDispatch({
          type: TRANSACTION_ACTIONS.TRANSACTION_ERROR,
          error: errorMessage,
        })
        toast.error(GENERIC_ERROR_MSG)
      }
    }
  }

  const handleCreateButtonClick = async () => {
    transactionDispatch({ type: TRANSACTION_ACTIONS.APPROVE_TRANSACTION })
    claimDispatch({ type: CLAIM_ACTIONS.SET_CREATED_CLAIM, payload: null })
    const formData = new FormData()
    formData.append(
      'subject_id',
      claimState.selectedIdentities.subject?.id ?? '',
    )
    formData.append(
      'predicate_id',
      claimState.selectedIdentities.predicate?.id ?? '',
    )
    formData.append('object_id', claimState.selectedIdentities.object?.id ?? '')
    formData.append('initial_deposit', claimState.initialDeposit)
    if (transactionState.status === TRANSACTION_STATUS.REVIEW_TRANSACTION) {
      claimFetcher.submit(formData, {
        action: '/actions/create-claim',
        method: 'post',
      })
    }
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      transactionDispatch({ type: TRANSACTION_ACTIONS.START_TRANSACTION })
      reset()
      claimDispatch({ type: CLAIM_ACTIONS.RESET })
      claimFetcher.data = null
      claimChecker.data = null
      identitiesFetcher.data = null
      setSearchQuery('')
      setIdentities([])
      claimDispatch({ type: CLAIM_ACTIONS.SET_CREATED_CLAIM, payload: null })
    }, 500)
  }

  const isTransactionStarted = [
    TRANSACTION_STATUS.APPROVE_TRANSACTION,
    TRANSACTION_STATUS.TRANSACTION_PENDING,
    TRANSACTION_STATUS.CONFIRM,
  ].includes(transactionState.status)

  useEffect(() => {
    if (open) {
      transactionDispatch({ type: TRANSACTION_ACTIONS.START_TRANSACTION })
      reset()
      claimDispatch({ type: CLAIM_ACTIONS.RESET })
      claimFetcher.data = null
      claimChecker.data = null
      identitiesFetcher.data = null
      feeFetcher.load(CREATE_CLAIM_RESOURCE_ROUTE)
      setSearchQuery('')
      setIdentities([])
      claimDispatch({ type: CLAIM_ACTIONS.SET_CREATED_CLAIM, payload: null })
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex flex-col min-w-[640px] h-[468px]">
        <div className="flex-grow overflow-y-auto">
          <CreateClaimForm
            fetchReval={fetchReval}
            formRef={formRef}
            state={transactionState}
            dispatch={transactionDispatch}
            wallet={userWallet}
            walletBalance={walletBalance}
            claimFetcher={claimFetcher}
            claimState={claimState}
            claimDispatch={claimDispatch}
            fees={fees}
            isLoading={isLoading}
          />
        </div>
        {!isTransactionStarted && (
          <DialogFooter className="justify-center items-center gap-5 mt-auto mx-auto">
            <CreateClaimButton
              handleAction={handleCreateButtonClick}
              handleClose={handleClose}
              dispatch={transactionDispatch}
              state={transactionState}
              claim_id={claimState.createdClaim?.claim_id ?? ''}
              selectedIdentities={claimState.selectedIdentities}
              claimExists={claimState.claimExists}
            />
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

export interface OffChainClaimFetcherData {
  success: 'success' | 'error'
  claim: ClaimPresenter
  submission: SubmissionResult<string[]> | null
}
