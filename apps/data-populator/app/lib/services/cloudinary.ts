// TODO: import from SDK instead of duplicating code

import { writeAsyncIterableToWritable } from '@remix-run/node'
import cloudinary from 'cloudinary'

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})


// Usage:
// const uploadedImage = (await uploadImage(data)) as CloudinaryResponse
// return uploadedImage.secure_url

export async function uploadImage(data: AsyncIterable<Uint8Array>) {
  // eslint-disable-next-line no-async-promise-executor
  const uploadPromise = new Promise(async (resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      {
        folder: 'remix',
        moderation:
          'aws_rek:explicit_nudity:0.99:hate_symbols:0.99:suggestive:0.99:violence:0.99:visually_disturbing:0.99:rude_gestures:0.99:drugs:0.99:tobacco:0.99:alcohol:0.99:gambling:0.99',
      },
      (error, result) => {
        if (error) {
          reject(error)
          return
        }
        resolve(result)
      },
    )
    await writeAsyncIterableToWritable(data, uploadStream)
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = (await uploadPromise) as any
  if (response.moderation && response.moderation[0].status === 'rejected') {
    console.log("Moderation response: ", JSON.stringify(response))
    throw new Error('Image failed moderation')
  }

  return response
}