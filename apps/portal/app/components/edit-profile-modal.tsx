import * as React from 'react'
import { useEffect, useReducer, useState } from 'react'

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  Input,
  Label,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@0xintuition/1ui'
import { IdentityPresenter, UserPresenter } from '@0xintuition/api'

import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { createIdentitySchema } from '@lib/schemas/create-identity-schema'
import {
  ACCEPTED_IMAGE_MIME_TYPES,
  DESCRIPTION_MAX_LENGTH,
  MAX_NAME_LENGTH,
  MAX_UPLOAD_SIZE,
} from '@lib/utils/constants'
import logger from '@lib/utils/logger'
import { cn } from '@lib/utils/misc'
import { Link, useFetcher } from '@remix-run/react'
import { type UploadApiResponse } from 'cloudinary'
import {
  AlertCircle,
  CircleXIcon,
  ExternalLinkIcon,
  HelpCircle,
  Upload,
} from 'lucide-react'
import { toast } from 'sonner'
import { useWalletClient } from 'wagmi'

import ErrorList from './error-list'
import Toast from './toast'

export interface EditProfileModalProps {
  id: string
  userObject: UserPresenter
  open?: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function EditProfileModal({
  id,
  userObject,
  open,
  onClose,
  onSuccess,
}: EditProfileModalProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onClose?.()
      }}
    >
      <DialogContent className="w-[600px] bg-neutral-900 rounded-xl shadow border border-solid border-black/10 pb-0">
        <EditProfileForm
          id={id}
          userObject={userObject}
          onSuccess={onSuccess}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  )
}

// State
type TransactionAction =
  | { type: 'START_TRANSACTION' }
  | { type: 'START_IMAGE_UPLOAD' }
  | {
      type: 'IMAGE_UPLOAD_COMPLETE'
      imageUrl: string
      displayName: string
      description: string
    }
  | { type: 'START_OFF_CHAIN_TRANSACTION' }
  | {
      type: 'OFF_CHAIN_TRANSACTION_COMPLETE'
      offChainReceipt: IdentityPresenter
    }
  | { type: 'TRANSACTION_ERROR'; error: string }

type TransactionState = {
  status: TxState
  displayName?: string
  imageUrl?: string
  description?: string
  offChainReceipt?: IdentityPresenter
  error?: string
}

type TxState =
  | 'idle'
  | 'uploading-image'
  | 'image-upload-complete'
  | 'sending-off-chain-transaction'
  | 'off-chain-transaction-complete'
  | 'transaction-complete'
  | 'transaction-error'

function transactionReducer(
  state: TransactionState,
  action: TransactionAction,
): TransactionState {
  switch (action.type) {
    case 'START_TRANSACTION':
      return { ...state, status: 'idle' }
    case 'START_IMAGE_UPLOAD':
      return { ...state, status: 'uploading-image' }
    case 'IMAGE_UPLOAD_COMPLETE':
      return {
        ...state,
        status: 'image-upload-complete',
        displayName: action.displayName,
        imageUrl: action.imageUrl,
        description: action.description,
      }
    case 'START_OFF_CHAIN_TRANSACTION':
      return { ...state, status: 'sending-off-chain-transaction' }
    case 'OFF_CHAIN_TRANSACTION_COMPLETE':
      return {
        ...state,
        status: 'off-chain-transaction-complete',
        offChainReceipt: action.offChainReceipt,
      }
    case 'TRANSACTION_ERROR':
      return { ...state, status: 'transaction-error', error: action.error }
    default:
      return state
  }
}

const initialState: TransactionState = {
  status: 'idle',
  error: undefined,
}

interface EditProfileFormProps {
  id: string
  userObject: UserPresenter
  onSuccess?: () => void
  onClose: () => void
}

