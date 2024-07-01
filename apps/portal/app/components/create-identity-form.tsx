import React, { useEffect, useRef, useState } from 'react'

import {
  Button,
  DialogHeader,
  Input,
  Label,
  Text,
  Textarea,
  toast,
} from '@0xintuition/1ui'

import {
  getFormProps,
  getInputProps,
  // SubmissionResult,
  useForm,
} from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { multivaultAbi } from '@lib/abis/multivault'
import { useCreateIdentity } from '@lib/hooks/useCreateIdentity'
// import { useImageUploadFetcher } from '@lib/hooks/useImageUploadFetcher'
import {
  OffChainFetcherData,
  useOffChainFetcher,
} from '@lib/hooks/useOffChainFetcher'
import {
  identityTransactionReducer,
  initialIdentityTransactionState,
  useTransactionState,
} from '@lib/hooks/useTransactionReducer'
import { createIdentitySchema } from '@lib/schemas/create-identity-schema'
import { MULTIVAULT_CONTRACT_ADDRESS } from '@lib/utils/constants'
import logger from '@lib/utils/logger'
import { truncateString } from '@lib/utils/misc'
import { useFetcher } from '@remix-run/react'
import { CreateLoaderData } from '@routes/resources+/create'
import { AlertCircle, CircleXIcon } from 'lucide-react'
import {
  IdentityTransactionActionType,
  IdentityTransactionStateType,
} from 'types/transaction'
import { toHex } from 'viem'
import { usePublicClient, useWalletClient } from 'wagmi'

import ErrorList from './error-list'
import { ImageChooser } from './image-chooser'
import Toast from './toast'
import TransactionStatus from './transaction-state'

interface IdentityFormProps {
  onSuccess?: () => void
  onClose: () => void
}
export function IdentityForm({ onSuccess, onClose }: IdentityFormProps) {
  logger(onClose, onSuccess)

  const { state, dispatch } = useTransactionState<
    IdentityTransactionStateType,
    IdentityTransactionActionType
  >(identityTransactionReducer, initialIdentityTransactionState)

  // const [transactionResponseData, setTransactionResponseData] =
  //   React.useState<IdentityPresenter | null>(null)

  const isTransactionStarted = [
    'preparing-identity',
    'publishing-identity',
    'approve-transaction',
    'transaction-pending',
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
                  Create Identity
                </Text>
                <Text variant="footnote" className="text-foreground-secondary">
                  Begin the process of establishing a new digital representation
                  within the blockchain network.
                </Text>
              </div>
            </div>
          </DialogHeader>
        )}
        <CreateIdentityForm
          state={state}
          dispatch={dispatch}
          onClose={onClose}
        />
      </>
    </>
  )
}

interface CreateIdentityFormProps {
  state: IdentityTransactionStateType
  dispatch: React.Dispatch<IdentityTransactionActionType>
  // setTransactionResponseData: React.Dispatch<
  //   React.SetStateAction<IdentityPresenter | null>
  // >
  onClose: () => void
}

