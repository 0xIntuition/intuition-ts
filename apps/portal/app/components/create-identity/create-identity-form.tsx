import React, { useEffect, useRef, useState } from 'react'

import {
  ActivePositionCard,
  Button,
  ButtonSize,
  ButtonVariant,
  DialogFooter,
  Icon,
  Identity,
  IdentityTag,
  Input,
  Label,
  Tabs,
  TabsList,
  TabsTrigger,
  Text,
  Textarea,
  TextVariant,
  TextWeight,
  toast,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import CreateIdentityReview from '@components/create-identity/create-identity-review'
import ErrorList from '@components/error-list'
import { ImageChooser } from '@components/image-chooser'
import { InfoTooltip } from '@components/info-tooltip'
import StakeActions from '@components/stake/stake-actions'
import StakeButton from '@components/stake/stake-button'
import StakeInput from '@components/stake/stake-input'
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
import { useGetWalletBalance } from '@lib/hooks/useGetWalletBalance'
import { useImageUploadFetcher } from '@lib/hooks/useImageUploadFetcher'
import {
  OffChainFetcherData,
  useOffChainFetcher,
} from '@lib/hooks/useOffChainFetcher'
import { createIdentitySchema } from '@lib/schemas/create-identity-schema'
import { getChainEnvConfig } from '@lib/utils/environment'
import logger from '@lib/utils/logger'
import { formatBalance, truncateString } from '@lib/utils/misc'
import { useFetcher, useNavigate } from '@remix-run/react'
import { CreateLoaderData } from '@routes/resources+/create'
import { GetIdentityLoaderData } from '@routes/resources+/get-identity'
import {
  ACCEPTED_IMAGE_MIME_TYPES,
  CURRENT_ENV,
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
import { Address, decodeEventLog, parseUnits, toHex } from 'viem'
import { useAccount, usePublicClient, useWalletClient } from 'wagmi'

interface IdentityFormProps {
  wallet?: string
  onSuccess?: (identity: IdentityPresenter) => void
  onClose: () => void
  successAction?: TransactionSuccessActionType
  state: IdentityTransactionStateType
  dispatch: React.Dispatch<IdentityTransactionActionType>
}

interface FormState {
  display_name?: string
  description?: string
  external_reference?: string
  initial_deposit?: string
  is_contract?: boolean
}

export interface OffChainIdentityFetcherData {
  success: 'success' | 'error'
  identity: IdentityPresenter
  submission: SubmissionResult<string[]> | null
}

export function IdentityForm({
  wallet,
  onClose,
  onSuccess,
  successAction = TransactionSuccessAction.VIEW,
  state,
  dispatch,
}: IdentityFormProps) {
  const { offChainFetcher, lastOffChainSubmission } = useOffChainFetcher()
  const identityFetcher = useFetcher<GetIdentityLoaderData>()
  const navigate = useNavigate()
  const imageUploadFetcher = useImageUploadFetcher()
  const [imageUploading, setImageUploading] = React.useState(false)
  const [identityImageSrc, setIdentityImageSrc] = React.useState<
    string | ArrayBuffer | null
  >(null)
  const [identityImageFile, setIdentityImageFile] = useState<File | undefined>(
    undefined,
  )
  const [imageUploadError, setImageUploadError] = useState<string | null>(null)
  const [initialDeposit, setInitialDeposit] = useState<string>('')
  const [lastTxHash, setLastTxHash] = useState<string | undefined>(undefined)
  const [vaultId, setVaultId] = useState<string | undefined>(undefined)
  const [transactionResponseData, setTransactionResponseData] =
    useState<IdentityPresenter | null>(null)

  useEffect(() => {
    if (state.status === 'complete') {
      if (transactionResponseData) {
        onSuccess?.(transactionResponseData)
      }
    }
  }, [state.status, transactionResponseData])

  const loaderFetcher = useFetcher<CreateLoaderData>()
  const loaderFetcherUrl = '/resources/create'
  const loaderFetcherRef = useRef(loaderFetcher.load)

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
      setIdentityImageSrc(null)
      setImageUploading(false)
      setImageUploadError(imageUploadFetcher.data.error)
    }
  }, [imageUploadFetcher.data])

  const fees = loaderFetcher.data as CreateLoaderData

  const { data: walletClient } = useWalletClient()
  const publicClient = usePublicClient()
  const {
    receipt: txReceipt,
    writeContractAsync: writeCreateIdentity,
    awaitingWalletConfirmation,
    awaitingOnChainConfirmation,
  } = useCreateAtom()
  const emitterFetcher = useFetcher()

  const createdIdentity = offChainFetcher?.data?.identity

  const [loading, setLoading] = useState(false)
  const [imageFilename, setImageFilename] = useState<string | null>(null)
  const [imageFilesize, setImageFilesize] = useState<string | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const handleFileChange = (filename: string, filesize: string, file: File) => {
    setImageFilename(filename)
    setImageFilesize(filesize)
    setIdentityImageFile(file)
    setImageUploadError(null)

    if (file.size > MAX_UPLOAD_SIZE) {
      setImageUploadError('File size must be less than 5MB')
    } else if (!ACCEPTED_IMAGE_MIME_TYPES.includes(file.type)) {
      setImageUploadError('File must be a .png, .jpg, .jpeg, .gif, or .webp')
    }
  }

  const [formTouched, setFormTouched] = useState(false) // to disable submit if user hasn't touched form yet

  const handleSubmit = async () => {
    try {
      if (walletClient) {
        dispatch({ type: 'PREPARING_IDENTITY' })

        const formData = new FormData()
        Object.entries(formState).forEach(([key, value]) => {
          formData.append(key, value as string)
        })

        if (identityImageSrc !== null) {
          formData.set('image_url', identityImageSrc as string)
        }

        const submission = parseWithZod(formData, {
          schema: createIdentitySchema(),
        })

        if (
          submission.status === 'error' &&
          submission.error !== null &&
          Object.keys(submission.error).length
        ) {
          return
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
          handleSubmitError(error)
        }
      }
    } catch (error: unknown) {
      logger(error)
      handleSubmitError(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitError = (error: unknown) => {
    let errorMessage = 'Error in creating offchain identity data.'
    if (error instanceof Error) {
      if (error.message === 'Submission timed out') {
        errorMessage =
          'The identity creation process timed out. Please try again.'
      } else {
        try {
          // Try to parse the error message as JSON
          const parsedError = JSON.parse(error.message)
          if (parsedError && parsedError.error) {
            errorMessage = parsedError.error
          } else {
            errorMessage = error.message
          }
        } catch (jsonError) {
          // If parsing fails, use the original error message
          errorMessage = error.message
        }
      }
    }
    dispatch({
      type: 'TRANSACTION_ERROR',
      error: errorMessage,
    })
    toast.error(errorMessage)
    setLoading(false)
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
      fees
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
        dispatch({ type: 'TRANSACTION_PENDING' })
        if (txHash) {
          const receipt = await publicClient.waitForTransactionReceipt({
            hash: txHash,
          })
          console.log('receipt', receipt)
          type EventLogArgs = {
            sender: Address
            receiver?: Address
            owner?: Address
            vaultId: string
          }

          if (
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
            setVaultId(topics.args.vaultId.toString())
            setLastTxHash(receipt.transactionHash)
          }
        }
      } catch (error) {
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

  useEffect(() => {
    console.log('txReceipt useEffect', txReceipt)
    console.log('vaultId', vaultId)
    if (txReceipt && vaultId) {
      identityFetcher.load(`/resources/get-identity?vaultId=${vaultId}`)
    }
  }, [txReceipt, vaultId])

  useEffect(() => {
    console.log('txReceipt', txReceipt)
    if (txReceipt) {
      if (identityFetcher.data && 'identity' in identityFetcher.data) {
        console.log('identityFetcher.data', identityFetcher.data)
        dispatch({
          type: 'TRANSACTION_COMPLETE',
          txHash: txReceipt.transactionHash,
          txReceipt,
        })
      } else if (identityFetcher.data && 'error' in identityFetcher.data) {
        const errorMessage = `Your identity was created, but we're having trouble fetching its details. Vault ID: ${vaultId}`
        dispatch({
          type: 'TRANSACTION_ERROR',
          error: errorMessage,
        })
        toast.error(errorMessage)
      }
    }
  }, [identityFetcher.data, txReceipt, vaultId])

  function handleIdentityTxReceiptReceived() {
    if (createdIdentity) {
      emitterFetcher.submit(
        { identity_id: createdIdentity.id },
        { method: 'post', action: '/actions/create-emitter' },
      )
    }
  }

  useEffect(() => {
    if (state.status === 'complete') {
      handleIdentityTxReceiptReceived()
    }
  }, [state.status])

  useEffect(() => {
    let isMounted = true

    if (
      offChainFetcher.state === 'idle' &&
      offChainFetcher.data !== null &&
      offChainFetcher.data !== undefined
    ) {
      const responseData = offChainFetcher.data as OffChainFetcherData
      if (isMounted) {
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
        if (
          offChainFetcher.data === null ||
          offChainFetcher.data === undefined
        ) {
          console.error(
            'Error in offchain data creation.:',
            offChainFetcher.data,
          )
          dispatch({
            type: 'TRANSACTION_ERROR',
            error: 'Error in offchain data creation.',
          })
        }
      }
    }

    return () => {
      isMounted = false
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
      const result = parseWithZod(formData, {
        schema: createIdentitySchema,
      })
      return result
    },
    shouldValidate: 'onBlur',
    onSubmit: async (event, { formData }) => {
      event.preventDefault()
      const formDataObject = Object.fromEntries(formData.entries())
      setFormState(formDataObject)
      dispatch({ type: 'REVIEW_TRANSACTION' })
    },
  })

  const { chain } = useAccount()
  const isWrongNetwork = chain?.id !== getChainEnvConfig(CURRENT_ENV).chainId
  const [formState, setFormState] = useState<FormState>({})

  const reviewIdentity = {
    imageUrl: previewImage,
    displayName: fields.display_name.value,
    description: fields.description.value,
    externalReference: fields.external_reference.value,
    initialDeposit: fields.initial_deposit.value,
  }

  const handleClose = () => {
    dispatch({ type: 'START_TRANSACTION' })
    setFormState({})
    setFormTouched(false)
    setPreviewImage(null)
    setImageFilename(null)
    setImageFilesize(null)
    setIdentityImageSrc(null)
    setIdentityImageFile(undefined)
    setInitialDeposit('0')
    onClose()
  }

  //staking related
  const [showErrors, setShowErrors] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const { address } = useAccount()
  const walletBalance = useGetWalletBalance(
    address ?? (wallet as `0x${string}`),
  )

  const handleStakeButtonClick = async () => {
    if (+initialDeposit > +walletBalance) {
      setShowErrors(true)
      return
    }
    dispatch({ type: 'REVIEW_TRANSACTION' })
  }

  return (
    <>
      <offChainFetcher.Form
        method="post"
        {...getFormProps(form)}
        encType="multipart/form-data"
        action="/actions/create-identity"
        hidden
      />
      <div className="h-full flex flex-col">
        {state.status === 'idle' ? (
          <div className="w-full h-max flex-col justify-start items-start inline-flex gap-7">
            <div className="flex flex-col w-full gap-1.5">
              <div className="self-stretch flex-col justify-start items-start flex">
                <div className="flex w-full items-center justify-between">
                  <Text
                    variant={TextVariant.caption}
                    weight={TextWeight.medium}
                  >
                    Identity Display Picture
                  </Text>
                  <InfoTooltip
                    title="Identity Display Picture"
                    content={`We've done some image filtering in The Portal, so that
                          we don't begin our journey with a bunch of
                          inappropriate images - though the Intuition Protocol
                          itself allows for any image to be referenced.`}
                  />
                </div>
              </div>
              <div className="self-stretch px-7 py-5 theme-border bg-primary/10 rounded-md justify-between items-center inline-flex">
                <div className="justify-start items-center gap-[18px] flex">
                  <div className="w-16 h-16 rounded-xl justify-center items-center flex">
                    <ImageChooser
                      previewImage={previewImage}
                      setPreviewImage={setPreviewImage}
                      onFileChange={(filename, filesize, file) =>
                        handleFileChange(filename, filesize, file)
                      }
                      setImageFile={setIdentityImageFile}
                      disabled={imageUploading}
                      {...getInputProps(fields.image_url, { type: 'file' })}
                    />
                  </div>
                  <div className="flex-col justify-start items-start inline-flex">
                    <Text
                      variant={TextVariant.body}
                      className="text-center text-secondary/70"
                    >
                      {truncateString(imageFilename ?? '', 36)}
                    </Text>
                    <Text
                      variant={TextVariant.body}
                      className="text-center text-secondary/70"
                    >
                      {imageFilesize}
                    </Text>
                  </div>
                </div>
                <div className="flex-col justify-end items-end inline-flex">
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      setPreviewImage(null)
                      setImageFilename(null)
                      setImageFilesize(null)
                      setIdentityImageFile(undefined)
                      setImageUploadError(null)
                    }}
                    className={`${previewImage === null ? 'hidden' : 'block'}`}
                  >
                    <Icon
                      name="circle-x"
                      className="h-5 w-5 relative text-secondary/50 hover:text-primary transition-colors duration-300"
                    />
                  </button>
                </div>
              </div>
              <ErrorList
                id={fields.image_url.errorId}
                errors={[
                  ...(fields.image_url.errors || []),
                  ...(imageUploadError ? [imageUploadError] : []),
                ]}
              />
            </div>
            <div className="flex flex-col w-full gap-1.5">
              <div className="self-stretch flex-col justify-start items-start flex">
                <div className="flex w-full items-center justify-between">
                  <Text
                    variant={TextVariant.caption}
                    weight={TextWeight.medium}
                  >
                    Identity Name
                  </Text>
                  <InfoTooltip
                    title="Identity Name"
                    content="This is the display name of your Atom/Identity, and will be a main way that people discover it - so make sure it is good!"
                  />
                </div>
              </div>
              <Label htmlFor={fields.display_name.id} hidden>
                Identity Name
              </Label>
              <Input
                {...getInputProps(fields.display_name, { type: 'text' })}
                placeholder="Enter a identity name here"
                onChange={(e) => {
                  setFormState((prev) => ({
                    ...prev,
                    display_name: e.target.value,
                  }))
                  setFormTouched(true)
                }}
                value={formState.display_name}
              />
              <ErrorList
                id={fields.display_name.errorId}
                errors={fields.display_name.errors}
              />
              {fields.display_name.value &&
                fields.display_name.value.length === 42 &&
                /^0x[a-fA-F0-9]{1,42}$/.test(fields.display_name.value) && (
                  <Text className="text-xs font-semibold text-destructive">
                    {`If this is a smart contract, select 'Smart Contract' from
                    the Atom Type dropdown above.`}
                  </Text>
                )}
            </div>

            <div className="flex flex-col w-full gap-1.5">
              <div className="self-stretch flex-col justify-start items-start flex">
                <div className="flex w-full items-center justify-between">
                  <Text
                    variant={TextVariant.caption}
                    weight={TextWeight.medium}
                  >
                    Identity Description
                  </Text>
                  <InfoTooltip
                    title="Description"
                    content="Add a bit more context to elaborate on what this Atom/Identity is meant to represent. The more data you add, the more useful your Atom/Identity will be."
                  />
                </div>
              </div>
              <Label htmlFor={fields.description.id} hidden>
                Identity Description
              </Label>
              <Textarea
                {...getInputProps(fields.description, { type: 'text' })}
                placeholder="Enter identity description here"
                className="theme-border"
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                value={formState.description}
              />
              <ErrorList
                id={fields.description.errorId}
                errors={fields.description.errors}
              />
            </div>
            <div className="flex flex-col w-full gap-1.5">
              <div className="self-stretch flex-col justify-start items-start flex">
                <div className="flex w-full items-center justify-between">
                  <Text
                    variant={TextVariant.caption}
                    weight={TextWeight.medium}
                  >
                    Add Link
                  </Text>
                  <InfoTooltip
                    title="Link"
                    content="If this Atom/Identity has a relevant link, or is meant to reference data on another platform, add the URL here!"
                  />
                </div>
              </div>
              <Label htmlFor={fields.external_reference.id} hidden>
                Add Link
              </Label>
              <Input
                {...getInputProps(fields.external_reference, { type: 'text' })}
                placeholder="https://www.url.com"
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    external_reference: e.target.value,
                  }))
                }
                value={formState.external_reference}
              />
              <ErrorList
                id={fields.external_reference.errorId}
                errors={fields.external_reference.errors}
              />
            </div>
            <div className="mt-auto mx-auto pt-2">
              {isWrongNetwork ? (
                <WrongNetworkButton />
              ) : (
                <Button
                  type="button"
                  variant={ButtonVariant.primary}
                  size={ButtonSize.lg}
                  onClick={() => {
                    const result = form.valid && !imageUploadError
                    if (result && !imageUploadError) {
                      dispatch({ type: 'INITIAL_DEPOSIT' })
                    }
                  }}
                  disabled={
                    !wallet ||
                    loading ||
                    !formTouched ||
                    ['confirm', 'transaction-pending', 'awaiting'].includes(
                      state.status,
                    )
                  }
                  className="w-40 mx-auto"
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        ) : state.status === 'initial-deposit' ? (
          <>
            <div className="h-full w-full flex-col flex-grow">
              <div className="items-center justify-center flex flex-row w-full px-10 pb-10">
                <IdentityTag
                  imgSrc={reviewIdentity.imageUrl}
                  variant={Identity.nonUser}
                >
                  {reviewIdentity.displayName}
                </IdentityTag>
              </div>
              <div className="w-96 mx-auto">
                <Tabs defaultValue={'deposit'}>
                  <TabsList className="relative overflow-hidden">
                    <div
                      className={`absolute mx-auto inset-0 bg-[radial-gradient(ellipse_at_bottom_center,_var(--tw-gradient-stops))] from-primary/20 via-primary/5'
                       to-transparent`}
                    />
                    <TabsTrigger
                      variant="alternate"
                      value="deposit"
                      label="Deposit"
                      onClick={(e) => {
                        e.preventDefault()
                      }}
                      className="relative z-10"
                    />
                    <TabsTrigger
                      variant="alternate"
                      value="redeem"
                      label="Redeem"
                      onClick={(e) => {
                        e.preventDefault()
                      }}
                      disabled={true}
                      className="relative z-10"
                    />
                  </TabsList>
                </Tabs>
                <div className="pt-8">
                  <ActivePositionCard value={Number(formatBalance(0, 18))} />
                  <div className="rounded-t-lg bg-primary-950/15 px-4 pt-5">
                    <StakeInput
                      val={initialDeposit}
                      setVal={setInitialDeposit}
                      wallet={wallet ?? ''}
                      isLoading={loading}
                      validationErrors={validationErrors}
                      setValidationErrors={setValidationErrors}
                      showErrors={showErrors}
                      setShowErrors={setShowErrors}
                    />
                    <div className="flex h-3 flex-col items-start justify-center gap-2 self-stretch" />
                    <StakeActions
                      action={'deposit'}
                      setVal={setInitialDeposit}
                      minDeposit={'0'}
                      userConviction={'0'}
                      price={'0'}
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <StakeButton
                val={'0'}
                mode={'deposit'}
                handleAction={handleStakeButtonClick}
                handleClose={handleClose}
                dispatch={dispatch}
                state={state}
                min_deposit={'0'}
                walletBalance={walletBalance}
                user_conviction={'0'}
                setValidationErrors={setValidationErrors}
                setShowErrors={setShowErrors}
                conviction_price={'0'}
              />
            </DialogFooter>
          </>
        ) : state.status === 'review-transaction' ? (
          <div className="h-[600px] flex flex-col">
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
                  variant={ButtonVariant.primary}
                  size={ButtonSize.lg}
                  onClick={handleSubmit}
                  disabled={
                    !wallet ||
                    loading ||
                    !formTouched ||
                    ['confirm', 'transaction-pending', 'awaiting'].includes(
                      state.status,
                    )
                  }
                  className="w-40 mx-auto mt-10"
                >
                  Confirm
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="h-[600px] flex flex-col">
            <TransactionState
              status={state.status}
              txHash={state.txHash}
              type="identity"
              ipfsLink={`${IPFS_GATEWAY_URL}/${transactionResponseData?.identity_id?.replace('ipfs://', '')}`}
              successButton={
                transactionResponseData && (
                  <Button
                    type="button"
                    variant={ButtonVariant.primary}
                    size={ButtonSize.lg}
                    className="mt-auto w-40"
                    onClick={() => {
                      if (successAction === TransactionSuccessAction.VIEW) {
                        navigate(`${PATHS.IDENTITY}/${vaultId}`)
                      }
                      handleClose()
                    }}
                  >
                    {successAction === TransactionSuccessAction.VIEW
                      ? 'View Identity'
                      : 'Close'}
                  </Button>
                )
              }
              errorButton={
                <Button
                  type="button"
                  variant={ButtonVariant.primary}
                  size={ButtonSize.lg}
                  className="mt-auto w-40"
                  onClick={() => {
                    dispatch({ type: 'START_TRANSACTION' })
                  }}
                >
                  Retry
                </Button>
              }
            />
          </div>
        )}
      </div>
    </>
  )
}
