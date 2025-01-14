import { useEffect } from 'react'

import logger from '@lib/utils/logger'
import { useFetcher } from '@remix-run/react'
import { type UploadApiResponse } from 'cloudinary'

export function useImageUploadFetcher() {
  const imageUploadFetcher = useFetcher<UploadApiResponse>()

  useEffect(() => {
    if (imageUploadFetcher.state === 'submitting') {
      logger('Uploading...')
    } else if (imageUploadFetcher.state === 'idle' && imageUploadFetcher.data) {
      logger('Upload complete:', imageUploadFetcher.data)
    }
  }, [imageUploadFetcher.state, imageUploadFetcher.data])

  return imageUploadFetcher
}
