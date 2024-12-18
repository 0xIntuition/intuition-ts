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
    logger('Fetcher state changed:', {
      state: fetcher.state,
      data: fetcher.data,
      formData: fetcher.formData,
      userQuestStatus: userQuest.status,
      hasError: fetcher.data instanceof Error,
      error: fetcher.data instanceof Error ? fetcher.data.message : null,
    })

    // Track if the fetcher is stuck in loading state
    if (fetcher.state === 'loading') {
      const timeout = setTimeout(() => {
        // Check if the request is in the browser's network tab
        const pendingRequests = performance
          .getEntriesByType('resource')
          .filter((entry) => entry.name.includes('check-quest-success'))

        logger('Fetcher stuck in loading state', {
          userQuestId: userQuest.id,
          currentStatus: userQuest.status,
          pendingRequests: pendingRequests.map((r) => ({
            name: r.name,
            duration: r.duration,
            startTime: r.startTime,
          })),
        })
      }, 5000) // Log if loading for more than 5 seconds
      return () => clearTimeout(timeout)
    }

    if (fetcher.state === 'idle' && fetcher.data) {
      const isCompleted =
        userQuest.status === QuestStatus.COMPLETED ||
        userQuest.status === QuestStatus.CLAIMABLE ||
        fetcher.data.status === QuestStatus.COMPLETED ||
        fetcher.data.status === QuestStatus.CLAIMABLE

      if (fetcher.data.success && !isCompleted) {
        logger('Quest success confirmed, revalidating')
        revalidate()
      } else if (isCompleted) {
        logger('Quest already completed, no revalidation needed')
      }
    }
  }, [fetcher.data, fetcher.state, revalidate, userQuest.status, userQuest.id])

  const checkQuestSuccess = () => {
    if (!userQuest?.id) {
      logger('Cannot check quest success - missing userQuest.id')
      return
    }

    if (
      userQuest.status === QuestStatus.COMPLETED ||
      userQuest.status === QuestStatus.CLAIMABLE
    ) {
      logger('Quest already completed, skipping status check')
      return
    }

    // Ensure we have the correct URL format
    const url = new URL(
      '/resources/check-quest-success',
      window.location.origin,
    )
    url.searchParams.set('userQuestId', userQuest.id)

    logger('Initiating quest status check:', {
      url: url.toString(),
      userQuestId: userQuest.id,
      currentStatus: userQuest.status,
      origin: window.location.origin,
    })

    try {
      // Track the request start time
      const requestStartTime = performance.now()
      logger('Starting fetch request', { requestStartTime })

      // Try submit instead of load
      fetcher.submit(
        { userQuestId: userQuest.id },
        {
          method: 'get',
          action: url.pathname + url.search,
        },
      )
    } catch (error) {
      logger('Error initiating quest status check:', {
        error,
        userQuestId: userQuest.id,
      })
    }
  }

  return {
    successModalOpen,
    setSuccessModalOpen,
    checkQuestSuccess,
    isLoading: fetcher.state !== 'idle',
  }
}
