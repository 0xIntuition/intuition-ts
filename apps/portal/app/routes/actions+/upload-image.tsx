import { parseWithZod } from '@conform-to/zod'
import { imageUrlSchema } from '@lib/schemas/create-identity-schema'
import { MAX_UPLOAD_SIZE } from '@lib/utils/constants'
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

interface CloudinaryResponse {
  secure_url: string
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
  const formData = await parseMultipartFormData(request, uploadHandler)

  const submission = await parseWithZod(formData, {
    schema: imageUrlSchema(),
    async: true,
  })
  logger('submission', submission)
  // Image that fails moderation will be returned as {..., img: Blob { size: 0, type: 'image/png' }}
  if (submission.status !== 'success') {
    return json(submission.reply(), {
      status: submission.status === 'error' ? 400 : 200,
    })
  }
  logger("Submission's value", submission.value)
  // check if the img is a blob with size 0
  if (
    submission.value.image_url instanceof Blob &&
    submission.value.image_url.size === 0
  ) {
    // const toastHeaders = await createToastHeaders({
    //   title: 'Failed Image Approval',
    //   description: 'Your image failed approval',
    //   type: 'error',
    // })
    return json({ status: 'error', submission } as const, {
      status: 500,
      // headers: toastHeaders,
    })
  }

  // check if error is not an empty object
  if (
    Object.keys(submission.value).length === 0 &&
    submission.value.constructor === Object
  ) {
    // const toastHeaders = await createToastHeaders({
    //   title: 'Failed to Upload Image',
    //   description: "Your image failed to upload.",
    //   type: 'error',
    // })
    return json({ status: 'error', submission } as const, {
      status: 500,
      // headers: toastHeaders,
    })
  }
  return json({ status: 'ok', submission } as const, {
    status: 200,
  })
}