export function EditProfileForm({
  id,
  userObject,
  onSuccess,
  onClose,
}: EditProfileFormProps) {
  const [state, dispatch] = useReducer(transactionReducer, initialState)

  // image upload fetcher
  const uploadFetcher = useFetcher<UploadApiResponse>()

  // off-chain fetcher
  const offChainFetcher = useFetcher<OffChainFetcherData>()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lastOffchainSubmission = offChainFetcher.data as any
  const userIdentity = offChainFetcher?.data?.userIdentity
  logger('userIdentity', userIdentity)

  const [descriptionLength, setDescriptionLength] = useState(0)
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null)
  const [imageFilename, setImageFilename] = useState<string | null>(null)
  const [imageFilesize, setImageFilesize] = useState<string | null>(null)
  const [imageUploading, setImageUploading] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [formTouched, setFormTouched] = useState(false) // to disable submit if user hasn't touched form yet
  const [displayName, setDisplayName] = useState(userObject.display_name ?? '')
  const [description, setDescription] = useState(userObject.description ?? '')

  const { data: walletClient } = useWalletClient()

  const [form, fields] = useForm({
    id: 'update-profile',
    lastResult: lastOffchainSubmission?.submission,
    constraint: getZodConstraint(createIdentitySchema()),
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: createIdentitySchema,
      })
    },
    shouldValidate: 'onInput',
    onSubmit: async (e) => handleSubmit(e),
  })
  const [loading, setLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const handleFileChange = (filename: string, filesize: string) => {
    setImageFilename(filename)
    setImageFilesize(filesize)
  }

  // Handle Triggering Image Upload
  useEffect(() => {
    console.log('imageUrl', state.imageUrl)
    if (uploadFetcher.state === 'submitting') {
      dispatch({ type: 'START_IMAGE_UPLOAD' })
    }
    if (
      uploadFetcher.state === 'idle' &&
      uploadFetcher.data &&
      uploadFetcher.data
    ) {
      const data = uploadFetcher.data as any

      if (typeof data.submission.payload.image_url !== 'string') {
        logger('Transaction Error')
        dispatch({
          type: 'TRANSACTION_ERROR',
          error: 'Your profile picture was rejected.',
        })
      } else {
        dispatch({
          type: 'IMAGE_UPLOAD_COMPLETE',
          imageUrl: data.submission.payload.image_url ?? '',
          displayName: data.submission.payload.display_name ?? '',
          description: data.submission.payload.description ?? '',
        })
      }
    }
  }, [uploadFetcher.state, uploadFetcher.data, dispatch])

  interface OffChainFetcherData {
    success: 'success' | 'error'
    userIdentity: IdentityPresenter
  }

  useEffect(() => {
    if (state.status === 'image-upload-complete') {
      // Prepare the formData or payload for the off-chain transaction
      const formData = new FormData()
      formData.append('id', id ?? '')
      formData.append('image_url', state.imageUrl ?? '')
      formData.append('display_name', state.displayName ?? '')
      formData.append('description', state.description ?? '')

      // Submit the off-chain transaction
      try {
        offChainFetcher.submit(formData, {
          action: '/actions/update-profile',
          method: 'post',
        })
        onClose()
      } catch (error: unknown) {
        if (error instanceof Error) {
          let errorMessage = 'Error in creating offchain meme data.'
          if (error.message.includes('rejected')) {
            errorMessage = 'Signature rejected. Try again when you are ready.'
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
        console.error('Error creating identity', error)
      }
    }
  }, [uploadFetcher.state, uploadFetcher.data, state])

  useEffect(() => {
    if (state.status === 'transaction-error') {
      setLoading(false)
    }
  }, [state.status])

  // Handle Initial Form Submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (walletClient) {
        dispatch({ type: 'START_TRANSACTION' })
        const formData = new FormData(event.currentTarget)

        // Initial form validation
        const submission = parseWithZod(formData, {
          schema: createIdentitySchema(),
        })

        if (
          submission.status === 'error' &&
          Object.keys(submission.error).length
        ) {
          console.error('Update profile validation errors: ', submission.error)
        }

        setLoading(true)
        dispatch({ type: 'START_IMAGE_UPLOAD' })
        uploadFetcher.submit(formData, {
          action: '/actions/upload',
          method: 'post',
          encType: 'multipart/form-data',
        })
      }
    } catch (error: unknown) {
      logger(error)
    }
  }

  // Handle display name input changes
  const handleDisplayNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDisplayName(event.target.value)
  }

  // Handle description input changes
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(event.target.value)
  }

  return (
    <>
      <>
        <DialogHeader className="py-4">
          <div className="absolute top-5 flex flex-row items-center gap-2 align-baseline text-primary-400">
            <h2 className="text-xl text-white/70 font-normal">
              Update Profile
            </h2>
            <>
              <TooltipProvider>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-neutral-500 transition-colors duration-300 hover:text-neutral-400" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[230px]" side="right">
                    <div className="mb-2 flex flex-row items-center gap-2">
                      <p className="text-base font-medium text-primary-300">
                        Profile
                      </p>
                    </div>
                    <p className="text-sm text-primary-400">
                      Identities are the smallest units of knowledge in
                      Intuition. Identities are the building blocks that form
                      claims, and the things claims can be made about.
                    </p>
                    <Link
                      to={
                        'https://docs.intuition.systems/primitives-and-interactions/primitives/identities'
                      }
                      target="_blank"
                    >
                      <Button
                        className="mt-2 flex items-center gap-1"
                        variant="secondary"
                      >
                        Learn more
                        <ExternalLinkIcon className="h-3 w-3" />
                      </Button>
                    </Link>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          </div>
        </DialogHeader>

        <offChainFetcher.Form
          method="post"
          {...getFormProps(form)}
          encType="multipart/form-data"
          action="/actions/edit-profile"
        >
          <div className="h-[184px] w-full py-1 flex-col justify-start items-start inline-flex">
            <div className="self-stretch h-[38px] py-2.5 flex-col justify-start items-start gap-1 flex">
              <div className="self-stretch justify-start items-center gap-2.5 inline-flex">
                <div className="grow shrink basis-0 text-white/70 text-xs font-medium leading-[18px]">
                  Profile Picture
                </div>
              </div>
            </div>
            <div className="self-stretch h-[100px] px-9 py-2.5 bg-neutral-900 rounded-lg border border-solid border-white/10 justify-between items-center inline-flex">
              <div className="justify-start items-center gap-[18px] flex">
                <div className="w-[60px] h-[60px] rounded-xl justify-center items-center flex">
                  <Label htmlFor={fields.image_url.id} hidden>
                    Profile Picture
                  </Label>
                  <ImageChooser
                    previewImage={previewImage}
                    setPreviewImage={setPreviewImage}
                    onFileChange={handleFileChange}
                  />
                </div>
                <div className="flex-col justify-start items-start inline-flex">
                  <div className="text-center text-neutral-200 text-sm font-normal leading-tight">
                    {imageFilename}
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
                    setImageSrc(null)
                    setImageFilename(null)
                    setImageFilesize(null)
                  }}
                  className={`${previewImage === null ? 'hidden' : 'block'}`}
                >
                  <CircleXIcon className="h-6 w-6 relative text-neutral-700 hover:text-neutral-600 transition-colors duration-300" />
                </button>
              </div>
            </div>
            <div className="self-stretch p-2.5 rounded-lg justify-center items-center gap-2.5 inline-flex">
              <div className="grow shrink basis-0 text-right text-white/50 text-xs font-normal leading-[18px]">
                Max {MAX_UPLOAD_SIZE / 1024 / 1024} MB
              </div>
              <div
                className={`min-h-[1rem] px-2 ${!fields.image_url.errors && 'invisible'}`}
              >
                <ErrorList
                  id={fields.image_url.errorId}
                  errors={fields.image_url.errors}
                />
              </div>
            </div>
          </div>
          <div className="self-stretch h-[124px] py-1 flex-col justify-start items-start flex">
            <div className="self-stretch h-[38px] py-2.5 flex-col justify-start items-start gap-1 flex">
              <div className="self-stretch justify-start items-center gap-2.5 inline-flex">
                <div className="grow shrink basis-0 text-white/70 text-xs font-medium leading-[18px]">
                  Display Name
                </div>
              </div>
            </div>
            <Label htmlFor={fields.display_name.id} hidden>
              Display Name
            </Label>
            <Input
              {...getInputProps(fields.display_name, { type: 'text' })}
              placeholder="Enter a display name"
              value={displayName}
              onChange={handleDisplayNameChange}
              className="border border-solid border-white/10 bg-neutral-900"
            />
            <div className="self-stretch p-2.5 rounded-lg justify-center items-center gap-2.5 inline-flex">
              <div className="grow shrink basis-0 text-right text-white/50 text-xs font-normal leading-[18px]">
                Max {MAX_NAME_LENGTH} characters
              </div>
            </div>
          </div>
          <div className="self-stretch h-[164px] py-1 rounded-xl flex-col justify-start items-start flex">
            <div className="self-stretch h-[38px] py-2.5 flex-col justify-start items-start gap-1 flex">
              <div className="self-stretch justify-start items-center gap-2.5 inline-flex">
                <div className="grow shrink basis-0 text-white/70 text-xs font-medium leading-[18px]">
                  Bio
                </div>
              </div>
            </div>
            <Label htmlFor={fields.description.id} hidden>
              Bio
            </Label>
            <Textarea
              {...getInputProps(fields.description, { type: 'text' })}
              placeholder="Tell us about yourself!"
              value={description}
              onChange={handleDescriptionChange}
              className="h-20 border border-solid border-white/10 bg-neutral-900"
            />
            <div className="self-stretch p-2.5 rounded-lg justify-center items-center gap-2.5 inline-flex">
              <div className="grow shrink basis-0 text-right text-white/50 text-xs font-normal leading-[18px]">
                {DESCRIPTION_MAX_LENGTH} characters left
              </div>
            </div>
          </div>
          <Button
            form={form.id}
            type="submit"
            disabled={loading}
            onClick={() => handleSubmit}
          >
            <div className="flex flex-row items-center gap-2 text-lg text-white">
              Update Profile
            </div>
          </Button>
        </offChainFetcher.Form>
      </>
    </>
  )
}

