import {
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
  type ActionFunctionArgs,
} from '@remix-run/node'
import { uploadImage } from '@server/cloudinary'

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    // Parse the multipart form data using a memory upload handler
    const formData = await unstable_parseMultipartFormData(
      request,
      unstable_createMemoryUploadHandler({
        maxPartSize: 10_000_000, // 10MB
      }),
    )

    // Get the file from formData
    const file = formData.get('file') as File
    if (!file) {
      throw new Error('No file uploaded')
    }

    // Convert file to AsyncIterable<Uint8Array>
    const arrayBuffer = await file.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)
    const asyncIterable: AsyncIterable<Uint8Array> = {
      async *[Symbol.asyncIterator]() {
        yield uint8Array
      },
    }

    const result = await uploadImage(asyncIterable)

    return new Response(
      JSON.stringify({
        url: result.secure_url, // This is the public URL
        public_id: result.public_id,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error) {
    console.error('Upload error:', error)
    return new Response(
      JSON.stringify({
        error: 'Failed to upload image',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
}
