import React, { useEffect, useState } from 'react'

import {
  Button,
  DialogHeader,
  DialogTitle,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Icon,
  IdentityTag,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ProfileCard,
  Text,
  toast,
  TransactionStatusCard,
  TransactionStatusIndicator,
} from '@0xintuition/1ui'
import { ClaimPresenter, IdentityPresenter } from '@0xintuition/api'

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
import {
  BLOCK_EXPLORER_URL,
  CREATE_RESOURCE_ROUTE,
  MULTIVAULT_CONTRACT_ADDRESS,
  SEARCH_IDENTITIES_RESOURCE_ROUTE,
} from '@lib/utils/constants'
import logger from '@lib/utils/logger'
import { sliceString, truncateString } from '@lib/utils/misc'
import { Link, useFetcher, useNavigate } from '@remix-run/react'
import { CreateLoaderData } from '@routes/resources+/create'
import * as blockies from 'blockies-ts'
import { TransactionActionType, TransactionStateType } from 'types/transaction'
import { parseUnits } from 'viem'
import { useAccount, usePublicClient, useWalletClient } from 'wagmi'

import ErrorList from './error-list'
import { IdentitySearchCombobox } from './identity/identity-search-combo-box'
import Toast from './toast'

interface ClaimFormProps {
  onSuccess?: () => void
  onClose: () => void
}

export function ClaimForm({ onClose }: ClaimFormProps) {
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
    <>
      <>
        {!isTransactionStarted && (
          <DialogHeader className="py-4">
            <DialogTitle>
              <Text variant="headline" className="text-foreground-secondary">
                Make a claim about an identity
              </Text>
            </DialogTitle>
            <Text variant="caption" className="text-foreground/50 w-full">
              Additional text about this.
            </Text>
          </DialogHeader>
        )}
        <CreateClaimForm
          state={state}
          dispatch={dispatch}
          onClose={onClose}
          setTransactionResponseData={setTransactionResponseData}
          transactionResponseData={transactionResponseData}
        />
      </>
    </>
  )
}

interface CreateClaimFormProps {
  state: TransactionStateType
  dispatch: React.Dispatch<TransactionActionType>
  setTransactionResponseData: React.Dispatch<
    React.SetStateAction<ClaimPresenter | null>
  >
  transactionResponseData: ClaimPresenter | null
  onClose: () => void
}

