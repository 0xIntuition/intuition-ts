import { useEffect, useState } from 'react'

import { GetUserQuestByIdResponse, QuestStatus } from '@0xintuition/api'

import logger from '@lib/utils/logger'
import { useFetcher, useRevalidator } from '@remix-run/react'
import { CheckQuestSuccessLoaderData } from '@routes/resources+/check-quest-success'

export function useQuestCompletion(userQuest: GetUserQuestByIdResponse) {
  const [successModalOpen, setSuccessModalOpen] = useState(false)
  const fetcher = useFetcher<CheckQuestSuccessLoaderData>()
  const { revalidate } = useRevalidator()

  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data) {
      if (
        fetcher.data.success &&
        userQuest.status !== QuestStatus.COMPLETED &&
        userQuest.status !== QuestStatus.CLAIMABLE
      ) {
        logger('Loaded fetcher data, revalidating')
        revalidate()
      }
    }
  }, [fetcher.data, fetcher.state, revalidate, userQuest.status])

  const checkQuestSuccess = () => {
    if (userQuest) {
      logger('Submitting fetcher', userQuest.id)
      fetcher.load(`/resources/check-quest-success?userQuestId=${userQuest.id}`)
    }
  }

  return {
    successModalOpen,
    setSuccessModalOpen,
    checkQuestSuccess,
    isLoading: fetcher.state !== 'idle',
  }
}
