import { parseWithZod } from '@conform-to/zod'
import { imageUrlSchema } from '@lib/schemas/create-identity-schema'
import logger from '@lib/utils/logger'
import {
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  json,
  unstable_parseMultipartFormData as parseMultipartFormData,
  type ActionFunctionArgs,
  type UploadHandler,
} from '@remix-run/node'
import { uploadImage } from '@server/cloudinary'
import { MAX_UPLOAD_SIZE } from 'app/consts'

interface CloudinaryResponse {
  secure_url: string
}

interface CloudinaryError {
  message: string
  name: string
  http_code: number
}

export async function action({ request }: ActionFunctionArgs) {
  logger('Uploading and validating image file')

  const uploadHandler: UploadHandler = composeUploadHandlers(
    async ({ name, data }) => {
      if (name !== 'image_url') {
        return undefined
      }
      try {
        const uploadedImage = (await uploadImage(data)) as CloudinaryResponse
        return uploadedImage.secure_url
      } catch (e) {
        logger('error', e)
        return undefined
      }
    },
    createMemoryUploadHandler({
      maxPartSize: MAX_UPLOAD_SIZE,
    }),
  )
  try {
    const formData = await parseMultipartFormData(request, uploadHandler)

    const submission = await parseWithZod(formData, {
      schema: imageUrlSchema(),
      async: true,
    })
    logger('submission', submission)

    if (submission.status !== 'success') {
      return json(submission.reply(), {
        status: submission.status === 'error' ? 400 : 200,
      })
    }

    logger("Submission's value", submission.value)

    if (
      submission.value.image_url instanceof Blob &&
      submission.value.image_url.size === 0
    ) {
      return json(
        {
          status: 'error',
          error: 'Image failed approval',
          submission,
        } as const,
        {
          status: 500,
        },
      )
    }

    if (
      Object.keys(submission.value).length === 0 &&
      submission.value.constructor === Object
    ) {
      return json(
        {
          status: 'error',
          error: 'Failed to upload image',
          submission,
        } as const,
        {
          status: 500,
        },
      )
    }

    return json({ status: 'ok', submission } as const, {
      status: 200,
    })
  } catch (error) {
    logger('Error in image upload', error)
    if (error && typeof error === 'object' && 'http_code' in error) {
      const cloudinaryError = error as CloudinaryError
      let errorMessage = cloudinaryError.message

      // Check if the error message includes '80 pixels'
      if (errorMessage.includes('80 pixels')) {
        errorMessage = 'Your image must be at least 80x80 pixels.'
      }

      return json(
        {
          status: 'error',
          error: errorMessage,
          http_code: cloudinaryError.http_code,
        } as const,
        {
          status: cloudinaryError.http_code,
        },
      )
    }
    return json(
      {
        status: 'error',
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      } as const,
      {
        status: 500,
      },
    )
  }
}
