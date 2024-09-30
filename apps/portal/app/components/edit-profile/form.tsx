import { useEffect, useState } from 'react'

import {
  Button,
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
import { UserPresenter } from '@0xintuition/api'

import ErrorList from '@components/error-list'
import { ImageChooser } from '@components/image-chooser'
import { InfoTooltip } from '@components/info-tooltip'
import {
  getFormProps,
  getInputProps,
  SubmissionResult,
  useForm,
} from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { useImageUploadFetcher } from '@lib/hooks/useImageUploadFetcher'
import {
  identityTransactionReducer,
  initialIdentityTransactionState,
  useTransactionState,
} from '@lib/hooks/useTransactionReducer'
import { updateProfileSchema } from '@lib/schemas/update-profile-schema'
import logger from '@lib/utils/logger'
import { truncateString } from '@lib/utils/misc'
import { useFetcher, useLocation } from '@remix-run/react'
import { ACCEPTED_IMAGE_MIME_TYPES, MAX_UPLOAD_SIZE } from 'app/consts'
import {
  IdentityTransactionActionType,
  IdentityTransactionStateType,
} from 'app/types/transaction'

interface EditProfileFormProps {
  userObject: UserPresenter
  setUserObject?: (userObject: UserPresenter) => void
  onSuccess?: () => void
  onClose: () => void
}

interface OffChainFetcherData {
  success: 'success' | 'error'
  profile: UserPresenter
  submission: SubmissionResult<string[]> | null
}

// TODO: [ENG-2691] - This will be refactored along with the create identity form. This form is based on that, so it will be refactored in the same way.
export function EditProfileForm({
  userObject,
  setUserObject,
  onClose,
}: EditProfileFormProps) {
  const { state, dispatch } = useTransactionState<
    IdentityTransactionStateType,
    IdentityTransactionActionType
  >(identityTransactionReducer, initialIdentityTransactionState)

  const location = useLocation()
  const isCreateRoute = location.pathname.includes('create')

  const imageUploadFetcher = useImageUploadFetcher()

  const offChainFetcher = useFetcher<OffChainFetcherData>()
  const lastOffChainSubmission = offChainFetcher.data?.submission

  const [imageFile, setImageFile] = useState<File | undefined>(undefined)
  const [imageFilename, setImageFilename] = useState<string | null>(null)
  const [imageFilesize, setImageFilesize] = useState<string | null>(null)
  const [imageUploadError, setImageUploadError] = useState<string | null>(null)

  const [displayName, setDisplayName] = useState(
    userObject.display_name ? userObject.display_name : '',
  )

  const [description, setDescription] = useState(
    userObject.description ? userObject.description : '',
  )
  const [form, fields] = useForm({
    id: 'update-profile',
    lastResult: lastOffChainSubmission,
    constraint: getZodConstraint(updateProfileSchema()),
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: updateProfileSchema,
      })
    },
    shouldValidate: 'onInput',
    onSubmit: async (e) => handleSubmit(e),
  })
  const [loading, setLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const handleFileChange = (filename: string, filesize: string, file: File) => {
    setImageFilename(filename)
    setImageFilesize(filesize)
    setImageFile(file)
    setImageUploadError(null)

    if (file.size > MAX_UPLOAD_SIZE) {
      setImageUploadError('File size must be less than 5MB')
    } else if (!ACCEPTED_IMAGE_MIME_TYPES.includes(file.type)) {
      setImageUploadError('File must be a .png, .jpg, .jpeg, .gif, or .webp')
    }
  }

  const handleError = (
    error: unknown,
    dispatch: React.Dispatch<IdentityTransactionActionType>,
  ) => {
    if (error instanceof Error) {
      let errorMessage = 'Error in creating user identity data.'
      if (error.message.includes('rejected')) {
        errorMessage = 'Signature rejected. Try again when you are ready.'
      }
      dispatch({
        type: 'TRANSACTION_ERROR',
        error: errorMessage,
      })
      toast.error(errorMessage)
      return
    }
    console.error('Error creating identity', error)
  }

  // Handle Triggering Image Upload
  useEffect(() => {
    if (imageUploadFetcher.state === 'submitting') {
      dispatch({ type: 'START_IMAGE_UPLOAD' })
      logger('uploading img')
    }
    if (
      imageUploadFetcher.state === 'idle' &&
      imageUploadFetcher.data &&
      imageUploadFetcher.data
    ) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = imageUploadFetcher.data as any
      if (
        imageUploadFetcher.data &&
        imageUploadFetcher.data.status === 'error'
      ) {
        setImageUploadError(imageUploadFetcher.data.error)
        setLoading(false)
      } else {
        dispatch({
          type: 'IMAGE_UPLOAD_COMPLETE',
          imageUrl: data.submission.payload.image_url ?? '',
          displayName: data.submission.payload.display_name ?? '',
          description: data.submission.payload.description ?? '',
          externalReference: data.submission.payload.external_reference ?? '',
        })
      }
    }
  }, [imageUploadFetcher.state, imageUploadFetcher.data, dispatch])

  useEffect(() => {
    logger('file changed', imageFile)
    if (imageFile) {
      if (
        !ACCEPTED_IMAGE_MIME_TYPES.includes(imageFile.type) ||
        imageFile.size > MAX_UPLOAD_SIZE
      ) {
        console.error('Invalid image file', imageFile)
        return
      }

      const formData = new FormData()
      formData.append('image_url', imageFile)
    }
  }, [imageFile])

  useEffect(() => {
    if (state.status === 'image-upload-complete') {
      // Prepare the formData or payload for the off-chain transaction
      const formData = new FormData()
      formData.append('id', userObject.id ?? '')
      formData.append('image_url', state.imageUrl ?? '')
      formData.append('display_name', state.displayName ?? '')
      formData.append('description', state.description ?? '')
      // Submit the off-chain transaction
      try {
        offChainFetcher.submit(formData, {
          action: '/actions/edit-profile',
          method: 'post',
        })
      } catch (error: unknown) {
        handleError(error, dispatch)
      }
    }
  }, [imageUploadFetcher.state, imageUploadFetcher.data, state])

  useEffect(() => {
    if (state.status === 'error') {
      setLoading(false)
    }
  }, [state.status])

  // Handle Initial Form Submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    logger('previewImage in handleSubmit', previewImage)
    try {
      dispatch({ type: 'START_TRANSACTION' })
      setLoading(true)
      const formData = new FormData()
      formData.append('display_name', displayName)
      formData.append('description', description)
      if (previewImage !== null) {
        formData.append('image_url', previewImage)
      }

      // Check if any changes were made
      const hasChanges =
        displayName !== userObject.display_name ||
        description !== userObject.description ||
        previewImage !== userObject.image

      if (!hasChanges) {
        onClose()
        return
      }

      // Add the user ID
      formData.append('id', userObject.id ?? '')

      // Initial form validation
      const submission = parseWithZod(formData, {
        schema: updateProfileSchema(),
      })
      logger('image file in submission', imageFile)
      if (
        submission.status === 'error' &&
        submission.error !== null &&
        Object.keys(submission.error).length
      ) {
        console.error('Update profile validation errors: ', submission.error)
        setLoading(false)
        return
      }

      if (imageFile && userObject.image !== previewImage) {
        dispatch({ type: 'START_IMAGE_UPLOAD' })
        imageUploadFetcher.submit(formData, {
          action: '/actions/upload-image',
          method: 'post',
          encType: 'multipart/form-data',
        })
      } else {
        offChainFetcher.submit(formData, {
          action: '/actions/edit-profile',
          method: 'post',
        })
      }
    } catch (error: unknown) {
      handleError(error, dispatch)
      setLoading(false)
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

  useEffect(() => {
    if (userObject.image) {
      setPreviewImage(userObject.image)
    }
  }, [userObject.image])

  useEffect(() => {
    if (offChainFetcher.data) {
      setUserObject?.(offChainFetcher.data.profile)
      onClose?.()
      setLoading(false)
    }
  }, [offChainFetcher.data, onClose])

  return (
    <>
      <DialogHeader className="pb-1">
        <DialogTitle>
          <Text
            variant="headline"
            className="text-foreground flex items-center gap-2"
          >
            <Icon name={IconName.avatarSparkle} className="h-6 w-6" />
            {isCreateRoute ? 'Create Profile' : 'Update Profile'}
          </Text>
        </DialogTitle>
      </DialogHeader>

      <offChainFetcher.Form
        method="post"
        {...getFormProps(form)}
        encType="multipart/form-data"
        action="/actions/edit-profile"
      >
        <div className="w-full h-max flex-col justify-start items-start inline-flex gap-7">
          <div className="flex flex-col w-full gap-1.5">
            <div className="self-stretch flex-col justify-start items-start flex">
              <div className="flex w-full items-center justify-between">
                <Text variant="caption" className="text-secondary-foreground">
                  Image
                </Text>
                <InfoTooltip
                  title="Image"
                  content={`We've done some image filtering in The Portal, so that
                          we don't begin our journey with a bunch of
                          inappropriate images - though the Intuition Protocol
                          itself allows for any image to be referenced.`}
                />
              </div>
            </div>
            <div className="self-stretch h-24 px-9 py-2.5 theme-border bg-primary/10 rounded-md justify-between items-center inline-flex">
              <div className="justify-start items-center gap-[18px] flex">
                <div className="w-16 h-16 rounded-xl justify-center items-center flex">
                  <ImageChooser
                    previewImage={previewImage}
                    setPreviewImage={setPreviewImage}
                    onFileChange={(filename, filesize, file) =>
                      handleFileChange(filename, filesize, file)
                    }
                    setImageFile={setImageFile}
                    disabled={loading}
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
                    setPreviewImage('')
                    setImageFilename(null)
                    setImageFilesize(null)
                    setImageFile(undefined)
                    setImageUploadError(null)
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
              errors={[...(imageUploadError ? [imageUploadError] : [])]}
            />
          </div>
          <div className="flex flex-col w-full gap-1.5">
            <div className="self-stretch flex-col justify-start items-start flex">
              <div className="flex w-full items-center justify-between">
                <Text variant="caption" className="text-secondary-foreground">
                  Display Name
                </Text>
                <InfoTooltip
                  title="Display Name"
                  content="This is the display name of your Atom/Identity, and will be a main way that people discover it - so make sure it is good!"
                />
              </div>
            </div>
            <Label htmlFor={fields.display_name.id} hidden>
              Display Name
            </Label>
            <Input
              {...getInputProps(fields.display_name, { type: 'text' })}
              placeholder="Enter a display name here"
              onChange={handleDisplayNameChange}
              value={displayName}
            />
            <ErrorList
              id={fields.display_name.errorId}
              errors={fields.display_name.errors}
            />
          </div>

          <div className="flex flex-col w-full gap-1.5">
            <div className="self-stretch flex-col justify-start items-start flex">
              <div className="flex w-full items-center justify-between">
                <Text variant="caption" className="text-secondary-foreground">
                  Description
                </Text>
                <InfoTooltip
                  title="Description"
                  content="Add a bit more context to elaborate on what this Atom/Identity is meant to represent. The more data you add, the more useful your Atom/Identity will be."
                />
              </div>
            </div>
            <Label htmlFor={fields.description.id} hidden>
              Description
            </Label>
            <Textarea
              {...getInputProps(fields.description, { type: 'text' })}
              placeholder="Enter description here"
              className="theme-border"
              onChange={handleDescriptionChange}
              value={description}
            />
            <ErrorList
              id={fields.description.errorId}
              errors={fields.description.errors}
            />
          </div>
        </div>
        <Button
          form={form.id}
          type="submit"
          variant={'primary'}
          disabled={loading}
          className="mx-auto mt-4 w-40"
        >
          {loading ? (
            isCreateRoute ? (
              <>
                <Icon
                  name="in-progress"
                  className="animate-spin h-5 w-5 mr-1"
                />{' '}
                Creating Profile...
              </>
            ) : (
              <>
                <Icon
                  name="in-progress"
                  className="animate-spin h-5 w-5 mr-1"
                />{' '}
                Updating Profile...
              </>
            )
          ) : isCreateRoute ? (
            'Create Profile'
          ) : (
            'Update Profile'
          )}
        </Button>
      </offChainFetcher.Form>
    </>
  )
}