function CreateClaimForm({
  state,
  dispatch,
  setTransactionResponseData,
  transactionResponseData,
  onClose,
}: CreateClaimFormProps) {
  const feeFetcher = useLoaderFetcher<CreateLoaderData>(CREATE_RESOURCE_ROUTE)
  const { atomCost: atomCostAmount, tripleCost: tripleCostAmount } =
    (feeFetcher.data as CreateLoaderData) ?? {
      vaultId: BigInt(0),
      atomCost: BigInt(0),
      tripleCost: BigInt(0),
      protocolFee: BigInt(0),
      entryFee: BigInt(0),
    }
  const [initialDeposit, setInitialDeposit] = useState<string>('0')

  logger(
    'items',
    state,
    dispatch,
    setTransactionResponseData,
    transactionResponseData,
    atomCostAmount,
    tripleCostAmount,
  )

  const navigate = useNavigate()
  interface OffChainClaimFetcherData {
    success: 'success' | 'error'
    claim: ClaimPresenter
    submission: SubmissionResult<string[]> | null
  }

  const [searchQuery, setSearchQuery] = useState('')

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
  }, [searchQuery, SEARCH_IDENTITIES_RESOURCE_ROUTE])

  const { atomCost, tripleCost } = (feeFetcher.data as CreateLoaderData) ?? {
    atomEquityFeeRaw: BigInt(0),
    atomCost: BigInt(0),
    tripleCost: BigInt(0),
  }

  logger('atomCost', atomCost)
  logger('tripleCost', tripleCost)

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
            BigInt(tripleCost) +
            parseUnits(initialDeposit === '' ? '0' : initialDeposit, 18),
        })
        dispatch({ type: 'TRANSACTION_PENDING' })
        if (txHash) {
          const receipt = await publicClient.waitForTransactionReceipt({
            hash: txHash,
          })

          dispatch({
            type: 'TRANSACTION_COMPLETE',
            txHash: txHash,
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
          toast.custom(
            () => (
              <Toast
                title="Error"
                description="error"
                icon={
                  <Icon
                    name="triangle-exclamation"
                    className="h-3 w-3 text-destructive"
                  />
                }
              />
            ),
            {
              duration: 5000,
            },
          )
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
    identityType: 'subject' | 'predicate' | 'object',
    identity: IdentityPresenter,
  ) => {
    setSelectedIdentities((prevState) => ({
      ...prevState,
      [identityType]: identity,
    }))
    logger('selected', identity)
  }

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

  const Divider = () => (
    <span className="h-px w-2.5 flex bg-border/30 self-end mb-[1.2rem]" />
  )

  return (
    <>
      <claimFetcher.Form
        method="post"
        {...getFormProps(form)}
        action="/actions/create-claim"
      >
        {!isTransactionStarted ? (
          <div className="flex flex-col items-center gap-14">
            <div className="flex items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex flex-col gap-2 items-start">
                    <Text variant="small" className="text-primary/60">
                      Subject
                    </Text>
                    <HoverCard>
                      <HoverCardTrigger>
                        <IdentityTag size="lg">
                          {truncateString(
                            selectedIdentities.subject?.display_name ?? '',
                            7,
                          ) || 'Subject'}
                        </IdentityTag>
                      </HoverCardTrigger>
                      {selectedIdentities.subject && (
                        <HoverCardContent side="bottom">
                          <ProfileCard
                            variant={
                              selectedIdentities.subject?.is_user === true
                                ? 'user'
                                : 'non-user'
                            }
                            avatarSrc={
                              selectedIdentities.subject?.user?.image ??
                              blockies
                                .create({
                                  seed: selectedIdentities.subject?.user
                                    ?.wallet,
                                })
                                .toDataURL()
                            }
                            name={
                              selectedIdentities.subject?.is_user === true
                                ? selectedIdentities.subject?.user
                                    ?.display_name ?? ''
                                : selectedIdentities.subject?.display_name
                            }
                            walletAddress={
                              selectedIdentities.subject?.is_user === true
                                ? selectedIdentities.subject?.user?.ens_name ??
                                  sliceString(
                                    selectedIdentities.subject?.user?.wallet,
                                    6,
                                    4,
                                  )
                                : selectedIdentities.subject?.identity_id
                            }
                            stats={
                              selectedIdentities.subject?.is_user === true
                                ? {
                                    numberOfFollowers:
                                      selectedIdentities.subject
                                        ?.follower_count ?? 0,
                                    numberOfFollowing:
                                      selectedIdentities.subject
                                        ?.followed_count ?? 0,
                                    // points:
                                    //   selectedIdentities.subject?.user
                                    //     ?.user_points, // no user_points aggregate on the IdentityPresenter or the UserPresenter
                                  }
                                : undefined
                            }
                            bio={
                              selectedIdentities.subject?.is_user === true
                                ? selectedIdentities.subject?.user
                                    ?.description ?? ''
                                : selectedIdentities.subject?.description ?? ''
                            }
                          >
                            {selectedIdentities.subject?.is_user === true && (
                              <Button
                                variant="accent"
                                onClick={() => logger('follow functionality')}
                              >
                                Follow
                              </Button>
                            )}
                          </ProfileCard>
                        </HoverCardContent>
                      )}
                    </HoverCard>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="bg-transparent">
                  <IdentitySearchCombobox
                    identities={identities}
                    onIdentityClick={(identity) =>
                      handleIdentitySelection('subject', identity)
                    }
                    onValueChange={setSearchQuery}
                    onInput={handleInput}
                  />
                </PopoverContent>
              </Popover>
              <Divider />
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex flex-col gap-2 items-start">
                    <Text variant="small" className="text-primary/60">
                      Predicate
                    </Text>
                    <HoverCard>
                      <HoverCardTrigger>
                        {selectedIdentities.predicate && (
                          <HoverCardContent side="bottom">
                            <ProfileCard
                              variant={
                                selectedIdentities.predicate?.is_user === true
                                  ? 'user'
                                  : 'non-user'
                              }
                              avatarSrc={
                                selectedIdentities.predicate?.user?.image ??
                                blockies
                                  .create({
                                    seed: selectedIdentities.predicate?.user
                                      ?.wallet,
                                  })
                                  .toDataURL()
                              }
                              name={
                                selectedIdentities.predicate?.is_user === true
                                  ? selectedIdentities.predicate?.user
                                      ?.display_name ?? ''
                                  : selectedIdentities.predicate?.display_name
                              }
                              walletAddress={
                                selectedIdentities.predicate?.is_user === true
                                  ? selectedIdentities.predicate?.user
                                      ?.ens_name ??
                                    sliceString(
                                      selectedIdentities.predicate?.user
                                        ?.wallet,
                                      6,
                                      4,
                                    )
                                  : selectedIdentities.predicate?.identity_id
                              }
                              stats={
                                selectedIdentities.predicate?.is_user === true
                                  ? {
                                      numberOfFollowers:
                                        selectedIdentities.predicate
                                          ?.follower_count ?? 0,
                                      numberOfFollowing:
                                        selectedIdentities.predicate
                                          ?.followed_count ?? 0,
                                      // points:
                                      //   selectedIdentities.predicate?.user
                                      //     ?.user_points, // no user_points aggregate on the IdentityPresenter or the UserPresenter
                                    }
                                  : undefined
                              }
                              bio={
                                selectedIdentities.predicate?.is_user === true
                                  ? selectedIdentities.predicate?.user
                                      ?.description ?? ''
                                  : selectedIdentities.predicate?.description ??
                                    ''
                              }
                            >
                              {selectedIdentities.predicate?.is_user ===
                                true && (
                                <Button
                                  variant="accent"
                                  onClick={() => logger('follow functionality')}
                                >
                                  Follow
                                </Button>
                              )}
                            </ProfileCard>
                          </HoverCardContent>
                        )}
                        <IdentityTag size="lg">
                          {truncateString(
                            selectedIdentities.predicate?.display_name ?? '',
                            7,
                          ) || 'Predicate'}
                        </IdentityTag>
                      </HoverCardTrigger>
                    </HoverCard>
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  className="bg-transparent border-none"
                  side="bottom"
                  align="center"
                  sideOffset={5}
                >
                  <IdentitySearchCombobox
                    identities={identities}
                    onIdentityClick={(identity) =>
                      handleIdentitySelection('predicate', identity)
                    }
                    onValueChange={setSearchQuery}
                    onInput={handleInput}
                  />
                </PopoverContent>
              </Popover>
              <Divider />
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex flex-col gap-2 items-start">
                    <Text variant="small" className="text-primary/60">
                      Object
                    </Text>
                    <HoverCard>
                      <HoverCardTrigger>
                        <IdentityTag size="lg">
                          {truncateString(
                            selectedIdentities.object?.display_name ?? '',
                            7,
                          ) || 'Object'}
                        </IdentityTag>
                      </HoverCardTrigger>
                      {selectedIdentities.object && (
                        <HoverCardContent side="bottom">
                          <ProfileCard
                            variant={
                              selectedIdentities.object?.is_user === true
                                ? 'user'
                                : 'non-user'
                            }
                            avatarSrc={
                              selectedIdentities.object?.user?.image ??
                              blockies
                                .create({
                                  seed: selectedIdentities.object?.user?.wallet,
                                })
                                .toDataURL()
                            }
                            name={
                              selectedIdentities.object?.is_user === true
                                ? selectedIdentities.object?.user
                                    ?.display_name ?? ''
                                : selectedIdentities.object?.display_name
                            }
                            walletAddress={
                              selectedIdentities.object?.is_user === true
                                ? selectedIdentities.object?.user?.ens_name ??
                                  sliceString(
                                    selectedIdentities.object?.user?.wallet,
                                    6,
                                    4,
                                  )
                                : selectedIdentities.object?.identity_id
                            }
                            stats={
                              selectedIdentities.object?.is_user === true
                                ? {
                                    numberOfFollowers:
                                      selectedIdentities.object
                                        ?.follower_count ?? 0,
                                    numberOfFollowing:
                                      selectedIdentities.object
                                        ?.followed_count ?? 0,
                                    // points:
                                    //   selectedIdentities.object?.user
                                    //     ?.user_points, // no user_points aggregate on the IdentityPresenter or the UserPresenter
                                  }
                                : undefined
                            }
                            bio={
                              selectedIdentities.object?.is_user === true
                                ? selectedIdentities.object?.user
                                    ?.description ?? ''
                                : selectedIdentities.object?.description ?? ''
                            }
                          >
                            {selectedIdentities.object?.is_user === true && (
                              <Button
                                variant="accent"
                                onClick={() => logger('follow functionality')}
                              >
                                Follow
                              </Button>
                            )}
                          </ProfileCard>
                        </HoverCardContent>
                      )}
                    </HoverCard>
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  className="bg-transparent border-none"
                  side="bottom"
                  align="center"
                  sideOffset={5}
                >
                  <IdentitySearchCombobox
                    identities={identities}
                    onIdentityClick={(identity) =>
                      handleIdentitySelection('object', identity)
                    }
                    onValueChange={setSearchQuery}
                    onInput={handleInput}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col w-full gap-1.5">
              <Text variant="caption" className="text-secondary-foreground/90">
                Initial Deposit (Optional)
              </Text>
              <Label htmlFor={fields.initial_deposit.id} hidden>
                Initial Deposit (Optional)
              </Label>
              <Input
                {...getInputProps(fields.initial_deposit, { type: 'text' })}
                placeholder="0"
                startAdornment="ETH"
              />
              <ErrorList
                id={fields.initial_deposit.errorId}
                errors={fields.initial_deposit.errors}
              />
            </div>
            <Button
              form={form.id}
              type="submit"
              variant="primary"
              disabled={
                selectedIdentities.subject === null ||
                selectedIdentities.predicate === null ||
                selectedIdentities.object === null
              }
              className="mx-auto"
            >
              Create claim
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-96">
            <TransactionStatusIndicator status={state.status} type="claim" />
            {state.status !== 'complete' ? (
              <TransactionStatusCard status={state.status} />
            ) : (
              <div className="flex flex-col gap-1 items-center gap-2.5">
                {state.txHash && transactionResponseData !== null && (
                  <div className="flex flex-col items-center">
                    <Link
                      to={`${BLOCK_EXPLORER_URL}/tx/${state.txHash}`}
                      target="_blank"
                      className="flex flex-row items-center gap-1 text-xxs text-blue-500 transition-colors duration-300 hover:text-blue-400"
                    >
                      View on Basescan
                      <Icon name="square-arrow-top-right" className="h-3 w-3" />
                    </Link>
                    <Button
                      type="button"
                      variant="primary"
                      onClick={() => {
                        navigate(
                          `/app/claim/${transactionResponseData.claim_id}`,
                          onClose(),
                        )
                      }}
                    >
                      View claim
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </claimFetcher.Form>
    </>
  )
}