function CreateIdentityForm({
  state,
  dispatch,
  // setTransactionResponseData,
  // onClose,
}: CreateIdentityFormProps) {
  // const imageUploadFetcher = useImageUploadFetcher()
  const { offChainFetcher, lastOffChainSubmission } = useOffChainFetcher()

  const loaderFetcher = useFetcher<CreateLoaderData>()
  const loaderFetcherUrl = '/resources/create'
  const loaderFetcherRef = useRef(loaderFetcher.load)

  useEffect(() => {
    loaderFetcherRef.current = loaderFetcher.load
  })

  useEffect(() => {
    loaderFetcherRef.current(loaderFetcherUrl)
  }, [loaderFetcherUrl])

  const { atomCost: atomCostAmount } =
    (loaderFetcher.data as CreateLoaderData) ?? {
      vaultId: BigInt(0),
      atomCost: BigInt(0),
      protocolFee: BigInt(0),
      entryFee: BigInt(0),
    }

  const atomCost = BigInt(atomCostAmount ? atomCostAmount : 0)
  const { data: walletClient } = useWalletClient()
  const publicClient = usePublicClient()
  const {
    writeContractAsync: writeCreateIdentity,
    awaitingWalletConfirmation,
    awaitingOnChainConfirmation,
  } = useCreateIdentity()
  const emitterFetcher = useFetcher()

  const createdIdentity = offChainFetcher?.data?.identity

  const [loading, setLoading] = useState(false)
  const [imageFilename, setImageFilename] = useState<string | null>(null)
  const [imageFilesize, setImageFilesize] = useState<string | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const handleFileChange = (filename: string, filesize: string) => {
    setImageFilename(filename)
    setImageFilesize(filesize)
  }
  // const [formTouched, setFormTouched] = useState(false) // to disable submit if user hasn't touched form yet
  // const [formErrors, setFormErrors] = useState<Record<
  //   string,
  //   string[]
  // > | null>() // we need to manage errors manually when using async validation

  const isTransactionStarted = [
    'preparing-identity',
    'publishing-identity',
    'approve-transaction',
    'transaction-pending',
    'confirm',
    'complete',
    'error',
  ].includes(state.status)

  const statusMessages = {
    'preparing-identity': 'Preparing Identity...',
    'publishing-identity': 'Publishing Identity...',
    'approve-transaction': 'Approve Transaction...',
    'transaction-pending': 'Transaction Pending...',
    confirm: 'Confirming...',
    complete: 'Identity created successfully',
    error: 'Failed to create identity',
  }

  const isTransactionAwaiting = (status: string) =>
    ['approve-transaction'].includes(status)
  const isTransactionProgress = (status: string) =>
    [
      'preparing-identity',
      'publishing-identity',
      'transaction-pending',
    ].includes(status)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    logger('form submitting')
    event.preventDefault()
    try {
      if (walletClient) {
        dispatch({ type: 'PREPARING_IDENTITY' })
        const formData = new FormData()
        formData.append('display_name', event.currentTarget.display_name.value)
        if (event.currentTarget.description.value !== undefined) {
          formData.append('description', event.currentTarget.description.value)
        }
        if (previewImage !== null) {
          formData.append('image_url', previewImage as string) // add check to this once we allow for null
        }
        if (event.currentTarget.external_reference?.value !== undefined) {
          const prefixedUrl = `https://${event.currentTarget.external_reference?.value}`
          formData.append('external_reference', prefixedUrl)
        }

        // const submission = parseWithZod(formData, {
        //   schema: (intent) => createIdentitySchema(intent),
        // })

        // if (
        //   submission.error !== undefined &&
        //   Object.keys(submission.error).length > 0
        // ) {
        //   logger('error', submission.error)
        //   setFormErrors(submission.error)
        // }
        // if (
        //   submission.error !== undefined &&
        //   Object.keys(submission.error).length === 0
        // ) {
        //   setFormErrors(null)

        try {
          logger('try offline submit')
          dispatch({ type: 'PUBLISHING_IDENTITY' })
          offChainFetcher.submit(formData, {
            action: '/actions/create-identity',
            method: 'post',
          })
        } catch (error: unknown) {
          if (error instanceof Error) {
            const errorMessage = 'Error in creating offchain identity data.'
            dispatch({
              type: 'TRANSACTION_ERROR',
              error: errorMessage,
            })
            toast.custom(
              () => (
                <Toast
                  title="Error"
                  description={errorMessage}
                  icon={<AlertCircle />}
                />
              ),
              {
                duration: 5000,
              },
            )
            dispatch({ type: 'START_TRANSACTION' })
            return
          }
          console.error('Error creating identity', error)
        }

        setLoading(true)
      }
      // }
    } catch (error: unknown) {
      logger(error)
    }
  }

  // Handle On-Chain Transaction
  async function handleOnChainCreateIdentity({
    atomData,
  }: {
    atomData: string
  }) {
    if (
      !awaitingOnChainConfirmation &&
      !awaitingWalletConfirmation &&
      // user &&
      publicClient &&
      atomCost
    ) {
      try {
        dispatch({ type: 'APPROVE_TRANSACTION' })

        const txHash = await writeCreateIdentity({
          address: MULTIVAULT_CONTRACT_ADDRESS,
          abi: multivaultAbi,
          functionName: 'createAtom',
          args: [toHex(atomData)],
          value: atomCost,
        })

        if (txHash) {
          dispatch({ type: 'TRANSACTION_PENDING' })
          const receipt = await publicClient.waitForTransactionReceipt({
            hash: txHash,
          })
          logger('receipt', receipt)
          dispatch({
            type: 'TRANSACTION_COMPLETE',
            txHash: txHash,
            txReceipt: receipt,
          })
        }
      } catch (error) {
        logger('error', error)
        setLoading(false)
        if (error instanceof Error) {
          let errorMessage = 'Failed transaction'
          if (error.message.includes('insufficient')) {
            errorMessage = 'Insufficient funds'
          }
          if (error.message.includes('rejected')) {
            errorMessage = 'Transaction rejected'
          }
          dispatch({
            type: 'TRANSACTION_ERROR',
            error: errorMessage,
          })
          toast.custom(
            () => (
              <Toast
                title="Error"
                description={errorMessage}
                icon={<AlertCircle />}
              />
            ),
            {
              duration: 5000,
            },
          )
          return
        }
      }
    } else {
      logger(
        'Cannot initiate onchain transaction, a transaction is already pending, a wallet is already signing, or a wallet is not connected',
      )
    }
  }

  function handleIdentityTxReceiptReceived() {
    logger('createdIdentity', createdIdentity)
    if (createdIdentity) {
      logger(
        'Submitting to emitterFetcher with identity_id:',
        createdIdentity.identity_id,
      )
      emitterFetcher.submit(
        { identity_id: createdIdentity.identity_id },
        { method: 'post', action: '/actions/create-emitter' },
      )
    }
  }

  useEffect(() => {
    if (state.status === 'complete') {
      handleIdentityTxReceiptReceived()
      logger('complete!')
    }
  }, [state.status])

  useEffect(() => {
    if (
      offChainFetcher.state === 'idle' &&
      offChainFetcher.data !== null &&
      offChainFetcher.data !== undefined
    ) {
      const responseData = offChainFetcher.data as OffChainFetcherData
      logger('responseData', responseData)
      if (responseData !== null) {
        if (createdIdentity !== undefined && responseData.identity) {
          logger('responseData', responseData)
          const { identity_id } = responseData.identity
          // dispatch({
          //   type: 'OFF_CHAIN_TRANSACTION_COMPLETE',
          //   offChainReceipt: responseData.identity,
          // })
          logger('onchain create starting. identity_id:', identity_id)
          handleOnChainCreateIdentity({ atomData: identity_id })
        }
      }
      if (offChainFetcher.data === null || offChainFetcher.data === undefined) {
        console.error('Error in offchain data creation.:', offChainFetcher.data)
        dispatch({
          type: 'TRANSACTION_ERROR',
          error: 'Error in offchain data creation.',
        })
      }
    }
  }, [offChainFetcher.state, offChainFetcher.data, dispatch])

  useEffect(() => {
    if (state.status === 'error') {
      setLoading(false)
    }
  }, [state.status])

  const [form, fields] = useForm({
    id: 'create-identity',
    lastResult: lastOffChainSubmission,
    constraint: getZodConstraint(createIdentitySchema()),
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: createIdentitySchema,
      })
    },
    shouldValidate: 'onInput',
    onSubmit: async (e) => handleSubmit(e),
  })
  return (
    <offChainFetcher.Form
      method="post"
      {...getFormProps(form)}
      encType="multipart/form-data"
      action="/actions/create-identity"
    >
      {!isTransactionStarted ? (
        <div className="w-full py-1 flex-col justify-start items-start inline-flex gap-9">
          <div className="flex flex-col w-full gap-1.5">
            <div className="self-stretch flex-col justify-start items-start flex mt-9">
              <Text variant="caption" className="text-secondary-foreground/90">
                Identity Display Picture
              </Text>
            </div>
            <div className="self-stretch h-[100px] px-9 py-2.5 bg-neutral-900 rounded-lg border border-solid border-white/10 justify-between items-center inline-flex">
              <div className="justify-start items-center gap-[18px] flex">
                <div className="w-[60px] h-[60px] rounded-xl justify-center items-center flex">
                  <ImageChooser
                    previewImage={previewImage}
                    setPreviewImage={setPreviewImage}
                    onFileChange={handleFileChange}
                  />
                </div>
                <div className="flex-col justify-start items-start inline-flex">
                  <div className="text-center text-neutral-200 text-sm font-normal leading-tight">
                    {truncateString(imageFilename ?? '', 36)}
                  </div>
                  <div className="text-center text-neutral-200 text-xs font-normal leading-[18px]">
                    {imageFilesize}
                  </div>
                </div>
              </div>
              <div className="flex-col justify-end items-end inline-flex">
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setPreviewImage(null)
                    setImageFilename(null)
                    setImageFilesize(null)
                  }}
                  className={`${previewImage === null ? 'hidden' : 'block'}`}
                >
                  <CircleXIcon className="h-6 w-6 relative text-neutral-700 hover:text-neutral-600 transition-colors duration-300" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full gap-1.5">
            <Text variant="caption" className="text-secondary-foreground/90">
              Identity Name
            </Text>
            <Label htmlFor={fields.display_name.id} hidden>
              Identity Name
            </Label>
            <Input
              {...getInputProps(fields.display_name, { type: 'text' })}
              placeholder="Enter a display name"
              className="border border-solid border-white/10 bg-neutral-900"
            />
            <ErrorList
              id={fields.display_name.errorId}
              errors={fields.display_name.errors}
            />
          </div>
          <div className="flex flex-col w-full gap-1.5">
            <Text variant="caption" className="text-secondary-foreground/90">
              Identity Description
            </Text>
            <Label htmlFor={fields.description.id} hidden>
              Identity Description
            </Label>
            <Textarea
              {...getInputProps(fields.description, { type: 'text' })}
              placeholder="Tell us about yourself!"
              // value={description}
              // onChange={handleDescriptionChange}
              className="h-20 border border-solid border-white/10 bg-neutral-900"
            />
          </div>
          <div className="flex flex-col w-full gap-1.5">
            <Text variant="caption" className="text-secondary-foreground/90">
              Add Link
            </Text>
            <Label htmlFor={fields.external_reference.id} hidden>
              Add Link
            </Label>

            <div className="flex items-center overflow-hidden border border-solid border-white/10 bg-neutral-900 rounded-md relative">
              <span className="font-medium text-secondary-foreground py px-2 border-r border-solid border-white/10">
                https://
              </span>
              <Input
                {...getInputProps(fields.external_reference, { type: 'text' })}
                placeholder="Enter an external link"
                className="border-white/10 bg-neutral-900 rounded-none border-none"
              />
            </div>
            <ErrorList
              id={fields.external_reference.errorId}
              errors={fields.external_reference.errors}
            />
          </div>
          <Button
            form={form.id}
            type="submit"
            variant="primary"
            disabled={loading}
          >
            Review
          </Button>
        </div>
      ) : (
        <TransactionStatus
          state={state}
          dispatch={dispatch}
          statusMessages={statusMessages}
          isTransactionAwaiting={isTransactionAwaiting}
          isTransactionProgress={isTransactionProgress}
        />
      )}
    </offChainFetcher.Form>
  )
}
