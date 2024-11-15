import { useEffect, useRef, useState } from 'react'

import { RequestData } from '@lib/services/request'
import { useFetcher } from '@remix-run/react'

export function usePollRequestDetails({
  requestHash = null,
  active = false,
}: {
  requestHash: string | null
  active: boolean
}) {
  const [requestData, setRequestData] = useState<RequestData | null>(null)
  const fetcher = useFetcher<{ result: RequestData }>()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const previousHashRef = useRef<string | null>(null)

  // Reset data and handle hash changes
  useEffect(() => {
    if (requestHash !== previousHashRef.current) {
      setRequestData(null)
      // Instead of trying to clear fetcher data, make a new request if we have a hash
      if (requestHash) {
        // This will overwrite any stale data in the fetcher
        fetcher.load(
          `/api/csv-editor?action=getRequestUpdate&requestHash=${requestHash}`,
        )
      }
      previousHashRef.current = requestHash
    }
  }, [requestHash])

  // Handle fetcher data updates - only use data if it matches current hash
  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data?.result) {
      // Only update if the data matches our current hash
      if (fetcher.data.result.hash === requestHash) {
        setRequestData(fetcher.data.result as RequestData)
      }
    }
  }, [fetcher.state, fetcher.data, requestHash])

  // Handle polling
  useEffect(() => {
    if (!active || !requestHash) {
      return
    }

    const fetchData = () => {
      if (fetcher.state === 'idle') {
        fetcher.load(
          `/api/csv-editor?action=getRequestUpdate&requestHash=${requestHash}`,
        )
      }
    }

    fetchData()
    intervalRef.current = setInterval(() => {
      if (
        requestData?.status === 'fulfilled' ||
        requestData?.status === 'failed'
      ) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      } else {
        fetchData()
      }
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [active, requestHash, requestData?.status])

  return {
    requestData,
    isLoading: fetcher.state === 'loading' || fetcher.state === 'submitting',
  }
}
