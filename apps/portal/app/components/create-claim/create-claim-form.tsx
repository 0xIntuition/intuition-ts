import { useEffect, useReducer } from 'react'

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Text,
  toast,
  TransactionStatus,
  TransactionStatusType,
} from '@0xintuition/1ui'
import { ClaimPresenter, IdentityPresenter } from '@0xintuition/api'

import { SubmissionResult } from '@conform-to/react'
import { multivaultAbi } from '@lib/abis/multivault'
import { useCreateTriple } from '@lib/hooks/useCreateTriple'
import { useIdentitySelection } from '@lib/hooks/useIdentitySelection'
import { useLoaderFetcher } from '@lib/hooks/useLoaderFetcher'
import { usePopoverStates } from '@lib/hooks/usePopoverStates'
import {
  initialTransactionState,
  transactionReducer,
} from '@lib/hooks/useTransactionReducer'
import { FetcherWithComponents, useFetcher } from '@remix-run/react'
import { CreateClaimLoaderData } from '@routes/resources+/create-claim'
import { TagLoaderData } from '@routes/resources+/tag'
import { useQueryClient } from '@tanstack/react-query'
import {
  CREATE_CLAIM_RESOURCE_ROUTE,
  GENERIC_ERROR_MSG,
  MULTIVAULT_CONTRACT_ADDRESS,
  SEARCH_IDENTITIES_RESOURCE_ROUTE,
} from 'consts'
import { CLAIM_ACTIONS } from 'consts/claims'
import { formatUnits, parseUnits } from 'viem'
import { useBalance, useBlockNumber, usePublicClient } from 'wagmi'

import useClaimState from '../../lib/hooks/useClaimState'
import ErrorList from '../error-list'
import { TransactionState } from '../transaction-state'
import CreateClaimButton from './create-claim-button'
import CreateClaimInput from './create-claim-input'
import CreateClaimReview from './create-claim-review'
import { IdentityPopovers } from './identity-popover'

interface CreateClaimFormProps {
  fetchReval: FetcherWithComponents<unknown>
  formRef: React.MutableRefObject<null>
  wallet: string
  onClose: () => void
}

export interface OffChainClaimFetcherData {
  success: 'success' | 'error'
  claim: ClaimPresenter
  submission: SubmissionResult<string[]> | null
}

