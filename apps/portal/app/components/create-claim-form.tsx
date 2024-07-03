import React, { useEffect, useRef, useState } from 'react'

import {
  Button,
  DialogHeader,
  IdentityInput,
  IdentitySearchCombobox,
  IdentitySearchComboboxItem,
  Text,
  toast,
} from '@0xintuition/1ui'
import { ClaimPresenter, IdentityPresenter } from '@0xintuition/api'

import { getFormProps, SubmissionResult, useForm } from '@conform-to/react'
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
  CREATE_RESOURCE_ROUTE,
  GET_IDENTITIES_RESOURCE_ROUTE,
  MULTIVAULT_CONTRACT_ADDRESS,
} from '@lib/utils/constants'
import logger from '@lib/utils/logger'
import { truncateString } from '@lib/utils/misc'
import { useFetcher } from '@remix-run/react'
import { CreateLoaderData } from '@routes/resources+/create'
import { AlertCircle } from 'lucide-react'
import { TransactionActionType, TransactionStateType } from 'types/transaction'
import { useAccount, usePublicClient, useWalletClient } from 'wagmi'

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
    'review',
    'confirm',
    'complete',
    'error',
  ].includes(state.status)

  return (
    <>
      <>
        {!isTransactionStarted && (
          <DialogHeader className="py-4">
            <div className="absolute top-5 flex flex-row items-center gap-2 align-baseline text-primary-400">
              <div className="flex flex-col gap-1">
                <Text variant="headline" className="text-foreground-secondary">
                  Make a claim about an identity{' '}
                </Text>
                <Text variant="caption" className="text-foreground-secondary">
                  Additional text about this.
                </Text>
              </div>
            </div>
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
  logger(
    'items',
    state,
    dispatch,
    setTransactionResponseData,
    transactionResponseData,
    atomCostAmount,
    tripleCostAmount,
  )
  interface OffChainClaimFetcherData {
    success: 'success' | 'error'
    claim: ClaimPresenter
    submission: SubmissionResult<string[]> | null
  }

  interface GetIdentitiesResponse {
    identities: IdentityPresenter[]
  }

  const [identities, setIdentities] = useState<IdentityPresenter[]>([])

  const identitiesFetcher = useLoaderFetcher<GetIdentitiesResponse>(
    GET_IDENTITIES_RESOURCE_ROUTE,
  )

  useEffect(() => {
    const data = identitiesFetcher.data as GetIdentitiesResponse
    if (data && data.identities) {
      setIdentities(data.identities)
    }
  }, [identitiesFetcher.data])

  const {
    // tripleCreationFeeRaw: tripleCostAmountRaw,
    // atomEquityFeeRaw: atomEquityFee,
    atomCost,
    tripleCost,
  } = (feeFetcher.data as CreateLoaderData) ?? {
    // tripleCreationFeeRaw: BigInt(0),
    atomEquityFeeRaw: BigInt(0),
    atomCost: BigInt(0),
    tripleCost: BigInt(0),
  }

  logger('atomCost', atomCost)
  logger('tripleCost', tripleCost)

  // const feeCalculation =
  //   BigInt(atomEquityFee) * BigInt(3) +
  //   BigInt(tripleCostAmountRaw) +
  //   BigInt(atomCost)

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
        dispatch({ type: 'CONFIRM_TRANSACTION' })
        const txHash = await writeCreateTriple({
          address: MULTIVAULT_CONTRACT_ADDRESS,
          abi: multivaultAbi,
          functionName: 'createTriple',
          args: [subjectVaultId, predicateVaultId, objectVaultId],
          value: BigInt(tripleCost),
        })
        dispatch({ type: 'TRANSACTION_PENDING' })
        if (txHash) {
          const receipt = await publicClient.waitForTransactionReceipt({
            hash: txHash,
          })
          // })
          // handleClaimTxReceiptReceived(claimTxReceipt)
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
              <Toast title="Error" description="error" icon={<AlertCircle />} />
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
    logger('form submit')
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

  const [form] = useForm({
    id: 'create-claim',
    lastResult: lastOffChainSubmission,
    // constraint: getZodConstraint(createClaimSchema()),
    // onValidate({ formData }) {
    //   return parseWithZod(formData, {
    //     schema: createClaimSchema,
    //   })
    // },
    // shouldValidate: 'onInput',
    onSubmit: async (event) => handleSubmit(event),
  })

  const [identitySelectState, setIdentitySelectState] = useState({
    subject: false,
    predicate: false,
    object: false,
  })

  const toggleSelectState = (field: 'subject' | 'predicate' | 'object') => {
    setIdentitySelectState((prevState) => ({
      subject: field === 'subject' ? !prevState.subject : false,
      predicate: field === 'predicate' ? !prevState.predicate : false,
      object: field === 'object' ? !prevState.object : false,
    }))
  }

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

  // these allow for closing the comboboxes by clicking outside of the container
  const identitySelectContainerRef = useRef<HTMLDivElement | null>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (
      identitySelectContainerRef.current &&
      !identitySelectContainerRef.current.contains(event.target as Node)
    ) {
      setIdentitySelectState({
        subject: false,
        predicate: false,
        object: false,
      })
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      <claimFetcher.Form
        method="post"
        {...getFormProps(form)}
        action="/actions/create-claim"
      >
        <>
          <pre>subject.vault_id: {selectedIdentities.subject?.vault_id}</pre>
          <pre>
            predicate.vault_id: {selectedIdentities.predicate?.vault_id}
          </pre>
          <pre>object.vault_id: {selectedIdentities.object?.vault_id}</pre>
        </>
        <div className="flex flex-col items-center">
          <div className="my-14">
            <IdentityInput
              showLabels
              subject={{
                selectedValue: {
                  name:
                    truncateString(
                      selectedIdentities.subject?.display_name ?? '',
                      7,
                    ) || 'Subject',
                },
                onClick: () => toggleSelectState('subject'),
              }}
              predicate={{
                selectedValue: {
                  name:
                    truncateString(
                      selectedIdentities.predicate?.display_name ?? '',
                      7,
                    ) || 'Predicate',
                  variant: selectedIdentities.predicate?.is_user
                    ? 'user'
                    : 'non-user',
                },
                onClick: () => toggleSelectState('predicate'),
              }}
              object={{
                selectedValue: {
                  name:
                    truncateString(
                      selectedIdentities.object?.display_name ?? '',
                      7,
                    ) || 'Object',
                },
                onClick: () => toggleSelectState('object'),
              }}
            />
          </div>
          <div ref={identitySelectContainerRef}>
            {identitySelectState.subject && (
              <IdentitySearchCombobox>
                {identities?.map((identity, index) => (
                  <IdentitySearchComboboxItem
                    key={index}
                    variant={identity.is_user === true ? 'user' : 'non-user'}
                    name={truncateString(identity.display_name, 7)}
                    value={+identity.assets_sum}
                    walletAddress={identity.creator_address}
                    onSelect={() =>
                      handleIdentitySelection('subject', identity)
                    }
                  />
                ))}
              </IdentitySearchCombobox>
            )}
            {identitySelectState.predicate && (
              <IdentitySearchCombobox>
                {identities?.map((identity, index) => (
                  <IdentitySearchComboboxItem
                    key={index}
                    variant={identity.is_user === true ? 'user' : 'non-user'}
                    name={truncateString(identity.display_name, 7)}
                    value={+identity.assets_sum}
                    walletAddress={identity.creator_address}
                    onSelect={() =>
                      handleIdentitySelection('predicate', identity)
                    }
                  />
                ))}
              </IdentitySearchCombobox>
            )}
            {identitySelectState.object && (
              <IdentitySearchCombobox>
                {identities?.map((identity, index) => (
                  <IdentitySearchComboboxItem
                    key={index}
                    variant={identity.is_user === true ? 'user' : 'non-user'}
                    name={truncateString(identity.display_name, 7)}
                    value={+identity.assets_sum}
                    walletAddress={identity.creator_address}
                    onSelect={() => handleIdentitySelection('object', identity)}
                  />
                ))}
              </IdentitySearchCombobox>
            )}
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
            Create
          </Button>
        </div>
      </claimFetcher.Form>
    </>
  )
}
