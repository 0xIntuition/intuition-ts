import React, { useEffect, useState } from 'react'

import {
  Badge,
  Button,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Icon,
  IconName,
  Input,
  Label,
  Text,
  toast,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@0xintuition/1ui'
import { ClaimPresenter, IdentityPresenter } from '@0xintuition/api'

import { IdentityPopover } from '@components/create-claim/create-claim-popovers'
import CreateClaimReview from '@components/create-claim/create-claim-review'
import {
  getFormProps,
  getInputProps,
  SubmissionResult,
  useForm,
} from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { multivaultAbi } from '@lib/abis/multivault'
import { useCreateTriple } from '@lib/hooks/useCreateTriple'
import { useLoaderFetcher } from '@lib/hooks/useLoaderFetcher'
import {
  initialTransactionState,
  transactionReducer,
  useTransactionState,
} from '@lib/hooks/useTransactionReducer'
import { createClaimSchema } from '@lib/schemas/create-claim-schema'
import logger from '@lib/utils/logger'
import { useFetcher, useNavigate } from '@remix-run/react'
import { CreateClaimLoaderData } from '@routes/resources+/create-claim'
import { TagLoaderData } from '@routes/resources+/tag'
import { useQueryClient } from '@tanstack/react-query'
import {
  CREATE_CLAIM_RESOURCE_ROUTE,
  GENERIC_ERROR_MSG,
  MULTIVAULT_CONTRACT_ADDRESS,
  PATHS,
  SEARCH_IDENTITIES_RESOURCE_ROUTE,
} from 'consts'
import { ClaimElement, ClaimElementType } from 'types'
import {
  TransactionActionType,
  TransactionStateType,
  TransactionSuccessAction,
  TransactionSuccessActionType,
} from 'types/transaction'
import { formatUnits, parseUnits } from 'viem'
import {
  useAccount,
  useBalance,
  useBlockNumber,
  usePublicClient,
  useWalletClient,
} from 'wagmi'

import ErrorList from '../error-list'
import { TransactionState } from '../transaction-state'

interface ClaimFormProps {
  wallet: string
  onSuccess?: (claim: ClaimPresenter) => void
  onClose: () => void
  successAction?: TransactionSuccessActionType
}

export function ClaimForm({
  wallet,
  onClose,
  onSuccess,
  successAction = TransactionSuccessAction.VIEW,
}: ClaimFormProps) {
  const { state, dispatch } = useTransactionState<
    TransactionStateType,
    TransactionActionType
  >(transactionReducer, initialTransactionState)

  const [transactionResponseData, setTransactionResponseData] =
    useState<ClaimPresenter | null>(null)

  const isTransactionStarted = [
    'approve',
    'awaiting',
    'confirm',
    'review-transaction',
    'transaction-pending',
    'transaction-confirmed',
    'complete',
    'error',
  ].includes(state.status)

  return (
    <div className="flex flex-col h-full">
      {!isTransactionStarted && (
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
      )}
      <div className="flex-grow">
        <CreateClaimForm
          wallet={wallet}
          state={state}
          dispatch={dispatch}
          onClose={onClose}
          onSuccess={onSuccess}
          successAction={successAction}
          setTransactionResponseData={setTransactionResponseData}
          transactionResponseData={transactionResponseData}
        />
      </div>
    </div>
  )
}

interface CreateClaimFormProps {
  wallet: string
  state: TransactionStateType
  dispatch: React.Dispatch<TransactionActionType>
  setTransactionResponseData: React.Dispatch<
    React.SetStateAction<ClaimPresenter | null>
  >
  transactionResponseData: ClaimPresenter | null
  onSuccess?: (claim: ClaimPresenter) => void
  successAction?: TransactionSuccessActionType
  onClose: () => void
}

function CreateClaimForm({
  wallet,
  state,
  dispatch,
  setTransactionResponseData,
  transactionResponseData,
  onClose,
  onSuccess,
  successAction = TransactionSuccessAction.VIEW,
}: CreateClaimFormProps) {
  const feeFetcher = useLoaderFetcher<CreateClaimLoaderData>(
    CREATE_CLAIM_RESOURCE_ROUTE,
  )
  const { fees } = (feeFetcher.data as CreateClaimLoaderData) ?? {}

  const [initialDeposit, setInitialDeposit] = useState<string>('0')

  const navigate = useNavigate()
  interface OffChainClaimFetcherData {
    success: 'success' | 'error'
    claim: ClaimPresenter
    submission: SubmissionResult<string[]> | null
  }

  const [searchQuery, setSearchQuery] = useState('')
  const [isSubjectPopoverOpen, setIsSubjectPopoverOpen] = useState(false)
  const [isPredicatePopoverOpen, setIsPredicatePopoverOpen] = useState(false)
  const [isObjectPopoverOpen, setIsObjectPopoverOpen] = useState(false)
  const [claimExists, setClaimExists] = useState(false)

  const handleInput = async (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault()
    const value = (event.target as HTMLInputElement).value
    setSearchQuery(value)
  }

  const [identities, setIdentities] = React.useState<IdentityPresenter[]>([])
  const identitiesFetcher = useFetcher<IdentityPresenter[]>()

  useEffect(() => {
    logger('identitiesFetcher.data changed:', identitiesFetcher.data)
    if (identitiesFetcher.data) {
      setIdentities(identitiesFetcher.data)
    }
  }, [identitiesFetcher.data])

  useEffect(() => {
    logger('searchQuery changed:', searchQuery)
    if (searchQuery) {
      const searchParam = `?search=${encodeURIComponent(searchQuery)}`
      identitiesFetcher.load(
        `${SEARCH_IDENTITIES_RESOURCE_ROUTE}${searchParam}`,
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, SEARCH_IDENTITIES_RESOURCE_ROUTE])

  const { data: walletClient } = useWalletClient()
  const publicClient = usePublicClient()
  const { address } = useAccount()

  const {
    writeContractAsync: writeCreateTriple,
    awaitingWalletConfirmation,
    awaitingOnChainConfirmation,
  } = useCreateTriple()

  // form

  async function handleOnChainCreateTriple({
    subjectVaultId,
    predicateVaultId,
    objectVaultId,
  }: {
    subjectVaultId: string
    predicateVaultId: string
    objectVaultId: string
  }) {
    if (
      !awaitingOnChainConfirmation &&
      !awaitingWalletConfirmation &&
      publicClient &&
      writeCreateTriple &&
      address
    ) {
      try {
        dispatch({ type: 'APPROVE_TRANSACTION' })
        const txHash = await writeCreateTriple({
          address: MULTIVAULT_CONTRACT_ADDRESS,
          abi: multivaultAbi,
          functionName: 'createTriple',
          args: [subjectVaultId, predicateVaultId, objectVaultId],
          value:
            (fees?.tripleCost ? BigInt(fees.tripleCost) : 0n) +
            parseUnits(
              initialDeposit && initialDeposit !== '' ? initialDeposit : '0',
              18,
            ),
        })
        dispatch({ type: 'TRANSACTION_PENDING' })
        if (txHash) {
          const receipt = await publicClient.waitForTransactionReceipt({
            hash: txHash,
          })

          dispatch({
            type: 'TRANSACTION_COMPLETE',
            txHash,
            txReceipt: receipt,
          })
        }
      } catch (error) {
        console.error('error', error)
        if (error instanceof Error) {
          let errorMessage = 'Error in onchain transaction.'
          if (error.message.includes('insufficient')) {
            errorMessage =
              'Insufficient funds. Please add more OP to your wallet and try again.'
          }
          if (error.message.includes('rejected')) {
            errorMessage = 'Transaction rejected. Try again when you are ready.'
          }
          dispatch({
            type: 'TRANSACTION_ERROR',
            error: errorMessage,
          })
          toast.error(GENERIC_ERROR_MSG)
          return
        }
      }
    }
  }

  const claimFetcher = useFetcher<OffChainClaimFetcherData>()
  const lastOffChainSubmission = claimFetcher.data?.submission

  useEffect(() => {
    if (
      claimFetcher.state === 'idle' &&
      claimFetcher.data !== null &&
      claimFetcher.data !== undefined
    ) {
      const responseData = claimFetcher.data as OffChainClaimFetcherData
      if (responseData !== null) {
        setTransactionResponseData(responseData.claim)
        logger('responseData', responseData)
        if (
          responseData.claim !== undefined &&
          selectedIdentities.subject !== null &&
          selectedIdentities.predicate !== null &&
          selectedIdentities.object !== null
        ) {
          handleOnChainCreateTriple({
            subjectVaultId: selectedIdentities.subject.vault_id,
            predicateVaultId: selectedIdentities.predicate.vault_id,
            objectVaultId: selectedIdentities.object.vault_id,
          })
        }
      }
      if (claimFetcher.data === null || claimFetcher.data === undefined) {
        console.error('Error in offchain data creation.:', claimFetcher.data)
        dispatch({
          type: 'TRANSACTION_ERROR',
          error: 'Error in offchain claim creation.',
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [claimFetcher.state, claimFetcher.data, dispatch])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (
        walletClient &&
        selectedIdentities.subject &&
        selectedIdentities.predicate &&
        selectedIdentities.object
      ) {
        const formData = new FormData()
        formData.append('subject_id', selectedIdentities.subject.id)
        formData.append('predicate_id', selectedIdentities.predicate.id)
        formData.append('object_id', selectedIdentities.object.id)
        const submission = parseWithZod(formData, {
          schema: createClaimSchema,
        })

        if (event.currentTarget.initial_deposit?.value !== undefined) {
          setInitialDeposit(event.currentTarget.initial_deposit.value)
        }

        logger('submission', submission)

        if (
          submission.status === 'error' &&
          submission.error !== null &&
          Object.keys(submission.error).length
        ) {
          console.error('Create claim validation errors: ', submission.error)
        }
        claimFetcher.submit(formData, {
          action: '/actions/create-claim',
          method: 'post',
        })
        dispatch({ type: 'CONFIRM_TRANSACTION' })
      }
    } catch (error: unknown) {
      logger(error)
    }
  }

  const [form, fields] = useForm({
    id: 'create-claim',
    lastResult: lastOffChainSubmission,
    onSubmit: async (event) => handleSubmit(event),
  })

  const [selectedIdentities, setSelectedIdentities] = useState<{
    subject: IdentityPresenter | null
    predicate: IdentityPresenter | null
    object: IdentityPresenter | null
  }>({
    subject: null,
    predicate: null,
    object: null,
  })

  const handleIdentitySelection = (
    identityType: ClaimElementType,
    identity: IdentityPresenter,
  ) => {
    setSelectedIdentities((prevState) => ({
      ...prevState,
      [identityType]: identity,
    }))
    setSearchQuery('')
    setIdentities([])
    if (identityType === ClaimElement.Subject) {
      setIsSubjectPopoverOpen(false)
    } else if (identityType === ClaimElement.Predicate) {
      setIsPredicatePopoverOpen(false)
    } else if (identityType === ClaimElement.Object) {
      setIsObjectPopoverOpen(false)
    }
  }

  useEffect(() => {
    if (
      !isSubjectPopoverOpen &&
      !isPredicatePopoverOpen &&
      !isObjectPopoverOpen
    ) {
      setSearchQuery('')
      setIdentities([])
    }
  }, [isSubjectPopoverOpen, isPredicatePopoverOpen, isObjectPopoverOpen])

  const queryClient = useQueryClient()
  const { data: blockNumber } = useBlockNumber({ watch: true })
  const { data: balance, queryKey } = useBalance({
    address: wallet as `0x${string}`,
  })

  const walletBalance = formatUnits(balance?.value ?? 0n, 18)

  useEffect(() => {
    if (blockNumber && blockNumber % 5n === 0n) {
      queryClient.invalidateQueries({ queryKey })
    }
  }, [blockNumber, queryClient, queryKey])

  const claimChecker = useFetcher<TagLoaderData>()

  useEffect(() => {
    if (
      selectedIdentities.subject &&
      selectedIdentities.predicate &&
      selectedIdentities.object
    ) {
      claimChecker.load(
        `/resources/tag?subjectId=${selectedIdentities.subject.vault_id}&predicateId=${selectedIdentities.predicate.vault_id}&objectId=${selectedIdentities.object.vault_id}`,
      )
    }
  }, [
    selectedIdentities.subject,
    selectedIdentities.object,
    selectedIdentities.predicate,
  ])

  useEffect(() => {
    if (claimChecker.data) {
      setClaimExists(claimChecker.data.result !== '0')
    }
  }, [claimChecker.data, selectedIdentities])

  useEffect(() => {
    if (state.status === 'complete') {
      if (transactionResponseData) {
        onSuccess?.(transactionResponseData)
      }
    }
  }, [state.status, transactionResponseData])

  const Divider = () => (
    <span className="h-px w-2.5 flex bg-border/30 self-end mb-[1.2rem]" />
  )

  return (
    <>
      <claimFetcher.Form
        method="post"
        {...getFormProps(form)}
        action="/actions/create-claim"
        hidden
      />
      <div className="h-full flex flex-col">
        {state.status === 'idle' ? (
          <div className="flex flex-col items-center justify-between h-full">
            <div className="flex-grow flex items-center justify-center">
              <div className="flex flex-col items-center gap-14">
                <div className="flex items-center">
                  <IdentityPopover
                    type={ClaimElement.Subject}
                    isObjectPopoverOpen={isSubjectPopoverOpen}
                    setIsObjectPopoverOpen={setIsSubjectPopoverOpen}
                    selectedIdentity={selectedIdentities.subject}
                    identities={identities}
                    handleIdentitySelection={(
                      identityType: ClaimElementType,
                      identity: IdentityPresenter,
                    ) => handleIdentitySelection(identityType, identity)}
                    setSearchQuery={setSearchQuery}
                    handleInput={handleInput}
                  />
                  <Divider />
                  <IdentityPopover
                    type={ClaimElement.Predicate}
                    isObjectPopoverOpen={isPredicatePopoverOpen}
                    setIsObjectPopoverOpen={setIsPredicatePopoverOpen}
                    selectedIdentity={selectedIdentities.predicate}
                    identities={identities}
                    handleIdentitySelection={(
                      identityType: ClaimElementType,
                      identity: IdentityPresenter,
                    ) => handleIdentitySelection(identityType, identity)}
                    setSearchQuery={setSearchQuery}
                    handleInput={handleInput}
                  />
                  <Divider />
                  <IdentityPopover
                    type={ClaimElement.Object}
                    isObjectPopoverOpen={isObjectPopoverOpen}
                    setIsObjectPopoverOpen={setIsObjectPopoverOpen}
                    selectedIdentity={selectedIdentities.object}
                    identities={identities}
                    handleIdentitySelection={(
                      identityType: ClaimElementType,
                      identity: IdentityPresenter,
                    ) => handleIdentitySelection(identityType, identity)}
                    setSearchQuery={setSearchQuery}
                    handleInput={handleInput}
                  />
                </div>
                <div className="flex flex-row items-center justify-center">
                  <div className="flex w-full max-w-md flex-col mx-auto">
                    <div className="flex flex-row items-center justify-between mb-1">
                      <div className="inline-flex gap-1">
                        <Label htmlFor={fields.initial_deposit.id} hidden>
                          Initial Deposit
                        </Label>
                        <Text
                          variant="caption"
                          className="text-secondary-foreground/90"
                        >
                          Initial Deposit
                        </Text>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Icon
                                name={IconName.circleQuestionMark}
                                className="text-secondary-foreground/90 h-4 w-4"
                              />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-60">
                              No initial deposit is required to create a claim.
                              However, you will need to spend small amount of
                              ETH to cover the fees.
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Badge className="bg-transparent">
                        <Icon name="wallet" className="h-4 w-4" />
                        {(+walletBalance).toFixed(2)} ETH
                      </Badge>
                    </div>
                    <Input
                      {...getInputProps(fields.initial_deposit, {
                        type: 'text',
                      })}
                      placeholder="0"
                      startAdornment="ETH"
                    />
                    <ErrorList
                      id={fields.initial_deposit.errorId}
                      errors={fields.initial_deposit.errors}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-auto">
              <Button
                type="button"
                variant="primary"
                onClick={(e) => {
                  e.preventDefault()
                  dispatch({ type: 'REVIEW_TRANSACTION' })
                }}
                disabled={
                  !address ||
                  claimExists ||
                  selectedIdentities.subject === null ||
                  selectedIdentities.predicate === null ||
                  selectedIdentities.object === null ||
                  ['confirm', 'transaction-pending', 'awaiting'].includes(
                    state.status,
                  )
                }
                className="w-40 mx-auto"
              >
                {claimExists ? 'Claim Exists' : 'Review'}
              </Button>
            </div>
          </div>
        ) : state.status === 'review-transaction' ? (
          <div className="h-full flex flex-col">
            <CreateClaimReview
              dispatch={dispatch}
              selectedIdentities={selectedIdentities}
              initialDeposit={initialDeposit}
              fees={fees}
            />
            <div className="mt-auto">
              <Button
                form={form.id}
                type="submit"
                variant="primary"
                disabled={
                  !address ||
                  selectedIdentities.subject === null ||
                  selectedIdentities.predicate === null ||
                  selectedIdentities.object === null ||
                  ['confirm', 'transaction-pending', 'awaiting'].includes(
                    state.status,
                  )
                }
                className="w-40 mx-auto"
              >
                Create Claim
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-96">
            <TransactionState
              status={state.status}
              txHash={state.txHash}
              type="claim"
              successButton={
                transactionResponseData && (
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => {
                      if (successAction === TransactionSuccessAction.VIEW) {
                        navigate(
                          `${PATHS.CLAIM}/${transactionResponseData.claim_id}`,
                        )
                      }

                      onClose()
                    }}
                  >
                    {successAction === TransactionSuccessAction.VIEW
                      ? 'View claim'
                      : 'Close'}
                  </Button>
                )
              }
            />
          </div>
        )}
      </div>
    </>
  )
}