interface ImageChooseProps {
  previewImage: string | null
  setPreviewImage: React.Dispatch<React.SetStateAction<string | null>>
  onFileChange: (filename: string, filesize: string) => void
}

function ImageChooser({
  previewImage,
  setPreviewImage,
  onFileChange,
}: ImageChooseProps) {
  return (
    <div className="flex w-full items-center justify-center gap-3">
      <div className="relative w-full">
        <label
          htmlFor="image-input"
          className={cn(
            'group left-0 flex h-[60px] w-[60px] w-full cursor-pointer rounded-lg focus-within:ring-2 focus-within:ring-ring border border-solid border-neutral-700',
            {
              'opacity-40 focus-within:opacity-100 hover:opacity-100':
                !previewImage,
            },
          )}
        >
          <div
            className={cn(
              'relative flex items-center justify-center overflow-hidden',
              {
                'mx-auto w-auto': previewImage,
                'w-full': !previewImage,
              },
            )}
          >
            {previewImage ? (
              <div className="flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-md">
                <img
                  src={previewImage}
                  className="h-full w-full object-cover object-position-center shadow-md"
                  alt="Avatar preview"
                />
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-md h-[60px] w-[60px]">
                <div className="pointer-events-pointer inset-0 flex items-center justify-center">
                  <Upload className="h-6 w-6 text-neutral-700" />
                </div>
              </div>
            )}
          </div>
          <input
            id="image-input"
            aria-label="Image"
            className="absolute left-0 w-full cursor-pointer opacity-0"
            onChange={(event) => {
              const input = event.target
              const file = event.target.files?.[0]
              console.log('file', file)

              if (file) {
                const reader = new FileReader()
                reader.onloadend = () => {
                  setPreviewImage(reader.result as string)
                }
                reader.readAsDataURL(file)
                const filesizeKB = file.size / 1024
                let formattedSize = ''
                if (filesizeKB >= 1024) {
                  const filesizeMB = filesizeKB / 1024
                  formattedSize = `${filesizeMB.toFixed(2)} MB`
                } else {
                  formattedSize = `${Math.round(filesizeKB)} KB`
                }

                onFileChange(file.name, formattedSize)
              } else {
                setPreviewImage(null)
              }

              input.value = ''
            }}
            name="image_url"
            type="file"
            accept="image/*"
          />
        </label>
      </div>
    </div>
  )
}
