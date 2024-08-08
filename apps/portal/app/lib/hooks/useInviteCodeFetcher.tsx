import { SubmissionResult } from '@conform-to/react'
import logger from '@lib/utils/logger'
import { useFetcher } from '@remix-run/react'

export interface InviteCodeFetcher {
  status: 'success' | 'error'
  submission: SubmissionResult<string[]> | null
  error?: string
}

export function useInviteCodeFetcher() {
  const inviteCodeFetcher = useFetcher<InviteCodeFetcher>()
  const lastInviteCodeSubmission = inviteCodeFetcher.data?.submission
  logger('offchainfetcher data in hook', inviteCodeFetcher.data)

  return {
    inviteCodeFetcher,
    lastInviteCodeSubmission,
  }
}
