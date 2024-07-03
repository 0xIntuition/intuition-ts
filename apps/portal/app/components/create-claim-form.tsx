import React, { useEffect, useState } from 'react'

import {
  Button,
  DialogHeader,
  IdentityInput,
  IdentitySearchCombobox,
  IdentitySearchComboboxItem,
  Text,
} from '@0xintuition/1ui'
import { ClaimPresenter, IdentityPresenter } from '@0xintuition/api'

import { getFormProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
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
} from '@lib/utils/constants'
import logger from '@lib/utils/logger'
import { truncateString } from '@lib/utils/misc'
import { useFetcher } from '@remix-run/react'
import { CreateLoaderData } from '@routes/resources+/create'
import { TransactionActionType, TransactionStateType } from 'types/transaction'

// import { useAccount, usePublicClient, useWalletClient } from 'wagmi'

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
  const { atomCost: atomCostAmount } =
    (feeFetcher.data as CreateLoaderData) ?? {
      vaultId: BigInt(0),
      atomCost: BigInt(0),
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
  )
  interface OffChainClaimFetcherData {
    success: 'success' | 'error'
    claim: ClaimPresenter
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

  // const {
  //   tripleCreationFeeRaw: tripleCostAmountRaw,
  //   atomEquityFeeRaw: atomEquityFee,
  //   atomCost,
  // } = (feeFetcher.data as CreateLoaderData) ?? {
  //   tripleCreationFeeRaw: BigInt(0),
  //   atomEquityFeeRaw: BigInt(0),
  //   atomCost: BigInt(0),
  // }

  // const feeCalculation =
  //   BigInt(atomEquityFee) * BigInt(3) +
  //   BigInt(tripleCostAmountRaw) +
  //   BigInt(atomCost)

  // const { data: walletClient } = useWalletClient()
  // const publicClient = usePublicClient()
  // const { address } = useAccount()

  // const {
  //   writeAsync: writeCreateTriple,
  //   awaitingWalletConfirmation,
  //   awaitingOnChainConfirmation,
  //   reset,
  // } = useCreateTriple()

  // form

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    logger('form submitting')
  }

  const claimFetcher = useFetcher<OffChainClaimFetcherData>()
  const lastOffChainSubmission = claimFetcher.data?.submission

  const [form] = useForm({
    id: 'create-claim',
    lastSubmission: lastOffChainSubmission,
    constraint: getZodConstraint(createClaimSchema()),
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: createClaimSchema,
      })
    },
    shouldValidate: 'onInput',
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
          <Button
            form={form.id}
            type="submit"
            variant="primary"
            // disabled={loading || !formTouched}
            className="mx-auto"
          >
            Create
          </Button>
        </div>
        {identitySelectState.subject && (
          <IdentitySearchCombobox>
            {identities?.map((identity, index) => (
              <IdentitySearchComboboxItem
                key={index}
                variant={identity.is_user === true ? 'user' : 'non-user'}
                name={identity.display_name}
                value={+identity.assets_sum}
                walletAddress={identity.creator_address}
                onSelect={() => handleIdentitySelection('subject', identity)}
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
                name={identity.display_name}
                value={+identity.assets_sum}
                walletAddress={identity.creator_address}
                onSelect={() => handleIdentitySelection('predicate', identity)}
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
                name={identity.display_name}
                value={+identity.assets_sum}
                walletAddress={identity.creator_address}
                onSelect={() => handleIdentitySelection('object', identity)}
              />
            ))}
          </IdentitySearchCombobox>
        )}
      </claimFetcher.Form>
    </>
  )
}
