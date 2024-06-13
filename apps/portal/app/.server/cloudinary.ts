import { writeAsyncIterableToWritable } from '@remix-run/node'
import cloudinary from 'cloudinary'

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

async function uploadImage(data: AsyncIterable<Uint8Array>) {
  const uploadPromise = new Promise(async (resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      {
        folder: 'remix',
        moderation:
          'aws_rek:explicit_nudity:0.5:hate_symbols:0.5:suggestive:0.6:violence:0.5:visually_disturbing:0.7:rude_gestures:0.6:drugs:0.5:tobacco:0.7:alcohol:0.6:gambling:0.6',
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
  const response = (await uploadPromise) as any
  if (response.moderation && response.moderation[0].status === 'rejected') {
    throw new Error('Image failed moderation')
  }

  return response
}

export { uploadImage }
