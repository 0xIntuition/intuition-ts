import { IdentityPresenter } from '@0xintuition/api'

import { SubmissionResult } from '@conform-to/react'
import logger from '@lib/utils/logger'
import { useFetcher } from '@remix-run/react'

export interface OffChainFetcherData {
  success: 'success' | 'error'
  identity: IdentityPresenter
  submission: SubmissionResult<string[]> | null
}

export function useOffChainFetcher() {
  const offChainFetcher = useFetcher<OffChainFetcherData>()
  const lastOffChainSubmission = offChainFetcher.data?.submission
  logger('offchainfetcher data in hook', offChainFetcher.data)
  const identity = offChainFetcher?.data?.identity

  return {
    offChainFetcher,
    lastOffChainSubmission,
    identity,
  }
}