export function CreateClaimForm({
  fetchReval,
  formRef,
  wallet,
  onClose,
}: CreateClaimFormProps) {
  const [transactionState, transactionDispatch] = useReducer(
    transactionReducer,
    initialTransactionState,
  )
  const { claimState, claimDispatch } = useClaimState()
  const {
    setSearchQuery,
    setIdentities,
    selectedIdentities,
    identities,
    handleIdentitySelection,
  } = useIdentitySelection()
  const popoverStates = usePopoverStates()
  const publicClient = usePublicClient()
  const claimFetcher = useFetcher<OffChainClaimFetcherData | null>()
  const feeFetcher = useLoaderFetcher<CreateClaimLoaderData>(
    CREATE_CLAIM_RESOURCE_ROUTE,
  )
  const identitiesFetcher = useFetcher<IdentityPresenter[] | null>()
  const claimChecker = useFetcher<TagLoaderData | null>()

  const queryClient = useQueryClient()
  const { data: blockNumber } = useBlockNumber({ watch: true })
  const { data: balance, queryKey } = useBalance({
    address: wallet as `0x${string}`,
  })

  const walletBalance = formatUnits(balance?.value ?? 0n, 18)

  const {
    writeContractAsync: writeCreateTriple,
    awaitingWalletConfirmation,
    awaitingOnChainConfirmation,
    isError,
    reset,
  } = useCreateTriple()

  const { fees } = (feeFetcher.data as CreateClaimLoaderData) ?? {}

  const isLoading =
    !!awaitingWalletConfirmation ||
    !!awaitingOnChainConfirmation ||
    transactionState.status === 'confirm' ||
    transactionState.status === 'transaction-pending' ||
    transactionState.status === 'transaction-confirmed'

  useEffect(() => {
    if (claimFetcher.data?.claim && !claimState.createdClaim) {
      claimDispatch({
        type: CLAIM_ACTIONS.SET_CREATED_CLAIM,
        payload: claimFetcher.data.claim,
      })
    }
  }, [claimFetcher.data, claimFetcher.state, claimState.createdClaim])

  useEffect(() => {
    if (claimState.createdClaim) {
      handleCreateTriple()
    }
  }, [claimState.createdClaim])

  useEffect(() => {
    if (awaitingWalletConfirmation) {
      transactionDispatch({ type: 'APPROVE_TRANSACTION' })
    }
    if (awaitingOnChainConfirmation) {
      transactionDispatch({ type: 'TRANSACTION_PENDING' })
    }
    if (isError) {
      transactionDispatch({
        type: 'TRANSACTION_ERROR',
        error: 'Error processing transaction',
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
        transactionDispatch({ type: 'TRANSACTION_PENDING' })
        const receipt = await publicClient.waitForTransactionReceipt({
          hash: txHash,
        })

        if (receipt.status === 'reverted') {
          transactionDispatch({
            type: 'TRANSACTION_ERROR',
            error: 'Transaction reverted',
          })
          toast.error('Transaction reverted. Please try again.')
        } else {
          transactionDispatch({
            type: 'TRANSACTION_COMPLETE',
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
        let errorMessage = 'Error in onchain transaction.'
        if (error.message.includes('insufficient')) {
          errorMessage =
            'Insufficient funds. Please add more ETH to your wallet and try again.'
        }
        if (error.message.includes('rejected')) {
          errorMessage = 'Transaction rejected. Try again when you are ready.'
        }
        transactionDispatch({
          type: 'TRANSACTION_ERROR',
          error: errorMessage,
        })
        toast.error(GENERIC_ERROR_MSG)
      }
    }
  }
  const handleCreateButtonClick = async () => {
    transactionDispatch({ type: 'APPROVE_TRANSACTION' })
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
    if (transactionState.status === 'review-transaction') {
      claimFetcher.submit(formData, {
        action: '/actions/create-claim',
        method: 'post',
      })
    }
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      transactionDispatch({ type: 'START_TRANSACTION' })
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

  const renderContent = () => {
    switch (transactionState.status) {
      case TransactionStatus.idle:
        return (
          <>
            <DialogHeader>
              <DialogTitle>
                <Text variant="headline" className="text-foreground-secondary">
                  Make a claim about an identity
                </Text>
              </DialogTitle>
              <DialogDescription className="items-start w-full">
                <Text variant="caption" className="text-foreground/50">
                  Additional text about this.
                </Text>
              </DialogDescription>
            </DialogHeader>
            <div className="h-3/4 w-full flex items-center justify-center m-auto">
              <claimFetcher.Form method="post" action="/actions/create-claim" />
              <div className="w-full m-auto">
                <div className="flex flex-col items-center gap-10 w-full m-auto">
                  <IdentityPopovers
                    selectedIdentities={selectedIdentities}
                    identities={identities}
                    handleIdentitySelection={handleIdentitySelection}
                    setSearchQuery={setSearchQuery}
                    handleInput={async (event) => {
                      const query = event.currentTarget.value
                      if (query.trim() !== '') {
                        claimDispatch({
                          type: CLAIM_ACTIONS.SET_SEARCH_QUERY,
                          payload: query,
                        })
                      }
                    }}
                    popoverStates={popoverStates}
                  />
                  <CreateClaimInput
                    val={claimState.initialDeposit}
                    setVal={(value) =>
                      claimDispatch({
                        type: CLAIM_ACTIONS.SET_INITIAL_DEPOSIT,
                        payload: value,
                      })
                    }
                    wallet={wallet}
                    walletBalance={walletBalance}
                    isLoading={isLoading}
                    showErrors={claimState.showErrors}
                    setShowErrors={(show) =>
                      claimDispatch({ type: 'SET_SHOW_ERRORS', payload: show })
                    }
                    validationErrors={claimState.validationErrors}
                    setValidationErrors={(errors) =>
                      claimDispatch({
                        type: CLAIM_ACTIONS.SET_VALIDATION_ERRORS,
                        payload: errors,
                      })
                    }
                  />
                  <ErrorList errors={claimState.validationErrors} />
                </div>
              </div>
            </div>
          </>
        )
      case TransactionStatus.reviewTransaction:
        return (
          <div className="h-full flex flex-col">
            <CreateClaimReview
              dispatch={transactionDispatch}
              selectedIdentities={selectedIdentities}
              initialDeposit={claimState.initialDeposit}
              fees={fees}
            />
          </div>
        )
      default:
        return (
          <div className="flex flex-col items-center justify-center flex-grow">
            <TransactionState
              status={transactionState.status as TransactionStatusType}
              txHash={transactionState.txHash}
              type="claim"
            />
          </div>
        )
    }
  }

  return (
    <div className="flex flex-col h-full">
      <fetchReval.Form
        hidden
        ref={formRef}
        action="/actions/reval"
        method="post"
      >
        <input type="hidden" name="eventName" value="create" />
      </fetchReval.Form>
      {renderContent()}
      {transactionState.status !== 'transaction-pending' &&
        transactionState.status !== 'awaiting' &&
        transactionState.status !== 'confirm' && (
          <CreateClaimButton
            handleAction={handleCreateButtonClick}
            handleClose={handleClose}
            dispatch={transactionDispatch}
            state={transactionState}
            claim_id={claimState.createdClaim?.claim_id ?? ''}
            selectedIdentities={claimState.selectedIdentities}
            claimExists={claimState.claimExists}
          />
        )}
    </div>
  )
}
