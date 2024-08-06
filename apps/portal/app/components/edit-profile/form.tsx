import { useEffect, useState } from 'react'

import {
  Button,
  DialogHeader,
  DialogTitle,
  Icon,
  Input,
  Label,
  Text,
  Textarea,
  toast,
} from '@0xintuition/1ui'
import { UserPresenter } from '@0xintuition/api'

import ErrorList from '@components/error-list'
import { ImageChooser } from '@components/image-chooser'
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
import {
  ACCEPTED_IMAGE_MIME_TYPES,
  DESCRIPTION_MAX_LENGTH,
  MAX_NAME_LENGTH,
  MAX_UPLOAD_SIZE,
} from 'consts'
import {
  IdentityTransactionActionType,
  IdentityTransactionStateType,
} from 'types/transaction'

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
  const handleFileChange = (filename: string, filesize: string) => {
    setImageFilename(filename)
    setImageFilesize(filesize)
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
    if (userObject.image !== previewImage) {
      try {
        dispatch({ type: 'START_TRANSACTION' })
        setLoading(true)
        const formData = new FormData(event.currentTarget)
        // Initial form validation
        const submission = parseWithZod(formData, {
          schema: updateProfileSchema(),
        })
        if (
          submission.status === 'error' &&
          submission.error !== null &&
          Object.keys(submission.error).length
        ) {
          console.error('Update profile validation errors: ', submission.error)
        }
        setLoading(true)
        dispatch({ type: 'START_IMAGE_UPLOAD' })
        imageUploadFetcher.submit(formData, {
          action: '/actions/upload-with-metadata',
          method: 'post',
          encType: 'multipart/form-data',
        })
      } catch (error: unknown) {
        handleError(error, dispatch)
      }
    } else {
      try {
        dispatch({ type: 'START_TRANSACTION' })
        setLoading(true)
        const formData = new FormData(event.currentTarget)
        formData.append('id', userObject.id ?? '')
        formData.append('image_url', previewImage ?? '')
        offChainFetcher.submit(formData, {
          action: '/actions/edit-profile',
          method: 'post',
        })
      } catch (error: unknown) {
        handleError(error, dispatch)
      }
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
          <div className="flex items-center gap-2">
            <Icon name="avatar-sparkle" />
            <Text variant="headline">
              {isCreateRoute ? 'Create Profile' : 'Update Profile'}
            </Text>
          </div>
        </DialogTitle>
      </DialogHeader>

      <offChainFetcher.Form
        method="post"
        {...getFormProps(form)}
        encType="multipart/form-data"
        action="/actions/edit-profile"
      >
        <div>
          {/* Profile picture */}
          <div className="flex flex-col gap-2">
            <Label className="text-sm text-secondary-foreground">
              Profile Picture
            </Label>
            <div className="flex justify-between items-center p-4 theme-border rounded-lg bg-primary/10">
              <div className="w-fit">
                <ImageChooser
                  previewImage={previewImage}
                  setPreviewImage={setPreviewImage}
                  onFileChange={handleFileChange}
                  setImageFile={setImageFile}
                />
              </div>
              <div className="flex flex-col h-full items-start justify-center text-secondary-foreground">
                <Text variant="footnote">
                  {truncateString(imageFilename ?? '', 36)}
                </Text>
                <Text variant="footnote">{imageFilesize}</Text>
              </div>
              <Button
                variant="text"
                size="icon"
                onClick={(e) => {
                  e.preventDefault()
                  setPreviewImage(null)
                  setImageFilename(null)
                  setImageFilesize(null)
                }}
                className={previewImage === null ? 'hidden' : ''}
              >
                <Icon name="circle-x" />
              </Button>
            </div>
            <Text
              variant="small"
              className="self-end text-secondary-foreground"
            >
              {fields.image_url.errors ? (
                <ErrorList
                  id={fields.image_url.errorId}
                  errors={fields.image_url.errors}
                />
              ) : (
                `Max ${MAX_UPLOAD_SIZE / 1024 / 1024} MB`
              )}
            </Text>
          </div>
          {/* Display name */}
          <div className="flex flex-col gap-2">
            <Label className="text-sm text-secondary-foreground">
              Display Name
            </Label>
            <Input
              {...getInputProps(fields.display_name, { type: 'text' })}
              placeholder="Enter a display name"
              value={displayName}
              onChange={handleDisplayNameChange}
              className="w-full"
            />
            <Text
              variant="small"
              className="self-end text-secondary-foreground"
            >
              Max {MAX_NAME_LENGTH} characters
            </Text>
          </div>
          {/* Bio */}
          <div className="flex flex-col gap-2">
            <Label className="text-sm text-secondary-foreground">Bio</Label>
            <Textarea
              {...getInputProps(fields.description, { type: 'text' })}
              placeholder="Tell us about yourself!"
              value={description}
              onChange={handleDescriptionChange}
              className="h-20"
            />
            <Text
              variant="small"
              className="self-end text-secondary-foreground"
            >
              Max {DESCRIPTION_MAX_LENGTH} characters
            </Text>
          </div>
        </div>
        <Button
          form={form.id}
          disabled={loading}
          onClick={() => {
            handleSubmit
          }}
          className="mx-auto mt-4"
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
