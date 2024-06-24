import { IdentityPresenter } from '@0xintuition/api'

import logger from '@lib/utils/logger'
import { useFetcher } from '@remix-run/react'

export interface OffChainFetcherData {
  success: 'success' | 'error'
  identity: IdentityPresenter
}

export function useOffChainFetcher() {
  const offChainFetcher = useFetcher<OffChainFetcherData>()
  const lastOffChainSubmission = offChainFetcher.data
  const identity = offChainFetcher?.data?.identity

  logger('identity', identity)

  return {
    offChainFetcher,
    lastOffChainSubmission,
    identity,
  }
}
