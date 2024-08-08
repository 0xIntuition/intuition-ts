import { IdentityPresenter } from '@0xintuition/api'

import { SubmissionResult } from '@conform-to/react'
import { useFetcher } from '@remix-run/react'

export interface OffChainFetcherData {
  success: 'success' | 'error'
  identity: IdentityPresenter
  submission: SubmissionResult<string[]> | null
}

export function useOffChainFetcher() {
  const offChainFetcher = useFetcher<OffChainFetcherData>()
  const lastOffChainSubmission = offChainFetcher.data?.submission
  const identity = offChainFetcher?.data?.identity

  return {
    offChainFetcher,
    lastOffChainSubmission,
    identity,
  }
}

// import { SubmissionResult } from '@conform-to/react'
// import logger from '@lib/utils/logger'
// import { useFetcher } from '@remix-run/react'

// export interface OffChainFetcherData<T> {
//   success: 'success' | 'error'
//   data: T
//   submission?: SubmissionResult<string[]> | null
// }

// interface UseOffChainFetcherReturn<T> {
//   offChainFetcher: ReturnType<typeof useFetcher<OffChainFetcherData<T>>>
//   lastOffChainSubmission: SubmissionResult<string[]> | null | undefined
//   data: T | undefined
// }

// export function useOffChainFetcher<T>(): UseOffChainFetcherReturn<T> {
//   const offChainFetcher = useFetcher<OffChainFetcherData<T>>()
//   const lastOffChainSubmission = offChainFetcher.data?.submission
//   logger('offchainfetcher data in hook', offChainFetcher.data)
//   const data = (offChainFetcher.data as OffChainFetcherData<T>)?.data

//   return {
//     offChainFetcher,
//     lastOffChainSubmission,
//     data,
//   }
// }
