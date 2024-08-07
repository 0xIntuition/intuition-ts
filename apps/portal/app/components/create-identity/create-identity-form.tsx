import React, { useEffect, useRef, useState } from 'react'

import {
  Button,
  Checkbox,
  DialogHeader,
  DialogTitle,
  Icon,
  IconName,
  Input,
  Label,
  Text,
  Textarea,
  toast,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import CreateIdentityReview from '@components/create-identity/create-identity-review'
import ErrorList from '@components/error-list'
import { ImageChooser } from '@components/image-chooser'
import { TransactionState } from '@components/transaction-state'
import WrongNetworkButton from '@components/wrong-network-button'
import {
  getFormProps,
  getInputProps,
  SubmissionResult,
  useForm,
} from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { multivaultAbi } from '@lib/abis/multivault'
import { useCreateAtom } from '@lib/hooks/useCreateAtom'
import { useImageUploadFetcher } from '@lib/hooks/useImageUploadFetcher'
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
import { getChainEnvConfig } from '@lib/utils/environment'
import logger from '@lib/utils/logger'
import { truncateString } from '@lib/utils/misc'
import { useFetcher, useNavigate } from '@remix-run/react'
import { CreateLoaderData } from '@routes/resources+/create'
import {
  ACCEPTED_IMAGE_MIME_TYPES,
  CURRENT_ENV,
  GENERIC_ERROR_MSG,
  IPFS_GATEWAY_URL,
  MAX_UPLOAD_SIZE,
  MULTIVAULT_CONTRACT_ADDRESS,
  PATHS,
} from 'app/consts'
import {
  IdentityTransactionActionType,
  IdentityTransactionStateType,
  TransactionSuccessAction,
  TransactionSuccessActionType,
} from 'app/types'
import { parseUnits, toHex } from 'viem'
import { useAccount, usePublicClient, useWalletClient } from 'wagmi'

interface IdentityFormProps {
  onSuccess?: (identity: IdentityPresenter) => void
  onClose: () => void
  successAction?: TransactionSuccessActionType
}
export function IdentityForm({
  onClose,
  onSuccess,
  successAction = TransactionSuccessAction.VIEW,
}: IdentityFormProps) {
  const { state, dispatch } = useTransactionState<
    IdentityTransactionStateType,
    IdentityTransactionActionType
  >(identityTransactionReducer, initialIdentityTransactionState)

  const [transactionResponseData, setTransactionResponseData] =
    useState<IdentityPresenter | null>(null)

  const isTransactionStarted = [
    'review-transaction',
    'preparing-identity',
    'publishing-identity',
    'approve-transaction',
    'transaction-pending',
    'confirm',
    'complete',
    'error',
  ].includes(state.status)

  useEffect(() => {
    if (state.status === 'complete') {
      if (transactionResponseData) {
        onSuccess?.(transactionResponseData)
      }
    }
  }, [state.status, transactionResponseData])

  return (
    <>
      <>
        {!isTransactionStarted && (
          <DialogHeader className="pb-1">
            <DialogTitle>
              <Text
                variant="headline"
                className="text-foreground flex items-center gap-2"
              >
                <Icon name={IconName.fingerprint} className="w-6 h-6" />
                Create Identity
              </Text>
            </DialogTitle>
            <Text variant="caption" className="text-muted-foreground w-full">
              Begin the process of establishing a new digital representation
              within the blockchain network.
            </Text>
          </DialogHeader>
        )}
        <CreateIdentityForm
          state={state}
          dispatch={dispatch}
          onClose={onClose}
          setTransactionResponseData={setTransactionResponseData}
          transactionResponseData={transactionResponseData}
          successAction={successAction}
        />
      </>
    </>
  )
}

interface CreateIdentityFormProps {
  state: IdentityTransactionStateType
  dispatch: React.Dispatch<IdentityTransactionActionType>
  setTransactionResponseData: React.Dispatch<
    React.SetStateAction<IdentityPresenter | null>
  >
  transactionResponseData: IdentityPresenter | null
  onClose: () => void
  successAction: TransactionSuccessActionType
}
export interface OffChainIdentityFetcherData {
  success: 'success' | 'error'
  identity: IdentityPresenter
  submission: SubmissionResult<string[]> | null
}

function CreateIdentityForm({
  state,
  dispatch,
  setTransactionResponseData,
  transactionResponseData,
  onClose,
  successAction,
}: CreateIdentityFormProps) {
  const { offChainFetcher, lastOffChainSubmission } = useOffChainFetcher()
  const navigate = useNavigate()
  const imageUploadFetcher = useImageUploadFetcher()
  const [imageUploading, setImageUploading] = React.useState(false)
  const [identityImageSrc, setIdentityImageSrc] = React.useState<
    string | ArrayBuffer | null
  >(null)
  const [identityImageFile, setIdentityImageFile] = useState<File | undefined>(
    undefined,
  )
  const [initialDeposit, setInitialDeposit] = useState<string>('0')
  const [isContract, setIsContract] = useState(false)

  const loaderFetcher = useFetcher<CreateLoaderData>()
  const loaderFetcherUrl = '/resources/create'
  const loaderFetcherRef = useRef(loaderFetcher.load)

  const [formData, setFormData] = useState({
    display_name: '',
    description: '',
    image_url: '',
    external_reference: '',
    initial_deposit: '',
    is_contract: false,
  })

  useEffect(() => {
    loaderFetcherRef.current = loaderFetcher.load
  })

  useEffect(() => {
    loaderFetcherRef.current(loaderFetcherUrl)
  }, [loaderFetcherUrl])

  useEffect(() => {
    logger('file changed', identityImageFile)
    if (identityImageFile) {
      if (
        !ACCEPTED_IMAGE_MIME_TYPES.includes(identityImageFile.type) ||
        identityImageFile.size > MAX_UPLOAD_SIZE
      ) {
        console.error('Invalid image file', identityImageFile)
        return
      }

      const formData = new FormData()
      formData.append('image_url', identityImageFile)

      imageUploadFetcher.submit(formData, {
        action: '/actions/upload-image',
        method: 'post',
        encType: 'multipart/form-data',
      })
    }
  }, [identityImageFile])

  useEffect(() => {
    if (
      imageUploadFetcher.data &&
      imageUploadFetcher.data?.status !== 'error'
    ) {
      setIdentityImageSrc(imageUploadFetcher.data.submission.value.image_url)
      setImageUploading(false)
    } else if (
      imageUploadFetcher.data &&
      imageUploadFetcher.data.status === 'error'
    ) {
      toast.error(GENERIC_ERROR_MSG)
      setIdentityImageSrc(null)
      setImageUploading(false)
    }
  }, [imageUploadFetcher.data])

  const fees = loaderFetcher.data as CreateLoaderData

  const { data: walletClient } = useWalletClient()
  const publicClient = usePublicClient()
  const { address } = useAccount()
  const {
    writeContractAsync: writeCreateIdentity,
    awaitingWalletConfirmation,
    awaitingOnChainConfirmation,
  } = useCreateAtom()
  const emitterFetcher = useFetcher()

  const createdIdentity = offChainFetcher?.data?.identity
  // const createdIdentity = identity

  const [loading, setLoading] = useState(false)
  const [imageFilename, setImageFilename] = useState<string | null>(null)
  const [imageFilesize, setImageFilesize] = useState<string | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const handleFileChange = (filename: string, filesize: string) => {
    setImageFilename(filename)
    setImageFilesize(filesize)
  }
  const [formTouched, setFormTouched] = useState(false) // to disable submit if user hasn't touched form yet

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log('handleSubmit')
    event.preventDefault()
    try {
      if (walletClient) {
        dispatch({ type: 'PREPARING_IDENTITY' })
        const formData = new FormData(event.currentTarget)

        // Preserve the external_reference handling
        if (formData.get('external_reference')) {
          const prefixedUrl = `https://${formData.get('external_reference')}`
          formData.set('external_reference', prefixedUrl)
        }

        if (identityImageSrc !== null) {
          formData.set('image_url', identityImageSrc as string)
        }

        if (isContract) {
          formData.set('is_contract', 'true')
        }

        setInitialDeposit((formData.get('initial_deposit') as string) || '0')

        // Initial form validation
        const submission = parseWithZod(formData, {
          schema: createIdentitySchema(),
        })

        if (
          submission.status === 'error' &&
          submission.error !== null &&
          Object.keys(submission.error).length
        ) {
          console.error('Create identity validation errors: ', submission.error)
          return // Stop here if there are validation errors
        }

        setLoading(true)
        dispatch({ type: 'START_IMAGE_UPLOAD' })

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
            toast.error(errorMessage)
            dispatch({ type: 'START_TRANSACTION' })
            return
          }
          console.error('Error creating identity', error)
        }
      }
    } catch (error: unknown) {
      logger(error)
    }
  }

  async function handleOnChainCreateIdentity({
    atomData,
  }: {
    atomData: string
  }) {
    if (
      !awaitingOnChainConfirmation &&
      !awaitingWalletConfirmation &&
      publicClient &&
      fees.atomCost
    ) {
      try {
        dispatch({ type: 'APPROVE_TRANSACTION' })

        const txHash = await writeCreateIdentity({
          address: MULTIVAULT_CONTRACT_ADDRESS,
          abi: multivaultAbi,
          functionName: 'createAtom',
          args: [toHex(atomData)],
          value:
            BigInt(fees.atomCost) +
            parseUnits(initialDeposit === '' ? '0' : initialDeposit, 18),
        })

        if (txHash) {
          dispatch({ type: 'TRANSACTION_PENDING' })
          const receipt = await publicClient.waitForTransactionReceipt({
            hash: txHash,
          })
          logger('receipt', receipt)
          logger('txHash', txHash)
          dispatch({
            type: 'TRANSACTION_COMPLETE',
            txHash,
            txReceipt: receipt,
            identityId: transactionResponseData?.id,
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
          toast.error(errorMessage)
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
    if (createdIdentity) {
      logger(
        'Submitting to emitterFetcher with identity_id:',
        createdIdentity.id,
      )
      emitterFetcher.submit(
        { identity_id: createdIdentity.id },
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
          setTransactionResponseData(responseData.identity)
          logger('responseData identity', responseData.identity)
          logger('onchain create starting. identity_id:', identity_id)
          handleOnChainCreateIdentity({
            atomData: identity_id,
          })
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
    defaultValue: formData,
  })

  const { chain } = useAccount()
  const isWrongNetwork = chain?.id !== getChainEnvConfig(CURRENT_ENV).chainId
  const reviewIdentity = {
    imageUrl: previewImage,
    displayName: fields.display_name.value,
    description: fields.description.value,
    externalReference: fields.external_reference.value,
    initialDeposit: fields.initial_deposit.value,
  }

  console.log('state.status', state.status)

  return (
    <offChainFetcher.Form
      method="post"
      {...getFormProps(form)}
      encType="multipart/form-data"
      action="/actions/create-identity"
    >
      {state.status === 'idle' ? (
        <div className="w-full flex-col justify-start items-start inline-flex gap-7">
          <div className="flex flex-col w-full gap-1.5">
            <div className="self-stretch flex-col justify-start items-start flex">
              <Text variant="caption" className="text-secondary-foreground">
                Image
              </Text>
            </div>
            <div className="self-stretch h-[100px] px-9 py-2.5 theme-border bg-primary/10 rounded-md justify-between items-center inline-flex">
              <div className="justify-start items-center gap-[18px] flex">
                <div className="w-[60px] h-[60px] rounded-xl justify-center items-center flex">
                  <ImageChooser
                    previewImage={previewImage}
                    setPreviewImage={setPreviewImage}
                    onFileChange={handleFileChange}
                    setImageFile={setIdentityImageFile}
                    disabled={imageUploading}
                    {...getInputProps(fields.image_url, { type: 'file' })}
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
                  <Icon
                    name="circle-x"
                    className="h-6 w-6 relative text-neutral-700 hover:text-neutral-600 transition-colors duration-300"
                  />
                </button>
              </div>
            </div>
            <ErrorList
              id={fields.image_url.errorId}
              errors={fields.image_url.errors}
            />
          </div>
          <div className="flex flex-col w-full gap-1.5">
            <Text variant="caption" className="text-foreground/70">
              Display Name
            </Text>
            <Label htmlFor={fields.display_name.id} hidden>
              Display Name
            </Label>
            <Input
              {...getInputProps(fields.display_name, { type: 'text' })}
              placeholder="Enter a display name here"
              onChange={(e) => {
                setFormTouched(true)
                setFormData((prev) => ({
                  ...prev,
                  display_name: e.target.value,
                }))
              }}
              value={formData.display_name}
            />
            <ErrorList
              id={fields.display_name.errorId}
              errors={fields.display_name.errors}
            />
            {fields.display_name.value &&
              fields.display_name.value.length === 42 &&
              /^0x[a-fA-F0-9]{1,42}$/.test(fields.display_name.value) && (
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={isContract}
                    onCheckedChange={(checked) => {
                      const isChecked = checked === true
                      setIsContract(isChecked)
                      setFormData((prev) => ({
                        ...prev,
                        is_contract: isChecked,
                      }))
                    }}
                    id={fields.is_contract.id}
                    className="h-4 w-4 text-muted theme-border rounded focus:ring-primary focus:ring-1 bg-primary/10 cursor-pointer checked:bg-primary/10 form-checkbox"
                  />
                  <Label
                    htmlFor={fields.is_contract.id}
                    className="text-sm text-foreground/70"
                  >
                    is Contract?
                  </Label>
                </div>
              )}
          </div>

          <div className="flex flex-col w-full gap-1.5">
            <Text variant="caption" className="text-secondary-foreground">
              Description
            </Text>
            <Label htmlFor={fields.description.id} hidden>
              Description
            </Label>
            <Textarea
              {...getInputProps(fields.description, { type: 'text' })}
              placeholder="Enter description here"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              value={formData.description}
            />
          </div>
          <div className="flex flex-col w-full gap-1.5">
            <Text variant="caption" className="text-secondary-foreground">
              Add Link
            </Text>
            <Label htmlFor={fields.external_reference.id} hidden>
              Add Link
            </Label>
            <Input
              {...getInputProps(fields.external_reference, { type: 'text' })}
              placeholder="www.url.com"
              startAdornment="http://"
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  external_reference: e.target.value,
                }))
              }}
              value={formData.external_reference}
            />
            <ErrorList
              id={fields.external_reference.errorId}
              errors={fields.external_reference.errors}
            />
          </div>
          <div className="flex flex-col w-full gap-1.5">
            <Text variant="caption" className="text-secondary-foreground">
              Initial Deposit
            </Text>
            <Label htmlFor={fields.initial_deposit.id} hidden>
              Initial Deposit
            </Label>
            <Input
              {...getInputProps(fields.initial_deposit, { type: 'text' })}
              placeholder="0"
              startAdornment="ETH"
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  initial_deposit: e.target.value,
                }))
              }}
              value={formData.initial_deposit}
            />
            <ErrorList
              id={fields.initial_deposit.errorId}
              errors={fields.initial_deposit.errors}
            />
          </div>
          {isWrongNetwork ? (
            <WrongNetworkButton />
          ) : (
            <Button
              type="button"
              variant="primary"
              onClick={() => {
                dispatch({ type: 'REVIEW_TRANSACTION' })
              }}
              disabled={
                !address ||
                loading ||
                !formTouched ||
                ['confirm', 'transaction-pending', 'awaiting'].includes(
                  state.status,
                )
              }
              className="w-40 mx-auto"
            >
              Review
            </Button>
          )}
        </div>
      ) : state.status === 'review-transaction' ? (
        <div className="h-full flex flex-col">
          <CreateIdentityReview
            dispatch={dispatch}
            identity={reviewIdentity}
            initialDeposit={initialDeposit}
            fees={fees}
          />
          <div className="mt-auto">
            {isWrongNetwork ? (
              <WrongNetworkButton />
            ) : (
              <Button
                form={form.id}
                type="submit"
                variant="primary"
                disabled={
                  !address ||
                  loading ||
                  !formTouched ||
                  ['confirm', 'transaction-pending', 'awaiting'].includes(
                    state.status,
                  )
                }
                className="w-40 mx-auto"
              >
                Create Identity
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-96">
          <TransactionState
            status={state.status}
            txHash={state.txHash}
            type="identity"
            ipfsLink={`${IPFS_GATEWAY_URL}/${transactionResponseData?.identity_id?.replace('ipfs://', '')}`}
            successButton={
              transactionResponseData && (
                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    if (successAction === TransactionSuccessAction.VIEW) {
                      navigate(
                        `${PATHS.IDENTITY}/${transactionResponseData.id}`,
                      )
                    }
                    onClose()
                  }}
                >
                  {successAction === TransactionSuccessAction.VIEW
                    ? 'View Identity'
                    : 'Close'}
                </Button>
              )
            }
          />
        </div>
      )}
    </offChainFetcher.Form>
  )
}
