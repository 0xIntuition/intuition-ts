import axios from 'axios'
import sharp from 'sharp'

import { uploadImage } from './cloudinary'
// import { searchMapping, insertIntoMapping } from './cache-map';
import { insertIntoMapping, searchMapping } from './supabase'

interface CloudinaryResponse {
  secure_url: string
}

export async function resolveAndFilterImage(
  url: string,
  requestHash?: string,
): Promise<string> {
  if (!url) {
    return ''
  }
  const alreadyUploaded = await checkImageAlreadyUploaded(url)
  if (alreadyUploaded) {
    // console.log('Image already uploaded:', alreadyUploaded);
    requestHash
      ? pushUpdate(requestHash, `Image already uploaded: ${alreadyUploaded}`)
      : null
    return alreadyUploaded
  }
  try {
    // 1. Download image locally
    // console.log("Downloading image from", url);
    requestHash
      ? pushUpdate(requestHash, `Downloading image from ${url}...`)
      : null
    const downloadResponse = await axios.get(url, {
      responseType: 'arraybuffer',
    })

    // 2. Convert image to png using sharp
    // console.log("Resizing image");
    requestHash
      ? pushUpdate(requestHash, `Resizing image from ${url}...`)
      : null
    const buffer = await sharp(downloadResponse.data)
      .resize({
        width: 80,
        height: 80,
        fit: sharp.fit.inside,
        withoutReduction: true,
      })
      .png()
      .toBuffer()

    // Check if image size is larger than 41943040
    if (buffer.length > 41943040) {
      requestHash
        ? pushUpdate(
            requestHash,
            `Image size is too large, will be rejected by cloudinary - skipping upload`,
          )
        : null
      throw new Error(
        'Image size is too large, will be rejected by cloudinary - skipping upload',
      )
    }

    // 3. Upload it
    // console.log("Uploading image to cloudinary");
    requestHash
      ? pushUpdate(requestHash, `Uploading image from ${url} to cloudinary...`)
      : null
    const cloudinaryResponse = (await uploadImage(
      bufferToAsyncIterable(buffer),
    )) as CloudinaryResponse

    // 4. Log the mapping
    // console.log("Logging image upload");
    requestHash
      ? pushUpdate(
          requestHash,
          `Logging image upload from ${url} to ${cloudinaryResponse.secure_url}...`,
        )
      : null
    logImageUploadToDB(url, cloudinaryResponse.secure_url)

    return cloudinaryResponse.secure_url
  } catch (error) {
    console.error(
      `Error processing image at ${url} : ${error instanceof Error ? error.message : 'Unknown error'}`,
    )
  }
  return url
}

async function* bufferToAsyncIterable(
  buffer: Buffer,
): AsyncIterable<Uint8Array> {
  const chunkSize = 1024
  for (let i = 0; i < buffer.length; i += chunkSize) {
    const end = Math.min(i + chunkSize, buffer.length)
    yield buffer.slice(i, end) // slice returns a Buffer, which is also a Uint8Array
  }
}

export async function logImageUploadToDB(oldUrl: string, newUrl: string) {
  return await insertIntoMapping(oldUrl, newUrl)
}

export async function checkImageAlreadyUploaded(url: string) {
  return await searchMapping(url)
}
